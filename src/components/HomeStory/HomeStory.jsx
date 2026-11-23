import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HomeStory.css";

gsap.registerPlugin(ScrollTrigger);

const assets = `${import.meta.env.BASE_URL}editorial/`;

export function Method() {
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
      <p className="home-method__eyebrow">Наша философия</p>
      <h2 className="home-method__title" id="method-title">
        Каждая процедура в EK CLINIC основана на принципах доказательной
        медицины и новейших достижениях в области эстетической науки. Наши
        специалисты сочетают анатомическую точность с научно обоснованными
        методами, что позволяет добиваться безопасных и долгосрочных
        результатов.
      </h2>
      <figure className="home-method__portrait" ref={frameRef}>
        <div className="home-method__crop" ref={cropRef}>
          <video
            ref={mediaRef}
            src={`${assets}home-method__portrait.mp4`}
            poster={`${assets}light.avif`}
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
            src={`${assets}light.avif`}
            alt=""
            loading="lazy"
          />
        </div>
      </figure>
      <div className="home-method__detail-track">
      <div className="home-method__detail">
        <div className="home-method__detail-media">
        <video
          src={`${assets}home-method__detail.mp4`}
          poster={`${assets}materials.avif`}
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
          src={`${assets}materials.avif`}
          alt=""
          loading="lazy"
        />
        </div>
        <p className="home-method__detail-copy">
          За каждой процедурой стоит приверженность науке, исследованиям и
          совершенствованию, как залог безопасных, точных и долговечных
          результатов.
        </p>
      </div>
      </div>
    </section>
  );
}

export function FullBleedScene() {
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
          src={`${assets}home-scene.jpg`}
          width="1672"
          height="941"
          alt="Портрет модели"
          ref={mediaRef}
          loading="lazy"
          decoding="async"
        />
      </section>
      <p className="home-statement">
        Мы сочетаем медицинские знания с эстетическим мастерством, чтобы
        обеспечить уход, который ощущается как индивидуальный и точный.
      </p>
    </>
  );
}
