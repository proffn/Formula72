# Formula72: второй этап performance-аудита

Дата: 6 октября 2026. Commit, staging, push и deploy не выполнялись. Первый этап сохранён в `PERFORMANCE_AUDIT_REPORT.md`.

=== MOBILE IMAGE ===

**Причина:** `/api/wholesale-contract-section?populate=*` → `OptMobileImage.url` → `mapWholesale()` → `left.MobileImage` → `MobileSplitCard`. При недоступности CMS тот же URL берётся из сохранённого Strapi snapshot. Относительный `/uploads/...` обслуживается frontend из `public/uploads`; это не hardcoded имя в компоненте. `unoptimized` у Next/Image отключал responsive-обработку: браузер получал оригинал независимо от `sizes`.

**Что изменено:** mapper выбирает самый большой доступный Strapi format шириной не более 1600 px, сейчас `large` 1000×654. Только левая мобильная карточка включает Next/Image optimizer. `sizes` соответствует ширине карточки: `calc(100vw - 66px)` до 512 px, далее 446 px. `fill`, `object-cover`, позиционирование, CSS, тексты и анимации сохранены. Без formats сохраняется исходный URL как источник серверного optimizer. CMS, оригинал и все имеющиеся renditions не изменены.

До: `http://127.0.0.1:3100/uploads/opt_mobile2_86df9ced69.jpg`.

После, DPR 1: `http://127.0.0.1:3100/_next/image?url=%2Fuploads%2Flarge_opt_mobile2_86df9ced69.jpg&w=384&q=75`.

На сайте origin этого относительного URL будет `https://formula72.pro`; исправления туда ещё не опубликованы.

| Условие | Размер тела ответа | Network transfer с HTTP overhead | Реальные размеры декодированного файла | Rendered CSS |
|---|---:|---:|---|---|
| До | 10 042 600 B / 10,04 МБ | около 10,04 МБ | 6120×4000, PNG с расширением `.jpg` | 324×199,78 px |
| После, DPR 1 | 8 946 B / 8,95 КБ | 9 389 B | 384×251, AVIF | 324×199,78 px |
| После, DPR 2, `w=750` | 20 726 B / 20,73 КБ | 21 171 B | 750×491, AVIF | 324×199,78 px |
| После, DPR 3, `w=1080` | 28 815 B / 28,82 КБ | 29 260 B | 1000×654, AVIF; без увеличения исходного rendition | 324×199,78 px |

В браузерных Network-логах DPR 1/2/3 нет запроса исходного 10-МБ файла. NaturalWidth при `srcset` корректируется браузером по плотности; размеры выше проверены декодированием фактического HTTP-ответа через Sharp.

**Визуальная проверка:** изображение, композиция и crop сохранены. При одинаковом размере 324×200 визуально совпадают; уменьшение и AVIF-сжатие не дают побитового совпадения. Средняя абсолютная разница каналов RGB 2,19 из 255. Проверочные previews: `.tmp-chrome-debug/audit/stage2/original-rendered.png` и `responsive-rendered.png`. Оригинал по-прежнему существует, размер 10 042 600 B, SHA256 `C037F594E6C319E9664C092E927C66A6A0F23E01ACEE54E437D244A8A0A29EAC`.

Реализация использует существующую конфигурацию formats AVIF/WebP; поведение `sizes` и `unoptimized` описано в [Next/Image](https://nextjs.org/docs/app/api-reference/components/image).

=== VIDEO ===

**Причина:** native `<video controls playsInline preload="metadata">`, без autoplay, poster и IntersectionObserver. Длительность нигде отдельно не читается и не отображается приложением; до Play она нужна только штатной панели браузера. Оригинальный MP4 99 141 182 B, 3840×2160, 60 fps, duration 43,839 s. `moov` расположен в конце файла: запрос metadata приводит к нескольким ranges и передаче мегабайт.

**Что изменено:** `preload="none"`. Если CMS уже задаёт poster, используется он. Иначе для unsigned Cloudinary video выводится JPG первого кадра `so_0,w_1280,q_90,f_jpg`; для локальных, сторонних и signed URLs poster не выдумывается. Активный poster проверен HTTP 200, 1280×720, тело 171 635 B. MP4 URL и файл не изменены:

`https://res.cloudinary.com/dquzly7um/video/upload/v1778831747/main_video2_kvmhkn.mp4`

Poster:

`https://res.cloudinary.com/dquzly7um/video/upload/so_0,w_1280,q_90,f_jpg/v1778831747/main_video2_kvmhkn.jpg`

| Первые 5,5 s без Play | Mobile | Desktop |
|---|---:|---:|
| Первоначальный аудит, mobile | около 4,91 МБ | — |
| Повторный контроль до второго этапа | 4 887 076 B | 4 769 458 B |
| После второго этапа | **0 B, 0 MP4 requests** | **0 B, 0 MP4 requests** |

До Play `readyState=0`, `paused=true`, metadata и duration не загружены. Отображается тот же первый кадр; до Play штатная панель показывает 0:00 без общей длительности. После клика именно по штатной кнопке Play воспроизведение подтверждено на обоих viewport: `paused=false`, время увеличивается, `readyState=4`, duration=43,839 s. Пауза и перемотка до 10 s проверены с ожиданием события `seeked`. Controls и playsInline сохранены; autoplay был false и остаётся false. CSS и размеры контейнера не изменены. Poster и первый кадр MP4 имеют небольшие различия JPEG-сжатия, поэтому `/production` не совпадает побитово.

`preload` — подсказка браузеру, поэтому результат подтверждён Network, а не только HTML-атрибутом. См. [HTML video / MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video). IntersectionObserver не нужен: видео уже видно при открытии страницы, и загрузка при появлении во viewport вернула бы initial traffic. Отложенный `source` не понадобился: native `preload="none"` дал нулевой transfer и сохраняет стандартную кнопку Play. Cloudinary transformation используется только для poster, а не для перекодирования ролика; см. [Cloudinary transformation reference](https://cloudinary.com/documentation/transformation_reference).

Faststart отдельно: оригинальный MP4 и положение `moov` сохранены. Оптимизация старта после Play и отдельная web-версия видео могут быть следующим этапом; они не нужны для достигнутого нулевого initial video transfer. После Play оригинал остаётся тяжёлым, возможна задержка буферизации.

=== PERFORMANCE BEFORE / AFTER ===

Тот же локальный стенд: production `npm run start` на 127.0.0.1:3100, read-only fixture Strapi на 1349 из неизменённого `home.snapshot.json`, Chromium, mobile 390×844 и desktop 1440×900, DPR 1, без CPU/network throttling, cache disabled. Окно — 5,5 s без scroll и Play. Статистика Метрики перехвачена локальным stub, чтобы не отправлять тестовые посещения в рабочий счётчик. Инъекции Kaspersky исключены, как в первом аудите.

| Главная | До первоначальных исправлений | Первый этап | Второй этап |
|---|---:|---:|---:|
| Mobile | 23,07 МБ | 12,03 МБ | **1,99 МБ** |
| Desktop | 22,52 МБ | 2,17 МБ | **2,17 МБ** |

Ниже `до → после` означает первый → второй этап. KB и MB десятичные. Transferred — завершённые responses `encodedDataLength` плюс уже полученные body bytes незавершённых requests; это существенно для streaming ranges. Video — сумма `Network.dataReceived.dataLength` всех MP4/range requests. Не следует сравнивать только завершённые requests и терять мегабайты ещё открытых ranges.

| Viewport / route | TTFB, ms | HTML responseEnd, ms | Transferred, MB | Requests | Initial images, KB | Initial video, MB |
|---|---:|---:|---:|---:|---:|---:|
| Mobile `/` | 227,1 → 335,9 | 228,1 → 336,5 | 12,025 → **1,993** | 35 → 35 | 11204,9 → 1171,4 | 0 → 0 |
| Mobile `/about` | 33,8 → 29,9 | 34,5 → 30,4 | 0,522 → 0,521 | 26 → 26 | 179,1 → 179,1 | 0 → 0 |
| Mobile `/production` | 34,2 → 70,5 | 35,6 → 71,1 | 5,187 → **0,472** | 31 → 28 | 8,4 → 181,0 | 4,887 → **0** |
| Mobile `/terms` | 30,3 → 32,5 | 30,9 → 33,0 | 0,494 → 0,494 | 25 → 25 | 161,9 → 161,9 | 0 → 0 |
| Desktop `/` | 81,3 → 72,0 | 82,1 → 72,8 | 2,170 → **2,171** | 33 → 33 | 1349,6 → 1349,6 | 0 → 0 |
| Desktop `/about` | 28,5 → 35,0 | 29,0 → 35,8 | 0,552 → 0,552 | 33 → 33 | 209,6 → 209,6 | 0 → 0 |
| Desktop `/production` | 29,5 → 20,8 | 30,3 → 21,5 | 5,070 → **0,472** | 32 → 28 | 8,4 → 181,0 | 4,769 → **0** |
| Desktop `/terms` | 26,1 → 28,4 | 26,6 → 29,2 | 0,494 → 0,494 | 25 → 25 | 161,9 → 161,9 | 0 → 0 |

TTFB — navigation.responseStart, HTML response time — navigation.responseEnd, оба от начала navigation. Это одиночные browser runs, главная первой открывалась после запуска каждой сборки. Рост cold TTFB mobile в таблице не скрыт: эти изменения устраняют media transfer, а не обещают ускорение SSR. Прогретые HTTP-запросы после изменений: `/` TTFB 31,2–73,8 ms, HTML 43,6–95,1 ms; `/about` 9,5–9,9 / 13,5–14,4 ms; `/production` 7,6–9,9 / 10,0–12,6 ms; `/terms` 6,8–10,5 / 10,4–14,0 ms. Все 12 responses HTTP 200. Локальные значения не являются замером реального VPS/Strapi.

=== BUILD ===

- `npm run build`: PASS, Next 16.2.0, Turbopack, TypeScript и routes построены.
- `npx tsc --noEmit`: PASS.
- `git diff --check`: PASS; только информационные предупреждения Git LF→CRLF.
- `node scripts/verify-frontend-reliability.mjs`: PASS. Включает API deadlines/abort/body-hang, mapping parity, bounded media format, missing formats, custom/signed/local poster handling.
- Production `npm run start` + browser smoke: PASS, mobile/desktop меню open/close, настоящая SPA navigation без смены document, query/back, отсутствие JS exceptions и битых видимых изображений.
- Метрика: один tag и один init 113464320; hits `/` → `/about` → `/about?audit=2` → `/about` в обоих viewport. Сам tag.js перехвачен, доставка статистики Яндексу не проверялась.
- Native video: Play, pause, seeked PASS на обоих viewport; initial video transfer 0.
- Первые экраны `/`, `/about`, `/terms`: пиксельное совпадение mobile/desktop. На `/production` отличаются сжатие poster и отсутствие duration до Play; layout/кадр/controls сохранены. Тексты/CSS/анимации кодом второго этапа не изменялись.
- ESLint: новых ошибок нет. Сравнение с HEAD: те же 4 существующие `react-hooks/set-state-in-effect` errors и 8 warnings. Файлы: `components/about/about-hero.tsx:20`, `components/layout/floating-action-buttons.tsx:53,84`, `components/sections/banner-slider.tsx:42`. Полный lint пока не зелёный.

=== GIT DIFF ===

**Второй этап:** `lib/queries.ts`, `components/sections/wholesale-contract-section.tsx`, `app/production/page.tsx`, `scripts/verify-frontend-reliability.mjs`, новый `PERFORMANCE_STAGE2_REPORT.md`. Первые три уже были изменены первым этапом; изменения второго этапа добавлены в тот же рабочий diff.

**Первый этап:** README; 8 файлов pages/layout (`about`, `certificates`, `conditionsforprocessingpersonaldata`, `personal_data_processing_consent`, `personal_data_processing_policy`, `production`, `terms` и общий layout); `components/diagnostics/client-error-logger.tsx`; 9 section files (`banner-slider`, `coverage-map-section`, `formula72-scheme-section`, `mission-k72-section`, `what-we-can-make-section`, `who-suits-section`, `wholesale-contract-section`, `why-trust-us-section`, `work-stages-section`); `eslint.config.mjs`; `lib/api.ts`; `lib/queries.ts`. Новые: `.env.example`, `components/analytics/yandex-metrika.tsx`, `scripts/verify-frontend-reliability.mjs`, `PERFORMANCE_AUDIT_REPORT.md`. Игнорируемая `.env.local`: публичный ID Метрики 113464320 из первого этапа. Package/lock/config images не менялись.

**Существовали до всего аудита, не включать в performance commit:**

- `public/images/home/coverage-map/comment1.webp`
- `public/images/home/coverage-map/comment2.webp`
- `public/images/home/coverage-map/comment3.webp`
- `public/images/home/wholesale-contract/opt-mobile3.jpg`
- `public/images/home/wholesale-contract/opt-mobile4.webp`
- `public/videos/main_video3.mp4`
- `public/videos/main_video4.mp4`

**CMS: старые пользовательские tracked edits, аудит их не изменял:**

- `D:/сайты/formula72-cms/src/api/home-page/content-types/home-page/schema.json`
- `D:/сайты/formula72-cms/src/index.ts`

SHA256 всех 7 файлов и 2 CMS-файлов до/после второго этапа совпадает. Stage1 audit также отдельно зафиксировал исходное состояние. Изображение opt_mobile2 и Strapi snapshot не изменены. Git index не пополнялся. Никаких commit/push/deploy.

Временный fixture, browser profiles, scripts, JSON и PNG находятся в уже игнорируемой `.tmp-chrome-debug/audit/stage2/`. Основные доказательства: `summary.json`, `stage1-*-*.json`, `stage2-*-*.json`, `stage2-mobile-*-image-details.json`, `stage2-*-1-video-details.json`, `smoke.json`, `first-screen-comparison.json`, `visual-comparison.json`, `preserved-files-before.json`, `preserved-files-after.json`, `warm-http.json`. Они доступны локально и не входят в предполагаемый commit.

=== ГОТОВНОСТЬ К DEPLOY ===

**Можно безопасно commit/push: ДА, выборочно только файлы performance-аудита, после разрешения пользователя. Сейчас не выполнялось.** Пользовательские media и CMS edits должны остаться за пределами такого commit; не использовать безусловный `git add .`.

Оставшиеся ограничения: production VPS/Nginx и физический Safari/iOS не проверены. `preload="none"` является browser hint; нулевой transfer доказан для Chromium mobile/desktop. Next/Image требует штатного доступа к `/_next/image` и локальным/разрешённым CMS renditions на сервере. Попытка read-only запроса текущего production optimizer из этого окружения завершилась `fetch failed`; его доступность на реальном хосте не подтверждена. CMS source URL, allowed remotePatterns и Next configuration не менялись. Poster зависит от Cloudinary; действующий URL проверен HTTP 200. MP4 после Play остаётся исходным тяжёлым 4K, faststart не применён. В новом deployment нужно сохранить публичный ID Метрики при build. Четыре старые lint errors не исправлялись.
