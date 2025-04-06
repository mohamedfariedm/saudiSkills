"use client";

import FormLayout from "@/components/form/layout";
import {
  dashboardSchema,
  DashboardSettingsData,
} from "@/lib/schemas/dashboard.schema";
import { FormTabSection } from "@/types";
import { TFunction } from "i18next";
import { User, Lock, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

const sections = (t: TFunction): FormTabSection[] => [
  {
    id: "general",
    label: t("form.step_1.label"),
    icon: Lock,
    fields: [
      //* name
      {
        component: "input",
        name: "name.en",
        label: t("form.step_1.name_en.label"),
        placeholder: t("form.step_1.name_en.placeholder"),
      },
      {
        component: "input",
        name: "name.ar",
        label: t("form.step_1.name_ar.label"),
        placeholder: t("form.step_1.name_ar.placeholder"),
      },
      //* address
      {
        component: "textArea",
        name: "address.en",
        label: t("form.step_1.address_en.label"),
        placeholder: t("form.step_1.address_en.placeholder"),
      },
      {
        component: "textArea",
        name: "address.ar",
        label: t("form.step_1.address_ar.label"),
        placeholder: t("form.step_1.address_ar.placeholder"),
      },
      //* description
      {
        component: "textArea",
        name: "description.en",
        label: t("form.step_1.description_en.label"),
        placeholder: t("form.step_1.description_en.placeholder"),
      },
      {
        component: "textArea",
        name: "description.ar",
        label: t("form.step_1.description_ar.label"),
        placeholder: t("form.step_1.description_ar.placeholder"),
      },
      //* referenceCode
      {
        component: "input",
        name: "referenceCode",
        label: t("form.step_1.referenceCode.label"),
        placeholder: t("form.step_1.referenceCode.placeholder"),
      },
      //* phone
      {
        component: "input",
        type: "number",
        name: "phone",
        label: t("form.step_1.phone.label"),
        placeholder: t("form.step_1.phone.placeholder"),
      },

      
      {
        component: "radio",
        name: "twoFactorAuth",
        label: "Two-Factor Authentication",
        options: [
          { label: "SMS", value: "sms" },
          { label: "Authenticator App", value: "app" },
          { label: "Email", value: "email" },
          { label: "None", value: "none" },
        ],
      },
    ],
  },
  {
    id: "working-hours",
    label: t("form.step_2.label"),
    icon: Shield,
    fields: [
      {
        type: "CustomComponent",
        component: CustomComponent,
        name: "custom",
        label: "CustomComponent",
        placeholder: "Enter new password",
      },
      {
        component: "checkbox",
        name: "dataSharing",
        label: "Data Sharing",
      },
    ],
  },
  {
    id: "location",
    label: t("form.step_3.label"),
    icon: User,
    fields: [
      {
        component: "checkbox",
        name: "notificationPreferences",
        label: "Notification Preferences",
        options: [
          { label: "Email", value: "email" },
          { label: "Push Notifications", value: "push" },
          { label: "SMS", value: "sms" },
        ],
      },
      {
        component: "radio",
        name: "theme",
        label: "Theme",
        options: [
          { label: "Light", value: "light" },
          { label: "Dark", value: "dark" },
          { label: "System", value: "system" },
        ],
      },
    ],
  },
];

export default function CreateBranchForm({
  defaultValues,
}: {
  defaultValues?: Record<string, string>;
}) {
  const onSubmit = async (data: DashboardSettingsData) => {
    console.log("Dashboard settings submitted:", data);
    // Here you would typically send this data to your backend
  };
  const { t } = useTranslation("create-branch");
  return (
    <FormLayout
      title={t("form.title", { context: defaultValues ? "update" : "create" })}
      description={t("form.description")}
      sections={sections(t)}
      schema={dashboardSchema}
      endpointQuery=""
      defaultValues={defaultValues}
    />
  );
}

function CustomComponent() {
  return <div>CustomComponent</div>;
}
