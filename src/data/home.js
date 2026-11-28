import { CLINIC, MEDIA } from "./clinic.js";

const heroAssets = `${import.meta.env.BASE_URL}hero/`;
const editorialAssets = `${import.meta.env.BASE_URL}editorial/`;

export const HOME = {
  hero: {
    ariaLabel: `Визуальное вступление ${CLINIC.name}`,

    video: {
      src: `${heroAssets}hero-1.mp4`,
      poster: `${heroAssets}hero-1-still.jpg`,
      position: "center 45%",
      mobilePosition: "32% center",
    },

    portrait: {
      position: "center 58%",
      desktop: {
        src: `${heroAssets}portrait-f.jpg`,
        width: 2048,
        height: 2731,
      },

      mobile: {
        src: `${heroAssets}portrait-f-mobile.jpg`,
        width: 1152,
        height: 1536,
      },
    },
  },

  intro: {
    title: "Красота начинается с внимания к себе",
    description: "В «Мелюр» можно проконсультироваться с косметологом, подобрать домашний уход и обсудить аппаратные и инъекционные процедуры.",
    image: MEDIA.care,
    contact: { href: "#contact", label: "Контакты клиники" },
  },

  featureLinks: {
    ariaLabel: "Услуги и команда клиники",
    items: [
      {
        href: "services/#catalog",
        title: "Услуги клиники",
        image: MEDIA.care,
        position: "center 55%",
      },
      {
        href: "about/#specialists",
        title: "Команда «Мелюр»",
        image: MEDIA.teamFeature,
        position: "center 30%",
      },
    ],
  },

  whyChooseUs: {
    title: "Подход «Мелюр»",
    previous: "Предыдущий",
    next: "Следующий",
    reasons: [
      {
        id: "attention",
        title: "Индивидуальный подход",
        video: `${editorialAssets}WhyChooseUs-1.mp4`,
        poster: `${editorialAssets}WhyChooseUs-1-poster.jpg`,
        description: "На первой встрече косметолог уточняет ваши пожелания и обсуждает подходящие варианты ухода.",
      },
      {
        id: "methods",
        title: "Выбор процедур",
        video: `${editorialAssets}WhyChooseUs-2.mp4`,
        poster: `${editorialAssets}WhyChooseUs-2-poster.jpg`,
        description: "В клинике представлены уходовые, аппаратные, лазерные и инъекционные процедуры.",
      },
      {
        id: "space",
        title: "Пространство клиники",
        video: `${editorialAssets}WhyChooseUs-3.mp4`,
        poster: `${editorialAssets}WhyChooseUs-3-poster.jpg`,
        description: "Косметологические процедуры и консультации проходят в оборудованных кабинетах «Мелюр».",
      },
      {
        id: "location",
        title: "В центре Брянска",
        video: `${editorialAssets}WhyChooseUs-4.mp4`,
        poster: `${editorialAssets}WhyChooseUs-4-poster.jpg`,
        description: "Клиника открыта ежедневно с 10:00 до 20:00 по адресу Бежицкая, 1, корпус 10.",
      },
    ],
  },

  method: {
    eyebrow: "Первая встреча",
    title: "На консультации косметолог поможет подобрать уход и ответит на вопросы о процедурах.",
    portrait: { poster: MEDIA.consultation, position: "center 33%" },
    detail: {
      poster: MEDIA.room,
      description: "Расскажите о своём уходе и о том, что вас беспокоит. Вы сможете обсудить показания, ограничения и дальнейшие шаги.",
    },
  },
};
