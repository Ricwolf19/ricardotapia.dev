"use client";

import { useCallback, useEffect, useRef } from "react";

interface Grecaptcha {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
}

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

/**
 * Loads the reCAPTCHA v3 script on demand and exposes a `getToken` function.
 * When no site key is provided (not configured) it is a no-op that resolves to
 * `undefined`, so the contact form keeps working without reCAPTCHA.
 */
export const useRecaptcha = (siteKey?: string) => {
  const loaded = useRef(false);

  useEffect(() => {
    if (!siteKey || loaded.current) return;
    if (document.querySelector("script[data-recaptcha]")) {
      loaded.current = true;
      return;
    }
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.dataset.recaptcha = "true";
    document.head.appendChild(script);
    loaded.current = true;
  }, [siteKey]);

  const getToken = useCallback(
    async (action: string): Promise<string | undefined> => {
      if (!siteKey || !window.grecaptcha) return undefined;
      return new Promise((resolve) => {
        window.grecaptcha!.ready(() => {
          window
            .grecaptcha!.execute(siteKey, { action })
            .then(resolve)
            .catch(() => resolve(undefined));
        });
      });
    },
    [siteKey],
  );

  return { getToken };
};
