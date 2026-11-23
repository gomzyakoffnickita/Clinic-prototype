import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import "./PageTransition.css";

export function PageTransition() {
  const curtainRef = useRef(null);

  useLayoutEffect(() => {
    const curtain = curtainRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let navigating = false;
    let animation;

    function reveal() {
      navigating = false;
      animation?.kill();
      animation = gsap.fromTo(curtain, { yPercent: 0, opacity: 1 }, {
        opacity: 0,
        duration: reduced.matches ? 0 : 0.95,
        ease: "power3.inOut",
        onComplete: () => { curtain.style.pointerEvents = "none"; },
      });
    }

    function followLink(event) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest?.("a[href]");
      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin || !["http:", "https:"].includes(destination.protocol)) return;
      if (destination.pathname === window.location.pathname && destination.search === window.location.search) return;
      if (reduced.matches) return;
      event.preventDefault();
      if (navigating) return;
      navigating = true;
      animation?.kill();
      curtain.style.pointerEvents = "auto";
      animation = gsap.fromTo(curtain, { yPercent: 100, opacity: 1 }, {
        yPercent: 0, duration: 0.7, ease: "power3.inOut",
        onComplete: () => window.location.assign(destination.href),
      });
    }

    reveal();
    document.addEventListener("click", followLink);
    const restore = (event) => { if (event.persisted) reveal(); };
    window.addEventListener("pageshow", restore);
    return () => {
      animation?.kill();
      document.removeEventListener("click", followLink);
      window.removeEventListener("pageshow", restore);
    };
  }, []);

  return <div className="page-transition" ref={curtainRef} aria-hidden="true" />;
}
