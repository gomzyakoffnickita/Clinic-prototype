import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { CLINIC } from "../../data/clinic.js";
import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);

export function Footer({ homeHref = "#top" }) {
  const sceneRef = useRef(null);
  const videoRef = useRef(null);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    const video = videoRef.current;
    const motion = gsap.matchMedia();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;

    const syncPlayback = () => {
      if (reducedMotion.matches || !inView || document.hidden) {
        video.pause();
        if (reducedMotion.matches) video.currentTime = 0;
      } else {
        video.play().catch(() => {});
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.1 },
    );

    observer.observe(scene);
    reducedMotion.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);

    motion.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.from(video, {
          scale: 1.5,
          ease: "none",
          scrollTrigger: {
            trigger: scene,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      },
      scene,
    );

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
      motion.revert();
    };
  }, []);

  return (
    <footer className="site-footer">
      <div className="site-footer__scene" ref={sceneRef}>
        <video
          className="site-footer__video"
          src={CLINIC.footerVideo}
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <a
          className="site-footer__wordmark"
          href={homeHref}
          aria-label={`${CLINIC.name}, на главную`}
          style={{ "--clinic-logo": `url("${CLINIC.logo}")` }}
        />
      </div>
    </footer>
  );
}
