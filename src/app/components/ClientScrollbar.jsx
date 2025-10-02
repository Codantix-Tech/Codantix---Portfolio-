"use client";

import { useEffect } from "react";

/**
 * ClientScrollbar
 * - Only runs on desktop (>=768px). On mobile it will never create the glow element or attach listeners.
 * - Tries: locomotive instance -> [data-scroll-container] -> window scroll.
 */
export default function ClientScrollbar({
  scrollContainerSelector = '[data-scroll-container]',
} = {}) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let glow = null;
    let cleanupFns = [];
    let pollInterval = null;
    let attached = false;

    // media query: desktop when true
    const mql = window.matchMedia("(min-width: 768px)");

    // create the glowing element
    const createGlow = () => {
      if (glow) return;
      glow = document.createElement("div");
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
      glow.style.transition =
        "transform 160ms cubic-bezier(.2,.8,.2,1), height 160ms ease, opacity 200ms ease";
      glow.style.zIndex = "99999";
      glow.style.opacity = "0";
      document.body.appendChild(glow);
    };

    const removeGlow = () => {
      if (glow && glow.parentNode) glow.parentNode.removeChild(glow);
      glow = null;
    };

    // update function (scrollTop, maxScroll, clientHeight)
    const updateGlow = (scrollTop, maxScroll, clientHeight) => {
      const max = Math.max(0, Number(maxScroll) || 0);
      const client = Math.max(1, Number(clientHeight) || window.innerHeight);

      const total = client + max;
      const percent = max > 0 ? scrollTop / max : 0;

      const ratio = client / total;
      const minThumb = 36;
      const thumbHeight = Math.max(minThumb, Math.round(ratio * window.innerHeight));
      const trackSpace = window.innerHeight - thumbHeight;
      const translateY = Math.max(0, Math.min(trackSpace, Math.round(percent * trackSpace)));

      if (glow) {
        glow.style.height = `${thumbHeight}px`;
        glow.style.transform = `translateY(${translateY}px)`;
        glow.style.opacity = max > 0 ? "1" : "0";
      }
    };

    // attach to locomotive instance
    const attachToLoco = (loco) => {
      if (!loco || typeof loco.on !== "function") return false;
      const handler = (obj = {}) => {
        const scrollTop = Number(obj?.scroll?.y ?? 0);
        const maxScroll = Number(obj?.limit?.y ?? 0);
        updateGlow(scrollTop, maxScroll, window.innerHeight);
      };
      loco.on("scroll", handler);
      cleanupFns.push(() => loco.off && loco.off("scroll", handler));
      // attempt initial read
      try {
        if (loco?.scroll && loco?.limit) handler({ scroll: { y: loco.scroll.y }, limit: { y: loco.limit.y } });
      } catch (e) { /* ignore */ }
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
      handler(); // initial position
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
      return true;
    };

    // try attach sequence: locomotive -> container -> window
    const tryAttachOnce = () => {
      if (!mql.matches) return false; // only attach on desktop
      if (!glow) createGlow();

      const loco = window.locomotive || window.__locomotive;
      if (loco && attachToLoco(loco)) {
        attached = true;
        return true;
      }

      const container = document.querySelector(scrollContainerSelector);
      if (container && attachToContainer(container)) {
        attached = true;
        return true;
      }

      attachToWindow();
      attached = true;
      return true;
    };

    // cleanup everything
    const cleanupAll = () => {
      if (pollInterval) {
        clearInterval(pollInterval);
        pollInterval = null;
      }
      cleanupFns.forEach((f) => {
        try { f(); } catch (e) {}
      });
      cleanupFns = [];
      removeGlow();
      attached = false;
    };

    // initial attach only if desktop
    tryAttachOnce();

    // respond to locomotive readiness
    const onLocoReady = () => {
      // re-run attach (only on desktop)
      if (!mql.matches) return;
      // clear previous handlers and re-attach
      cleanupFns.forEach((f) => { try { f(); } catch {} });
      cleanupFns = [];
      tryAttachOnce();
    };
    window.addEventListener("locomotive:ready", onLocoReady);

    // Poll while app bootstraps (gives time for ScrollProvider to set up)
    let attempts = 0;
    pollInterval = setInterval(() => {
      attempts++;
      if (!mql.matches) return; // if mobile, don't poll
      tryAttachOnce();
      if (window.locomotive || document.querySelector(scrollContainerSelector) || attempts > 24) {
        clearInterval(pollInterval);
        pollInterval = null;
      }
    }, 200);

    // media query listener: when switching to mobile remove glow & listeners
    const onMediaChange = (e) => {
      if (e.matches) {
        // desktop now
        tryAttachOnce();
      } else {
        // mobile now -> cleanup everything
        cleanupAll();
      }
    };
    if (mql.addEventListener) mql.addEventListener("change", onMediaChange);
    else mql.addListener(onMediaChange); // safari fallback

    // respond to resize as a final safety net
    const onResize = () => {
      if (!mql.matches && attached) {
        cleanupAll();
      } else if (mql.matches && !attached) {
        tryAttachOnce();
      } else {
        // update sizes/position if already attached
        tryAttachOnce();
      }
    };
    window.addEventListener("resize", onResize);

    // cleanup on unmount
    return () => {
      if (pollInterval) clearInterval(pollInterval);
      if (mql.removeEventListener) mql.removeEventListener("change", onMediaChange);
      else mql.removeListener(onMediaChange);
      window.removeEventListener("locomotive:ready", onLocoReady);
      window.removeEventListener("resize", onResize);
      cleanupAll();
    };
  }, [scrollContainerSelector]);

  return null;
}
