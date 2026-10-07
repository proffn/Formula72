# Formula72: динамическое меню Strapi — локальная проверка

7 октября 2026. Работа выполнена только локально. Commit, staging, push, deploy и изменения production не выполнялись. Frontend HEAD остаётся `c5c1e754d727fa309c313accbec94c330d657ab9`.

=== BEFORE ===

Site Header использовал восемь legacy-полей: `navAboutLabel/Href`, `navProductionLabel/Href`, `navWholesaleLabel/Href`, `navReviewsLabel/Href`. `mapSiteHeader()` собирал четыре пункта; `SiteHeader` дополнительно ограничивал массив через `slice(0, 4)`. Нумерация уже вычислялась по индексу. На главной существуют отдельные скрываемые CSS desktop/mobile экземпляры Header; в видимом меню пункты не дублируются. Внутренние страницы имеют собственные layouts с «На главную» — они сохранены.

Локальный header: documentId `exjcit28ulyhn8j0bscbbd3p`. Его исходные значения сохранены в CMS `.tmp/dynamic-menu/header-before.json`, SQLite — `.tmp/dynamic-menu/data-before.db`. Legacy `/about` хранится как `#hero`, но прежний mapper уже преобразовывал его в `/about`.

=== NEW CMS MODEL ===

`Site Header.navigationItems`: repeatable `shared.navigation-item`. Поля `label` и `href` — обязательные строки. Ограничения количества нет. Штатный Content Manager поддерживает Add an entry, Delete и изменение порядка; список отображается первым в форме. Legacy-поля сохранены в схеме и данных, скрыты в основной форме редактирования.

Использованы штатные [repeatable components](https://docs.strapi.io/cms/features/content-type-builder) и [Content Manager](https://docs.strapi.io/cms/features/content-manager).

=== DATA MIGRATION ===

В CMS добавлен явный одноразовый `scripts/migrate-navigation-items.js`, запускаемый командой `node scripts/migrate-navigation-items.js` из CMS repository. Он не выполняется при старте сервера. Миграция использует [Strapi Document Service](https://docs.strapi.io/cms/api/document-service), сохраняет JSON исходных draft/published версий до записи и оставляет marker в Strapi store. Повторный запуск проверен: пункты повторно не создаются. Прямых SQL-записей и ручных изменений SQLite не было; schema sync выполнен Strapi.

Published переносится из исходной published версии, затем исходный draft восстанавливается с новым списком. Это сохраняет отдельные черновые значения и не публикует посторонние draft edits. Legacy-значения, логотипы, телефон и график сохранены. Настройки формы меняются штатным Content Manager configuration service/API.

Итоговый реальный список:

| № | Label | Href |
|---|---|---|
| 01 | О нас | `/about` |
| 02 | Производство | `/production` |
| 03 | Опт | `https://b24-k8i1gh.bitrix24site.ru/crm_form_cw6nx/?utm_source=website_contract72` |
| 04 | Отзывы | `/#coverage-map` |

=== FRONTEND ===

Строгий API type добавлен в `StrapiSiteHeader`; UI получает существующий `NavItem[]`. `lib/navigation.ts` читает весь `navigationItems`, сохраняет порядок и фильтрует невалидные элементы. Legacy fallback применяется только при отсутствующем/null списке. `[]` означает намеренно пустое меню; legacy-пункты не возвращаются. Источники не смешиваются.

Braille Blank и другие blank fillers не считаются видимым названием. Настоящие русские, латинские и Unicode названия, включая emoji с ZWJ, сохраняются. Ссылки с управляющими/невидимыми символами, `javascript:`, `data:`, protocol-relative URL и credentials отклоняются. Допустимы `/...`, `#...`, `/#...`, HTTP/HTTPS. Hash-only ссылки нормализуются к домашнему origin. Internal links сохраняют Next Link; external URL сохраняет существующий `_blank` и `noreferrer`.

Все элементы рендерятся без slice и фиксированного количества. Номера: `String(index + 1).padStart(2, "0")`. Ключи не конфликтуют при одинаковых названиях. При закрытии menu становится inert, Escape закрывает его. Контактная ссылка использует `/#wholesale-contract`.

`/api/site-header?populate=*` уже включает repeatable component и media, поэтому populate не расширялся. Существующие `cache: "no-store"` и dynamic routes сохранены. После Publish и обновления страницы данные появляются без frontend rebuild; автоматической live-подмены уже открытого документа нет.

=== RESPONSIVE ===

21 итоговый browser-сценарий: 0–8 пунктов на 1440×900 и 390×844; восемь пунктов дополнительно на 375×667 и 430×932; 11 пунктов на 375×667 для номеров 10/11. Все PASS, включая обязательные 3/4/5/6/8.

Длинные названия с пробелами и без них, Français/日本語 проверены. Перенос текста, вертикальная прокрутка nav, достижимость последнего пункта, отсутствие горизонтального переполнения и пересечений с контактной карточкой подтверждены. Верхнее desktop меню переносит строки в ограниченной области между логотипом и контактами; длинное название в списке из четырёх пунктов отдельно проверено без overlap. Количество пунктов не управляет layout через условие на четыре элемента.

Цвета, Manrope, размеры текста, branding, close button, hover и transition 0,3 s сохранены. В первоначальном dynamic-menu изменении `py-4.5` был заменён на `py-[18px]`. Это изменило исходную плотность строк: прежний Tailwind 3.4 не генерировал `py-4.5`, фактический padding был 0. После ручной проверки пользователя изменение исправлено на `py-0`; точное сравнение с production commit и новые проверки приведены ниже.

=== CMS ADMIN TEST ===

В настоящем браузере открыт локальный Content Manager → «Шапка сайта». Add an entry → «Тест» / `/about` → Save → Publish — PASS. Новый пункт появился как 05 без rebuild. Reorder через штатный Move up → Save/Publish — PASS: «Тест» стал 04, «Отзывы» — 05. Delete → Save/Publish — PASS: реальный список восстановлен. Итоговая удобная форма со списком наверху просмотрена отдельно на desktop.

Реальный click «Тест» дополнительно проверен на desktop/mobile: Next navigation в `/about`, document сохраняется, body unlock — PASS. Все временные списки, включая пустой и 8/11 пунктов, после тестов заменены реальным списком. Тестовых пунктов в CMS не осталось.

Для UI-тестов использован отдельный временный локальный admin с credentials только в памяти тестового процесса. Аккаунт удалён штатным admin service, sessions инвалидированы, loopback helper закрыт. Read-only проверка SQLite: исходных admin accounts было 1 и осталось 1; временных accounts — 0. Существующие accounts/passwords не изменялись.

=== BUG 03 ===

Production diagnosis ранее обнаружил `U+2800` в label/href. В исходной локальной CMS «Опт» уже был корректным. Новый основной список содержит подтверждённую форму и «Опт»; искусственные U+2800 значения отфильтрованы тестом. В видимом меню нет пустого пункта и ссылки на `/%E2%A0%80`. Bitrix GET: HTTP 200. Production CMS в этой задаче не исправлялась.

=== REGRESSION ===

Desktop/mobile: burger open/close, close button, Escape, body scroll lock/unlock, Next Link `/about`, сохранение document, Back, возврат «На главную», scroll к `#coverage-map`, открытие external «Опт» в новой вкладке — PASS. Длительность transition 0,3 s проверена. Screenshots реальных меню и внутренних страниц просмотрены.

Все восемь HTML routes: HTTP 200. Browser smoke `/`, `/about`, `/production`, `/certificates` на desktop/mobile: visible broken initial images 0, JavaScript/console/hydration exceptions 0, HTTP error responses 0. Video сохраняет native controls и preload none. Полный повтор прежнего media/performance audit не выполнялся: изменения ограничены navigation. Отменённые при переходах браузерные запросы сохранены в raw evidence и не приравниваются к HTTP errors. Проверки Метрики в smoke перехватывались локальным stub; analytics implementation не менялась.

=== BUILD ===

- Frontend `npm run build`: PASS, Next 16.2.0 / Turbopack.
- `npx tsc --noEmit`: PASS.
- `node scripts/verify-frontend-reliability.mjs`: PASS.
- `node scripts/verify-navigation.mjs`: PASS — order, empty menu, Unicode, safe links, legacy и более четырёх элементов.
- `git diff --check` обоих repositories: PASS; информационные LF→CRLF warnings.
- CMS `npm run build`: PASS; штатный `strapi ts:generate-types` и `npx tsc --noEmit`: PASS; migration syntax и повторный запуск: PASS.

Один промежуточный повтор build не смог скачать Google Fonts Manrope из-за внешнего соединения. Следующий штатный `npm run build` прошёл; font mock, замена шрифта и изменение dependencies не использовались. Запущена именно итоговая успешная сборка `tvtF3qJ1XrVjA4ijNZOrN`.

=== CHANGED FILES ===

Frontend: `components/layout/site-header.tsx`, `lib/navigation.ts`, `lib/queries.ts`, `lib/mock/home.ts`, `types/strapi.ts`, `scripts/verify-navigation.mjs`, этот отчёт.

CMS: `src/api/site-header/content-types/site-header/schema.json`, `src/components/shared/navigation-item.json`, `scripts/migrate-navigation-items.js`, `types/generated/components.d.ts`, `types/generated/contentTypes.d.ts`. Также штатно изменены локальные SQLite/schema/content-manager settings для новой модели.

=== GIT ===

Commit: НЕТ. Push: НЕТ. Deploy: НЕТ. Staging: НЕТ. Production не изменялась, VPS для этой задачи не использовался.

Все семь исходных пользовательских media и два существующих CMS source edits (`home-page/schema.json`, `src/index.ts`) совпадают побитово с началом задачи по SHA256. Они не изменялись и остаются в working tree. Старые untracked `BURGER_03_DIAGNOSIS.md` и `NETWORK_AUDIT_REPORT.md` сохранены. `.env.local`/CMS `.env`, package files, зависимости и прежние performance/media изменения не менялись. Debug screenshots, profiles, JSON и backup SQLite находятся в ignored directories.

Evidence: frontend `.tmp-chrome-debug/dynamic-menu/` — `responsive.json`, `long-header.json`, `admin-final.json`, `add-click.json`, `regression.json`, `health.json`, screenshots. CMS `.tmp/dynamic-menu/` — backup SQLite, исходный header, SHA256 preservation results и локальные server logs; `.tmp/navigation-before-*.json` — исходные draft/published версии.

=== LOCAL ===

Frontend: http://localhost:3001 — `next start --hostname 127.0.0.1 --port 3001`, актуальный PID 27564 после final release audit, build `fwtXpStZ-6r0xtd54pPb8`.

Strapi: http://localhost:1337/admin — штатный `strapi develop`, real local SQLite, PID 23804. Fixture не используется. Обе службы оставлены запущенными для ручной проверки. Production deployment требует отдельного разрешения и согласованного обновления двух repositories.

=== TYPOGRAPHY ROOT CAUSE ===

7 октября: source of truth — `git show c5c1e754d727fa309c313accbec94c330d657ab9:components/layout/site-header.tsx`. Сравнены исходные TSX, globals.css, tailwind.config.ts и зависимости; исходная конфигурация Tailwind 3.4 использована для отдельной генерации OLD/CURRENT CSS.

Old production label classes: `text-[29px] font-semibold leading-[0.96] tracking-[-0.05em] sm:text-[32px]`. Current до исправления: те же значения. Увеличения font-size, line-height, font-weight или letter-spacing в git diff нет.

Old row: `group border-b ... py-4.5 ...`. Current до исправления: `group shrink-0 border-b ... py-[18px] ...`. Old `py-4.5` не имеет CSS-правила; computed padding top/bottom = 0 px. Current было 18/18 px. Это добавило 36 px к каждой строке, увеличив четыре пункта на 144 px. Ручное замечание пользователя об увеличенном меню подтверждено; прежний отчёт не обеспечивал сохранение визуальной плотности.

OLD/CURRENT before: desktop row 35 → 71 px; mobile row 32,6 → 68,6 px. Размеры букв совпадали, но расстояния между ними выросли.

=== FIX ===

Единственное новое application изменение этой проверки: `components/layout/site-header.tsx`, `py-[18px]` → `py-0`. Явный нулевой padding воспроизводит фактический OLD CSS. Динамические ограничения ширины, перенос текста и `shrink-0` сохранены.

| Параметр | Desktop 1440×900 | Mobile 390×844 |
|---|---:|---:|
| Font-size | 32 px | 29 px |
| Line-height | 0,96 / 30,72 px | 0,96 / 27,84 px |
| Font-weight | 600 | 600 |
| Letter-spacing | −0,05em / −1,6 px | −0,05em / −1,45 px |
| Padding top/bottom | 0 / 0 px | 0 / 0 px |
| Высота обычной строки с separator | 35 px | 32,6 px |
| Gap номер → label | 14 px (`gap-3.5`) | 14 px |
| Gap текст → arrow | 16 px (`gap-4`) | 16 px |

Вертикального gap между rows нет. Border bottom 1 px сохранён. Номер 11 px, arrow 18 px и его `pt-1` 4 px сохранены. До `sm` (640 px) label 29 px, начиная с `sm` 32 px — как в исходном commit. Начальный nav `mt-3` 12 px, branding `pb-6` 24 px и контактный блок не менялись. При переносе длинной строки её высота растёт естественно; размер шрифта от количества пунктов не зависит.

=== VISUAL COMPARISON / DYNAMIC MENU ===

OLD/CURRENT сравнивались в изолированном локальном browser harness: точный OLD TSX и текущий TSX через React SSR, отдельно сгенерированный Tailwind CSS, одинаковые реальные Manrope bytes, логотипы/телефон из локального Strapi и список «О нас / Производство / Опт / Отзывы». Harness принудительно показывает aside только для визуального сравнения; это не замена работающей CMS и не production deployment.

1440×900 и 390×844: computed typography, gap, полные DOM rectangles четырёх rows и labels совпадают точно. Screenshots обеих версий просмотрены. Desktop PNG совпадает побитово. Mobile геометрия совпадает; raster difference — 2561 pixels, максимум 2 уровня RGB из 255, включая фон/декоративные элементы. Pixel-perfect mobile не заявляется.

3/4/5/6/8 пунктов на обоих viewport: PASS, нумерация/переносы/достижимость последнего пункта, horizontal overflow 0, пересечений с контактами нет. Дополнительный 375×667 с восемью пунктами: scrolling реально требуется и работает, последний пункт доступен, все labels сохраняют 29 px.

На настоящем frontend новой сборки, с реальной CMS: desktop/mobile computed sizes и heights соответствуют OLD; open/Escape и body lock/unlock PASS, JS exceptions 0. Текущий пользовательский опубликованный список содержит три пункта («О нас / Производство / Отзывы»); он не изменялся и «Опт» обратно в CMS не добавлялся. Тестовые варианты задавались исключительно через props локального harness, без записей в CMS.

Add/remove/reorder и navigationItems architecture сохранены; миграция/модель/mapper/Unicode validation/internal-external links не менялись. `slice(0,4)` не возвращён. Существующие функциональные navigation tests PASS.

=== BUILD / LOCAL AFTER TYPOGRAPHY FIX ===

- `npm run build`: PASS, Next 16.2.0 / Turbopack, build `1uwUPKesJ2g-vdI2vtRKq`.
- `npx tsc --noEmit`: PASS.
- `git diff --check`: PASS, информационные LF→CRLF warnings.
- `node scripts/verify-navigation.mjs`: PASS.

Frontend http://localhost:3001, PID 28116, запущена новая сборка. Strapi http://localhost:1337/admin, прежний PID 23804, не перезапускалась. Временный comparison server и task browser закрыты после проверки.

Commit: НЕТ. Push: НЕТ. Deploy: НЕТ. Staging: НЕТ. Production не использовалась. CMS values, пользовательские media и старые source edits не менялись.

Evidence (ignored): `.tmp-chrome-debug/dynamic-menu/typography-before.json`, `typography-after.json`, `typography-live.json`, `typography-final.json`, `typography-{old,current}.css`, OLD TSX, screenshots OLD/CURRENT и реального локального меню.

=== APPROVED RELEASE PREPARATION ===

7 октября пользователь одобрил выборочные commit/push обоих repositories и coordinated production deployment с backup БД и миграцией. Source of truth для release — текущий published список из трёх пунктов: «О нас» `/about`, «Производство» `/production`, «Отзывы» `/#coverage-map`. «Опт» автоматически не возвращается. Исторические статусы локальных проверок выше относятся к соответствующим этапам; фактические release SHA и deployment verification сохраняются в отдельном отчёте после операции.

Изначальная миграция из legacy создавала четыре пункта. До commit она расширена явным reviewed JSON input через `--menu-file <path>` или `FORMULA72_NAVIGATION_MENU_FILE`; `--dry-run` печатает план без Document Service записей. Legacy поведение остаётся только для запуска без explicit input. Approved input проверяет видимые labels, безопасные canonical href и duplicates; migration marker содержит SHA256 итогового меню. Если marker существует, но опубликованные данные расходятся с переданным approved списком, script прекращает работу, не перезаписывая последующие editor changes. При успешном повторе marker/documents/admin config повторно не записываются.

Новый migration путь проверен на consistent SQLite backup в отдельной ignored test directory, с отдельным DATABASE_FILENAME. Тест подготовил legacy U+2800 и отличающийся неопубликованный draft phone. Preview показал ровно одобренные три пункта; native Document Service migration — PASS; обе draft/published версии, legacy и media сохранены. Повтор — PASS: marker и полные document versions не изменились. Рабочая локальная CMS БД не использовалась для этих записей. Сам JSON reviewed списка содержит только публичные label/href, вне Git; он передаётся на production отдельно от application code.

Final local audit: frontend build, TypeScript, reliability, navigation, diff check — PASS; CMS build, `strapi ts:generate-types`, TypeScript, diff check и migration syntax — PASS. Browser desktop/mobile на настоящем approved списке: 32/29 px, line-height 0,96, padding 0, open/Escape/body lock — PASS. Новых dependencies или package changes нет. Финальный staged scope: семь frontend файлов и пять CMS файлов из исходного разрешённого списка; исключаются пользовательские media, существующие CMS edits, network reports, env и вся временная evidence.
