import { siteConfig } from "@/config/site";
import GlobalProvider from "@/providers";
import "simplebar-react/dist/simplebar.min.css";
import "@/styles/globals.scss";
import "@/styles/theme.scss";
import { i18nRouterConfig } from "@/localization/i18nRouterConfig";
import { dir } from "i18next";

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
};
export function generateStaticParams() {
  return i18nRouterConfig.locales.map((locale) => ({ locale }));
}
export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;

  const { lang } = params;

  const { children } = props;

  return (
    <html lang={lang} dir={dir(lang)}>
      <GlobalProvider lang={lang}>{children}</GlobalProvider>
    </html>
  );
}
