import React, { useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { PageTransition } from "./components/PageTransition.jsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./editorial.css";
import { Header, SiteMenu } from "./components/Header/Header.jsx";
import { Hero } from "./components/Hero/Hero.jsx";
import {
  FeatureLinks,
  HomeIntro,
} from "./components/HomeEditorial/HomeEditorial.jsx";
import { Method } from "./components/HomeStory/HomeStory.jsx";
import { Footer } from "./components/Footer/Footer.jsx";
import { WhyChooseUs } from "./components/WhyChooseUs/WhyChooseUs.jsx";
import { Contact } from "./components/Contact/Contact.jsx";
import "./fonts.css";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const dialogRef = useRef(null);
  const mainRef = useRef(null);
  const [pastHero, setPastHero] = useState(false);

  useLayoutEffect(() => {
    const motion = gsap.matchMedia();

    motion.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const headings = mainRef.current.querySelectorAll("h2:not(#intro-title)");

        headings.forEach((heading) => {
          gsap.fromTo(
            heading,
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              ease: "power2.out",
              scrollTrigger: {
                trigger: heading,
                start: "top 90%",
                once: true,
              },
            },
          );
        });
      },
      mainRef.current,
    );

    return () => motion.revert();
  }, []);

  useLayoutEffect(() => {
    const targetId = window.location.hash.slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    // При прямом входе браузер может обработать якорь до монтирования React.
    const frame = requestAnimationFrame(() =>
      target.scrollIntoView({ behavior: "instant" }),
    );

    return () => cancelAnimationFrame(frame);
  }, []);

  function openMenu() {
    dialogRef.current.showModal();
  }

  return (
    <>
      <PageTransition />
      <a className="skip-link" href="#introduction">
        Перейти к содержанию
      </a>
      <Header
        hidden={!pastHero}
        onMenu={openMenu}
        servicesHref="services/"
        approachHref="about/"
      />
      <SiteMenu
        dialogRef={dialogRef}
        servicesHref="services/"
        approachHref="about/"
      />
      <main id="top" tabIndex={-1} ref={mainRef}>
        <Hero onMenu={openMenu} onExitChange={setPastHero} />
        <HomeIntro />
        <div id="why-choose-us" className="service-sequence" tabIndex={-1}>
          <WhyChooseUs />
          <FeatureLinks />
        </div>
        <Method />
        <Contact servicesHref="services/" approachHref="about/" />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
