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
import "./services.css";

gsap.registerPlugin(ScrollTrigger);

const assets = "../editorial/";
const groups = [
  {
    id: "lips",
    number: "01",
    title: "Увеличение и коррекция губ",
    image: "services-page__media-1.jpg",
    description:
      "Инъекционные филлеры применяют для изменения объёма и контура губ. Врач оценивает анатомию, обсуждает желаемые изменения, ограничения и риски. Результат временный; выбор метода и препарата требует очной консультации.",
    topics: ["Форма губ", "Объём", "Пропорции"],
  },
  {
    id: "expression",
    number: "02",
    title: "Коррекция носогубных складок",
    image: "services-page__media-2.jpg",
    description:
      "Носогубные складки проходят от крыльев носа к уголкам рта. Для смягчения их выраженности могут применяться филлеры. Подход выбирают после оценки тканей и пропорций лица; ожидаемый эффект и возможные осложнения обсуждаются с врачом.",
    topics: ["Выраженность складок", "Пропорции лица", "Консультация"],
  },
  {
    id: "skin",
    number: "03",
    title: "Full Face",
    image: "services-page__media-3.jpg",
    description:
      "Комплексное рассмотрение лица с учётом взаимосвязи его зон и пропорций. Full Face не обозначает одну стандартную процедуру: состав плана, необходимость отдельных вмешательств и их последовательность обсуждаются индивидуально. Конкретный протокол EK Clinic уточняется на консультации.",
    topics: [
      "Пропорции лица",
      "Индивидуальный план",
      "Последовательность процедур",
    ],
  },
  {
    id: "vector-lift",
    number: "04",
    title: "Векторный лифтинг",
    image: "services-page__media-4.jpg",
    description:
      "Инъекционная методика коррекции контуров лица: препарат вводят по выбранным направлениям — векторам, учитывая анатомию и состояние тканей. Такой подход применяют при снижении чёткости овала и возрастных изменениях. Методика, выбор препарата, ожидаемый эффект и ограничения обсуждаются с врачом на консультации.",
    topics: ["Оценка тканей", "Выбор методики", "Обсуждение ограничений"],
  },
  {
    id: "botulinum",
    number: "05",
    title: "Ботулинотерапия",
    image: "services-page__media-5.jpg",
    description:
      "Инъекции ботулинического токсина временно уменьшают активность отдельных мышц и выраженность связанных с их сокращением морщин. Зоны коррекции и возможность процедуры определяет врач. Эффект развивается постепенно и ограничен по времени; противопоказания и риски обсуждаются на консультации.",
    topics: ["Мимические морщины", "Оценка мимики", "Индивидуальный план"],
  },
];

function ServicesPage() {
  const dialogRef = useRef(null);
  const catalogRef = useRef(null);
  const heroRef = useRef(null);
  const [pastHero, setPastHero] = useState(false);
  const [activeId, setActiveId] = useState(groups[0].id);

  useLayoutEffect(() => {
    const headerTrigger = ScrollTrigger.create({
      trigger: heroRef.current,
      start: "bottom top+=48",
      end: "max",
      onToggle: ({ isActive }) => setPastHero(isActive),
      onRefresh: (self) => setPastHero(self.scroll() >= self.start),
    });
    const sections = catalogRef.current.querySelectorAll(
      ".services-page__group",
    );
    const sectionTriggers = [...sections].map((section) =>
      ScrollTrigger.create({
        trigger: section,
        start: "top 45%",
        end: "bottom 45%",
        onEnter: () => setActiveId(section.id),
        onEnterBack: () => setActiveId(section.id),
      }),
    );

    const motion = gsap.matchMedia();
    motion.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        sections.forEach((section) => {
          if (!section.querySelector("img")) return;
          gsap.fromTo(
            section.querySelector("img"),
            { yPercent: -50 },
            {
              yPercent: 50,
              ease: "none",
              scrollTrigger: {
                trigger: section.querySelector(".services-page__media"),
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });
      },
    );
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
      gsap.utils.toArray(".services-page__reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          },
        );
      });
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
        assetBase={assets}
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
          <video
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
          <div className="services-page__hero-copy">
            <p className="services-page__eyebrow">EK Clinic / Услуги</p>
            <h1 id="services-title">
              <span>Эстетика начинается</span>
              <span>с понимания деталей.</span>
            </h1>
          </div>
          <div className="services-page__hero-description">
            <p>
              План начинается с разговора о том, что важно именно вам. На
              консультации можно обсудить пожелания и познакомиться с подходом
              клиники.
            </p>
            <a
              href="#catalog"
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
                window.history.pushState(null, "", "#catalog");
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
              Смотреть направления
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
          <div className="services-page__catalog-head services-page__reveal">
            <p className="services-page__eyebrow">Направления EK Clinic</p>
            <h2 id="catalog-title">Выберите тему для консультации.</h2>
          </div>
          <div className="services-page__catalog-grid">
            <nav
              className="services-page__index"
              aria-label="Направления услуг"
            >
              {groups.map((group) => (
                <div
                  className={`services-page__index-item${activeId === group.id ? " services-page__index-item--active" : ""}`}
                  key={group.id}
                >
                  <a
                    href={`#${group.id}`}
                    onClick={focusGroup}
                    aria-current={
                      activeId === group.id ? "location" : undefined
                    }
                  >
                    <span>({Number(group.number)}).</span>
                    <span>{group.title}</span>
                  </a>
                  <div
                    className="services-page__index-reveal"
                    aria-hidden={activeId !== group.id}
                  >
                    <div className="services-page__index-copy">
                      <p>{group.description}</p>
                      <ul>
                        {group.topics.map((topic) => (
                          <li key={topic}>{topic}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
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
                  <div className="services-page__media">
                    {group.image && (
                      <img
                        src={`${assets}${group.image}`}
                        alt="Иллюстративный кадр направления"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="services-page__group-copy services-page__reveal">
                    <span className="services-page__eyebrow">
                      {group.number} / {String(groups.length).padStart(2, "0")}
                      {group.image ? " · Иллюстративное изображение" : ""}
                    </span>
                    <h3 id={`${group.id}-title`} tabIndex={-1}>
                      {group.title}
                    </h3>
                    <p>{group.description}</p>
                    <ul>
                      {group.topics.map((topic) => (
                        <li key={topic}>{topic}</li>
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
          aria-label="Подготовка и забота после процедуры"
        >
          <div className="services-scene__background">
            <img
              className="services-scene__image"
              src={`${assets}services-care.jpg`}
              alt=""
              loading="lazy"
            />
          </div>
          <div className="services-scene__content">
            <p className="services-scene__text">
              Забота начинается ещё до процедуры и продолжается после неё. На
              консультации мы обсуждаем ваши пожелания, подготовку и вопросы
              восстановления. Индивидуальные рекомендации помогают пройти каждый
              этап осознанно и с вниманием к себе.
            </p>
          </div>
        </section>

        <section
          className="services-journey"
          id="your-journey"
          aria-labelledby="services-journey-title"
        >
          <div className="services-journey__heading">
            <h2 id="services-journey-title">Ваш путь к себе</h2>
            <p>Эстетика с вниманием к индивидуальности.</p>
          </div>
          <div className="services-journey__layer">
            <div className="services-journey__images">
              <img
                src={`${assets}services-journey__images-1.jpg`}
                alt="Иллюстративный крупный план лица модели"
                loading="lazy"
              />
              <img
                src={`${assets}lips.jpg`}
                alt="Иллюстративный крупный план губ"
                loading="lazy"
              />
            </div>
          </div>
          <div className="services-journey__labels">
            <span>Естественность</span>
            <span>Гармония</span>
            <span>Забота</span>
          </div>
        </section>

        <Contact servicesHref="#catalog" approachHref="../about/" />
      </main>
      <Footer assetBase={assets} homeHref="../" />
    </>
  );
}

createRoot(document.getElementById("root")).render(<ServicesPage />);
