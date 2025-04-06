import { PageHeader } from "@/components/layout";
import initTranslations from "@/localization/i18n";
import { Metadata } from "next";
import DashboardSettingsForm from "./dashboard-settings-form";

type ParamsProps = { lang: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<ParamsProps>;
}): Promise<Metadata> {
  // read route params
  const { lang } = await params;
  const { t } = await initTranslations(lang, ["settings"]);

  return {
    title: t("meta_data.title"),
  };
}
export default async function Settings({
  params,
}: {
  params: Promise<ParamsProps>;
}) {
  const { lang } = await params;
  const { t } = await initTranslations(lang, ["settings"]);
  return (
    <div className="container mx-auto py-8">
      <PageHeader
        title={t("page_header.title", {
          context: "create",
        })}
        subtitle={t("page_header.subtitle")}
      />
      <DashboardSettingsForm />
    </div>
  );
}
