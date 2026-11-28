import React, { useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { PageTransition } from "./components/PageTransition.jsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header, SiteMenu } from "./components/Header/Header.jsx";
import { Contact } from "./components/Contact/Contact.jsx";
import { Footer } from "./components/Footer/Footer.jsx";
import "./fonts.css";
import "./style.css";
import { SERVICES } from "./data/services.js";
import "./services.css";

gsap.registerPlugin(ScrollTrigger);


function ServicesPage() {
  const { hero, catalog, scene, journey } = SERVICES;
  const { groups } = catalog;
  const dialogRef = useRef(null);
  const catalogRef = useRef(null);
  const heroRef = useRef(null);
  const [pastHero, setPastHero] = useState(false);
  const [activeId, setActiveId] = useState(groups[0]?.id);

  useLayoutEffect(() => {
    const headerTrigger = ScrollTrigger.create({
      trigger: heroRef.current,
      start: "bottom top+=48",
      end: "max",
      onUpdate: (self) => setPastHero(self.scroll() >= self.start),
      onRefresh: (self) => setPastHero(self.scroll() >= self.start),
    });
    const sections = catalogRef.current.querySelectorAll(
      ".services-page__group",
    );
    const sectionTriggers = [...sections].map((section) =>
      ScrollTrigger.create({
        trigger: section,
        start: "top 35%",
        end: "bottom 35%",
        onEnter: () => setActiveId(section.id),
        onEnterBack: () => setActiveId(section.id),
      }),
    );

    const motion = gsap.matchMedia();
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ".services-journey__images",
        { scale: 0.9 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".services-journey__layer",
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        },
      );
      gsap.from(".services-journey__heading > *", {
        opacity: 0,
        y: 10,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-journey",
          start: "top 70%",
          once: true,
        },
      });
      gsap.fromTo(
        ".services-scene__image",
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: ".services-scene",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });
    const target = document.getElementById(window.location.hash.slice(1));
    const anchorFrame = target
      ? requestAnimationFrame(() => target.scrollIntoView({ behavior: "instant" }))
      : null;

    return () => {
      if (anchorFrame !== null) cancelAnimationFrame(anchorFrame);
      headerTrigger.kill();
      sectionTriggers.forEach((trigger) => trigger.kill());
      motion.revert();
    };
  }, []);

  function focusGroup(event) {
    const target = document.getElementById(event.currentTarget.hash.slice(1));
    setActiveId(target.id);
    requestAnimationFrame(() =>
      target?.querySelector("h3")?.focus({ preventScroll: true }),
    );
  }

  return (
    <>
      <PageTransition />
      <a className="skip-link" href="#services-main">
        Перейти к содержанию
      </a>
      <Header
        hidden={!pastHero}
        onMenu={() => dialogRef.current.showModal()}
        homeHref="../"
        servicesHref={null}
        approachHref="../about/"
      />
      <SiteMenu
        dialogRef={dialogRef}
        homeHref="../"
        servicesHref="#catalog"
        approachHref="../about/"
      />
      <main className="services-page" id="services-main" tabIndex={-1}>
        <section
          className="services-page__hero"
          ref={heroRef}
          aria-labelledby="services-title"
        >
          <div className="services-page__hero-header" hidden={pastHero}>
            <Header
              transparent
              onMenu={() => dialogRef.current.showModal()}
              homeHref="../"
              servicesHref={null}
              approachHref="../about/"
            />
          </div>
          <img className="services-page__hero-image" src={hero.image} alt="" fetchPriority="high" />
          <div className="services-page__hero-copy">
            <h1 id="services-title">{hero.title}</h1>
            <p>{hero.description}</p>
            <a
              href={hero.link.href}
              onClick={(event) => {
                if (
                  event.metaKey ||
                  event.ctrlKey ||
                  event.shiftKey ||
                  event.altKey
                )
                  return;
                event.preventDefault();
                const catalog = catalogRef.current;
                window.history.pushState(null, "", hero.link.href);
                catalog.focus({ preventScroll: true });
                catalog.scrollIntoView({
                  behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)",
                  ).matches
                    ? "instant"
                    : "smooth",
                  block: "start",
                });
              }}
            >
              {hero.link.label}
            </a>
          </div>
        </section>

        <section
          className="services-page__catalog"
          id="catalog"
          tabIndex={-1}
          ref={catalogRef}
          aria-labelledby="catalog-title"
        >
          <h2 className="services-page__catalog-title" id="catalog-title">{catalog.title}</h2>
          <div className="services-page__catalog-grid">
            <nav className="services-page__index" aria-label={catalog.ariaLabel}>
              {groups.map(({ id, title }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={focusGroup}
                  aria-current={activeId === id ? "location" : undefined}
                >
                  {title}
                </a>
              ))}
            </nav>
            <div className="services-page__groups">
              {groups.map((group) => (
                <article
                  className="services-page__group"
                  id={group.id}
                  key={group.id}
                  tabIndex={-1}
                  aria-labelledby={`${group.id}-title`}
                >
                  {group.image && (
                    <img className="services-page__media" src={group.image} alt="" loading="lazy" />
                  )}
                  <div className="services-page__group-copy">
                    <h3 id={`${group.id}-title`} tabIndex={-1}>{group.title}</h3>
                    <p>{group.description}</p>
                    <ul>
                      {group.topics.map(({ label, href }) => (
                        <li key={href}><a href={href}>{label}</a></li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="services-scene"
          aria-label={scene.ariaLabel}
        >
          <div className="services-scene__background">
            <img
              className="services-scene__image"
              src={scene.image}
              alt=""
              loading="lazy"
            />
          </div>
          <div className="services-scene__content">
            <p className="services-scene__text">{scene.description}</p>
          </div>
        </section>

        <section
          className="services-journey"
          id="your-journey"
          aria-labelledby="services-journey-title"
        >
          <div className="services-journey__heading">
            <h2 id="services-journey-title">{journey.title}</h2>
            <p>{journey.description}</p>
          </div>
          <div className="services-journey__layer">
            <div className="services-journey__images">
              {journey.images.map(({ src, alt, position }) => (
                <img key={src} src={src} alt={alt} style={{ objectPosition: position }} loading="lazy" />
              ))}
            </div>
          </div>
        </section>

        <Contact servicesHref="#catalog" approachHref="../about/" />
      </main>
      <Footer homeHref="../" />
    </>
  );
}

createRoot(document.getElementById("root")).render(<ServicesPage />);
