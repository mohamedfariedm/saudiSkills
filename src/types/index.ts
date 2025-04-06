import type { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

export * from "./api";
export * from "./table";
export * from "./form";
export * from "./categories";
export * from "./branches";

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export interface PageHeaderAction {
  text: string;
  handler?: () => void;
  href?: string;
  className?: string;
  icon?: LucideIcon | IconType;
}
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  roles: string[];
  active: boolean;
  expiresIn: number;
  isUsed: boolean;
  image?: string;
}

export type LocalizedField = {
  ar: string;
  en: string;
};

// color type
export type color =
  | "primary"
  | "info"
  | "warning"
  | "success"
  | "destructive"
  | "secondary";
export type TextAreaColor =
  | "primary"
  | "info"
  | "warning"
  | "success"
  | "destructive";
export type InputColor =
  | "primary"
  | "info"
  | "warning"
  | "success"
  | "destructive";

//  variant
export type InputVariant =
  | "flat"
  | "underline"
  | "bordered"
  | "faded"
  | "ghost"
  | "flat-underline";
export type TextAreaVariant =
  | "flat"
  | "underline"
  | "bordered"
  | "faded"
  | "ghost"
  | "flat-underline";

// shadow
export type Shadow = "none" | "sm" | "md" | "lg" | "xl" | "2xl";

// radius

export type Radius = "none" | "sm" | "md" | "lg" | "xl";

export interface LangParamsProps {
  lang: string;
}
export type PageProps = Promise<LangParamsProps>;
