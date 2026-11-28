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
          <img
            className="home-method__still"
            ref={mediaRef}
            src={portrait.poster}
            alt=""
            loading="lazy"
          />
        </div>
      </figure>
      <div className="home-method__detail-track">
        <div className="home-method__detail">
          <div className="home-method__detail-media">
            <img className="home-method__still" src={detail.poster} alt="" loading="lazy" />
          </div>
          <p className="home-method__detail-copy">{detail.description}</p>
        </div>
      </div>
    </section>
  );
}
