"use client";

import FormLayout from "@/components/form/layout";
import {
  dashboardSchema,
  DashboardSettingsData,
} from "@/lib/schemas/dashboard.schema";
import { FormTabSection } from "@/types";
import { User, Lock, Shield } from "lucide-react";

const sections: FormTabSection[] = [
  {
    id: "security",
    label: "Security Settings",
    icon: Lock,
    fields: [
      {
        type: "CustomComponent",
        component: CustomComponent,
        name: "custom",
        label: "CustomComponent",
        placeholder: "Enter new password",
      },
      {
        type: "password",
        component: "input",
        name: "password",
        label: "New Password",
        placeholder: "Enter new password",
      },
      {
        type: "password",
        component: "input",
        name: "confirmPassword",
        label: "Confirm Password",
        placeholder: "Confirm new password",
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
    id: "privacy",
    label: "Privacy Settings",
    icon: Shield,
    fields: [
      {
        component: "checkbox",
        name: "dataSharing",
        label: "Data Sharing",
      },
    ],
  },
  {
    id: "preferences",
    label: "User Preferences",
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

export default function DashboardSettingsForm() {
  const onSubmit = async (data: DashboardSettingsData) => {
    console.log("Dashboard settings submitted:", data);
    // Here you would typically send this data to your backend
  };

  return (
    <FormLayout
      title="Dashboard Settings"
      description="Manage your account security, privacy, and preferences"
      sections={sections}
      schema={dashboardSchema}
      endpointQuery=""
    />
  );
}

function CustomComponent() {
  return <div>CustomComponent</div>;
}
