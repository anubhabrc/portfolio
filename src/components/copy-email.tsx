'use client';

import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import { CopyIcon, MailIcon } from './icons';
import { usePortfolioSound } from './sound-feedback';

type CopyEmailProps = {
  email: string;
  className?: string;
  icon?: 'copy' | 'mail';
  style?: CSSProperties;
};

function copyWithFallback(email: string) {
  const textarea = document.createElement('textarea');
  textarea.value = email;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand('copy');
  textarea.remove();

  if (!copied) {
    throw new Error('Unable to copy email');
  }
}

export default function CopyEmail({ email, className = '', icon = 'mail', style }: CopyEmailProps) {
  const { play } = usePortfolioSound();
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const resetTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current !== null) {
        window.clearTimeout(resetTimer.current);
      }
    };
  }, []);

  const copy = async () => {
    let didCopy = false;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        copyWithFallback(email);
      }
      didCopy = true;
    } catch {
      try {
        copyWithFallback(email);
        didCopy = true;
      } catch {
        didCopy = false;
      }
    }

    setStatus(didCopy ? 'copied' : 'error');
    play(didCopy ? 'interaction.confirm' : 'interaction.toggle', {
      volume: didCopy ? 1 : 0.9,
    });

    if (resetTimer.current !== null) {
      window.clearTimeout(resetTimer.current);
    }
    resetTimer.current = window.setTimeout(() => setStatus('idle'), 1600);
  };

  const tooltip = status === 'copied' ? 'Copied!' : status === 'error' ? 'Copy failed' : 'Copy Email';

  return (
    <button
      className={`copy-email ${className}`.trim()}
      type="button"
      onClick={copy}
      aria-label="Copy email address"
      style={style}
    >
      {icon === 'copy' ? <CopyIcon /> : <MailIcon />}
      <span className="copy-tooltip" role="status" aria-live="polite">
        {tooltip}
      </span>
    </button>
  );
}
