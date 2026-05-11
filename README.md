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
