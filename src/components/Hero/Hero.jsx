import React, { useLayoutEffect, useRef } from "react";
import { CLINIC } from "../../data/clinic.js";
import { HOME } from "../../data/home.js";
import { Header } from "../Header/Header.jsx";
import "./Hero.css";

export function Hero({ onMenu, onExitChange }) {
  const heroRef = useRef(null);
  const { title, image, width, height, description, servicesLabel } = HOME.hero;

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const updateHeader = () => onExitChange(hero.getBoundingClientRect().bottom <= 52);
    const observer = new IntersectionObserver(updateHeader, {
      rootMargin: "-52px 0px 0px",
    });
    observer.observe(hero);
    updateHeader();

    return () => observer.disconnect();
  }, [onExitChange]);

  return (
    <section className="hero" ref={heroRef} aria-labelledby="hero-title">
      <div className="hero__header">
        <Header transparent onMenu={onMenu} servicesHref="services/" approachHref="about/" />
      </div>
      <img className="hero__image" src={image} width={width} height={height} alt="" fetchPriority="high" />
      <div className="hero__copy">
        <p className="hero__location">{CLINIC.city} · {CLINIC.streetAddress}</p>
        <h1 id="hero-title">{title}</h1>
        <p className="hero__description">{description}</p>
        <a className="hero__action" href="services/#catalog">{servicesLabel}</a>
      </div>
    </section>
  );
}
