import { tablesNames } from "@/constants";
import { TFunction } from "i18next";
import { ZodSchema } from "zod";
import { CategorySchema } from "./category.schema";

export const TABLE_FORM_SCHEMA_MAP: Record<
  string,
  (t: TFunction, type: "create" | "update") => ZodSchema<any>
> = {
  [tablesNames.categories]: CategorySchema,
};
