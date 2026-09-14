'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react';

/*
 * Interaction tunes and the Crisp instrument are adapted from sensory-ui.
 * sensory-ui is Copyright (c) 2026 Satyam Vyas and distributed under the MIT
 * License. The full notice is retained in THIRD_PARTY_NOTICES.md.
 */

export type PortfolioSound =
  | 'interaction.tap'
  | 'interaction.subtle'
  | 'interaction.toggle'
  | 'interaction.confirm';

type PlayOptions = {
  volume?: number;
};

type SoundContextValue = {
  play: (sound: PortfolioSound, options?: PlayOptions) => void;
};

type ClickTune = {
  type: 'click';
  duration: number;
  filterFrequency: number;
  filterQ: number;
  volume: number;
  decayConstant: number;
};

type ToggleTune = {
  type: 'toggle';
  duration: number;
  frequency: number;
  endFrequency: number;
  filterFrequency: number;
  filterQ: number;
  volume: number;
  noiseGain: number;
  toneGain: number;
  noiseDuration: number;
  decayConstant: number;
};

// Calibrated to remain noticeable around 50–60% laptop speaker volume.
const MASTER_VOLUME = 1.2;

const CRISP_INSTRUMENT = {
  q: 4,
  oscillator: 'triangle' as OscillatorType,
  decayMultiplier: 0.6,
  gainMultiplier: 1,
  pitchMultiplier: 1.1,
};

const SOUND_TUNES: Record<PortfolioSound, ClickTune | ToggleTune> = {
  'interaction.tap': {
    type: 'click',
    duration: 0.008,
    filterFrequency: 3800,
    filterQ: 2.5,
    volume: 1,
    decayConstant: 35,
  },
  'interaction.subtle': {
    type: 'click',
    duration: 0.008,
    filterFrequency: 3600,
    filterQ: 3.5,
    volume: 0.8,
    decayConstant: 25,
  },
  'interaction.toggle': {
    type: 'toggle',
    duration: 0.035,
    frequency: 700,
    endFrequency: 480,
    filterFrequency: 2200,
    filterQ: 2,
    volume: 0.64,
    noiseGain: 0.2,
    toneGain: 0.22,
    noiseDuration: 0.008,
    decayConstant: 60,
  },
  'interaction.confirm': {
    type: 'click',
    duration: 0.012,
    filterFrequency: 5500,
    filterQ: 4,
    volume: 0.8,
    decayConstant: 55,
  },
};

const SoundContext = createContext<SoundContextValue | null>(null);

let audioContext: AudioContext | null = null;
let activeSources: AudioScheduledSourceNode[] = [];
let outputCompressor: DynamicsCompressorNode | null = null;

function getOutputNode(context: AudioContext) {
  if (outputCompressor?.context === context) return outputCompressor;

  outputCompressor = context.createDynamicsCompressor();
  outputCompressor.threshold.value = -10;
  outputCompressor.knee.value = 8;
  outputCompressor.ratio.value = 10;
  outputCompressor.attack.value = 0.002;
  outputCompressor.release.value = 0.08;
  outputCompressor.connect(context.destination);

  return outputCompressor;
}

function stopActiveSound() {
  activeSources.forEach((source) => {
    try {
      source.stop();
    } catch {
      // The source has already finished.
    }
  });
  activeSources = [];
}

function createNoiseBuffer(context: AudioContext, duration: number, decayConstant: number) {
  const length = Math.max(1, Math.floor(context.sampleRate * duration));
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const data = buffer.getChannelData(0);
  const tauSeconds = (decayConstant / context.sampleRate) * CRISP_INSTRUMENT.decayMultiplier;

  for (let index = 0; index < length; index += 1) {
    const time = index / context.sampleRate;
    data[index] = (Math.random() * 2 - 1) * Math.exp(-time / tauSeconds);
  }

  return buffer;
}

function playClick(context: AudioContext, tune: ClickTune, volume: number) {
  const duration = Math.max(0.004, tune.duration) * CRISP_INSTRUMENT.decayMultiplier;
  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();

  source.buffer = createNoiseBuffer(context, duration, tune.decayConstant);
  filter.type = 'bandpass';
  filter.frequency.value = tune.filterFrequency * CRISP_INSTRUMENT.pitchMultiplier;
  filter.Q.value = tune.filterQ * CRISP_INSTRUMENT.q;
  gain.gain.value = volume * tune.volume * CRISP_INSTRUMENT.gainMultiplier;

  source.connect(filter);
  filter.connect(gain);
  gain.connect(getOutputNode(context));
  source.addEventListener('ended', () => {
    source.disconnect();
    filter.disconnect();
    gain.disconnect();
  }, { once: true });
  source.start();

  activeSources = [source];
}

function playToggle(context: AudioContext, tune: ToggleTune, volume: number) {
  const now = context.currentTime;
  const duration = tune.duration * CRISP_INSTRUMENT.decayMultiplier;
  const noiseDuration = tune.noiseDuration * CRISP_INSTRUMENT.decayMultiplier;
  const level = volume * tune.volume * CRISP_INSTRUMENT.gainMultiplier;

  const noise = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const noiseGain = context.createGain();
  noise.buffer = createNoiseBuffer(context, noiseDuration, tune.decayConstant);
  filter.type = 'bandpass';
  filter.frequency.value = tune.filterFrequency * CRISP_INSTRUMENT.pitchMultiplier;
  filter.Q.value = tune.filterQ * CRISP_INSTRUMENT.q;
  noiseGain.gain.value = level * tune.noiseGain;
  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(getOutputNode(context));

  const tone = context.createOscillator();
  const toneGain = context.createGain();
  tone.type = CRISP_INSTRUMENT.oscillator;
  tone.frequency.setValueAtTime(tune.frequency * CRISP_INSTRUMENT.pitchMultiplier, now);
  tone.frequency.exponentialRampToValueAtTime(
    tune.endFrequency * CRISP_INSTRUMENT.pitchMultiplier,
    now + 0.03 * CRISP_INSTRUMENT.decayMultiplier,
  );
  toneGain.gain.setValueAtTime(level * tune.toneGain, now);
  toneGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  tone.connect(toneGain);
  toneGain.connect(getOutputNode(context));

  tone.addEventListener('ended', () => {
    noise.disconnect();
    filter.disconnect();
    noiseGain.disconnect();
    tone.disconnect();
    toneGain.disconnect();
  }, { once: true });

  noise.start(now);
  tone.start(now);
  tone.stop(now + duration + 0.01);
  activeSources = [noise, tone];
}

function subscribeToReducedMotion(onChange: () => void) {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', onChange);
  return () => mediaQuery.removeEventListener('change', onChange);
}

function getReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getServerReducedMotion() {
  return false;
}

export function usePortfolioSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('usePortfolioSound must be used inside SoundFeedbackProvider');
  }
  return context;
}

export default function SoundFeedbackProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );

  const play = useCallback((sound: PortfolioSound, options: PlayOptions = {}) => {
    if (reducedMotion) return;

    const start = async () => {
      audioContext ??= new AudioContext();
      if (audioContext.state !== 'running') {
        await audioContext.resume();
      }

      stopActiveSound();
      const tune = SOUND_TUNES[sound];
      const volume = MASTER_VOLUME * (options.volume ?? 1);

      if (tune.type === 'toggle') {
        playToggle(audioContext, tune, volume);
      } else {
        playClick(audioContext, tune, volume);
      }
    };

    void start();
  }, [reducedMotion]);

  useEffect(() => {
    const playMappedClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest<HTMLElement>('[data-sound]');
      if (!target || target.matches(':disabled, [aria-disabled="true"]')) return;

      const sound = target.dataset.sound as PortfolioSound | undefined;
      if (!sound || !(sound in SOUND_TUNES)) return;

      const parsedVolume = Number(target.dataset.soundVolume);
      play(sound, {
        volume: Number.isFinite(parsedVolume) ? parsedVolume : undefined,
      });
    };

    document.addEventListener('click', playMappedClick);
    return () => document.removeEventListener('click', playMappedClick);
  }, [play]);

  const value = useMemo(() => ({ play }), [play]);

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}
