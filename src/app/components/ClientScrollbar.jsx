"use client";

import { useEffect } from "react";

/**
 * ClientScrollbar
 * - Tries to attach to window.locomotive (preferred)
 * - Falls back to a scroll container (selector '[data-scroll-container]')
 * - Final fallback: window scroll
 *
 * Smoothly translates a fixed glow element using transform for best perf.
 */
export default function ClientScrollbar({
  scrollContainerSelector = '[data-scroll-container]',
} = {}) {
  useEffect(() => {
    let cleanupFns = [];
    let pollInterval = null;

    // create the glowing element
    const glow = document.createElement("div");
    glow.style.position = "fixed";
    glow.style.right = "8px";
    glow.style.top = "0";
    glow.style.width = "12px";
    glow.style.height = "50px";
    glow.style.borderRadius = "12px 12px 50% 50%";
    glow.style.background = "linear-gradient(to bottom,#38bdf8,#1e40af)";
    glow.style.boxShadow = "0 0 28px rgba(56,189,248,0.75)";
    glow.style.pointerEvents = "none";
    glow.style.willChange = "transform, height, opacity";
    glow.style.transition = "transform 160ms cubic-bezier(.2,.8,.2,1), height 160ms ease, opacity 200ms ease";
    glow.style.zIndex = "99999";
    glow.style.opacity = "0"; // hidden until we know we can scroll
    document.body.appendChild(glow);

    // update function (scrollTop, maxScroll, clientHeight)
    const updateGlow = (scrollTop, maxScroll, clientHeight) => {
      const max = Math.max(0, Number(maxScroll) || 0);
      const client = Math.max(1, Number(clientHeight) || window.innerHeight);

      // total doc height = client + max
      const total = client + max;
      const percent = max > 0 ? scrollTop / max : 0;

      // compute thumb height proportional to visible area
      const ratio = client / total;
      const minThumb = 36;
      const maxThumb = Math.min(window.innerHeight * 0.9, window.innerHeight);
      const thumbHeight = Math.max(minThumb, Math.round(ratio * window.innerHeight));
      const trackSpace = window.innerHeight - thumbHeight;
      const translateY = Math.max(0, Math.min(trackSpace, Math.round(percent * trackSpace)));

      glow.style.height = `${thumbHeight}px`;
      glow.style.transform = `translateY(${translateY}px)`;
      // hide if no scrollable area
      glow.style.opacity = max > 0 ? "1" : "0";
    };

    // attach to locomotive instance
    const attachToLoco = (loco) => {
      if (!loco || typeof loco.on !== "function") return false;
      const handler = (obj = {}) => {
        // locomotive provides { scroll: { x, y }, limit: { x, y } }
        const scrollTop = Number(obj?.scroll?.y ?? 0);
        const maxScroll = Number(obj?.limit?.y ?? 0);
        const clientHeight = window.innerHeight;
        updateGlow(scrollTop, maxScroll, clientHeight);
      };
      loco.on("scroll", handler);
      cleanupFns.push(() => loco.off && loco.off("scroll", handler));
      // attempt an initial read if loco exposes current scroll / limit
      try {
        const initial = loco?.scroll && loco?.limit ? { scroll: { y: loco.scroll.y }, limit: { y: loco.limit.y } } : null;
        if (initial) handler(initial);
      } catch (e) {}
      return true;
    };

    // attach to a DOM container
    const attachToContainer = (container) => {
      if (!container || typeof container.addEventListener !== "function") return false;
      const handler = () => {
        const scrollTop = container.scrollTop;
        const maxScroll = container.scrollHeight - container.clientHeight;
        const clientHeight = container.clientHeight || window.innerHeight;
        updateGlow(scrollTop, maxScroll, clientHeight);
      };
      container.addEventListener("scroll", handler, { passive: true });
      cleanupFns.push(() => container.removeEventListener("scroll", handler));
      // initial position
      handler();
      return true;
    };

    // attach to window scroll
    const attachToWindow = () => {
      const handler = () => {
        const scrollTop = window.scrollY || window.pageYOffset;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const clientHeight = window.innerHeight;
        updateGlow(scrollTop, maxScroll, clientHeight);
      };
      window.addEventListener("scroll", handler, { passive: true });
      cleanupFns.push(() => window.removeEventListener("scroll", handler));
      handler();
    };

    // try attach sequence: locomotive -> container -> window
    const tryAttachOnce = () => {
      // locomotive instances might be set on window.locomotive or window.__locomotive
      const loco = window.locomotive || window.__locomotive;
      if (loco && attachToLoco(loco)) return true;

      const container = document.querySelector(scrollContainerSelector);
      if (container && attachToContainer(container)) return true;

      // fallback to window
      attachToWindow();
      return true;
    };

    // Listen for locomotive readiness signaled by ScrollProvider
    const onLocoReady = () => {
      try {
        // cleanup any previous listeners before attaching to loco
        cleanupFns.forEach((f) => f());
        cleanupFns = [];
      } catch (e) {}
      const loco = window.locomotive || window.__locomotive;
      if (loco) attachToLoco(loco);
    };
    window.addEventListener("locomotive:ready", onLocoReady);

    // Poll while app bootstraps (gives time for ScrollProvider to set up)
    let attempts = 0;
    pollInterval = setInterval(() => {
      attempts++;
      tryAttachOnce();
      if (window.locomotive || document.querySelector(scrollContainerSelector) || attempts > 24) {
        clearInterval(pollInterval);
      }
    }, 200);

    // also react to resize to recompute sizes
    const onResize = () => {
      // run a quick re-check to update size/position
      tryAttachOnce();
    };
    window.addEventListener("resize", onResize);
    cleanupFns.push(() => window.removeEventListener("resize", onResize));
    cleanupFns.push(() => window.removeEventListener("locomotive:ready", onLocoReady));

    // cleanup on unmount
    return () => {
      if (pollInterval) clearInterval(pollInterval);
      cleanupFns.forEach((f) => {
        try { f(); } catch (e) { /* ignore */ }
      });
      if (glow.parentNode) glow.parentNode.removeChild(glow);
    };
  }, [scrollContainerSelector]);

  // nothing to render in React tree
  return null;
}
