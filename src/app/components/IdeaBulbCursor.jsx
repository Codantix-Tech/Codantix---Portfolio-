'use client';

import { useEffect, useRef } from 'react';

/**
 * IdeaBulbCursor
 * - Replaces the cursor with a floating 💡 emoji while hovering the wrapped text.
 * - Hides the native cursor only when hovering the element.
 * - No drop-shadow applied.
 *
 * Usage: <IdeaBulbCursor>Ideas</IdeaBulbCursor>
 */
export default function IdeaBulbCursor({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const bulb = document.createElement('div');
    bulb.textContent = '💡';
    Object.assign(bulb.style, {
      position: 'fixed',
      left: '0px',
      top: '0px',
      pointerEvents: 'none',
      zIndex: '99999',
      userSelect: 'none',
      fontSize: '24px', // Increased size for better visibility
      lineHeight: '1',
      transform: 'translate(-50%, -50%) scale(1)',
      transition: 'transform 120ms ease, opacity 120ms ease',
      opacity: '0', // Hidden until hover
      willChange: 'transform, opacity, left, top',
    });
    document.body.appendChild(bulb);

    const onMove = (e) => {
      bulb.style.left = `${e.clientX}px`;
      bulb.style.top = `${e.clientY}px`;
    };

    const onEnter = (e) => {
      el.style.cursor = 'none';
      bulb.style.opacity = '1';
      onMove(e);
      window.addEventListener('mousemove', onMove, { passive: true });
    };

    const onLeave = () => {
      el.style.cursor = '';
      bulb.style.opacity = '0';
      window.removeEventListener('mousemove', onMove);
    };

    const onFocus = () => {
      const rect = el.getBoundingClientRect();
      bulb.style.left = `${rect.left + rect.width / 2}px`;
      bulb.style.top = `${rect.top + rect.height / 2}px`;
      bulb.style.opacity = '1';
    };

    const onBlur = () => {
      bulb.style.opacity = '0';
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('focus', onFocus);
    el.addEventListener('blur', onBlur);

    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('focus', onFocus);
      el.removeEventListener('blur', onBlur);
      window.removeEventListener('mousemove', onMove);
      if (bulb.parentNode) bulb.parentNode.removeChild(bulb);
      el.style.cursor = '';
    };
  }, []);

  return (
    <span
      ref={ref}
      tabIndex={0}
      className="font-pencil transition-all duration-300 group-hover:font-bold"
    >
      {children}
    </span>
  );
}