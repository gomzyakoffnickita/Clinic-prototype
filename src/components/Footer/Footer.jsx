import React from "react";
import { CLINIC } from "../../data/clinic.js";
import "./Footer.css";

export function Footer({ homeHref = "#top" }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__scene">
        <img className="site-footer__image" src={CLINIC.footerImage} alt="" loading="lazy" decoding="async" />
        <a className="site-footer__wordmark" href={homeHref} aria-label={`${CLINIC.name}, на главную`}>
          <img src={CLINIC.logo} alt="" loading="lazy" decoding="async" />
        </a>
      </div>
    </footer>
  );
}
