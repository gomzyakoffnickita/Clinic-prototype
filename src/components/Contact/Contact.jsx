import React from "react";
import { CLINIC } from "../../data/clinic.js";
import { links } from "../../data/navigation.js";
import "./Contact.css";

const servicesLink = links.find(({ href }) => href === "#services");
const aboutLink = links.find(({ href }) => href === "#approach");

export function Contact({ servicesHref = "#services", approachHref = "#approach" }) {
  const { address, phone, email, socials, externalLinks, contact } = CLINIC;
  const contactLinks = [
    ...(phone ? [{ label: phone, href: `tel:${phone.replace(/[^+\d]/g, "")}` }] : []),
    ...(email ? [{ label: email, href: `mailto:${email}` }] : []),
    ...socials,
    ...externalLinks,
  ];

  return (
    <section
      id="contact"
      className="contact"
      tabIndex={-1}
      aria-labelledby="contact-title"
    >
      <h2 className="contact__title" id="contact-title">
        {contact.title}
      </h2>

      <div className="contact__body">
        <div className="contact__details">
          <div className="contact__row">
            <div>
              <span>{contact.consultationLabel}</span>
              {CLINIC.bookingUrl ? (
                <span className="contact__links">
                  <a href={CLINIC.bookingUrl}>{CLINIC.bookingLabel}</a>
                </span>
              ) : (
                <span>{CLINIC.bookingStatus}</span>
              )}
            </div>
          </div>
          {(address || contactLinks.length > 0) && (
            <div className="contact__row">
              <div>
                {address && <span>{address}</span>}
                <span className="contact__links">
                  {contactLinks.map(({ href, label }) => <a key={href} href={href}>{label}</a>)}
                </span>
              </div>
            </div>
          )}
          <div className="contact__row">
            <div>
              <span>{contact.linksTitle}</span>
              <span className="contact__links">
                <a href={servicesHref}>{servicesLink.label}</a>
                <span aria-hidden="true">/</span>
                <a href={approachHref}>{aboutLink.label}</a>
              </span>
            </div>
          </div>
        </div>
        <table className="contact__hours">
          <caption>{CLINIC.hoursLabel}</caption>
          <tbody>
            {CLINIC.openingHours.flatMap(({ days, hours }) => days.map((day) => (
              <tr key={day}>
                <th scope="row">{day}</th>
                <td>{hours}</td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>

      <div className="contact__bottom">
        <p>{CLINIC.demoNote} · <a href={CLINIC.website}>Официальный сайт клиники «{CLINIC.name}»</a></p>
      </div>
    </section>
  );
}
