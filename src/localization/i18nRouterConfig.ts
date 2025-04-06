import { NextRequest } from "next/server";

export const i18nRouterConfig: {
  locales: readonly string[];
  defaultLocale: string;
  prefixDefault: boolean;
  serverSetCookie: "always" | "if-empty" | undefined;
  localeDetector: (
    request: NextRequest,
    config: { locales: readonly string[]; defaultLocale: string }
  ) => string;
} = {
  locales: ["en", "ar"],
  defaultLocale: "ar",
  prefixDefault: true,
  serverSetCookie: "always",
  localeDetector: (request, config) => {
    //* 1- Check if NEXT_LOCALE cookie exists
    const nextLocale = request.cookies.get("NEXT_LOCALE");
    if (nextLocale && config.locales.includes(nextLocale.value)) {
      return nextLocale.value;
    }

    //* 2- If no valid cookie is found, check the Accept-Language header to get the user's browser language
    const acceptLanguage = request.headers.get("Accept-Language");
    if (acceptLanguage) {
      // Parse the Accept-Language header
      const languages = acceptLanguage
        .split(",")
        .map((lang) => lang.split(";")[0]);

      // Find the first language that matches our supported locales, whereas they are ordered by priority and quality
      for (const lang of languages) {
        const shortLang = lang.slice(0, 2).toLowerCase(); // ex. get en from en-us
        if (config.locales.includes(shortLang)) {
          return shortLang;
        }
      }
    }

    //* 3- If no matching language is found, return the default locale
    return config.defaultLocale;
  },
};
