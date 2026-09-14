'use client';

import { useEffect } from 'react';

const SCROLL_SETTINGS = {
  response: 0.085,
  wheelMultiplier: 0.9,
  maxWheelStep: 180,
  settleThreshold: 0.1,
} as const;

const SCROLL_KEYS = new Set([
  'ArrowDown',
  'ArrowUp',
  'End',
  'Home',
  'PageDown',
  'PageUp',
  ' ',
]);

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

function hasScrollableParent(target: EventTarget | null) {
  let element = target instanceof HTMLElement ? target : null;

  while (element && element !== document.body) {
    const { overflowY } = window.getComputedStyle(element);
    const canScroll =
      (overflowY === 'auto' || overflowY === 'scroll') &&
      element.scrollHeight > element.clientHeight;

    if (canScroll) {
      return true;
    }

    element = element.parentElement;
  }

  return false;
}

export default function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (reducedMotion.matches) {
      return;
    }

    let currentPosition = window.scrollY;
    let targetPosition = currentPosition;
    let animationFrame: number | null = null;

    const maximumScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const stopAnimation = () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }

      currentPosition = window.scrollY;
      targetPosition = currentPosition;
    };

    const animate = () => {
      targetPosition = clamp(targetPosition, 0, maximumScroll());
      const distance = targetPosition - currentPosition;

      if (Math.abs(distance) <= SCROLL_SETTINGS.settleThreshold) {
        currentPosition = targetPosition;
        window.scrollTo(0, currentPosition);
        animationFrame = null;
        return;
      }

      currentPosition += distance * SCROLL_SETTINGS.response;
      window.scrollTo(0, currentPosition);
      animationFrame = window.requestAnimationFrame(animate);
    };

    const handleWheel = (event: WheelEvent) => {
      if (
        event.defaultPrevented ||
        event.ctrlKey ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
        hasScrollableParent(event.target)
      ) {
        return;
      }

      event.preventDefault();

      if (animationFrame === null) {
        currentPosition = window.scrollY;
        targetPosition = currentPosition;
      }

      const deltaScale =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? 16
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? window.innerHeight
            : 1;
      const wheelDelta = clamp(
        event.deltaY * deltaScale * SCROLL_SETTINGS.wheelMultiplier,
        -SCROLL_SETTINGS.maxWheelStep,
        SCROLL_SETTINGS.maxWheelStep,
      );

      targetPosition = clamp(targetPosition + wheelDelta, 0, maximumScroll());

      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    const handleScroll = () => {
      if (animationFrame === null) {
        currentPosition = window.scrollY;
        targetPosition = currentPosition;
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (SCROLL_KEYS.has(event.key)) {
        stopAnimation();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('pointerdown', stopAnimation, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', stopAnimation, { passive: true });

    return () => {
      stopAnimation();
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointerdown', stopAnimation);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', stopAnimation);
    };
  }, []);

  return null;
}
