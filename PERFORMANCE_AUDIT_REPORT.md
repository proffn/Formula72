=== GIT ===

Дата проверки: 2026-10-06. Проекты: `D:\сайты\Formula72` и `D:\сайты\formula72-cms`.

Локальная версия: frontend `main`, `8f8a311`; CMS `main`, `d5a91a6`.
GitHub версия после `git fetch origin`: frontend `origin/main = 8f8a311`; CMS `origin/main = d5a91a6`.
Синхронизированы: ДА по истории коммитов, НЕТ по рабочим файлам. Для каждого репозитория `git rev-list --left-right --count HEAD...origin/main` вернул `0 0`: нет неопубликованных коммитов, отставания и расхождения истории.

Незакоммиченные изменения ДО аудита:

- Frontend: 7 untracked-файлов — `public/images/home/coverage-map/comment1.webp`, `comment2.webp`, `comment3.webp`; `public/images/home/wholesale-contract/opt-mobile3.jpg`, `opt-mobile4.webp`; `public/videos/main_video3.mp4`, `main_video4.mp4`. Исходники tracked-файлов были чистыми.
- CMS: `src/index.ts` и `src/api/home-page/content-types/home-page/schema.json`. Изменения подписей: «Третья строчка» → «Третья строка»; «Фоновое изображение героя» → «Фоновое изображение»; «Фон героя на мобильных» → «Фоновое изображение на мобильных»; добавлены соответствующие подписи в конфигурации Content Manager.
- Все существовавшие изменения сохранены. CMS не редактировалась.

Что нужно сделать: отдельно решить судьбу исходных untracked-ресурсов и правок CMS; проверить предложенный diff frontend. Коммитов, push, pull, reset, clean и deployment не выполнялось.

=== ЯНДЕКС МЕТРИКА ===

Статус: интегрирована и проверена в локальной production-сборке. На production не опубликована.

Какие файлы изменены: `app/layout.tsx`, новый `components/analytics/yandex-metrika.tsx`, новая `.env.example`, игнорируемая `.env.local`, `README.md`.

Как реализовано:

- Корневой Server Layout включает клиентский компонент в `Suspense` с `fallback={null}`. `useSearchParams` не мешает сборке статических служебных страниц.
- `next/script`, уникальный ID, `strategy="afterInteractive"`; нет скрипта, блокирующего SSR/первый рендер.
- Очередь `window.ym` создаётся до отправки команд. Реестр счётчика на `window` исключает повторный `init` и повторный `hit` одного URL при повторном выполнении эффекта.
- `defer: true` отключает автоматический initial pageview. Ровно один явный `hit` отправляется на первый URL и каждый новый pathname/query. Сохраняется предыдущий URL как `referer`. Переход по hash внутри секции не считается новой страницей.
- Сохранены `ssr`, `webvisor`, `clickmap`, `accurateTrackBounce`, `trackLinks` со значением `true`, `ecommerce: "dataLayer"`, исходные `referrer` и `url`.
- В серверной разметке есть `noscript` с `watch/113464320`.
- Отсутствующий/некорректный ID отключает компонент; браузерные API используются в эффекте, а не при SSR.

Используемый ID: **113464320**.
Нужная env переменная: **`NEXT_PUBLIC_YANDEX_METRIKA_ID=113464320`**. Указана локально и в несекретном примере. `.env.local` действительно игнорируется Git. ID должен быть задан перед build; при смене ID нужна новая сборка.

Работает на всех routes: ДА для проверенных локальных routes. Проверены все 8 страниц: главная, about, production, certificates, terms и три юридических документа. Глобальная серверная разметка счётчика есть на каждой; на пяти основных страницах проверены `init`/`hit` в браузере.

Проверены настоящая навигация Next Link `/` → `/about`, query `/about?audit=1`, Back и обычная полная перезагрузка по ссылке footer. В SPA один `init`, один тег, по одному `hit` на каждое изменение URL. Запрос tag.js в тесте заменялся тестовым обработчиком: это проверяет интеграцию и команды, но не подтверждает приём данных сервисом Яндекса. Статистика production тестами не загрязнялась.

Способ выбран по [документации Next Script](https://nextjs.org/docs/app/api-reference/components/script) и [инструкции Яндекса для SPA](https://www.yandex.ru/support/metrica/ru/code/counter-spa-setup).

Как проверить после deployment: в Network один `tag.js?id=113464320`, запросы счётчика `watch/113464320`, один initial pageview и один на Next Link/Back/query, отсутствие hydration ошибок. Затем проверить поступление просмотров в интерфейсе Метрики. В коде приложения CSP/security headers отсутствуют; политики Nginx и реальный production build/env не проверялись и не менялись.

=== ПРОИЗВОДИТЕЛЬНОСТЬ ===

Все воспроизведения выполнены на **локальной production-сборке**, отдельном read-only HTTP-сервере с существующим `lib/mock/home.snapshot.json`, Chromium 390×844 и 1440×900. CMS-процесс, БД, контент и production-конфигурация не менялись. Mock позволяет менять задержку HTTP, а не данные. Это доказывает поведение кода при заданных условиях, но не измеряет текущий VPS, мобильную сеть или настоящий Safari.

CRITICAL:

1. **Отсутствовал deadline у Strapi fetch.** Где: `lib/api.ts:60` и `lib/queries.ts:1530`, `app/page.tsx:22`. Вся страница ожидала завершения всех 17 запросов; `Promise.allSettled` не ограничивает время ожидания. Доказательство: задержка одной второстепенной секции на 6 секунд задержала `/terms` до TTFB 6012 мс. Исправление: AbortController, 8000 мс, deadline действует и во время чтения JSON; сохранена отмена вызывающей стороны; существующий snapshot/fallback начинает работать после прерывания. Риск низкий: при API дольше 8 секунд отображается существующий резервный контент вместо дальнейшего ожидания. Остаточное ограничение: главная всё ещё ждёт до 8 секунд при сбое секции; streaming первой секции не внедрялся.

HIGH:

2. **Внутренние страницы запрашивали все данные главной ради общих элементов.** Где: `app/about/page.tsx:14`, `app/production/page.tsx:19`, `app/terms/page.tsx:15`, `app/certificates/page.tsx:15`, три юридические страницы. Доказательство: HTTP-лог mock — 18 запросов на каждую из первых четырёх внутренних страниц, 17 на юридические. `/terms` зависела от mission. Исправлено: `getSiteFooterData()` и `getSiteLayoutData()` в `lib/queries.ts:1507`. About: 2 запроса; остальные основные внутренние: 3; юридические: 2. Риск низкий: deep comparison подтвердил те же header/navigation/footer при успешном, пустом и недоступном API.

3. **Eager-загрузка скрытых и нижних изображений.** Где: девять `components/sections/*`, перечисленных ниже. Доказательство: network на главной скачивал mobile-изображения на desktop, desktop-изображения на mobile, изображения отзывов/галерей задолго до прокрутки. Исправлено: native lazy loading; снят `fetchPriority="high"` с изображения mission далеко ниже первого экрана. Риск низкий: размеры, URL, CSS, тексты, hover и анимации сохранены. Скриншоты первого экрана обеих ширин совпали побайтно.

4. **Оригинал мобильной карточки опта 10,04 МБ / 6120×4000.** Где: `components/sections/wholesale-contract-section.tsx:73`, `mapWholesale()` в `lib/queries.ts`, `/uploads/opt_mobile2_86df9ced69.jpg`. `sharp.metadata()` установил: это PNG, несмотря на `.jpg`. Доказательство: браузер реально получил 10 042 600 байт тела; на mobile элемент занимает 324×199,78 px. Lazy убрал запрос на desktop, но на mobile браузер заранее загружает близкую секцию, поэтому файл остаётся в initial load. Рекомендуется responsive rendition, ограничение размеров и WebP/AVIF с визуальной проверкой. Не исправлено автоматически: выбор качества/варианта потребует проверки изображения; массовое включение Next optimizer переносит декодирование гигантских исходников на сервер. Риск такой следующей оптимизации средний. Теоретический RGBA-буфер этого размера — около 98 МБ; фактический crash Safari от нехватки памяти не подтверждён.

5. **Видео production 99,14 МБ, 3840×2160, 60 FPS, metadata начинает передачу мегабайт.** Где: `app/production/page.tsx:87`, `mapProductionVideoPage()`; активен Cloudinary `main_video2_kvmhkn.mp4`. Доказательство: без Play и autoplay получено 4 909 737 байт тела за 5,5 секунды. Есть запрос к хвосту MP4. В локальном файле `moov` расположен после `mdat`, на offset 99 068 283; MD5 локального файла совпадает с ETag удалённого. Рекомендуется сначала MP4 faststart без перекодирования, затем отдельная мобильная версия с визуальной проверкой; оценить `preload="none"` при согласованном poster. Не изменено: видео управляется CMS, а замена контента запрещена; preload none при отсутствии poster меняет исходный preview. Риск следующего изменения средний. **Это доказано только для `/production`; на главной видео отсутствовало.**

MEDIUM:

6. **Диагностика могла создавать цикл unhandled rejection при отказе собственного endpoint.** Где: `components/diagnostics/client-error-logger.tsx:27,40`. `try/catch` не ловил асинхронный отказ `void fetch`; сериализация circular reason могла выбросить ошибку. Исправлены `.catch()` и безопасная нормализация. Риск низкий, форма/бизнес-логика не меняются. Тест circular reason при заблокированном `/api/client-error`: одна попытка отправки, ноль runtime exceptions, страница видима. Это проблема обработки отказов, а не установленная первопричина исходного белого экрана.

7. **Сохраняются крупные оригиналы и `unoptimized`.** В частности, изображения отзывов 1600×1600 отображаются в небольших карточках; `item_12_2` — 1600×1600 при ширине 348 px. `sizes` не уменьшает передаваемый файл при `unoptimized`. Lazy переносит передачу ниже по времени, но не уменьшает объём при прокрутке. Рекомендуется отдельная оптимизация responsive sources с проверкой качества. Массово не менялось.

8. **Часть UI и CSS остаются клиентскими/тяжёлыми, но причинная связь с white screen не установлена.** Hero содержит Framer Motion в initial bundle; скрытая и видимая версии Hero монтируют по SiteHeader, значит подписки header существуют дважды. Есть backdrop blur, fixed menu, overflow clip и svh/dvh. Доказательств runtime exceptions или длинных задач >50 мс в проведённых обычных загрузках Chromium нет. Архитектура, CSS и анимации не менялись.

LOW:

9. **ESLint проверял временные файлы профиля Chrome.** Исправлено: `.tmp-chrome-debug/**` добавлена в ignores. Это улучшает локальные проверки и не влияет на сайт.
10. **Существующие lint-замечания:** 4 `react-hooks/set-state-in-effect` (AboutHero:20, FloatingActionButtons:53 и :84, BannerSlider:42) и 8 предупреждений. Сравнение с `HEAD` установило тот же набор до и после. Новых замечаний нет. Не исправлялись через изменение состояния меню, слайдера и изображения.

=== НАЙДЕННЫЕ РЕАЛЬНЫЕ УЗКИЕ МЕСТА ===

| Причина | Доказательство | Влияние | Исправление / состояние |
|---|---|---|---|
| Нет deadline SSR fetch | `/terms`, задержка mission 6000 мс → TTFB 6012 мс | задержка HTML и первого экрана | timeout 8 секунд на весь запрос, включая JSON |
| Главная загружалась на внутренних страницах | 18 CMS-запросов → 2/3; та же задержка mission → TTFB `/terms` 12 мс | лишняя зависимость SSR от чужих секций | отдельные header/footer queries |
| Все оригиналы eager, включая скрытые | network и transfer bytes до/после | конкуренция за сеть/декодирование | lazy; объём initial load существенно снижен |
| Огромное фото mobile опта | 10,04 МБ, PNG 6120×4000 → карточка 324 px | остаётся основной частью mobile-трафика | responsive rendition рекомендуется, оригинал сохранён |
| Metadata видео production | 4,91 МБ без Play, `moov` в хвосте | трафик при открытии `/production` | faststart/mobile variant рекомендуется, контент сохранён |

Трафик успешно завершённых запросов приложения за первые 5,5 с (без прокрутки, browser cache выключен):

| Режим | До | После | Снижение |
|---|---:|---:|---:|
| mobile 390×844 | 23,07 МБ | 12,03 МБ | около 48% |
| desktop 1440×900 | 22,52 МБ | 2,17 МБ | около 90% |

MB здесь десятичные. В totals для главной исключены отдельные запросы локально внедрённого Kaspersky; его домена в исходниках приложения нет. Totals включают HTML, first-party JS, CSS, шрифты и изображения. Метрика в браузерных тестах использовала stub, поэтому реальный вес Яндекс tag.js в эти цифры не входит. Неполные video-запросы в эти totals не входят; для `/production` отдельно измерены события Network.dataReceived.

Это лабораторные измерения текущего snapshot, а не показатели production или гарантия ускорения на мобильной сети. Прямое доказательство изменения — состав запрошенных ресурсов и воспроизводимый тест задержки, а не сравнение случайных быстрых TTFB.

=== ТЯЖЁЛЫЕ РЕСУРСЫ ===

В таблице «до» означает первый экран до lazy, «после» — первые 5,5 секунд после исправления. Реестр всех запрошенных изображений и видео: [.tmp-chrome-debug/audit/asset-inventory.csv](.tmp-chrome-debug/audit/asset-inventory.csv) и [JSON](.tmp-chrome-debug/audit/asset-inventory.json). Содержит route, viewport, статус, размеры и наблюдения; это не список всех файлов public.

| Ресурс | Размер | Используется? / где | Когда грузится | Влияние | Рекомендация |
|---|---:|---|---|---|---|
| `/uploads/opt_mobile2_86df9ced69.jpg` (фактически PNG) | 10,04 МБ | ДА, mobile-карточка опта, `/` | до: оба режима; после: mobile близко к viewport | значительное initial load; 6120×4000 | responsive source / WebP/AVIF, визуальная проверка |
| `/uploads/formula72_scheme4_8089eeb8dc.png` | 1,13 МБ | ДА, desktop-схема, `/` | до: оба режима; после: по приближению | скрытый desktop asset грузился на mobile | lazy исправлен; уменьшить оригинал |
| `/uploads/item_12_2_1de10d2646.png` | 1,21 МБ | ДА, what-we-can-make, `/` | до: сразу; после: при приближении | далёкая секция, 1600×1600 | lazy исправлен; responsive source |
| `/uploads/comment3_22ebd73a38.png` | 1,34 МБ | ДА, отзывы, `/` | до: сразу; после: при приближении | 1600×1600 для карточки | lazy исправлен; rendition |
| `/uploads/comment2_6ae3b06dbe.png` | 0,71 МБ | ДА, отзывы, `/` | аналогично | лишний initial transfer | lazy исправлен; rendition |
| `/uploads/comment1_06e7f22eb5.png` | 0,51 МБ | ДА, отзывы, `/` | аналогично | лишний initial transfer | lazy исправлен; rendition |
| `/uploads/item_5_hover_630ebc250b.jpg` (PNG) | 0,70 МБ | ДА, hover gallery, `/` | до: сразу, даже без hover; после: у секции | скрытое hover-изображение | lazy исправлен; rendition |
| `/uploads/opt_contract_bg2_f389bcdd0d.jpg` (PNG) | 0,81 МБ | ДА, desktop опт/контракт, `/` | до: оба режима; после: desktop | desktop variant на mobile | lazy исправлен |
| Cloudinary `mission_main1_fcf2a7185a.png` | около 0,73 МБ | ДА, mission, `/` | до: eager/high; после: у секции | конкурировал с Hero | lazy и обычный priority исправлены |
| Cloudinary `mobile_hero_bg_44f440c46a.png` | около 0,54 МБ | ДА, mobile Hero, `/` | сразу | первый экран, внешняя загрузка | не отложен; рассмотреть rendition отдельно |
| Cloudinary `main_video2_kvmhkn.mp4` | 99,14 МБ | ДА, `/production` | metadata без autoplay; 4,91 МБ тела в тесте | влияет на открытие этой страницы | faststart, mobile encode, согласованный poster |
| `public/videos/main_video2.mp4` | 99,14 МБ | локальная копия активного Cloudinary видео; её URL не запрашивается | сам локальный файл не загружается | размер на диске не считать дополнительным download | сохранить для будущего remux; MD5 совпадает с remote ETag |
| `public/videos/main_video.mov` | 252,26 МБ | НЕТ в сетевых загрузках проверенных страниц | не грузится | initial load не доказан | не удалял |
| `public/uploads/main_video_68cf17d09e.mov` | 252,26 МБ | НЕТ в проверенных загрузках; есть старая metadata в snapshot | не грузится | наличие metadata не равно запросу browser | не удалял |
| `public/videos/main_video3.mp4` | 43,26 МБ | НЕТ в проверенных routes; исходный untracked | не грузится | не считать причиной | не удалял |
| `public/videos/main_video4.mp4` | 15,86 МБ | НЕТ в проверенных routes; исходный untracked | не грузится | не считать причиной | не удалял |
| `public/images/home/wholesale-contract/opt-mobile2.jpg` | 34,48 МБ | НЕТ по этому URL; приложение запрашивает отдельный uploads-файл 10,04 МБ | не грузится | исходник на диске не равен transfer | не удалял |

На главной в существующем snapshot **нет активных hoverVideo**. При появлении такого поля `WhatWeCanMakeCard` создаёт скрытый `<video autoPlay muted loop playsInline preload="none">`; autoplay может отменить смысл preload none. Это условный риск, а не доказанная текущая загрузка видео главной. Рекомендация — ограничить запуск видимостью/hover с сохранением поведения, когда CMS реально начнёт выдавать hoverVideo. Приоритет autoplay над preload описан в [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video).

=== STRAPI / API ===

Количество запросов, подтверждённое отдельными HTTP-вызовами и журналом fixture:

| Route | До | После |
|---|---:|---:|
| `/` | 17 | 17 |
| `/about` | 18 | 2: footer + about |
| `/production` | 18 | 3: header + footer + production |
| `/certificates` | 18 | 3: header + footer + certificates |
| `/terms` | 18 | 3: header + footer + terms |
| каждый из 3 юридических routes | 17 по коду | 2 подтверждено HTTP: header + footer |

17 запросов главной: site-header, home-page, banners, wholesale-contract-section, pros-cons-section, formula72-scheme-section, mission-k72-section, work-stages-section, who-suits-section, why-trust-us-section, what-we-can-make-section, coverage-map-section, faq-section, lead-cta-section, final-brand-section, footer-section, floating-contact-section.

Они параллельны, последовательно выполняющихся 17 fetch нет. Но `await Promise.allSettled` ждёт самый медленный запрос. Cache остаётся `no-store`; сайт и до, и после получает свежие данные каждый SSR. ISR/revalidate и бизнес-поведение обновления CMS не менялись.

Проблемные запросы: раньше любой endpoint, даже секция вне текущей страницы, мог задержать SSR. В воспроизведении выбран mission. Самые крупные JSON существующего snapshot — coverageMap 20,62 KB и whatWeCanMake 15,59 KB; evidence гигантского API response не обнаружено. Populate часто возвращает media metadata/formats, а отображение выбирает основной `url`; это кандидат для последующего уменьшения запросов, но populate не урезался без проверки полей CMS.

Timeout: было отсутствующим; теперь 8000 мс. Тестированы зависшие заголовки, зависшее JSON-тело, caller abort, успешный JSON и HTTP 503. Таймер и listener убираются в finally.

Что задерживает SSR: главная всё ещё ожидает все секции до deadline. Нет `loading.tsx`/`error.tsx`; отдельного streaming Hero нет. Глобальных UI providers нет: страницы Server Components, клиентские острова отвечают за анимации/меню/слайдеры. Добавленное Suspense изолирует только аналитику и не скрывает содержимое.

Что исправлено: deadline и отделение общих данных от главной. Mapper-функции и snapshot не менялись. CMS-query на клиенте после hydration нет; браузерные запросы — медиа, Next route navigation/prefetch, analytics, а при ошибке диагностика.

=== MOBILE / SAFARI ===

Найденные потенциальные проблемы:

- Next.js реально установлен **16.2.0**, React **19.2.4**, Framer Motion **12.38.0**. Safari ниже 16.4 выходит за официальную минимальную поддержку Next 16. Это основание проверить точную iOS/Safari версию пострадавших, а не доказательство их версии или причины сбоя. [Официальные требования](https://nextjs.org/docs/app/guides/upgrading/version-16).
- Hero имеет fallback `min-h-screen` перед `100svh`, меню — `h-screen`/`max-h-screen` перед dvh. У ряда нижних desktop-секций svh без отдельного vh fallback. Small/dynamic viewport units появились в Safari 15.4; в официально поддерживаемом Safari 16.4 они доступны. [WebKit](https://webkit.org/blog/12445/new-webkit-features-in-safari-15-4/).
- Blur/backdrop filters, тени, fixed overlay, `overflow: clip`, два SiteHeader и большие декодированные оригиналы потенциально увеличивают memory/render cost. CSS и анимации сохранены.
- `window`/`document` используются в эффектах или event handlers; чтения во время SSR первого экрана не найдено. У FloatingActionButtons уже есть guard IntersectionObserver, у ProsCons — guard ResizeObserver. Обработчики browser resize/scroll снимаются в cleanup. Ненужных localStorage/sessionStorage/navigator-запросов во время SSR нет.
- Hero использует `initial={false}`; SSR-текст виден до выполнения JavaScript. Исключены причины типа обязательной opacity 0 до hydration на Hero.

Подтверждены: SSR-зависимость от Strapi, excessive downloads обеих responsive-версий, oversized mobile image, metadata-трафик production video. В Chromium пять основных страниц загрузились без новых runtime/hydration exceptions; меню, первый экран и форма общих элементов сохранены.

Отдельные fault tests: блокирование Cloudinary и Метрики оставляет текст первого экрана видимым; JS выключен — SSR Hero присутствует и отображается; circular error + недоступный diagnostic endpoint не создают цикл запросов.

Только гипотезы: Safari-specific compositor crash, memory kill, ошибка Turbopack на конкретной версии Safari, проблема старого Safari. Физический iPhone и WebKit не запускались. Полностью исключить white screen по этому аудиту нельзя.

Шрифты: Manrope через `next/font/google`, но в runtime файлы локальные `/_next/static/media/*.woff2`; Google Fonts browser requests отсутствуют. Variable weight 200–800, `font-display: swap`; всего 6 subsets-файлов 2,6–24,6 KB, в проверенной странице загружаются 3 примерно на 55,3 KB с HTTP overhead. В CSS есть swap, так что текст не ждёт бесконечно внешний font domain. Preload выставлен next/font для выбранных subsets; шрифты и начертания не менялись.

Bundle: initial first-party JS главной около 209,4 KB до и 212,1 KB после (сжатая передача с HTTP overhead). Chunk `0hrg89zl9~674.js`, 162 135 байт raw, содержит маркеры Framer Motion и входит в initial загрузку. Это совместный chunk с клиентскими компонентами: его полный размер нельзя приписать только библиотеке. Самодельные слайдеры, локальные SVG-иконки; других крупных runtime libraries в package.json нет. Dynamic imports не используются. Long tasks >50 мс в проведённых desktop/mobile Chromium-загрузках не зафиксированы; это не CPU-throttling тест. Оснований удалить Framer Motion нет.

Внешние домены runtime: `res.cloudinary.com` (изображения и видео), `mc.yandex.ru` (новая analytics). Strapi URL серверный, локальное исходное окружение указывало `http://localhost:1337`; production env не исследовался. `formula72-cms.onrender.com` присутствует в remotePatterns/документации как разрешённый старый источник, что не означает активный browser request. Bitrix24, Telegram, VK, маркетплейсы и прочие внешние сайты — ссылки, а не ресурсы, блокирующие первый рендер. Недоступность Cloudinary оставляет текст, но мешает медиа; медиа не awaited до серверного HTML.

=== BUILD ===

`npm run build`: ДВА успешных запуска — исходный и после изменений. Bundler Turbopack, Next.js 16.2.0. Compile, TypeScript, сборка служебных static routes и динамических страниц завершились без ошибок.

Warnings: Browserslist/caniuse-lite сообщает о данных возрастом 7 месяцев. Обновление зависимостей не выполнялось.
Errors build/TypeScript: нет. Отдельный `tsc --noEmit`: exit 0. `git diff --check`: exit 0; есть обычные уведомления Git LF/CRLF, не whitespace errors.
ESLint: НЕ ПРОШЁЛ полностью — 4 старые ошибки / 8 старых warnings. Скрипт сравнения проверил оригиналы `HEAD` и текущие файлы: набор совпадает. Новые файлы и изменения новых замечаний не добавили.

Static: `_not-found`, icon. Все 8 контентных routes динамические до и после; live freshness сохранена. `/api/client-error` — динамический route handler. `npm run start` выполнен на локальном `127.0.0.1:3100`, API fixture — `127.0.0.1:1349`.

После прогрева выполнено по 3 запроса к каждому route:

| Route | HTTP | TTFB, мс (диапазон) | Total, мс (диапазон) | Декодированный HTML, байт |
|---|---|---:|---:|---:|
| `/` | 200 × 3 | 21,2–32,4 | 31,9–44,6 | 490273 |
| `/about` | 200 × 3 | 6,4–7,0 | 9,6–9,7 | 66262 |
| `/production` | 200 × 3 | 5,4–6,1 | 6,9–7,7 | 31273 |
| `/certificates` | 200 × 3 | 5,7–6,6 | 7,4–9,5 | 42112 |
| `/terms` | 200 × 3 | 6,5–6,9 | 8,2–9,0 | 56833 |
| `/personal_data_processing_policy` | 200 × 3 | 7,1–10,1 | 9,6–19,5 | 71809 |
| `/personal_data_processing_consent` | 200 × 3 | 6,1–9,7 | 8,9–12,6 | 77557 |
| `/conditionsforprocessingpersonaldata` | 200 × 3 | 6,2–10,7 | 9,2–13,6 | 74477 |

Этот TTFB относится к прогретому localhost и mock, его нельзя переносить на production Strapi/VPS.

A/B Webpack не проводился: сборка, SSR, chunks и hydration Chromium исправны; установленная проблема воспроизводится задержкой API и eager media, доказательств проблемы bundler нет. Production bundler не переключался. Отсутствие A/B не подтверждает совместимость со всеми Safari.

=== ИЗМЕНЕНИЯ ===

Tracked frontend:

- `lib/api.ts` — deadline 8 секунд с AbortController, включая JSON-body; сохранена caller cancellation, освобождение таймера/listener.
- `lib/queries.ts` — добавлены footer-only и header/footer helpers с существующими mapper/snapshot/mock; исходный getHomePageData и CMS-контент не менялись.
- `app/about/page.tsx` — footer-only вместо полного набора главной.
- `app/terms/page.tsx` — header/footer helper вместо полного набора главной.
- `app/certificates/page.tsx` — тот же переход.
- `app/production/page.tsx` — тот же переход; видео и его preload не менялись.
- `app/personal_data_processing_policy/page.tsx` — общие данные через header/footer helper.
- `app/personal_data_processing_consent/page.tsx` — тот же переход.
- `app/conditionsforprocessingpersonaldata/page.tsx` — тот же переход.
- `app/layout.tsx` — валидация публичного ID, Suspense analytics, серверный noscript.
- `components/diagnostics/client-error-logger.tsx` — catch асинхронного отказа fetch и circular serialization.
- `components/sections/banner-slider.tsx` — eager → lazy у двух responsive-изображений баннеров.
- `components/sections/wholesale-contract-section.tsx` — eager → lazy у desktop background и mobile cards.
- `components/sections/formula72-scheme-section.tsx` — eager → lazy у mobile/desktop scheme.
- `components/sections/mission-k72-section.tsx` — lazy у основных/карточных изображений, снят high fetchPriority далёкой секции.
- `components/sections/who-suits-section.tsx` — eager → lazy у изображений карточек.
- `components/sections/why-trust-us-section.tsx` — eager → lazy у основных и hover-изображений.
- `components/sections/coverage-map-section.tsx` — eager → lazy у карты, аватаров и brand images.
- `components/sections/what-we-can-make-section.tsx` — eager → lazy у основных и hover-изображений; hover video не менялось.
- `components/sections/work-stages-section.tsx` — eager → lazy у desktop/mobile карточек.
- `eslint.config.mjs` — игнорирование временного Chrome profile.
- `README.md` — настройка ID, build-time env, проверка deployment, команда тестирования.

Новые файлы: `components/analytics/yandex-metrika.tsx`, `.env.example`, `scripts/verify-frontend-reliability.mjs`, этот отчёт. В двух редактируемых исходниках (`what-we-can-make-section.tsx`, `wholesale-contract-section.tsx`) при сохранении также удалён UTF-8 BOM; текст/разметка, кроме loading, не переписывались.

Локально изменена игнорируемая `.env.local`: добавлен только публичный ID. Все временные scripts, fixture, JSON/CSV, HTTP HTML, screenshots и отдельный headless profile размещены в уже игнорируемой `.tmp-chrome-debug/audit/`.

Основные доказательства:

- [HTTP до](.tmp-chrome-debug/audit/before-http.json), [HTTP после](.tmp-chrome-debug/audit/after-http.json), [24 прогретых запроса](.tmp-chrome-debug/audit/warm-http.json).
- [Задержка terms до](.tmp-chrome-debug/audit/before-fault-terms.json), [после](.tmp-chrome-debug/audit/after-fault-terms.json), [timeout главной](.tmp-chrome-debug/audit/after-fault-home.json).
- [Сводка transfers, fonts, SPA](.tmp-chrome-debug/audit/summary.json), [video atoms/MD5/bytes](.tmp-chrome-debug/audit/media-details.json).
- [Fault tests браузера](.tmp-chrome-debug/audit/browser-faults.json), [ESLint до/после](.tmp-chrome-debug/audit/lint-comparison.json).
- [Mobile до](.tmp-chrome-debug/audit/before-mobile-home.png), [mobile после](.tmp-chrome-debug/audit/after-mobile-home.png); [desktop до](.tmp-chrome-debug/audit/before-desktop-home.png), [desktop после](.tmp-chrome-debug/audit/after-desktop-home.png). В каждой паре SHA-256 совпадает.

=== ЧТО НЕ МЕНЯЛ ===

Production/VPS/Nginx/PM2/DNS/IPv6/TLS, Git history/remotes, CMS исходники/БД/контент/snapshot, оригиналы media, видео, CSS/дизайн, тексты/документы, анимации/Framer Motion, поведение меню/слайдеров, forms и бизнес-логику.

Не выполнялись: массовое включение image optimizer, lossy conversion, замена CMS media, faststart upload, изменение autoplay/preview, внедрение caching/ISR, streaming Hero, error/loading UI, переключение bundler, обновление packages/Browserslist. Эти варианты отмечены там, где требуют дальнейшей проверки поведения/качества или доступа к production.

=== ВЫВОД ===

Три подтверждённые причины из кода/ресурсов:

1. SSR-зависимость от 17 Strapi-запросов без deadline, в том числе на посторонних внутренних страницах. Воспроизведено и ограничено timeout; внутренние страницы отделены от главной.
2. Eager-загрузка скрытых и нижних оригиналов; особо тяжёлый 10-МБ mobile PNG. Lazy уменьшил initial transfers, но mobile оригинал остаётся реальным узким местом.
3. На `/production` metadata видео 99 МБ с `moov` в хвосте запускает передачу около 4,91 МБ без Play. Это отдельная проблема этой страницы; она не объясняет отсутствие открытия главной.

**Есть основания считать, что frontend/SSR-код вносит существенный вклад в проблему.** Списать её целиком на инфраструктуру сейчас было бы неверно. Однако конкретный intermittent white screen настоящих iPhone не воспроизведён; эти изменения не доказывают его окончательное устранение.

Следующий шаг: проверить proposed diff, затем согласованно оптимизировать mobile image и production video, получить точные Safari/iOS версии/console/network trace проблемного устройства и посмотреть уже существующие client-error логи. Параллельно инфраструктурная диагностика Nginx/VPS/DNS/IPv6/TLS/сети уместна для случая «сайт вообще не открывается», но в рамках этого аудита сервер не исследовался и виновником не объявляется.
