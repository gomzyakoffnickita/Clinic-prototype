import React from "react";
import "./Contact.css";

const openingHours = [
  { day: "Пн", hours: "10:00–20:00" },
  { day: "Вт", hours: "10:00–20:00" },
  { day: "Ср", hours: "10:00–20:00" },
  { day: "Чт", hours: "10:00–20:00" },
  { day: "Пт", hours: "10:00–20:00" },
  { day: "Сб", hours: "Выходной" },
  { day: "Вс", hours: "Выходной" },
];

export function Contact({ servicesHref = "#services", approachHref = "#approach" }) {
  return (
    <section
      id="contact"
      className="contact"
      tabIndex={-1}
      aria-labelledby="contact-title"
    >
      <h2 className="contact__title" id="contact-title">
        Эстетика, неподвластная времени.
      </h2>

      <div className="contact__body">
        <div className="contact__details">
          <div className="contact__row">
            <div>
              <span>Консультация</span>
              <span>Онлайн-запись пока недоступна</span>
            </div>
          </div>
          <div className="contact__row">
            <div>
              <span>Узнайте больше о нашем подходе</span>
              <span className="contact__links">
                <a href={servicesHref}>Услуги</a>
                <span aria-hidden="true">/</span>
                <a href={approachHref}>О клинике</a>
              </span>
            </div>
          </div>
        </div>
        <table className="contact__hours">
          <caption>Часы работы</caption>
          <tbody>
            {openingHours.map(({ day, hours }) => (
              <tr key={day}>
                <th scope="row">{day}</th>
                <td>{hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="contact__bottom">
        <p>© 2026 EK Clinic · Демонстрационная концепция сайта</p>
      </div>
    </section>
  );
}
