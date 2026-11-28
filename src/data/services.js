import { CLINIC, MEDIA } from "./clinic.js";

const assets = `${import.meta.env.BASE_URL}editorial/`;

const groups = [
  {
    id: "skin-care",
    title: "Уход за кожей",
    image: `${MEDIA.services}skin-care.jpg`,
    description: "Профессиональная чистка и пилинги для лица и тела.",
    topics: [
      ["Чистка лица", "/chistki"],
      ["Пилинг лица и тела", "/pilingi"],
    ],
  },
  {
    id: "injections",
    title: "Инъекционная косметология",
    image: `${MEDIA.services}injections.jpg`,
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
    image: `${MEDIA.services}apparatus.jpg`,
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
    image: `${MEDIA.services}laser.webp`,
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
    image: `${MEDIA.services}piercing.jpg`,
    description: "Прокол ушей и другие виды пирсинга.",
    topics: [["Пирсинг", "/pirsing-bryansk"]],
  },
  {
    id: "consultation",
    title: "Консультация косметолога",
    image: MEDIA.consultation,
    description: "Возможность задать вопросы специалисту и обсудить выбор процедур.",
    topics: [["Бесплатная консультация", "/konsultatsiya-free"]],
  },
];

export const SERVICES = {
  hero: {
    eyebrow: `${CLINIC.name} / Услуги`,
    title: ["Эстетика начинается", "с понимания деталей."],
    video: `${assets}home-method__portrait.mp4`,
    description: "План начинается с разговора о том, что важно именно вам. На консультации можно обсудить пожелания и познакомиться с подходом клиники.",
    link: { href: "#catalog", label: "Смотреть направления" },
  },
  catalog: {
    eyebrow: `Направления «${CLINIC.name}»`,
    imageCaption: "Иллюстративное изображение",
    title: "Каталог услуг",
    ariaLabel: "Направления услуг",
    groups: groups.map(({ topics, ...group }, index) => ({
      ...group,
      number: String(index + 1).padStart(2, "0"),
      topics: topics.map(([label, path]) => ({
        label,
        href: CLINIC.website + path,
      })),
    })),
  },
  scene: {
    ariaLabel: "Подготовка и забота после процедуры",
    image: MEDIA.consultation,
    description: "Забота начинается ещё до процедуры и продолжается после неё. На консультации мы обсуждаем ваши пожелания, подготовку и вопросы восстановления. Индивидуальные рекомендации помогают пройти каждый этап осознанно и с вниманием к себе.",
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
