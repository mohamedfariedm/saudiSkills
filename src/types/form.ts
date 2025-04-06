import type { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

import { formComponentsMap } from "@/components/form/layout";
import { ReactNode } from "react";

export type IFormElementProps = {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  ServerErrors?: any;
  inputStyle?: string;
  disabled?: boolean;
  className?: string;
  type?: string;
  rows?: number;
  options?: {
    label: string;
    value: string;
  }[];
};

export type FormFieldComponentType = keyof typeof formComponentsMap;

export interface FormTabSectionField extends IFormElementProps {
  component: FormFieldComponentType | React.ComponentType<any>;
  props?: Record<string, any>;
}

export type FormTabSection = {
  id: string;
  label?: string;
  className?: string;
  icon?: LucideIcon | IconType; // ✅ Supports both Lucide and React Icons
  fields: FormTabSectionField[];
};
