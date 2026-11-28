import { CLINIC, MEDIA } from "./clinic.js";

export const links = [
  { href: "#services", label: "Услуги", preview: "care" },
  { href: "#approach", label: "О клинике", preview: "team" },
  { href: "#contact", label: "Контакты", preview: "entrance" },
];

export const defaultPreview = "consultation";

export const previewImages = {
  consultation: MEDIA.consultation,
  care: MEDIA.care,
  team: MEDIA.team,
  entrance: MEDIA.entrance,
};

export const previewTexts = {
  consultation: `Клиника косметологии «${CLINIC.name}» в Брянске.`,
  care: "Уход за кожей, аппаратные, лазерные и инъекционные процедуры.",
  team: "Познакомьтесь с клиникой и её специалистами.",
  entrance: `${CLINIC.address}. Работаем ежедневно с 10:00 до 20:00.`,
};

export const menuLinks = [
  { href: "#top", label: "Главная", preview: defaultPreview },
  ...links,
];
