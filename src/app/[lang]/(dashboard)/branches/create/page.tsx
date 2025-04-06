import { PageHeader } from "@/components/layout";
import initTranslations from "@/localization/i18n";
import { PageProps } from "@/types";
import { Metadata } from "next";
import CreateBranchForm from "../_components/create-branch-form";

export async function generateMetadata({
  params,
}: {
  params: PageProps;
}): Promise<Metadata> {
  const { lang } = await params;
  const { t } = await initTranslations(lang, ["create-branch"]);

  return {
    title: t("meta_data.title"),
  };
}
async function CreateBranch({ params }: { params: PageProps }) {
  const { lang } = await params;
  const { t } = await initTranslations(lang, ["create-branch"]);
  return (
    <section>
      <PageHeader
        title={t("page_header.title")}
        //subtitle={t("page_header.subtitle")}
      />
      <CreateBranchForm />
    </section>
  );
}

export default CreateBranch;
