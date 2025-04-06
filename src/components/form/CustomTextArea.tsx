"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { IFormElementProps } from "@/types";
import { useFormContext } from "react-hook-form";
import { getI18n } from "react-i18next";
import FieldError from "./FieldError";
import { get } from "lodash";

function CustomTextArea({
  name,
  label = "",
  placeholder,
  required = true,
  ServerErrors,
  inputStyle,
  disabled = false,
  className,
  rows = 2,
}: IFormElementProps) {
  const {
    register,
    formState: { errors, dirtyFields },
  } = useFormContext();
  const error =
    get(errors, name)?.message || // Correctly accesses nested errors like name.en
    ServerErrors?.response?.data?.errors?.[name]?.[0];
  const locale = getI18n().language;
  return (
    <Label
      className={cn(
        `w-full flex flex-col items-start gap-1.5 `,
        label ? "min-h-[94px]" : "min-h-[64px]",
        !error && "pb-5",
        className
      )}
      htmlFor={name}
    >
      {label && (
        <h3
          className={cn(
            `text-sm text-secondary-700 font-medium flex items-center gap-0.5 whitespace-nowrap  trns `,
            error && " text-error "
          )}
        >
          {label}{" "}
          <span
            className={cn(
              "",
              required
                ? "text-[#2318fb] dark:text-[#94969C]"
                : "font-medium text-disabled"
            )}
          >
            {required ? "*" : locale === "en" ? "(Optional)" : "(اختياري)"}
          </span>
        </h3>
      )}
      <Textarea
        disabled={disabled}
        rows={rows}
        //{...props}
        className={cn(
          `w-full   px-3.5   rounded-lg text-base placeholder:text-placeholder  `,
          error &&
            "shadow-error focus:shadow-error text-error focus:text-error placeholder:text-error focus:placeholder:text-error ",
          inputStyle
        )}
        id={name}
        placeholder={placeholder}
        {...register(`${name}`)}
      />

      <FieldError error={error} />
    </Label>
  );
}

export default CustomTextArea;
