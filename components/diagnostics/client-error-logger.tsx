"use client";

import { useEffect } from "react";

type ClientErrorPayload = {
  message: string;
  stack?: string;
  source?: string;
  line?: number;
  column?: number;
  url: string;
  userAgent: string;
  timestamp: string;
};

function normalizeError(error: unknown) {
  if (error instanceof Error) {
    return {
      message: error.message,
      stack: error.stack,
    };
  }

  if (typeof error === "string") {
    return {
      message: error,
    };
  }

  return {
    message: "Unknown client error",
    stack: JSON.stringify(error),
  };
}

function sendClientError(payload: ClientErrorPayload) {
  const body = JSON.stringify(payload);

  try {
    void fetch("/api/client-error", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
      keepalive: true,
    });
  } catch {
    // Diagnostics must never break page rendering.
  }
}

export function ClientErrorLogger() {
  useEffect(() => {
    const buildPayload = (
      message: string,
      stack?: string,
      source?: string,
      line?: number,
      column?: number,
    ): ClientErrorPayload => ({
      message,
      stack,
      source,
      line,
      column,
      url: window.location.href,
      userAgent: window.navigator.userAgent,
      timestamp: new Date().toISOString(),
    });

    const handleError = (event: ErrorEvent) => {
      const normalized = normalizeError(event.error ?? event.message);

      sendClientError(
        buildPayload(
          normalized.message,
          normalized.stack,
          event.filename,
          event.lineno,
          event.colno,
        ),
      );
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const normalized = normalizeError(event.reason);

      sendClientError(buildPayload(normalized.message, normalized.stack));
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, []);

  return null;
}
