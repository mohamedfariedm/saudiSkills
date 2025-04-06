import initTranslations from "@/localization/i18n";
import { notFound } from "next/navigation";

type ParamsProps = { lang: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<ParamsProps>;
}) {
  const { lang } = await params;

  const { t } = await initTranslations(lang, ["common"]);

  return {
    title: t("NotFound.meta_data_title"),
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}
export default function HandleUnmatchedRoutes() {
  //* trigger the not-found.tsx page that is inside the [locale] and has access to the translations, without this file (app/[locale]/[...unmatchedRoutes]/page.tsx), the not-found.tsx page that is inside the root wil be triggered and it has no access to the translations
  notFound();
}
