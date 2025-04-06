import { z } from "zod";
import { TFunction } from "i18next";

export const signInSchema = (t: TFunction) => {
  return z.object({
    email: z
      .string()
      .min(1, { message: t("validations.email.required") })
      .email({ message: t("validations.email.pattern") }),
    password: z
      .string()
      .min(6, { message: t("validations.password.required") }),
  });
};

// generate form types from zod validation schema

export type signInType = z.infer<ReturnType<typeof signInSchema>>;
