const base = import.meta.env?.BASE_URL ?? "/";
const assets = `${base}meilleur/`;
const city = "Брянск";
const streetAddress = "Бежицкая, 1, корпус 10";

export const MEDIA = {
  hero: `${assets}hero.jpg`,
  team: `${assets}portrait.jpg`,
  teamPortrait: `${assets}team-portrait.jpg`,
  teamFeature: `${assets}team-feature.jpg`,
  care: `${assets}clinic.jpg`,
  space: `${assets}space.jpg`,
  room: `${assets}room.jpg`,
  detail: `${assets}detail.jpg`,
  entrance: `${assets}entrance.jpg`,
  consultation: `${assets}consultation.jpg`,
  teamDirectory: `${assets}team/`,
  services: `${assets}services/`,
};

export const CLINIC = {
  name: "Мелюр",
  tagline: "Клиника косметологии",
  logo: `${assets}logo.svg`,
  favicon: "meilleur/favicon.png",
  footerVideo: `${base}editorial/footer.mp4`,
  website: "https://meilleur-cosmetology.ru",

  city,
  streetAddress,
  address: `${city}, ул. ${streetAddress}`,
  phone: "+7 (905) 104-54-44",
  email: "info@meilleur-cosmetology.ru",
  socials: [],
  externalLinks: [
    { label: "+7 (4832) 60-61-01", href: "tel:+74832606101" },
    { label: "Как добраться", href: "https://meilleur-cosmetology.ru/kontakty" },
  ],

  openingHours: [{ days: ["Пн–Вс"], hours: "10:00–20:00" }],
  hoursLabel: "Часы работы",

  bookingStatus: "Онлайн-запись пока недоступна",
  bookingUrl: "https://n476245.yclients.com/",
  bookingLabel: "Записаться онлайн",
  demoNote: "Демонстрационная концепция сайта",

  contact: {
    title: "Как нас найти",
    consultationLabel: "Запись в клинику",
    linksTitle: "О клинике и процедурах",
  },
};
