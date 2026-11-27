import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HOME } from "../../data/home.js";
import "./HomeStory.css";

gsap.registerPlugin(ScrollTrigger);


export function Method() {
  const { eyebrow, title, portrait, detail } = HOME.method;
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const cropRef = useRef(null);
  const mediaRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const copy = section.querySelector(".home-method__detail-copy");
    const updateDetailSpace = () => {
      section.style.setProperty("--detail-tail", `${copy.getBoundingClientRect().height + 16}px`);
    };
    const detailResize = new ResizeObserver(updateDetailSpace);
    detailResize.observe(copy);
    updateDetailSpace();
    const motion = gsap.matchMedia();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const videos = sectionRef.current.querySelectorAll("video");
    const syncPlayback = () => {
      videos.forEach((video) => {
        if (reducedMotion.matches) video.pause();
        else video.play().catch(() => {});
      });
    };

    reducedMotion.addEventListener("change", syncPlayback);
    syncPlayback();

    motion.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const frame = frameRef.current;
        const reveal = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: frame,
            start: "top bottom",
            end: "top center",
            scrub: true,
          },
        });

        reveal
          .from(frame, { scaleX: 0.8 }, 0)
          .from(cropRef.current, { scaleX: 1.25 }, 0);

        gsap.fromTo(
          mediaRef.current,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: frame,
              start: "top center",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      },
      sectionRef.current,
    );

    return () => {
      detailResize.disconnect();
      section.style.removeProperty("--detail-tail");
      motion.revert();
      reducedMotion.removeEventListener("change", syncPlayback);
    };
  }, []);

  return (
    <section
      className="home-method editorial-grid"
      id="method"
      ref={sectionRef}
      aria-labelledby="method-title"
    >
      <p className="home-method__eyebrow">{eyebrow}</p>
      <h2 className="home-method__title" id="method-title">
        {title}
      </h2>
      <figure className="home-method__portrait" ref={frameRef}>
        <div className="home-method__crop" ref={cropRef} style={{ "--method-portrait-position": portrait.position }}>
          <video
            ref={mediaRef}
            src={portrait.video}
            poster={portrait.poster}
            autoPlay={
              !window.matchMedia("(prefers-reduced-motion: reduce)").matches
            }
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
          <img
            className="home-method__still"
            src={portrait.poster}
            alt=""
            loading="lazy"
          />
        </div>
      </figure>
      <div className="home-method__detail-track">
      <div className="home-method__detail">
        <div className="home-method__detail-media">
        <video
          src={detail.video}
          poster={detail.poster}
          autoPlay={
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches
          }
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <img
          className="home-method__still"
          src={detail.poster}
          alt=""
          loading="lazy"
        />
        </div>
        <p className="home-method__detail-copy">
          {detail.description}
        </p>
      </div>
      </div>
    </section>
  );
}

export function FullBleedScene() {
  const { image, width, height, alt, description, position, desktopPosition } = HOME.fullBleedScene;
  const sceneRef = useRef(null);
  const mediaRef = useRef(null);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    const motion = gsap.matchMedia();

    motion.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.fromTo(
          mediaRef.current,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: scene,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      },
      scene,
    );

    return () => motion.revert();
  }, []);

  return (
    <>
      <section className="home-scene" ref={sceneRef}>
        <img
          className="home-scene__media"
          src={image}
          width={width}
          height={height}
          alt={alt}
          style={{ "--scene-position": position, "--scene-desktop-position": desktopPosition }}
          ref={mediaRef}
          loading="lazy"
          decoding="async"
        />
      </section>
      <p className="home-statement">
        {description}
      </p>
    </>
  );
}
