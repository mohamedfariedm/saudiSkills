import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { i18nRouter } from "next-i18n-router";
import { i18nRouterConfig } from "./localization/i18nRouterConfig";
import { routes } from "./constants/routes";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  const { pathname } = request.nextUrl;
  const pathSegments = pathname.split("/").filter(Boolean);

  // Get the actual route by removing the locale prefix if it exists
  let actualRoute = pathname;
  if (
    pathSegments.length > 0 &&
    i18nRouterConfig.locales.includes(pathSegments[0])
  ) {
    actualRoute = "/" + pathSegments.slice(1).join("/");
  }
  //console.log({ token: token?.email, actualRoute });

  // Get current locale
  const locale = i18nRouterConfig.locales.includes(pathSegments[0])
    ? pathSegments[0]
    : ""; // If no locale is found, reset it and let the i18nRouter handle it

  // Handle root path redirect with locale
  if (actualRoute === "/" || actualRoute === "") {
    const dashboardUrl = new URL(
      `${locale}${routes.dashboard.index}`,
      request.url
    );
    return NextResponse.redirect(dashboardUrl);
  }

  // If user is not authenticated and trying to access any route except /auth/login
  if (!token && !actualRoute.includes("/auth/login")) {
    const loginUrl = new URL(`auth/login`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If user is authenticated and trying to access /auth/login
  if (token && actualRoute.startsWith("/auth/login")) {
    const origin = new URL(request.url).origin;
    const dashboardUrl = new URL(`${locale}${routes.dashboard.index}`, origin);
    return NextResponse.redirect(dashboardUrl);
  }

  // Handle i18n routing after auth checks
  return i18nRouter(request, i18nRouterConfig);
}

// Update matcher to include all routes except specific ones
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - public folder, and explicitly assets folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public|assets|favicon.ico|sitemap.xml|robots.txt|OneSignalSDKWorker.js).*)",
  ],
};
