type QueryValue = string | number | boolean | null | undefined;

type StrapiFetchOptions = {
  params?: Record<string, QueryValue>;
  init?: RequestInit;
  timeoutMs?: number;
};

export function getStrapiBaseUrl() {
  const baseUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;

  return baseUrl?.replace(/\/$/, "") ?? "http://127.0.0.1:1337";
}

export function getStrapiMediaUrl(url?: string | null) {
  if (!url) {
    return null;
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  if (url.startsWith("/uploads/") || url.startsWith("/cms-uploads/")) {
    return url;
  }

  const baseUrl = getStrapiBaseUrl();

  if (!baseUrl) {
    return url;
  }

  return new URL(url, `${baseUrl}/`).toString();
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
  const baseUrl = getStrapiBaseUrl();
  const apiToken = process.env.STRAPI_API_TOKEN;

  if (!baseUrl) {
    throw new Error("Strapi URL is not configured");
  }

  const url = `${baseUrl}${path}${buildQueryString(options.params)}`;

  // Keep the deadline active while reading the body as well as waiting for headers.
  const controller = new AbortController();
  const callerSignal = options.init?.signal;
  const abortFromCaller = () => controller.abort(callerSignal?.reason);
  if (callerSignal?.aborted) {
    abortFromCaller();
  } else {
    callerSignal?.addEventListener("abort", abortFromCaller, { once: true });
  }
  const timeout = setTimeout(() => controller.abort(new Error("Strapi request timed out")), options.timeoutMs ?? 8000);

  try {
    const response = await fetch(url, {
      ...options.init,
      signal: controller.signal,
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(apiToken ? { Authorization: `Bearer ${apiToken}` } : {}),
        ...(options.init?.headers ?? {}),
      },
    });

    if (!response.ok) {
      throw new Error(`Strapi request failed: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
    callerSignal?.removeEventListener("abort", abortFromCaller);
  }
}
