import { CLINIC } from "./clinic";

export const links = [
  {
    href: "#services",
    label: "Услуги",
    preview: "lips",
  },
  {
    href: "#approach",
    label: "О клинике",
    preview: "portrait",
  },
  {
    href: "#contact",
    label: "Контакты",
    preview: "materials",
  },
];

export const defaultPreview = "consultation";

export const previewTexts = {
  consultation: `Добро пожаловать в ${CLINIC.name} — пространство эстетики и заботы о вашей красоте. Здесь естественность встречается с современным подходом к косметологии.`,

  lips: "Подчеркнуть природную красоту, сохранив индивидуальность. Познакомьтесь с нашими процедурами, направленными на гармонию и эстетику лица.",

  portrait: `${CLINIC.name} — место, где красота начинается с внимания к деталям. Мы ценим индивидуальность, естественные пропорции и осознанный подход к эстетике.`,

  materials: `Первый шаг к знакомству с ${CLINIC.name} — консультация специалиста. Свяжитесь с нами удобным способом, чтобы обсудить ваши пожелания и возможности коррекции.`,
};

export const menuLinks = [
  {
    href: "#top",
    label: "Главная",
    preview: defaultPreview,
  },
  ...links,
];
