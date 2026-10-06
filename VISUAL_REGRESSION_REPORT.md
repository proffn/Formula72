# Formula72: проверка media после ручного просмотра

6 октября 2026. Commit, staging, push, deploy и изменение production не выполнялись. Frontend проверяется с реальным локальным Strapi, без fixture. Performance-изменения обоих этапов сохранены.

=== HERO REGRESSION ===

На desktop `/` отсутствовал фон Hero. Точная цепочка: `GET /api/home-page?populate=*` → `heroBackgroundImage.url` → `mapHero()` / `resolveMediaUrl()` → `getStrapiMediaUrl()` → `HeroSection.backgroundImage` → `<Image fill priority unoptimized className="object-contain object-center">` → `http://localhost:3001/uploads/hero_bg_b07ed99bc1.jpg`.

CMS возвращает `/uploads/hero_bg_b07ed99bc1.jpg`, 1920×1078, 93 350 B. Файл есть в `formula72-cms/public/uploads`, но отсутствует в `Formula72/public/uploads`. Resolver сохраняет относительный `/uploads` URL; раньше frontend не умел обслуживать отсутствующий в своей папке CMS asset. Браузер действительно отправлял запрос и получал **404**, `complete=true`, `naturalWidth=0`. Прямой запрос к Strapi возвращал **200**.

`HeroSection`, его `priority`, `unoptimized`, размеры, crop и позиционирование не изменялись performance-аудитом. `mapHero()` и правило сохранения `/uploads` также совпадают с HEAD. Изолированный исходный HEAD `8f8a311` с этой же реальной CMS воспроизводит **тот же 404**. Это проблема обслуживания актуальных локальных uploads, а не исчезновение Hero из-за lazy loading или optimizer. Предыдущая проверка на snapshot fixture не обнаружила её; подтверждение первого экрана в `PERFORMANCE_STAGE2_REPORT.md` относится к тому стенду.

Минимальное исправление приложения — только `next.config.ts`: fallback rewrite `/uploads/:path*` на выбранный Strapi origin, **после проверки локальных файлов**. Уже существующие bundled uploads обслуживаются прежним способом. Новые CMS uploads доступны без копирования файлов или изменения контента CMS. Порядок обработки соответствует [официальной документации Next.js rewrites](https://nextjs.org/docs/app/api-reference/config/next-config-js/rewrites).

После новой сборки тот же frontend URL возвращает **200**, 93 350 B, decoded dimensions **1920×1078**. SHA256 HTTP-тела frontend и Strapi совпадает: `9c0c07258fa0d5a9b3c2fef00fbb1977d452316348ca557e994595b6fd0f361b`. Изображение сохранено побитово. Desktop Hero отображается; его screenshot совпадает с исходным HEAD, которому в тестовом браузере предоставлен этот же отсутствовавший asset.

Mobile Hero отдельно использует CSS background:

`https://res.cloudinary.com/dquzly7um/image/upload/v1777031803/formula72/mobile_hero_bg_44f440c46a.png`

Он загружается с HTTP **200**, 1080×1920, body 540 430 B. Ссылка, `background-size: cover`, позиция `50% 0%`, overlay, текст и анимации сохранены. Mobile первый экран совпадает с HEAD.

=== FULL MEDIA AUDIT ===

Chromium: desktop 1440×900 и mobile 390×844, DPR 1, cache disabled. Все страницы открывались отдельно, полностью прокручивались; проверялись lazy media, переключение баннеров, desktop hover-варианты и footer. Собраны DOM, computed styles, actual `src/currentSrc`, HTTP statuses, размеры, `complete`, visibility и признаки появления во viewport. Дополнительные browser image probes проверили декодирование скрытых вариантов.

| Route | Desktop / mobile | img в каждом viewport | Видимые broken media после исправления |
|---|---|---:|---:|
| `/` | PASS / PASS | 155 | 0 |
| `/about` | PASS / PASS | 17 | 0 |
| `/production` | PASS / PASS | 4 | 0 |
| `/certificates` | PASS / PASS | 13 | 0 |
| `/terms` | PASS / PASS | 7 | 0 |
| `/conditionsforprocessingpersonaldata` | PASS / PASS | 4 | 0 |
| `/personal_data_processing_consent` | PASS / PASS | 4 | 0 |
| `/personal_data_processing_policy` | PASS / PASS | 4 | 0 |

Итого: **8 маршрутов × 2 viewport = 16 проверок**, **416 экземпляров img**, **85 различных фактических image URL**, **2 CSS background записи**, **2 video и 2 poster записи**. Количество включает повторяющиеся header/footer и скрытые desktop/mobile варианты. Полный inventory содержит **422 записи**, HTTP status установлен для всех; ответов 400/404/500 нет. Видимых изображений с `naturalWidth=0` нет, отсутствующих backgrounds нет. Скрытый lazy `<img>` с нулевыми размерами до загрузки не считается видимым broken image; его URL дополнительно проверен декодированием.

Проверены все девять секций, изменённых performance-аудитом: `banner-slider`, `coverage-map`, `formula72-scheme`, `mission-k72`, `what-we-can-make`, `who-suits`, `wholesale-contract`, `why-trust-us`, `work-stages`. Media URL после нормализации optimizer/rendition соответствуют исходным изображениям HEAD. Пропавших asset, изменённого crop или layout не найдено. Hero остаётся critical media с `priority`; below-fold lazy media загружаются при прокрутке и hover. Полные screenshots и отдельные снимки секций сохранены.

Список запросов с ошибкой до исправления: `/uploads/hero_bg_b07ed99bc1.jpg` — 404 в desktop initial load, повторном probe и дополнительных проверках скрытого desktop-варианта на mobile. Других missing media до исправления не найдено.

В полном проходе после исправления браузер отменил один промежуточный responsive request: `/_next/image?url=%2Fuploads%2Flarge_opt_mobile2_86df9ced69.jpg&w=32&q=75`, `net::ERR_ABORTED`, без HTTP error response. Выбранный итоговый `w=384` загрузился с 200; видимое изображение декодировано. Контрольный GET к отменённому `w=32` также дал **200**, 588 B. Это отражено в логах, не исключено из списка ошибок молча. Один дополнительный Node HEAD к Cloudinary MP4 превысил 10 s; повторный HEAD дал 200, реальное воспроизведение — HTTP 206 и `readyState=4` на обоих viewport. Неработающих URL после повторной проверки нет.

=== СРАВНЕНИЕ С HEAD ===

HEAD собран отдельно в `C:/tmp/Formula72-visual-head-8f8a311`; текущий working tree не заменялся через reset/checkout/clean. Используются те же реальные CMS данные, исходные media и те же байты Manrope. Для отдельно собранного HEAD использован кеш шрифта, потому что его webpack build не мог скачать Google Fonts из-за TLS; основной frontend собран штатно через Turbopack.

Исходный HEAD без вмешательства также показывает desktop Hero 404; доказательства сохранены отдельно. Для сравнения дизайна в тестовом браузере HEAD его отсутствующий локально asset подставлялся из Strapi с неизменённым HTTP-телом. Код HEAD и CMS не менялись. Подстановка явно записана в `overrides` browser JSON.

Первый экран `/`, `/about`, `/certificates` и трёх документов совпадает пиксельно в обоих viewport. `/terms` совпадает на desktop; mobile отличие около 0,000034 среднего уровня RGB из 255. `/production` ожидаемо отличается poster JPEG и отсутствием duration до Play. Мобильная wholesale-карточка имеет ожидаемые небольшие AVIF отличия, без изменения содержания или crop. Для слайдера дополнительно сравниваются одинаковые активные slides после загрузки изображений и завершения transition; autoplay не изменялся в коде приложения.

Окончательные viewport-снимки обеих версий просмотрены визуально; два баннера в одинаковом состоянии совпадают пиксельно на обоих viewport. Остальные секции совпадают, кроме mobile wholesale (средняя разница RGB 0,630 из 255), desktop карты (0,122; неизменённая пульсация сердечек) и пренебрежимого отличия mobile work-stages (0,000009). Различные размеры некоторых ранних screenshot clips и снимок промежуточного состояния transition были артефактами CDP `captureBeyondViewport`; контрольные обычные viewport screenshots после image decode устранили их. Доказательства: `stable-sections.json`, `stable-comparison.json`, `*-routes-contact.png`, `*-sections-*.png`.

=== NEXT IMAGE / VIDEO ===

| Проверка optimizer | HTTP | Body | Decoded dimensions |
|---|---:|---:|---|
| Mobile DPR 1, `w=384` | 200 | 8 946 B | 384×251, AVIF |
| Mobile DPR 2, `w=750` | 200 | 20 726 B | 750×491, AVIF |
| Desktop DPR 1/2, DOM fallback `w=3840` | 200 | 28 815 B | 1000×654, AVIF |

На desktop мобильная карточка скрыта и сама браузером не запрашивается; её optimizer URL проверен отдельным GET. Оригинальный 10-МБ opt_mobile2 не скачивается в initial mobile load и не удалён.

`preload="none"`, controls и playsInline сохранены. Poster существует, HTTP 200, 1280×720. За первые **5,5 s без Play — 0 B MP4, 0 Media requests** на desktop и mobile. Штатная кнопка Play запускает загрузку MP4 (HTTP 206), воспроизведение идёт, `readyState=4`, 3840×2160. Проверены pause и завершённый seek до 10 s (`paused=true`, `seeking=false`). Программный `video.play()` для подтверждения клика не использовался. Исходное видео после Play остаётся тяжёлым 4K.

=== PERFORMANCE ===

Production `next start`, реальная локальная CMS 1337, cache disabled, без throttling, первые 5,5 s без scroll/Play. Тестовые запросы Метрики перехватывались; Kaspersky-инъекции исключены. MB десятичные; для незавершённых responses учтены полученные body bytes.

| Viewport / route | Transferred | Requests | Initial images | Initial MP4 |
|---|---:|---:|---:|---:|
| Mobile `/` | **1 993 287 B / 1,993 МБ** | 35 | 1 171 607 B | 0 B |
| Desktop `/` | **2 183 796 B / 2,184 МБ** | 35 | 1 349 823 B | 0 B |
| Mobile `/production` | **472 113 B / 0,472 МБ** | 28 | 180 985 B | 0 B |
| Desktop `/production` | **472 110 B / 0,472 МБ** | 28 | 180 984 B | 0 B |

Большая initial media загрузка не вернулась. Это текущие реальные CMS данные; предыдущая таблица второго этапа использовала fixture и остаётся отдельным контрольным замером.

=== BUILD / МЕТРИКА ===

- `npm run build`: PASS, Next 16.2.0 / Turbopack, TypeScript и routes построены. Новая сборка `8Yozk4FPSE3ql-RkIDoWV` запущена после build.
- `npx tsc --noEmit`: PASS.
- `git diff --check`: PASS, только информационные LF→CRLF warnings.
- `node scripts/verify-frontend-reliability.mjs`: PASS.
- Все 8 HTML routes и CMS API: HTTP 200. Browser JavaScript / hydration exceptions: 0.
- Browser smoke новой сборки: desktop/mobile меню open/close, Next Link с сохранением document, query/back — PASS. Галерея всех 8 сертификатов и открытие/закрытие полноэкранного preview — PASS на обоих viewport. Footer screenshots всех маршрутов просмотрены. Доказательства: `smoke.json`, `gallery.json`, `*-footers-contact.png`.
- Метрика сверена с [официальным руководством Яндекса для SPA](https://yandex.ru/support/metrica/ru/code/counter-spa-setup), [init](https://yandex.ru/support/metrica/ru/code/counter-initialize) и [hit](https://yandex.ru/support/metrica/ru/objects/hit). `defer:true` с ручными `hit` соответствует рекомендациям. Реализация не изменена.
- На новой сборке каждый маршрут: один tag.js, один init 113464320 и один initial hit; параметры ssr/webvisor/clickmap/ecommerce/accurateTrackBounce/trackLinks/referrer/url сохранены. Настоящий Next Link, Back/Forward и query проверены без второго init и лишнего pageview; referer предыдущего hit верен. Noscript есть на всех маршрутах. Tag.js непосредственно доступен; отправка статистики в рабочий счётчик намеренно не тестировалась.
- `NEXT_PUBLIC_YANDEX_METRIKA_ID=113464320` присутствует в `.env.local`; файл ignored и отсутствует среди tracked файлов. Production ID и корректный Strapi origin должны быть заданы **до build**.

=== GIT / СОХРАННОСТЬ ===

Новый application diff этой проверки: **только `next.config.ts`**. Добавлен этот отчёт. Изменения первого/второго performance-этапа сохранены; пользовательские media и CMS source edits не добавлялись в index.

Во время подготовки отдельного HEAD ошибочная Windows move операция временно перенесла содержимое junction-каталогов public/node_modules. Файлы восстановлены. После восстановления проверены **все 641 tracked public asset побитово относительно HEAD**, **7 исходных пользовательских media** и **2 исходных CMS source-файла** по SHA256 относительно сохранённого baseline — все совпадают. Оригинальный opt_mobile2 и зависимости присутствуют; build работает. Ошибка не скрывается и не считается изменением пользователя.

Доказательства в игнорируемой `.tmp-chrome-debug/visual-audit/`: `before/`, `after/`, `head-reference/`, `media-inventory.json`, `summary.json`, `targeted.json`, `http-recheck.json`, `preserved-verification.json`, screenshots и comparison JSON. Сырые HEAD Hero доказательства: `.tmp-chrome-debug/hero-diagnosis-head-raw.json`; Метрика: `.tmp-chrome-debug/manual-preview-verification.json`.

Commit: **НЕТ**. Push: **НЕТ**. Deploy: **НЕТ**. Production не изменялся. Физический Safari/iOS и production Nginx/VPS не проверены; fallback для отсутствующих bundled uploads требует доступности выбранного CMS с frontend-сервера.

=== LOCAL SITE ===

Открыть: **http://localhost:3001**.

Frontend: `next start --hostname 127.0.0.1 --port 3001`, PID 11044. Реальный Strapi: `strapi develop`, `http://localhost:1337`, PID 26168, локальная SQLite. Fixture не используется. Frontend и CMS оставлены запущенными для ручной проверки пользователя. Commit/push/deploy ожидают отдельного разрешения после ручного просмотра.

=== ФИНАЛЬНАЯ ПОДГОТОВКА ПОСЛЕ РУЧНОЙ ПРОВЕРКИ ===

7 октября 2026: пользователь подтвердил корректное отображение локальной production-версии и разрешил выборочный frontend commit/push. Deployment и любые изменения VPS/Nginx/PM2/production env не разрешены и не выполняются.

Повторные `npm run build`, `npx tsc --noEmit`, `git diff --check` и `node scripts/verify-frontend-reliability.mjs` — PASS. Новая финальная локальная сборка `Vi5dgjO24p57q9EXbkRAk`, frontend PID 30556 на прежнем порту 3001; CMS не перезапускалась и не менялась.

Метрика повторно сверена с официальными SPA/init/hit документами Яндекса. Реализация не изменена. Browser-проверки новой сборки: один tag.js, один init и один initial hit на каждом из 8 маршрутов; Next Link, Back/Forward, query, referer, параметры init и noscript — PASS. Desktop/mobile menu и SPA smoke — PASS; JS/hydration errors нет. Тестовые pageviews перехвачены, доставка статистики в рабочий счётчик не проверялась. ID 113464320 присутствует в игнорируемой `.env.local` и должен быть задан на production до будущего build.

Проверена сохранность всех 7 пользовательских media и 2 CMS source-файлов; они исключаются из frontend commit. `.env.local`, `.tmp-chrome-debug`, browser profiles, screenshots/JSON и секреты не включаются. Исторические статусы commit/push выше относятся к завершению предыдущей проверки; фактический SHA и результат разрешённого push сообщаются отдельно после операции.
