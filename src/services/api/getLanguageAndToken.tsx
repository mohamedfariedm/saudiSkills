import { getCookie } from "cookies-next/client";
import { i18nRouterConfig } from "@/localization/i18nRouterConfig";
const IsServerSide = typeof window === "undefined";

export const getLanguageAndToken = async () => {
  if (IsServerSide) {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    return {
      lang:
        cookieStore.get("NEXT_LOCALE")?.value || i18nRouterConfig.defaultLocale,
      token: cookieStore.get("UT")?.value || "",
    };
  } else {
    return {
      lang: getCookie("NEXT_LOCALE") || i18nRouterConfig.defaultLocale,
      token: getCookie("UT") || "",
    };
  }
};
