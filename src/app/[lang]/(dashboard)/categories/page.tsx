import DataTablePage from "@/components/table";
import { tablesNames } from "@/constants";
import initTranslations from "@/localization/i18n";
import { Category, FormTabSection, TableFilterFields } from "@/types";
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
  search: [
    {
      id: "name",
      placeholder: t("table.filterFields.search.name.placeholder"),
    },
  ],
  sidebarFilters: [
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

const getFormFields = (t: TFunction): FormTabSection[] => [
  {
    id: "1",
    fields: [
      {
        component: "input",
        name: "name.en",
        label: t("table.formFields.step_1.name_en.label"),
        placeholder: t("table.formFields.step_1.name_en.placeholder"),
      },
      {
        component: "input",
        name: "name.ar",
        label: t("table.formFields.step_1.name_ar.label"),
        placeholder: t("table.formFields.step_1.name_ar.placeholder"),
      },
      {
        component: "select",
        name: "active",
        label: t("table.formFields.step_1.status.label"),
        placeholder: t("table.formFields.step_1.status.placeholder"),
        options: options(t),
      },
      {
        component: "input",
        type: "number",
        name: "order",
        label: t("table.formFields.step_1.order.label"),
        placeholder: t("table.formFields.step_1.order.placeholder"),
      },
      {
        component: "dragDrop",
        name: "image",
        type: "file", //* just used for setting isSendingFile state to true
        label: t("table.formFields.step_1.image.label"),
        props: { className: "col-span-2" },
      },
    ],
  },
];
export async function generateMetadata({
  params,
}: {
  params: Promise<ParamsProps>;
}): Promise<Metadata> {
  // read route params
  const { lang } = await params;
  const { t } = await initTranslations(lang, [tablesNames.categories]);

  return {
    title: t("meta_data.title"),
  };
}
export default async function Categories({
  params,
}: {
  params: Promise<ParamsProps>;
}) {
  const { lang } = await params;

  const { t } = await initTranslations(lang, [tablesNames.categories]);
  const filterFields = getFilterFields(t);
  const formFields = getFormFields(t);
  return (
    <DataTablePage<Category>
      tableFor={tablesNames.categories}
      filterFields={filterFields}
      formFields={formFields}
    />
  );
}
