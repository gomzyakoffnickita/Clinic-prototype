import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from '../Header/Header.jsx';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const assetBase = `${import.meta.env.BASE_URL}hero/`;
const reducedMotion = '(prefers-reduced-motion: reduce)';
const mobileMedia = '(max-width: 767px)';

export function Hero({ onMenu, onExitChange }) {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const portraitRef = useRef(null);
  const [reduce, setReduce] = useState(() => window.matchMedia(reducedMotion).matches);
  const [mobile, setMobile] = useState(() => window.matchMedia(mobileMedia).matches);
  const [exited, setExited] = useState(false);
  const [portraitVisible, setPortraitVisible] = useState(false);

  useEffect(() => {
    const motionPreference = window.matchMedia(reducedMotion);
    const viewport = window.matchMedia(mobileMedia);
    const updateMotion = () => setReduce(motionPreference.matches);
    const updateViewport = () => setMobile(viewport.matches);
    motionPreference.addEventListener('change', updateMotion);
    viewport.addEventListener('change', updateViewport);

    return () => {
      motionPreference.removeEventListener('change', updateMotion);
      viewport.removeEventListener('change', updateViewport);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let visible = false;

    function syncPlayback() {
      if (visible && !reduce && !document.hidden) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.intersectionRatio >= 0.15;
      syncPlayback();
    }, { threshold: 0.15 });
    observer.observe(video.closest('.hero__frame'));
    document.addEventListener('visibilitychange', syncPlayback);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
      video.pause();
    };
  }, [reduce]);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const updateHeader = () => {
      const pastHero = hero.getBoundingClientRect().bottom <= 52;
      setExited(pastHero);
      onExitChange(pastHero);
    };
    const observer = new IntersectionObserver(updateHeader, { rootMargin: '-52px 0px 0px' });
    observer.observe(hero);
    updateHeader();

    const updateNavigation = ({ isActive }) => setPortraitVisible(isActive);
    const portraitTrigger = ScrollTrigger.create({
      trigger: portraitRef.current,
      start: 'top center',
      end: 'bottom top',
      onToggle: updateNavigation,
      onRefresh: updateNavigation,
    });

    const motion = gsap.matchMedia();
    motion.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      hero.querySelectorAll('.hero__asset').forEach((asset) => {
        gsap.fromTo(asset, { yPercent: -8 }, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: asset.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, hero);

    return () => {
      observer.disconnect();
      portraitTrigger.kill();
      motion.revert();
    };
  }, [onExitChange]);

  return (
    <section className="hero" ref={heroRef} aria-label="Визуальное вступление EK Clinic">
      <div className="hero__frame">
        <video
          ref={videoRef}
          className="hero__asset hero__asset--video"
          src={reduce ? undefined : `${assetBase}hero-1.mp4`}
          poster={`${assetBase}${mobile ? 'hero-1-still.jpg' : 'care-poster.jpg'}`}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        />
      </div>
      <div className="hero__frame" ref={portraitRef}>
        <picture>
          <source media={mobileMedia} srcSet={`${assetBase}portrait-f-mobile.jpg`} width="1152" height="1536" />
          <img
            className="hero__asset hero__asset--still"
            src={`${assetBase}portrait-f.jpg`}
            width="2048"
            height="2731"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>
      <div className="hero__navigation">
        <div className={`hero__navigation-row${portraitVisible ? ' hero__navigation-row--portrait' : ''}`} hidden={exited}>
          <Header hero onMenu={onMenu} servicesHref="services/" approachHref="about/" />
        </div>
      </div>
    </section>
  );
}
