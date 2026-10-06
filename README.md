# Formula72

Frontend project for Formula72 built with Next.js and integrated with Strapi CMS.

## Strapi fallback snapshot

The frontend uses Strapi first. If Strapi is unavailable or `NEXT_PUBLIC_STRAPI_URL` / `STRAPI_URL` is not configured, `getHomePageData()` reads the local CMS snapshot from `lib/mock/home.snapshot.json`.

Update the snapshot after CMS content changes:

```bash
npm run sync:strapi-snapshot
```

By default the script reads `NEXT_PUBLIC_STRAPI_URL` from `.env.local`. To export from another Strapi instance:

```bash
$env:SNAPSHOT_STRAPI_URL="https://formula72-cms.onrender.com"; npm run sync:strapi-snapshot
```

If a section is not public in Strapi, provide a read-only API token:

```bash
$env:SNAPSHOT_STRAPI_URL="https://formula72-cms.onrender.com"
$env:SNAPSHOT_STRAPI_TOKEN="<read-only-token>"
npm run sync:strapi-snapshot
```

The script keeps media URLs exactly as Strapi returns them. Cloudinary URLs stay as `https://res.cloudinary.com/...`. If any `/uploads/...` URLs are still present, the script prints a warning so the media record can be migrated in Strapi.

Before overwriting the snapshot, the previous file is copied to `lib/mock/snapshot-backups/`.

To check the fallback mode locally, temporarily unset `NEXT_PUBLIC_STRAPI_URL` / `STRAPI_URL` or point it to an unavailable URL and run:

```bash
npm run build
```
## Относительные CMS uploads

Существующие `/uploads/...` обслуживаются из frontend `public/uploads`. Если файла
там нет, fallback rewrite запрашивает его у CMS, выбранной через `STRAPI_URL` или
`NEXT_PUBLIC_STRAPI_URL`. Укажите корректный CMS origin до `npm run build`:
rewrite сохраняется в сборке. При недоступности CMS отсутствующие локальные media
также будут недоступны. Оригиналы и CMS-контент эта обработка не изменяет.

# Яндекс Метрика

Перед production-сборкой задайте `NEXT_PUBLIC_YANDEX_METRIKA_ID=113464320`
в окружении или в игнорируемом `.env.local`. Несекретный пример находится в `.env.example`.
Если ID отсутствует или некорректен, счётчик не подключается. После изменения ID нужна новая сборка.

Счётчик подключён в корневом layout через `next/script` с `afterInteractive`.
SPA-навигация учитывается через `usePathname` и `useSearchParams`: `defer: true`
отключает автоматический просмотр при инициализации, затем каждый новый URL
получает один `hit`. Переходы внутри секций по hash не создают отдельный просмотр.

После deployment проверьте Network: один `tag.js?id=113464320`, запросы `watch/113464320`,
один просмотр при открытии страницы, ещё один при переходе через Next Link,
работу кнопки «Назад» и отсутствие hydration ошибок. Проверяйте с отключённым блокировщиком рекламы.
При CSP, заданной вне приложения, потребуется проверить разрешения доменов Метрики отдельно.

Проверка устойчивости API и сохранения header/footer:

```sh
node scripts/verify-frontend-reliability.mjs
```
