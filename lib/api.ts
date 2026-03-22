const DEFAULT_STRAPI_URL = "http://localhost:1337";

type QueryValue = string | number | boolean | null | undefined;

type StrapiFetchOptions = {
  params?: Record<string, QueryValue>;
  init?: RequestInit;
};

export function getStrapiBaseUrl() {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? process.env.STRAPI_URL ?? DEFAULT_STRAPI_URL;

  return baseUrl.replace(/\/$/, "");
}

export function getStrapiMediaUrl(url?: string | null) {
  if (!url) {
    return null;
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return new URL(url, `${getStrapiBaseUrl()}/`).toString();
}

export function isRemoteAssetUrl(url?: string | null) {
  return Boolean(url && (url.startsWith("http://") || url.startsWith("https://")));
}

function buildQueryString(params?: Record<string, QueryValue>) {
  if (!params) {
    return "";
  }

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    searchParams.append(key, String(value));
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

export async function strapiFetch<T>(path: string, options: StrapiFetchOptions = {}): Promise<T> {
  const url = `${getStrapiBaseUrl()}${path}${buildQueryString(options.params)}`;

  const response = await fetch(url, {
    ...options.init,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(options.init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Strapi request failed: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}
