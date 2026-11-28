import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { HOME } from '../../data/home.js';
import './WhyChooseUs.css';

const { title, previous, next: nextLabel, reasons } = HOME.whyChooseUs;

const secondsPerReason = 5;

function ReasonMedia({ video, poster, active }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;

    function syncVideo() {
      if (visible && !reducedMotion.matches && !document.hidden) {
        element.play().catch(() => {});
      } else {
        element.pause();
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.35;
      syncVideo();
    }, { threshold: 0.35 });

    observer.observe(element);
    reducedMotion.addEventListener('change', syncVideo);
    document.addEventListener('visibilitychange', syncVideo);

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener('change', syncVideo);
      document.removeEventListener('visibilitychange', syncVideo);
      element.pause();
    };
  }, [active, video]);

  if (!active || !video) return <img src={poster} alt="" loading="lazy" />;

  return (
    <video
      key={video}
      ref={videoRef}
      src={video}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    />
  );
}

export function WhyChooseUs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [announcement, setAnnouncement] = useState('');
  const sectionRef = useRef(null);
  const fillRef = useRef(null);
  const cycleRef = useRef(null);
  const selectedRef = useRef(0);
  const motionState = useRef({ visible: false, covered: false, focused: false, hovered: false });
  const activeReason = reasons[activeIndex];

  function syncPlayback() {
    const { visible, covered, focused, hovered } = motionState.current;
    cycleRef.current?.paused(!visible || covered || focused || hovered || document.hidden);
  }

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const next = section.nextElementSibling;
    const motion = gsap.matchMedia();

    motion.add('(prefers-reduced-motion: no-preference)', () => {
      const state = motionState.current;
      const cycle = gsap.fromTo(fillRef.current, { scaleX: 0 }, {
        scaleX: 1,
        duration: reasons.length * secondsPerReason,
        ease: 'none',
        repeat: -1,
        paused: true,
        onUpdate() {
          const index = Math.min(reasons.length - 1, Math.floor(this.progress() * reasons.length));
          if (selectedRef.current === index) return;
          selectedRef.current = index;
          setActiveIndex(index);
        },
      });
      cycleRef.current = cycle;
      cycle.progress(selectedRef.current / reasons.length, true);

      const visibility = new IntersectionObserver(([entry]) => {
        state.visible = entry.isIntersecting && entry.intersectionRatio >= 0.35;
        syncPlayback();
      }, { threshold: 0.35 });
      visibility.observe(section);

      const overlap = new IntersectionObserver(([entry]) => {
        state.covered = entry.isIntersecting;
        syncPlayback();
      }, { rootMargin: '0px 0px -12px 0px' });
      overlap.observe(next);

      let focusCoverage;

      function observeCoveredControls() {
        focusCoverage?.disconnect();
        const contentHeight = section.firstElementChild.offsetHeight;
        const hiddenMargin = Math.max(0, Math.round((window.innerHeight - contentHeight) / 2));

        focusCoverage = new IntersectionObserver(([entry]) => {
          const obscured = entry.isIntersecting && getComputedStyle(section).position === 'sticky';
          if (obscured && section.contains(document.activeElement)) {
            next.querySelector('a')?.focus({ preventScroll: true });
          }
          section.inert = obscured;
        }, { rootMargin: `0px 0px -${hiddenMargin}px 0px` });
        focusCoverage.observe(next);
      }

      observeCoveredControls();
      const resize = new ResizeObserver(observeCoveredControls);
      resize.observe(section.firstElementChild);
      window.addEventListener('resize', observeCoveredControls);

      document.addEventListener('visibilitychange', syncPlayback);

      return () => {
        visibility.disconnect();
        overlap.disconnect();
        focusCoverage.disconnect();
        resize.disconnect();
        window.removeEventListener('resize', observeCoveredControls);
        document.removeEventListener('visibilitychange', syncPlayback);
        section.inert = false;
        state.covered = false;
        cycleRef.current = null;
      };
    }, section);

    return () => motion.revert();
  }, []);

  function select(index) {
    selectedRef.current = index;
    setActiveIndex(index);
    cycleRef.current?.progress(index / reasons.length, true);
  }

  function move(offset) {
    const index = (selectedRef.current + reasons.length + offset) % reasons.length;
    select(index);
    setAnnouncement(`${index + 1} из ${reasons.length}. ${reasons[index].title}`);
  }

  function selectWithKeyboard(event, index) {
    const targets = {
      ArrowRight: (index + 1) % reasons.length,
      ArrowLeft: (index - 1 + reasons.length) % reasons.length,
      Home: 0,
      End: reasons.length - 1,
    };
    const target = targets[event.key];
    if (!Number.isInteger(target)) return;

    event.preventDefault();
    select(target);
    event.currentTarget.parentElement.children[target].focus();
  }

  function setInteracting(reason, value) {
    motionState.current[reason] = value;
    syncPlayback();
  }

  return (
    <section
      className="why-choose-us"
      ref={sectionRef}
      aria-labelledby="why-choose-us-title"
      onFocus={(event) => setInteracting('focused', event.target.matches(':focus-visible'))}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setInteracting('focused', false);
      }}
    >
      <div className="why-choose-us__inner">
        <div className="why-choose-us__header">
          <span className="why-choose-us__counter" aria-hidden="true">{activeIndex + 1} / {reasons.length}</span>
          <h2 className="why-choose-us__title" id="why-choose-us-title">{title}</h2>
        </div>

        <div className="why-choose-us__progress" aria-hidden="true">
          <span ref={fillRef} style={{ '--reason-progress': (activeIndex + 1) / reasons.length }} />
        </div>

        <div className="why-choose-us__desktop">
          <div
            className="why-choose-us__tabs"
            role="tablist"
            aria-labelledby="why-choose-us-title"
            onPointerLeave={() => setInteracting('hovered', false)}
          >
            {reasons.map(({ id, title, video, poster }, index) => (
              <button
                className="why-choose-us__tab"
                type="button"
                role="tab"
                key={id}
                id={`why-tab-${id}`}
                aria-selected={index === activeIndex}
                aria-controls={`why-panel-${id}`}
                tabIndex={index === activeIndex ? 0 : -1}
                onPointerEnter={(event) => {
                  if (event.pointerType !== 'mouse') return;
                  setInteracting('hovered', true);
                  select(index);
                }}
                onClick={() => select(index)}
                onKeyDown={(event) => selectWithKeyboard(event, index)}
              >
                <span className="why-choose-us__frame">
                  <ReasonMedia video={video} poster={poster} active={index === activeIndex} />
                </span>
                <span className="why-choose-us__label">{title}</span>
              </button>
            ))}
          </div>

          <div className="why-choose-us__details">
            {reasons.map(({ id, description }, index) => (
              <div
                className="why-choose-us__panel"
                key={id}
                id={`why-panel-${id}`}
                role="tabpanel"
                aria-labelledby={`why-tab-${id}`}
                aria-hidden={index !== activeIndex}
                tabIndex={index === activeIndex ? 0 : -1}
                style={{ '--reason-column': index + 1 }}
              >
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="why-choose-us__mobile">
          <div className="why-choose-us__frame">
            <ReasonMedia video={activeReason.video} poster={activeReason.poster} active />
          </div>
          <h3 className="why-choose-us__label">{activeReason.title}</h3>
          <div className="why-choose-us__mobile-copy">
            {reasons.map(({ id, description }, index) => (
              <p key={id} aria-hidden={index !== activeIndex}>{description}</p>
            ))}
          </div>
          <span className="visually-hidden" role="status">{announcement}</span>
          <div className="why-choose-us__controls">
            <button type="button" onClick={() => move(-1)}>{previous}</button>
            <button type="button" onClick={() => move(1)}>{nextLabel}</button>
          </div>
        </div>
      </div>
    </section>
  );
}
