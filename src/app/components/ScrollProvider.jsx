"use client";

import { useEffect } from "react";
import "locomotive-scroll/dist/locomotive-scroll.css";

export default function ScrollProvider({ children }) {
  useEffect(() => {
    let scroll = null;

    (async () => {
      if (typeof window === "undefined") return;
      const LocomotiveScroll = (await import("locomotive-scroll")).default;

      scroll = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
        multiplier: 1,
        smartphone: { smooth: true },
        tablet: { smooth: true },
      });

      // expose instance and signal readiness
      window.locomotive = scroll;
      window.dispatchEvent(new CustomEvent("locomotive:ready", { detail: {} }));
    })();

    return () => {
      if (scroll) scroll.destroy();
      window.locomotive = null;
      // no need to dispatch destroy event, listeners will check instance
    };
  }, []);

  return (
    // keep the attribute locomotive expects
    <div data-scroll-container style={{ minHeight: "100vh" }}>
      {children}
    </div>
  );
}
