import { CLINIC, MEDIA } from "./clinic.js";

export const HOME = {
  hero: {
    title: `Клиника косметологии «${CLINIC.name}»`,
    image: MEDIA.hero,
    width: 1920,
    height: 1080,
    description: "Врачебная косметология и профессиональный уход за кожей.",
    servicesLabel: "Смотреть услуги",
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
        image: MEDIA.team,
        position: "center 37%",
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
        poster: MEDIA.consultation,
        description: "На первой встрече косметолог уточняет ваши пожелания и обсуждает подходящие варианты ухода.",
      },
      {
        id: "methods",
        title: "Выбор процедур",
        poster: MEDIA.care,
        description: "В клинике представлены уходовые, аппаратные, лазерные и инъекционные процедуры.",
      },
      {
        id: "space",
        title: "Пространство клиники",
        poster: MEDIA.room,
        description: "Косметологические процедуры и консультации проходят в оборудованных кабинетах «Мелюр».",
      },
      {
        id: "location",
        title: "В центре Брянска",
        poster: MEDIA.entrance,
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
