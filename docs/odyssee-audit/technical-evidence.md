# Технический разбор Odyssée, 14 ноября 2026

Проверка read-only: получены публичный HTML главной, CSS и 17 JS chunks. Файлы проекта EK не менялись. Архив: `/tmp/odyssee-audit.html`, `/tmp/odyssee-assets/`. Данные ниже — прочитанный код; фактическую плавность, экранное поведение, доступность с клавиатуры должен дополнять браузерный аудит. Скачивание одного chunk оборвалось и было повторено успешно (31 637 bytes).

## Проверенные источники

- Главная: https://www.odysseeclinic.com.au/
- CSS: https://www.odysseeclinic.com.au/_next/static/chunks/0dshk11hxd08e.css
- Главные анимационные компоненты / SplitText: https://www.odysseeclinic.com.au/_next/static/chunks/0r-~gfmzy7kz7.js
- GSAP, ScrollTrigger, Lenis: https://www.odysseeclinic.com.au/_next/static/chunks/0u95oli~n5~-c.js
- Providers, прелоадер, курсор, footer: https://www.odysseeclinic.com.au/_next/static/chunks/16kfgt0f3me26.js
- Media, меню: https://www.odysseeclinic.com.au/_next/static/chunks/0c4vo7lg2di3r.js
- Framework: https://www.odysseeclinic.com.au/_next/static/chunks/0ayhydy3m9_9r.js

## Стек: доказанное и неподтвержденное

Next.js 16.2.1, App Router (`window.next={version:"16.2.1",appDir:!0}`), сборка Turbopack. React DOM 19.3.0-canary-3f0b9e61-20260317. GSAP, ScrollTrigger, SplitText 3.14.2. Lenis 1.3.27, ReactLenis root. CSS имеет характерные Tailwind `@layer theme/base/components/utilities`, `--tw-*` и utility classes — Tailwind-подобная сборка; точная версия Tailwind не извлечена. Base UI реализует drawer. Jotai-style atom state применяется для открытого меню и статуса прелоадера. Sanity CMS виден в сериализованных `_type` slice данных и CDN `cdn.sanity.io/images/jk7ok3ks/production/...`. Mux HLS + динамически загружаемый HLS player. Авторство Nightjar — ссылка footer, не предположение по стилю.

## Сетка, шрифты, палитра

CSS: фон #fffcf8, основной темно-синий #1e305e, белый #fff, pale-grey #a79f9c; theme-dark меняет местами фон/текст. Basel Grotesk Regular (woff2, font-weight 430), PS Times Regular (otf, weight 350), font-display swap, оба preload. Serif заголовки с ss01 и выключенными liga/clig. Основной текст 13px/1.3, с 1280px 15px. H1 32px/1 → с 1024px 48px; H2 24px/1.05 → 32px; H4 18px/1.1. Навигация 13px, uppercase, tracking .03em; small caps 12px.

Сетка 6 колонок mobile / 12 с 1024px. Боковые поля 16px →20px; gap 8px →10px. Брейкпоинты 640,768,1024,1280,1536. Header height 13×3.5=45.5px. Декоративный маркер — круг 0.5em currentColor. Межсекционные mb-24/lg:mb-30 —96/120px; intro mb-40/lg:mb-60 —160/240px. Больше воздуха создают высоты медиа 100lvh/100svh/110svh и sticky, а не только margins.

## Сценарии движения

### Hero

SSR hero состоит из ДВУХ последовательных медиа экранов: video `h-lvh` + фото `h-lvh`; поэтому общая высота ~200lvh, а не один background. Медиа object-cover. Над ними absolute inset-0 слой со sticky навигацией на `top:50lvh` (в середине экрана), высота nav 45.5px. Сначала этот слой z95 находится поверх обычного sticky header z94. Desktop показывает Treatments/Concerns/About/Book, mobile Book+Menu. H1 max-md:sr-only.

Каждое hero-медиа обернуто общим компонентом parallax: внутренний слой desktop 110% высоты; yPercent -8→+8, scroll trigger top bottom → bottom top, scrub true, ease none. По серверным props `revealScale` НЕ передан: не приписывать hero общий эффект scale1.4→1 из reusable компонента! Такой код есть, но на главной в HTML/RSC prop revealScale не найден.

### Global scroll / preloader

ReactLenis options `{duration:.6}`, autoRaf false, raf вызывается через GSAP ticker (seconds×1000). Это плавная инерция прокрутки.

Прелоадер фиксированный z9999, pale-grey background, лого и текст из начальных opacity0/translateY20. Дети появляются duration .7, ease expo.out, stagger .1; затем задержка .3 и fade всего слоя duration1 power2.inOut. На время заставки scroll lock, затем display:none, unlock, атом preloaderFinished. В режиме reduce duration/delay сокращаются до нуля, но stagger .1 формально остается.

### Тексты

Многократно переиспользуемый сценарий SplitText words: autoAlpha0,y10 → autoAlpha1,y0; trigger top85%, once:true, duration1, expo.out. Stagger зависит от компонента: .01/.04/.1. Абзацы идут отдельными блоками с stagger .15 и перекрытием во времени. Intro/Philosophy title .04; дополнительные media/copy 1s с задержкой .4. Большой двучастный title — y20→0 duration1.2 stagger .12. Отдельный full-bleed заголовок разбит на chars, только opacity0→1, duration.6, stagger.04. Это появление при входе, а не непрерывное закрашивание букв по scroll progress. Большинство текстов ждут завершения прелоадера.

### Why Odyssée

4 статьи одновременно desktop, все кроме active opacity .1, copy неактивных opacity0. Видео активной играет, остальных paused. CSS переходы opacity .3s expo-out. Mobile все статьи в одной grid-cell и показана только активная.

Автоматическая смена каждые5сек: GSAP progress scaleX0→1 с общей duration5×число слайдов; currentIndex=floor(progress×count); onComplete.restart. Счетчик1:4. Hover desktop переводит progress на индекс выбранной статьи. Mobile tap двигает вперед. Следовательно смена карточек обусловлена ВРЕМЕНЕМ/hover/tap, НЕ скроллом.

При этом внутренний блок закрепляется ScrollTrigger: start center center, end +=150%, pin:true, pinSpacing:false. Контейнер section h-svh и clipPath inset(0); снизу200px градиент в фон. Именно комбинация закрепления и clipping создает особое пролистывание.

### Пары Concerns/Treatments и Our approach

Большая пара desktop — по 50vw, медиа в h-svh контейнере; RSC задает amount30, значит yPercent -30→+30 на desktop. Нижняя пара Our approach задает amount0 (не приписывать ей такой же parallax).

Сложный синий монохром собирается из saturate(0), opacity .8 + overlay ebony/mix-blend-difference, blue/mix-blend-screen, black opacity.1. На hover все overlays уходят в opacity0 за .3s, активная фотография насыщается до100% и opacity1; соседняя уменьшается до opacity .3. Подпись активной остается, остальных исчезает. У Concerns есть дополнительный наложенный media layer с opacity.2→1 active (и .05 при hover соседнего). Это реальное двухслойное изображение, не одна картинка с простым фильтром.

### Method, not myth / Feature

Крупное медиа расширяется по горизонтали: wrapper scaleX.8→1, inner scaleX1.2→1, origin зависит от right/left alignment. Оба scrub top bottom → top center. После этого внутреннее медиа yPercent0→20 при top top → bottom top. Small sticky item desktop занимает2 колонки, липнет на top30svh. Заголовок reveal words как выше. Spacer высота динамически определяется ResizeObserver от высоты текста.

### Bespoke full bleed

Контейнер min-height110svh, absolute медиа layer с обычным parallax amount8 desktop, cover. Заголовки лежат flex justify-between по полной ширине; на desktop вертикально по центру, mobile у нижнего края pb32. Текст появляется посимвольно по входу (см. выше).

### Menu

Base UI drawer, swipeDirection up, autofocus true, Title Main menu visually hidden. Справа desktop узкая колонка (xl col-start10 из12); mobile почти вся ширина с gutters. Въезд сверху translateY(-100%)→0 за1.2s expo-out. Контактная темно-синяя карточка догоняет основную: translate+opacity .6s, delay.3; при выходе delay0. Backdrop белый50%, blur10px и grayscale, fade .5s. Пункты имеют цифры и preview image+description; hover раскрывает соответствующее описание. Точное keyboard поведение нужно проверить браузером.

### Footer и микровзаимодействия

Footer media scale1.5→1, scrub top bottom → bottom top только1024+. Структура footer имеет h175svh внутренний блок, sticky top0 desktop с pt25svh и fixed bottom0 mobile. CTA имеет desktop cursor-none и собственную подпись при курсоре. Global cursor position lerp используется через mousemove/GSAP ticker; не подключается на mobile.

Hover ссылки: круг 0.5em из scale0/opacity0 до1 за .5s; underline background-size0→100% за.4s expo-out. У SVG логотипа double-s вращается rotateX180deg за1s на hover. Это не движение всего логотипа.

Код содержит screensaver после10мин бездействия (timeout600000), отслеживает mousemove/mousedown/keydown/touchstart/scroll/click; фиксированный overlay z200 opacity transition1s. Браузером 10мин не ожидали.

## Загрузка медиа

Mux URL строится stream.mux.com/{playbackId}.m3u8. HLS настройки capLevelToPlayerSize:true; startLevel mobile undefined, desktop5. Если native HLS поддержан — video.src напрямую. Это не доказательство конкретного разрешения/битрейта потока. Постер1280px webp на time0. Hero preload auto, часть ниже metadata. IntersectionObserver переводит видео в preload auto на расстоянии viewport до/после экрана; отдельный observer играет только в видимой области и ставит на pause вне ее. Background muted/loop/playsInline. Автоплей ошибки catch без интерфейсной ошибки.

Изображения Sanity picture/srcset: ширины320/420/640/1024/1200/1920/2200 и иногда2560/3200; q90, auto=format, server crop/focalpoint, отдельный mobile source. Hero фото loading eager, остальное lazy. Это полезнее копировать как принцип, чем исходные мегабайтные файлы.

## Ограничения и подтвержденные точки для нового ТЗ

1. В главном анимационном chunk нет prefers-reduced-motion. Прелоадер учитывает reduce; Lenis1.3.27 имеет respectReducedMotion:true по умолчанию. Но для pinned carousel, текстовых reveals и parallax общего disable в прочитанном коде не найдено. В новом проекте задать reduced-motion последовательно.
2. Многие SSR img не содержат alt вообще (из13 img только hero имеет alt). Даже декоративным изображениям нужен явный alt="". Не копировать эту недоработку.
3. SplitText text spans скрыты aria-hidden и родителям дан полный aria-label — это положительный прием для чтения текста без побуквенного мусора.
4. Главная карусель реализована articles+hover и onClick whole section mobile; явных кнопок предыдущий/следующий/пауза в ее коде нет. В ТЗ добавить доступные управления, если сохраняем автосмену.
5. Медиаконтент несет большую часть впечатления. Нельзя получить тот же эффект одними библиотеками: нужны подходящие крупные портреты, детали кожи, спокойное видео, crop под mobile.
6. Версии — снимок конкретной развернутой сборки; не требование повторить Next/React или Canary в EK. Фреймворк может быть любым, если воспроизведены сетка, состояния и параметры движения. Перенос эффектов потребует визуальной настройки и тестов на реальных устройствах.
