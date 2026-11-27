import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HOME } from "../../data/home.js";
import "./HomeEditorial.css";

gsap.registerPlugin(ScrollTrigger);

export function HomeIntro() {
  const introRef = useRef(null);
  const { title, description, image, contact } = HOME.intro;

  useLayoutEffect(() => {
    const intro = introRef.current;
    const motion = gsap.matchMedia();

    motion.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const timeline = gsap.timeline({
          paused: true,
        });

        timeline
          .from(intro.querySelectorAll(".home-intro__word"), {
            opacity: 0,
            y: 10,
            stagger: 0.04,
            duration: 1,
            ease: "expo.out",
          })
          .from(
            intro.querySelector(".home-intro__details"),
            {
              opacity: 0,
              y: 10,
              duration: 0.8,
              ease: "expo.out",
            },
            0.4,
          );

        ScrollTrigger.create({
          trigger: intro,
          start: "top 65%",
          once: true,
          onEnter: () => timeline.play(),
        });
      },
      intro,
    );

    return () => motion.revert();
  }, []);

  return (
    <section
      id="introduction"
      className="home-intro editorial-grid"
      ref={introRef}
      tabIndex={-1}
      aria-labelledby="intro-title"
    >
      <img
        className="home-intro__photo"
        src={image}
        alt=""
        loading="lazy"
      />
      <div className="home-intro__copy">
        <h1 id="intro-title" aria-label={title}>
          {title.split(" ").map((word, index) => (
            <React.Fragment key={index}>
              <span className="home-intro__word" aria-hidden="true">
                {word}
              </span>{" "}
            </React.Fragment>
          ))}
        </h1>
        <div className="home-intro__details">
          <p>{description}</p>
          <a className="home-intro__contact" href={contact.href}>
            <span className="home-intro__contact-label">{contact.label}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function FeatureLinks() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const motion = gsap.matchMedia();

    motion.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.fromTo(
          section.querySelectorAll(".feature-links__image"),
          { yPercent: -9 },
          {
            yPercent: 9,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      },
      section,
    );

    return () => motion.revert();
  }, []);

  return (
    <nav
      className="feature-links"
      ref={sectionRef}
      aria-label={HOME.featureLinks.ariaLabel}
    >
      {HOME.featureLinks.items.map(({ href, image, title, position }) => (
        <a className="feature-links__item" href={href} key={href}>
          <img
            className="feature-links__image"
            src={image}
            style={{ objectPosition: position }}
            alt=""
            loading="lazy"
          />
          <span className="feature-links__title">{title}</span>
        </a>
      ))}
    </nav>
  );
}

function ComparisonCard({ id, procedure, before, after, landscape, position }) {
  const [beforePercent, setBeforePercent] = useState(50);

  return (
    <figure className="home-approach__case">
      <div
        className={`home-approach__comparison${landscape ? " home-approach__comparison--landscape" : ""}`}
        style={{
          "--comparison-split": `${beforePercent}%`,
          "--comparison-position": position,
        }}
      >
        <img
          className="home-approach__photo"
          src={after}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <img
          className="home-approach__photo home-approach__photo--before"
          src={before}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <div className="home-approach__labels" aria-hidden="true">
          <span className="home-approach__label">{HOME.approach.labels.before}</span>
          <span className="home-approach__label">{HOME.approach.labels.after}</span>
        </div>
        <div className="home-approach__divider" aria-hidden="true" />
        <div className="home-approach__handle" aria-hidden="true" />
        <input
          className="home-approach__range"
          type="range"
          min="0"
          max="100"
          value={beforePercent}
          onChange={(event) =>
            setBeforePercent(event.currentTarget.valueAsNumber)
          }
          aria-label={`${HOME.approach.labels.compare} ${id}${procedure ? `, ${procedure}` : ""}`}
          aria-valuetext={`${HOME.approach.labels.before}: ${beforePercent}%, ${HOME.approach.labels.after.toLowerCase()}: ${100 - beforePercent}%`}
        />
      </div>
      {procedure && (
        <figcaption className="home-approach__procedure">
          {procedure}
        </figcaption>
      )}
    </figure>
  );
}

export function Approach() {
  return (
    <section
      id="approach"
      className="home-approach editorial-section editorial-grid"
      tabIndex={-1}
      aria-labelledby="approach-title"
    >
      <div className="home-approach__details">
        <h2 className="home-approach__title" id="approach-title">
          {HOME.approach.title}
        </h2>
        <p>{HOME.approach.description}</p>
        <p className="home-approach__hint">
          {HOME.approach.hint}
        </p>
      </div>
      <div className="home-approach__gallery">
        {HOME.approach.cases.map((item) => (
          <ComparisonCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}
