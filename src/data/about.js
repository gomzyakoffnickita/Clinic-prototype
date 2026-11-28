import { CLINIC, MEDIA } from "./clinic.js";

const profiles = [
  ["kirillova.jpg", "Кириллова Юлия Викторовна", "Главный врач", "kirillova-yuliya-viktorovna"],
  ["rysakova.jpg", "Рысакова Кристина Эдуардовна", "Врач-косметолог, дерматолог", "rysakova-kristina-eduardovna"],
  ["smolyakova.jpg", "Смолякова Марина Николаевна", "Косметолог-дерматолог", "suschaya-marina-nikolaevna"],
  ["platek-striyskaya.jpg", "Платек-Стрийская Вера Александровна", "Косметолог", "platek-striyskaya-vera-aleksendrovna"],
  ["valkova.jpg", "Валькова Мария Михайловна", "Косметолог", "valkova-mariya-mihaylovna"],
  ["tumakova.jpg", "Тумакова Екатерина Александровна", "Генеральный директор", "tumakova-ekaterina-aleksandrovna"],
];

export const ABOUT = {
  hero: {
    title: ["О клинике", "«Мелюр»"],
    image: MEDIA.space,
    position: "center 45%",
    poster: MEDIA.consultation,
    videoPosition: "center 33%",
    description: "Клиника эстетической косметологии на Бежицкой улице в Брянске.",
  },
  intro: {
    eyebrow: "О клинике",
    title: "Косметология с вниманием к индивидуальности",
    description: "В «Мелюр» можно получить консультацию косметолога, обсудить состояние кожи и подобрать процедуры или уход.",
  },
  team: {
    title: "Команда «Мелюр»",
    portrait: MEDIA.teamPortrait,
    portraitAlt: "Групповая фотография с сайта «Мелюр»",
    portraitPosition: "center 41%",
    detail: MEDIA.detail,
    detailPosition: "center",
  },
  specialists: {
    title: "Специалисты клиники",
    position: "center 35%",
    profileLabel: "Профиль на сайте клиники",
    items: profiles.map(([file, name, role, slug]) => ({
      image: MEDIA.teamDirectory + file,
      name,
      role,
      href: `${CLINIC.website}/team/${slug}`,
    })),
  },
  consultation: {
    title: "Первая консультация",
    image: MEDIA.room,
    position: "center",
    steps: [
      {
        title: "Расскажите о пожеланиях",
        description: "Опишите, что вас беспокоит и какого результата вы ждёте.",
      },
      {
        title: "Обсудите варианты",
        description: "Уточните, какие процедуры подходят вам, чего от них ожидать и какие есть ограничения.",
      },
      {
        title: "Уточните дальнейшие шаги",
        description: "Если вы выберете процедуру, спросите, как к ней подготовиться и какие рекомендации соблюдать после неё.",
      },
    ],
  },
  contact: { href: "#contact", label: "Контакты клиники" },
};
