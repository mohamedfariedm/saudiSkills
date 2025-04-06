import { REGEX } from "@/constants";
import { TFunction } from "i18next";
import { z } from "zod";
import { validateFile } from "../common-rules";

export const CategorySchema = (
  t: TFunction,
  type: "create" | "update" = "create"
) => {
  return z.object({
    name: z.object({
      en: z
        .string()
        .min(1, { message: t("validations.name_en.required") })
        .regex(REGEX.ENGLISH_LETTERS, {
          message: t("validations.name_en.pattern"),
        }),
      ar: z
        .string()
        .min(1, { message: t("validations.name_ar.required") })
        .regex(REGEX.ARABIC_LETTERS, {
          message: t("validations.name_ar.pattern"),
        }),
    }),
    active: z.preprocess(
      (val) => (typeof val === "boolean" ? String(val) : val),
      z.enum(["true", "false"], {
        message: t("validations.active.required"),
      })
    ),
    order: z
      .number({ message: t("validations.order.pattern") })
      .int({ message: t("validations.order.integer") })
      .min(1, { message: t("validations.order.min") }),

    /* order: z
      .string()
      .min(1, { message: t("validations.order.required") })
      .regex(REGEX.NUMERIC, { message: t("validations.order.pattern") }), // Assuming order should be numeric */
    image:
      type === "create"
        ? validateFile("image", t)
        : validateFile("image", t).optional().or(z.string()),
  });
};
