import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header, SiteMenu } from "./components/Header/Header.jsx";
import { Contact } from "./components/Contact/Contact.jsx";
import { Footer } from "./components/Footer/Footer.jsx";
import { PageTransition } from "./components/PageTransition.jsx";
import "./fonts.css";
import "./style.css";
import "./about.css";

gsap.registerPlugin(ScrollTrigger);

const teamPortrait = "../editorial/about_team-1.jpg";
const specialists = [
  { image: "about_team-2.jpg", name: "Кристина Евгеньевна", description: "" },
  { image: "about_team-3.jpg", name: "Ксения Витальевна", description: "" },
  { image: "about_team-4.jpg", name: "Елена Олеговна", description: "" },
  { image: "about_team-5.jpg", name: "Светлана Анатольевна", description: "" },
];

function AboutPage() {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const insetVideoRef = useRef(null);
  const dialogRef = useRef(null);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const video = insetVideoRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;

    function syncPlayback() {
      if (inView && !document.hidden && !reducedMotion.matches) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(video);
    reducedMotion.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, []);

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
        assetBase="../editorial/"
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
              src="../editorial/about-hero.jpg"
              alt=""
            />
          </div>
          <div className="about-hero__content about-grid">
            <h1 id="about-title" data-about-reveal>
              <span>Меняемся.</span>
              <span>Остаёмся собой.</span>
            </h1>
            <div className="about-hero__inset" data-about-reveal>
              <video
                className="about-hero__video"
                ref={insetVideoRef}
                src="../editorial/about-hero-inset.mp4"
                poster="../editorial/about-hero-inset.jpg"
                preload="none"
                muted
                loop
                playsInline
                aria-hidden="true"
              />
              <p>
                Пространство эстетики, внимания к деталям и индивидуального
                подхода.
              </p>
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
            О клинике
          </p>
          <div className="about-intro__copy">
            <h2 data-about-reveal>
              EK Clinic — место, где красота начинается с внимания к деталям. Мы
              ценим индивидуальность, естественные пропорции и осознанный подход
              к эстетике.
            </h2>
            <p data-about-reveal>
              Знакомство начинается с разговора. Расскажите, какие изменения вам
              близки, что хочется сохранить и какие вопросы важно обсудить.
              Решение о процедуре принимается после консультации специалиста.
            </p>
            <a className="about-page__link" href="#contact">
              Контакты клиники
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
              src={teamPortrait}
              alt="Портрет в интерьере"
              loading="lazy"
            />
          </div>
          <div className="about-team__detail">
            <img
              className="about-team__detail-image"
              src="../editorial/about-team__detail-image.jpg"
              alt=""
              loading="lazy"
            />
          </div>
          <h2 id="about-team-title" data-about-reveal>
            Знакомство с командой EK Clinic.
          </h2>
        </section>

        <section
          className="about-profile"
          aria-labelledby="about-profile-title"
        >
          <h2 className="visually-hidden" id="about-profile-title">
            Специалисты клиники
          </h2>
          {specialists.map(({ image, name, description }) => (
            <article className="about-profile__row about-grid" key={image}>
              <div className="about-profile__identity">
                <p className="about-profile__role">Врач-косметолог</p>
                <h3>{name}</h3>
              </div>
              <img
                className="about-profile__portrait"
                src={`../editorial/${image}`}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <p className="about-profile__copy">
                {description || "Здесь появится описание специалиста."}
              </p>
            </article>
          ))}
        </section>

        <section
          className="about-consultation about-grid"
          aria-labelledby="about-consultation-title"
        >
          <div className="about-consultation__intro">
            <h2 id="about-consultation-title" data-about-reveal>
              Первая консультация
            </h2>
            <img
              className="about-consultation__image"
              src="../editorial/about-hero.jpg"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="about-consultation__body" data-about-reveal>
            <ol className="about-consultation__steps" role="list">
              <li className="about-consultation__step">
                <h3>Расскажите о пожеланиях</h3>
                <p>
                  Поделитесь тем, что хочется изменить, какие черты важно
                  сохранить и какие вопросы вас волнуют.
                </p>
              </li>
              <li className="about-consultation__step">
                <h3>Обсудите варианты с врачом</h3>
                <p>
                  Спросите, какие варианты подходят в вашем случае, чего от них
                  ожидать и какие риски стоит учитывать.
                </p>
              </li>
              <li className="about-consultation__step">
                <h3>Решите, как двигаться дальше</h3>
                <p>
                  Уточните, как подготовиться к выбранной процедуре и чего
                  ожидать в период восстановления.
                </p>
              </li>
            </ol>
            <a className="about-consultation__link" href="#contact">
              Контакты клиники
            </a>
          </div>
        </section>
        <Contact servicesHref="../services/" approachHref="#about-intro" />
      </main>
      <Footer assetBase="../editorial/" homeHref="../" />
    </>
  );
}

createRoot(document.getElementById("root")).render(<AboutPage />);
