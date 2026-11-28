import { CLINIC, MEDIA } from "./clinic.js";

const groups = [
  {
    id: "skin-care",
    title: "Уход за кожей",
    image: "skin-care.jpg",
    description: "Профессиональная чистка и пилинги для лица и тела.",
    topics: [
      ["Чистка лица", "/chistki"],
      ["Пилинг лица и тела", "/pilingi"],
    ],
  },
  {
    id: "injections",
    title: "Инъекционная косметология",
    image: "injections.jpg",
    description: "Процедуры для коррекции контуров лица и решения эстетических задач кожи.",
    topics: [
      ["Увеличение губ", "/uvelichenie-gub"],
      ["Контурная пластика", "/konturnaya-plastika-bryansk"],
      ["Ботулинотерапия", "/botulinoterapiya"],
      ["Биоревитализация", "/biorevetalizaciya"],
      ["Мезотерапия", "/mezoterapiya-lica"],
      ["Плазмотерапия", "/plazmolifting"],
      ["Полимолочная кислота", "/polimolochka"],
      ["Мезонити", "/beauty-liftvline"],
      ["Липолитики", "/lipolitiki-tela-bryansk"],
    ],
  },
  {
    id: "apparatus",
    title: "Аппаратная косметология",
    image: "apparatus.jpg",
    description: "Аппаратные процедуры для лица, включая SMAS-терапию и микроигольчатый RF-лифтинг.",
    topics: [
      ["SMAS-терапия", "/smas-lifting-bryansk"],
      ["Микроигольчатый RF-лифтинг", "/rf-lifting-litsa-bryansk"],
      ["Микротоковая терапия", "/mikrotoki-dlya-litsa"],
      ["Фотодинамическая терапия", "/fotodinamicheskaya-terapiya"],
    ],
  },
  {
    id: "laser",
    title: "Лазерные процедуры",
    image: "laser.webp",
    description: "Удаление волос и лазерные процедуры, в том числе на аппарате Capello.",
    topics: [
      ["Лазерная эпиляция", "/lazernaya-epilyatsiya"],
      ["Процедуры на Capello", "/capello"],
      ["Лазерное омоложение", "/lazernoe-omolijenie"],
      ["Удаление сосудов", "/udaleniesosudov"],
      ["Удаление пигментных пятен", "/udalenie-pigmentatsii"],
      ["Удаление бородавок и папиллом", "/udalenie-borodavok-bryansk"],
    ],
  },
  {
    id: "piercing",
    title: "Пирсинг",
    description: "Прокол ушей и другие виды пирсинга.",
    topics: [["Пирсинг", "/pirsing-bryansk"]],
  },
  {
    id: "consultation",
    title: "Консультация косметолога",
    description: "Возможность задать вопросы специалисту и обсудить выбор процедур.",
    topics: [["Бесплатная консультация", "/konsultatsiya-free"]],
  },
];

export const SERVICES = {
  hero: {
    title: "Услуги «Мелюр»",
    image: MEDIA.care,
    description: "От профессионального ухода до лазерной и инъекционной косметологии.",
    link: { href: "#catalog", label: "Перейти к каталогу" },
  },
  catalog: {
    title: "Каталог услуг",
    ariaLabel: "Направления услуг",
    groups: groups.map(({ image, topics, ...group }) => ({
      ...group,
      image: image ? MEDIA.services + image : null,
      topics: topics.map(([label, path]) => ({
        label,
        href: CLINIC.website + path,
      })),
    })),
  },
  scene: {
    ariaLabel: "Первая консультация",
    image: MEDIA.consultation,
    description: "На консультации можно обсудить показания, подготовку и рекомендации после процедуры.",
  },
  journey: {
    title: "Знакомство с клиникой",
    description: CLINIC.address,
    images: [
      { src: MEDIA.space, alt: "Интерьер клиники «Мелюр»", position: "center" },
      { src: MEDIA.room, alt: "Кабинет клиники «Мелюр»" },
    ],
  },
};
