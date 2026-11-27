import React, { useEffect, useRef, useState } from "react";
import { CLINIC } from "../../data/clinic";
import {
  links,
  defaultPreview,
  previewTexts,
  menuLinks,
} from "../../data/navigation";

import "./Header.css";

export function Header({
  hero = false,
  hidden = false,
  transparent = false,
  onMenu,
  homeHref = "#top",
  servicesHref = "#services",
  approachHref = "#approach",
  contactHref = "#contact",
}) {
  return (
    <header
      className={`site-header site-header--${hero ? "hero" : "compact"}${transparent ? " site-header--transparent" : ""}`}
      hidden={hidden}
    >
      <a
        className="site-header__logo"
        href={homeHref}
        aria-label={`${CLINIC.name}, на главную`}
        style={{
          "--clinic-logo": `url("${CLINIC.logo}")`,
        }}
      />
      {hero && <p className="site-header__tagline">{CLINIC.tagline}</p>}
      <nav className="site-header__nav" aria-label="Основная навигация">
        <button
          type="button"
          className="site-header__toggle"
          aria-haspopup="dialog"
          aria-controls="site-menu"
          onClick={onMenu}
        >
          Меню
        </button>
        {links
          .filter(
            ({ href }) =>
              (href !== "#services" || servicesHref !== null) &&
              (href !== "#approach" || approachHref !== null),
          )
          .map(({ href, label }) => (
            <a
              className="site-header__link"
              key={href}
              href={
                href === "#services"
                  ? servicesHref
                  : href === "#approach"
                    ? approachHref
                    : href === "#contact"
                      ? contactHref
                      : href
              }
            >
              {label}
            </a>
          ))}
      </nav>
    </header>
  );
}

export function SiteMenu({
  dialogRef,
  homeHref = "#top",
  servicesHref = "#services",
  approachHref = "#approach",
  contactHref = "#contact",
  assetBase = `${import.meta.env.BASE_URL}editorial/`,
}) {
  const [preview, setPreview] = useState(defaultPreview);
  const previousOverflow = useRef("");

  function unlockScroll() {
    document.documentElement.style.overflow = previousOverflow.current;
    setPreview(defaultPreview);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    const observer = new MutationObserver(() => {
      if (!dialog.open) return;
      previousOverflow.current = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
    });
    observer.observe(dialog, { attributes: true, attributeFilter: ["open"] });

    return () => {
      observer.disconnect();
      if (dialog.open)
        document.documentElement.style.overflow = previousOverflow.current;
    };
  }, [dialogRef]);

  function followLink(event) {
    const target =
      event.currentTarget.pathname === window.location.pathname
        ? document.getElementById(event.currentTarget.hash.slice(1))
        : null;
    dialogRef.current.close();
    unlockScroll();
    target?.focus({ preventScroll: true });
  }

  return (
    <dialog
      id="site-menu"
      className="site-menu"
      aria-label="Меню"
      ref={dialogRef}
      onClose={unlockScroll}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current.close();
      }}
    >
      <div className="site-menu__panel">
        <button
          className="site-menu__close"
          type="button"
          autoFocus
          onClick={() => dialogRef.current.close()}
        >
          Закрыть
        </button>
        <nav className="site-menu__links" aria-label="Разделы сайта">
          {menuLinks.map(({ href, label, preview: image }) => (
            <a
              key={href}
              href={
                href === "#top"
                  ? homeHref
                  : href === "#services"
                    ? servicesHref
                    : href === "#approach"
                      ? approachHref
                      : href === "#contact"
                        ? contactHref
                        : href
              }
              onClick={followLink}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setPreview(image);
              }}
              onFocus={(event) => {
                if (event.target.matches(":focus-visible")) setPreview(image);
              }}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="site-menu__preview">
          <img src={`${assetBase}${preview}.jpg`} alt="" loading="lazy" />
          <p>{previewTexts[preview]}</p>
        </div>
        <div className="site-menu__contact">
          <div className="site-menu__contact-row">
            <p>{CLINIC.bookingStatus}</p>

            <a href={contactHref} onClick={followLink}>
              Контакты клиники
            </a>
          </div>

          <div className="site-menu__contact-row">
            <p>Часы работы</p>

            <p>
              {CLINIC.openingHours.weekdays}
              <br />
              {CLINIC.openingHours.weekend}
            </p>
          </div>

          <p className="site-menu__note">
            © {CLINIC.copyrightYear} {CLINIC.name} · {CLINIC.demoNote}
          </p>
        </div>
      </div>
    </dialog>
  );
}
