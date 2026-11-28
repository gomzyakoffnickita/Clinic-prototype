import React, { useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header, SiteMenu } from "./components/Header/Header.jsx";
import { Contact } from "./components/Contact/Contact.jsx";
import { Footer } from "./components/Footer/Footer.jsx";
import { PageTransition } from "./components/PageTransition.jsx";
import "./fonts.css";
import "./style.css";
import { ABOUT } from "./data/about.js";
import "./about.css";

gsap.registerPlugin(ScrollTrigger);

function AboutPage() {
  const { hero, intro, team, specialists, consultation, contact } = ABOUT;
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const dialogRef = useRef(null);
  const [pastHero, setPastHero] = useState(false);

  useLayoutEffect(() => {
    const header = ScrollTrigger.create({
      trigger: heroRef.current,
      start: "bottom top+=48",
      end: "max",
      onUpdate: (self) => setPastHero(self.scroll() >= self.start),
      onRefresh: (self) => setPastHero(self.scroll() >= self.start),
    });
    const motion = gsap.matchMedia();
    motion.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        pageRef.current
          .querySelectorAll("[data-about-reveal]")
          .forEach((element) => {
            gsap.fromTo(
              element,
              { opacity: 0, y: 18 },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 90%",
                  once: true,
                },
              },
            );
          });
      },
      pageRef.current,
    );
    motion.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.fromTo(
          ".about-hero__background",
          { scale: 1.12, yPercent: -5 },
          {
            scale: 1,
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        );
        const frame = pageRef.current.querySelector(".about-team__frame");
        const reveal = gsap.timeline({
          scrollTrigger: {
            trigger: frame,
            start: "top bottom",
            end: "top center",
            scrub: true,
          },
        });
        reveal
          .fromTo(frame, { scaleX: 0.8 }, { scaleX: 1, ease: "none" }, 0)
          .fromTo(
            frame.firstElementChild,
            { scaleX: 1.25 },
            { scaleX: 1, ease: "none" },
            0,
          );
      },
      pageRef.current,
    );

    motion.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap.fromTo(
          ".about-team__portrait",
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: ".about-team__frame",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      },
      pageRef.current,
    );

    const target = document.getElementById(window.location.hash.slice(1));
    const frame = requestAnimationFrame(() => {
      if (target) target.scrollIntoView({ behavior: "instant" });
      ScrollTrigger.refresh();
    });
    return () => {
      cancelAnimationFrame(frame);
      header.kill();
      motion.revert();
    };
  }, []);

  const openMenu = () => dialogRef.current.showModal();
  return (
    <>
      <PageTransition />
      <a className="skip-link" href="#about-intro">
        Перейти к содержанию
      </a>
      <Header
        hidden={!pastHero}
        onMenu={openMenu}
        homeHref="../"
        servicesHref="../services/"
        approachHref={null}
      />
      <SiteMenu
        dialogRef={dialogRef}
        homeHref="../"
        servicesHref="../services/"
        approachHref="#about-intro"
      />
      <main className="about-page" id="top" ref={pageRef} tabIndex={-1}>
        <section
          className="about-hero"
          ref={heroRef}
          aria-labelledby="about-title"
        >
          <div className="about-hero__header" hidden={pastHero}>
            <Header
              transparent
              onMenu={openMenu}
              homeHref="../"
              servicesHref="../services/"
              approachHref={null}
            />
          </div>
          <div className="about-hero__backdrop">
            <img
              className="about-hero__background"
              src={hero.image} style={{ objectPosition: hero.position }}
              alt=""
            />
          </div>
          <div className="about-hero__content about-grid">
            <h1 id="about-title" data-about-reveal>
              {hero.title.map((line, index) => <span key={index}>{line}</span>)}
            </h1>
            <div className="about-hero__inset" data-about-reveal>
              <img
                className="about-hero__inset-image"
                src={hero.poster}
                style={{ objectPosition: hero.videoPosition }}
                alt=""
              />
              <p>{hero.description}</p>
            </div>
          </div>
        </section>

        <section
          className="about-intro about-grid"
          id="about-intro"
          tabIndex={-1}
          aria-labelledby="about-intro-title"
        >
          <p className="about-page__eyebrow" id="about-intro-title">
            {intro.eyebrow}
          </p>
          <div className="about-intro__copy">
            <h2 data-about-reveal>{intro.title}</h2>
            <p data-about-reveal>{intro.description}</p>
            <a className="about-page__link" href="#specialists">
              Познакомиться с командой
            </a>
          </div>
        </section>

        <section
          className="about-team about-grid"
          aria-labelledby="about-team-title"
        >
          <div className="about-team__frame">
            <img
              className="about-team__portrait"
              src={team.portrait}
              alt={team.portraitAlt}
              style={{ objectPosition: team.portraitPosition }}
              loading="lazy"
            />
          </div>
          <div className="about-team__detail">
            <img
              className="about-team__detail-image"
              src={team.detail}
              style={{ objectPosition: team.detailPosition }}
              alt=""
              loading="lazy"
            />
          </div>
          <h2 id="about-team-title" data-about-reveal>
            {team.title}
          </h2>
        </section>

        <section
          className="about-profile"
          id="specialists"
          aria-labelledby="about-profile-title"
        >
          <h2 id="about-profile-title">{specialists.title}</h2>
          <div className="about-profile__grid">
            {specialists.items.map(({ image, name, role, href }) => (
              <article className="about-profile__card" key={href}>
                <img
                  className="about-profile__portrait"
                  src={image}
                  width="380"
                  height="460"
                  style={{ objectPosition: specialists.position }}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <h3>{name}</h3>
                <p className="about-profile__role">{role}</p>
                <a href={href} aria-label={`${specialists.profileLabel}: ${name}`}>
                  {specialists.profileLabel}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section
          className="about-consultation about-grid"
          aria-labelledby="about-consultation-title"
        >
          <div className="about-consultation__intro">
            <h2 id="about-consultation-title" data-about-reveal>
              {consultation.title}
            </h2>
            <img
              className="about-consultation__image"
              src={consultation.image}
              style={{ objectPosition: consultation.position }}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="about-consultation__body" data-about-reveal>
            <ol className="about-consultation__steps" role="list">
              {consultation.steps.map(({ title, description }, index) => (
                <li className="about-consultation__step" key={index}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ol>
            <a className="about-consultation__link" href={contact.href}>
              {contact.label}
            </a>
          </div>
        </section>
        <Contact servicesHref="../services/" approachHref="#about-intro" />
      </main>
      <Footer homeHref="../" />
    </>
  );
}

createRoot(document.getElementById("root")).render(<AboutPage />);
