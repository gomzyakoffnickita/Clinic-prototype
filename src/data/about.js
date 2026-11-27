import { CLINIC } from "./clinic.js";

const assets = `${import.meta.env.BASE_URL}editorial/`;
const heroImage = `${assets}about-hero.jpg`;

export const ABOUT = {
  hero: {
    title: ["Меняемся.", "Остаёмся собой."],
    image: heroImage,
    position: "48% center",
    video: `${assets}about-hero-inset.mp4`,
    poster: `${assets}about-hero-inset.jpg`,
    videoPosition: "center 70%",
    description: "Пространство эстетики, внимания к деталям и индивидуального подхода.",
  },
  intro: {
    eyebrow: "О клинике",
    title: `${CLINIC.name} — место, где красота начинается с внимания к деталям. Мы ценим индивидуальность, естественные пропорции и осознанный подход к эстетике.`,
    description: "Знакомство начинается с разговора. Расскажите, какие изменения вам близки, что хочется сохранить и какие вопросы важно обсудить. Решение о процедуре принимается после консультации специалиста.",
  },
  team: {
    title: `Знакомство с командой ${CLINIC.name}.`,
    portrait: `${assets}about_team-1.jpg`,
    portraitAlt: "Портрет в интерьере",
    portraitPosition: "center 40%",
    detail: `${assets}about-team__detail-image.jpg`,
    detailPosition: "center",
  },
  specialists: {
    title: "Специалисты клиники",
    role: "Врач-косметолог",
    placeholder: "Здесь появится описание специалиста.",
    position: "center 35%",
    items: [
      { image: `${assets}about_team-2.jpg`, name: "Кристина Евгеньевна", description: "" },
      { image: `${assets}about_team-3.jpg`, name: "Ксения Витальевна", description: "" },
      { image: `${assets}about_team-4.jpg`, name: "Елена Олеговна", description: "" },
      { image: `${assets}about_team-5.jpg`, name: "Светлана Анатольевна", description: "" },
    ],
  },
  consultation: {
    title: "Первая консультация",
    image: heroImage,
    position: "76% center",
    steps: [
      {
        title: "Расскажите о пожеланиях",
        description: "Поделитесь тем, что хочется изменить, какие черты важно сохранить и какие вопросы вас волнуют.",
      },
      {
        title: "Обсудите варианты с врачом",
        description: "Спросите, какие варианты подходят в вашем случае, чего от них ожидать и какие риски стоит учитывать.",
      },
      {
        title: "Решите, как двигаться дальше",
        description: "Уточните, как подготовиться к выбранной процедуре и чего ожидать в период восстановления.",
      },
    ],
  },
  contact: { href: "#contact", label: "Контакты клиники" },
};
