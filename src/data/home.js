import { CLINIC } from "./clinic.js";

const assetBase = `${import.meta.env.BASE_URL}hero/`;
const editorialAssets = `${import.meta.env.BASE_URL}editorial/`;
const comparisonAssets = `${import.meta.env.BASE_URL}before-after/`;

export const HOME = {
  hero: {
    ariaLabel: `Визуальное вступление ${CLINIC.name}`,

    video: {
      src: `${assetBase}hero-1.mp4`,
      poster: `${assetBase}hero-1-still.jpg`,
      position: "center 45%",
      mobilePosition: "32% center",
    },

    portrait: {
      position: "center 58%",
      desktop: {
        src: `${assetBase}portrait-f.jpg`,
        width: 2048,
        height: 2731,
      },

      mobile: {
        src: `${assetBase}portrait-f-mobile.jpg`,
        width: 1152,
        height: 1536,
      },
    },
  },

  intro: {
    title: `В ${CLINIC.name.toUpperCase()} мы отдаем приоритет индивидуальному подходу. Посетите нашу клинику — здесь вас ждет опыт, который станет важным этапом на пути к желаемому преображению.`,

    description: `В центре подхода ${CLINIC.name} — внимание к пропорциям лица и к тому, как вы сами видите желаемые изменения. Знакомство начинается с разговора о ваших пожеланиях и вопросах.`,

    image: `${editorialAssets}hero-new.jpg`,

    contact: {
      href: "#contact",
      label: "Контакты",
    },
  },

  featureLinks: {
    ariaLabel: "Услуги и направления",

    items: [
      {
        href: "services/",
        title: "Услуги",
        image: `${editorialAssets}feature-links__item-1.jpg`,
        position: "50% 42%",
      },
      {
        href: "services/#catalog",
        title: "Направления",
        image: `${editorialAssets}feature-links__item-2.jpg`,
        position: "50% 48%",
      },
    ],
  },

  approach: {
    title: "До и после",

    description: `Здесь собраны фотографии клиентов ${CLINIC.name} до и после процедур. У каждого случая своя исходная форма и свой результат.`,

    hint: "Передвиньте ползунок, чтобы сравнить кадры.",
    labels: { before: "До", after: "После", compare: "Сравнить фото до и после. Кейс" },

    cases: [
      {
        id: 1,
        procedure: "",
        landscape: false,
        position: "center 42%",
        before: `${comparisonAssets}before-1.jpg`,
        after: `${comparisonAssets}after-1.jpg`,
      },
      {
        id: 2,
        procedure: "",
        landscape: true,
        position: "center",
        before: `${comparisonAssets}before-2.jpg`,
        after: `${comparisonAssets}after-2.jpg`,
      },
      {
        id: 3,
        procedure: "",
        landscape: false,
        position: "center 42%",
        before: `${comparisonAssets}before-3.jpg`,
        after: `${comparisonAssets}after-3.jpg`,
      },
      {
        id: 4,
        procedure: "",
        landscape: false,
        position: "center 42%",
        before: `${comparisonAssets}before-4.jpg`,
        after: `${comparisonAssets}after-4.jpg`,
      },
    ],
  },

  whyChooseUs: {
    title: "Почему выбирают нас",
    previous: "Предыдущий",
    next: "Следующий",
    reasons: [
      {
        id: 'attention',
        title: 'Внимание к вам',
        video: `${editorialAssets}WhyChooseUs-1.mp4`,
        poster: `${editorialAssets}WhyChooseUs-1-poster.jpg`,
        description: 'Важно, как вы сами видите желаемые изменения. С этого начинается разговор о ваших ожиданиях и вопросах.',
      },
      {
        id: 'individuality',
        title: 'Индивидуальный подход',
        video: `${editorialAssets}WhyChooseUs-2.mp4`,
        poster: `${editorialAssets}WhyChooseUs-2-poster.jpg`,
        description: 'У каждого лица свои особенности. Мы смотрим на форму губ и объём в контексте общих пропорций.',
      },
      {
        id: 'clarity',
        title: 'Понятный диалог',
        video: `${editorialAssets}WhyChooseUs-3.mp4`,
        poster: `${editorialAssets}WhyChooseUs-3-poster.jpg`,
        description: 'На консультации можно обсудить варианты, задать вопросы и понять, что важно учесть перед принятием решения.',
      },
      {
        id: 'proportions',
        title: 'Естественные пропорции',
        video: `${editorialAssets}WhyChooseUs-4.mp4`,
        poster: `${editorialAssets}WhyChooseUs-4-poster.jpg`,
        description: 'Выразительность складывается из деталей. В центре нашего подхода — гармония черт и сохранение индивидуальности.',
      },
    ],
  },

  method: {
    eyebrow: "Наша философия",
    title: `Каждая процедура в ${CLINIC.name.toUpperCase()} основана на принципах доказательной медицины и новейших достижениях в области эстетической науки. Наши специалисты сочетают анатомическую точность с научно обоснованными методами, что позволяет добиваться безопасных и долгосрочных результатов.`,
    portrait: {
      video: `${editorialAssets}home-method__portrait.mp4`,
      poster: `${editorialAssets}home-method__portrait-still.jpg`,
      position: "53% 42%",
    },
    detail: {
      video: `${editorialAssets}home-method__detail.mp4`,
      poster: `${editorialAssets}materials.avif`,
      description: "За каждой процедурой стоит приверженность науке, исследованиям и совершенствованию, как залог безопасных, точных и долговечных результатов.",
    },
  },

  fullBleedScene: {
    image: `${editorialAssets}home-scene.jpg`,
    width: 1672,
    height: 941,
    alt: "Портрет модели",
    position: "53% 46%",
    desktopPosition: "55% 44%",
    description: "Мы сочетаем медицинские знания с эстетическим мастерством, чтобы обеспечить уход, который ощущается как индивидуальный и точный.",
  },
};
