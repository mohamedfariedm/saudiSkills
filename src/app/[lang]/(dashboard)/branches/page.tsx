import DataTablePage from "@/components/table";
import { tablesNames } from "@/constants";
import initTranslations from "@/localization/i18n";
import { Branch, TableActionsEnum, TableFilterFields } from "@/types";
import { TFunction } from "i18next";
import { Metadata } from "next";

type ParamsProps = { lang: string };
const options = (t: TFunction) =>
  Array.from({ length: 2 }).map((_, index) => ({
    label: t(
      "table.filterFields.sidebarFilters.status.options." + index + ".label"
    ),
    value: t(
      "table.filterFields.sidebarFilters.status.options." + index + ".value"
    ),
  }));

const getFilterFields = (t: TFunction): TableFilterFields => ({
  sidebarFilters: [
    {
      id: "name",
      label: t("table.filterFields.sidebarFilters.name.label"),
      placeholder: t("table.filterFields.sidebarFilters.name.placeholder"),
      component: "input",
    },
    {
      id: "phoneNumber",
      label: t("table.filterFields.sidebarFilters.phoneNumber.label"),
      placeholder: t(
        "table.filterFields.sidebarFilters.phoneNumber.placeholder"
      ),
      component: "input",
    },
    {
      id: "isActive",
      label: t("table.filterFields.sidebarFilters.status.label"),
      placeholder: t("table.filterFields.sidebarFilters.status.placeholder"),
      component: "select",
      options: options(t),
      props: { className: "col-span-2" },
    },
  ],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<ParamsProps>;
}): Promise<Metadata> {
  // read route params
  const { lang } = await params;
  const { t } = await initTranslations(lang, [tablesNames.branches]);

  return {
    title: t("meta_data.title"),
  };
}
export default async function Branches({
  params,
}: {
  params: Promise<ParamsProps>;
}) {
  const { lang } = await params;

  const { t } = await initTranslations(lang, [tablesNames.branches]);
  const filterFields = getFilterFields(t);
  return (
    <DataTablePage<Branch>
      tableFor={tablesNames.branches}
      filterFields={filterFields}
      actions={[
        TableActionsEnum.CREATE_IN_NEW_PAGE,
        TableActionsEnum.EDIT_IN_NEW_PAGE,
        TableActionsEnum.EXPORT,
      ]}
    />
  );
}
