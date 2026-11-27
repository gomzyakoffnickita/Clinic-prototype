const base = import.meta.env?.BASE_URL ?? "/";

export const CLINIC = {
  name: "EK Clinic",
  tagline: "Эстетическая косметология",
  logo: `${base}ek-clinic-wordmark.svg`,
  favicon: "favicon.svg",
  footerVideo: `${base}editorial/footer.mp4`,

  address: "",
  phone: "",
  email: "",
  socials: [],
  externalLinks: [],

  openingHours: [
    { days: ["Пн", "Вт", "Ср", "Чт", "Пт"], hours: "10:00–20:00" },
    { days: ["Сб", "Вс"], hours: "Выходной" },
  ],
  hoursLabel: "Часы работы",

  bookingStatus: "Онлайн-запись пока недоступна",
  bookingUrl: "",
  bookingLabel: "Записаться на консультацию",
  copyrightYear: 2026,
  demoNote: "Демонстрационная концепция сайта",

  contact: {
    title: "Эстетика, неподвластная времени.",
    consultationLabel: "Консультация",
    linksTitle: "Узнайте больше о нашем подходе",
  },
};
