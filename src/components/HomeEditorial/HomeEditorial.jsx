import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HomeEditorial.css";

gsap.registerPlugin(ScrollTrigger);

const assets = `${import.meta.env.BASE_URL}editorial/`;
const introTitle =
  "В EK CLINIC мы отдаем приоритет индивидуальному подходу. Посетите нашу клинику — здесь вас ждет опыт, который станет важным этапом на пути к желаемому преображению.";
const features = [
  {
    href: "services/",
    title: "Услуги",
    image: "feature-links__item-1.jpg",
    position: "50% 42%",
  },
  {
    href: "services/#catalog",
    title: "Направления",
    image: "feature-links__item-2.jpg",
    position: "50% 48%",
  },
];

export function HomeIntro() {
  const introRef = useRef(null);

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
        src={`${assets}hero-new.jpg`}
        alt=""
        loading="lazy"
      />
      <div className="home-intro__copy">
        <h1 id="intro-title" aria-label={introTitle}>
          {introTitle.split(" ").map((word) => (
            <React.Fragment key={word}>
              <span className="home-intro__word" aria-hidden="true">
                {word}
              </span>{" "}
            </React.Fragment>
          ))}
        </h1>
        <div className="home-intro__details">
          <p>
            В центре подхода EK Clinic — внимание к пропорциям лица и к тому,
            как вы сами видите желаемые изменения. Знакомство начинается с
            разговора о ваших пожеланиях и вопросах.
          </p>
          <a className="home-intro__contact" href="#contact">
            <span className="home-intro__contact-label">Контакты</span>
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
      aria-label="Услуги и направления"
    >
      {features.map(({ href, image, title, position }) => (
        <a className="feature-links__item" href={href} key={href}>
          <img
            className="feature-links__image"
            src={`${assets}${image}`}
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

const comparisonAssets = `${import.meta.env.BASE_URL}before-after/`;
const comparisonCases = [
  { id: 1, procedure: "" },
  { id: 2, procedure: "", landscape: true },
  { id: 3, procedure: "" },
  { id: 4, procedure: "" },
];

function ComparisonCard({ id, procedure, landscape }) {
  const [beforePercent, setBeforePercent] = useState(50);

  return (
    <figure className="home-approach__case">
      <div
        className={`home-approach__comparison${landscape ? " home-approach__comparison--landscape" : ""}`}
        style={{ "--comparison-split": `${beforePercent}%` }}
      >
        <img
          className="home-approach__photo"
          src={`${comparisonAssets}after-${id}.jpg`}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <img
          className="home-approach__photo home-approach__photo--before"
          src={`${comparisonAssets}before-${id}.jpg`}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <div className="home-approach__labels" aria-hidden="true">
          <span className="home-approach__label">До</span>
          <span className="home-approach__label">После</span>
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
          aria-label={`Сравнить фото до и после. Кейс ${id}${procedure ? `, ${procedure}` : ""}`}
          aria-valuetext={`До: ${beforePercent}%, после: ${100 - beforePercent}%`}
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
          До и после
        </h2>
        <p>
          Здесь собраны фотографии клиентов EK Clinic до и после процедур. У
          каждого случая своя исходная форма и свой результат.
        </p>
        <p className="home-approach__hint">
          Передвиньте ползунок, чтобы сравнить кадры.
        </p>
      </div>
      <div className="home-approach__gallery">
        {comparisonCases.map((item) => (
          <ComparisonCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}
