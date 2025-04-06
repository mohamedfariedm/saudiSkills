"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { IFormElementProps } from "@/types";
import FieldError from "./FieldError";
import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { get } from "lodash";

import { getI18n } from "react-i18next";
import { MdErrorOutline } from "react-icons/md";

function CustomInput({
  name,
  label = "",
  placeholder,
  required = true,
  ServerErrors,
  inputStyle,
  disabled = false,
  className,
  type = "text",
}: IFormElementProps) {
  const {
    register,
    formState: { errors, dirtyFields },
  } = useFormContext();
  const [hide, setHide] = useState(false);

  const error =
    get(errors, name)?.message || // Correctly accesses nested errors like name.en
    ServerErrors?.response?.data?.errors?.[name]?.[0];

  const locale = getI18n().language;
  return (
    <Label
      className={cn(
        `w-full flex flex-col items-start gap-1.5 bg -red-300`,
        label ? "min-h-[86px]" : "min-h-[56px]",
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
      <div className="w-full relative">
        <Input
          disabled={disabled}
          className={cn(
            `w-full  h-input px-3.5   rounded-lg text-base placeholder:text-placeholder  placeholder:text-sm placeholder:font-normal`,
            error &&
              "focus-visible:ring-border-error-subtle border-border-error-subtle",
            inputStyle
          )}
          type={type === "password" ? (hide ? "text" : "password") : "text"}
          inputMode={type === "number" ? "numeric" : "text"}
          id={name}
          placeholder={placeholder}
          autoComplete="off"
          {...register(`${name}`, { valueAsNumber: type === "number" })}
        />
        {error && type !== "password" ? (
          <div
            className={cn(
              `absolute right-3 rtl:right-auto rtl:left-3 -translate-y-1/2 top-1/2 h-4 w-4  `
            )}
          >
            <MdErrorOutline className="h-4 w-4 text-foreground-error-secondary animate-appear" />
          </div>
        ) : type === "password" ? (
          <button
            disabled={disabled}
            type="button"
            onClick={() => setHide(!hide)}
            className={cn(
              `absolute right-3 rtl:right-auto rtl:left-3 -translate-y-1/2 top-1/2 h-4 w-4 cursor-pointer disabled:cursor-not-allowed`,
              error && "text-foreground-error-secondary"
            )}
          >
            {!hide ? <LuEyeOff /> : <LuEye />}
          </button>
        ) : null}
      </div>
      <FieldError error={error} />
    </Label>
  );
}

export default CustomInput;
