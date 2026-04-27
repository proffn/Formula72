# Formula72

Frontend project for Formula72 built with Next.js and integrated with Strapi CMS.

## Strapi fallback snapshot

The frontend uses Strapi first. If Strapi is unavailable, `getHomePageData()` reads the local CMS snapshot from `lib/mock/home.snapshot.json`.

Update the snapshot after CMS content changes:

```bash
npm run sync:fallback
```

By default the script reads `NEXT_PUBLIC_STRAPI_URL` from `.env.local`. To export from another Strapi instance:

```bash
$env:SNAPSHOT_STRAPI_URL="https://formula72-cms.onrender.com"; npm run sync:fallback
```

Local Strapi uploads are copied into `public/cms-uploads` and snapshot URLs are rewritten to `/cms-uploads/...`, so the fallback can render without a running Strapi server. Cloudinary URLs remain remote URLs.
