# EK Clinic — демонстрационный сайт

Локальный прототип на React, Vite и GSAP. Главная собрана по структуре Odyssée: два экрана hero, вступление, закреплённые преимущества, фотопанели, блок о методе, полноэкранная сцена, галерея «До и после» и контакты с финальным медиа. Внутренние страницы доступны по адресам `/services/` и `/about/`.

## Как открыть

Откройте папку `ek-clinic-prototype` в VS Code. В терминале выполните:

```bash
npm install
npm run dev
```

Откройте адрес из терминала. Для проверки производственной версии запустите `npm run build`, затем `npm run preview`.

## Что редактировать

| Файл | За что отвечает |
| --- | --- |
| `src/main.jsx` | Порядок секций и верхняя шапка |
| `src/components/Hero/` | Два медиаэкрана, навигация посередине сцены, автовоспроизведение и параллакс |
| `src/components/Header/` | Логотип, ссылки и модальное меню |
| `src/components/HomeEditorial/` | Вступление, фотопанели со ссылками и галерея «До и после» |
| `src/components/WhyChooseUs/` | Четыре преимущества, цикл по 5 секунд на кадр и наложение фотопанелей |
| `src/components/HomeStory/` | Блок о методе, раскрытие портрета, полноэкранная сцена и короткое высказывание |
| `src/components/Contact/`, `src/components/Footer/` | Статус записи, контактный блок, финальный кадр и навигация в подвале |
| `src/services.jsx`, `src/services.css` | Каталог услуг, hero и визуальные сцены |
| `src/about.jsx`, `src/about.css` | Страница о клинике и команда |
| `src/style.css`, `src/fonts.css` | Палитра, отступы и локальные шрифты |
| [PRODUCT.md](PRODUCT.md), [DESIGN.md](DESIGN.md), [ТЗ](docs/ek-clinic-spec.md) | Цель сайта, целевая дизайн-система и этапы реализации |

В `WhyChooseUs.jsx` данные слайдов хранятся в `reasons`, длительность кадра — в `secondsPerReason`. Автосмена и закрепление управляются независимо. При системном уменьшении движения видео заменяется постером, карусель переключается вручную, а секции идут обычным потоком.

## Медиа

- Первый экран использует `public/hero/hero-1.mp4` и его стоп-кадр `public/hero/hero-1-still.jpg` на всех экранах.
- `public/hero/portrait-f*.jpg` — портрет для второго экрана в двух размерах. Источник — [фото Анастасии Климец](https://www.pexels.com/photo/close-up-shot-of-a-woman-lying-on-white-surface-14821873/) по [лицензии Pexels](https://www.pexels.com/license/).
- `public/editorial/` — изображения и видео секций трёх страниц.
- `public/before-after/` — пары `before-1.jpg` / `after-1.jpg` и далее. Подписи процедур задаются в `comparisonCases` в `HomeEditorial.jsx`.
- Source Serif 4 для редакционных заголовков и Onest для основного текста и навигации загружаются из локальных кириллических и латинских WOFF2. Лицензии SIL Open Font License хранятся в `public/fonts/`. [Source Serif 4](https://fonts.google.com/specimen/Source+Serif+4), [Onest](https://fonts.google.com/specimen/Onest).

## Публикация на GitHub Pages

В настройках Pages источник публикации — ветка `gh-pages`, папка `/ (root)`. Команда `npm run deploy` собирает проект и публикует содержимое `dist/` в эту ветку. Vite собирает страницы с префиксом `/Clinic-prototype/`.
