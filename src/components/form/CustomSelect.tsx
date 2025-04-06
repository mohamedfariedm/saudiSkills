"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { IFormElementProps } from "@/types";
import { useFormContext, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FieldError from "./FieldError";
import { MdErrorOutline } from "react-icons/md";
import { getI18n } from "react-i18next";

function CustomSelect({
  name,
  label = "",
  placeholder,
  required = true,
  ServerErrors,
  disabled = false,
  className,
  options,
}: IFormElementProps) {
  const {
    control,
    formState: { errors, dirtyFields },
  } = useFormContext();
  const error =
    ServerErrors?.response?.data?.errors?.[name]?.[0] ||
    (errors?.[name]?.message as string);
  const locale = getI18n().language;

  return (
    <div
      className={cn(
        `w-full flex flex-col items-start gap-1.5 bg- red-300`,
        label ? "min-h-[86px]" : "min-h-[56px]",
        className
      )}
    >
      {label && (
        <Label
          htmlFor={name}
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
        </Label>
      )}{" "}
      <div className="w-full relative">
        {/*  {error && (
          <div
            className={cn(
              `absolute right-3 rtl:right-auto rtl:left-3 -translate-y-1/2 top-1/2 h-4 w-4 cursor-pointer `
            )}
          >
            <MdErrorOutline className="h-4 w-4 text-foreground-error-secondary animate-appear" />
          </div>
        )} */}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              //defaultValue={field.value}
              value={String(field.value ?? "")} //* use the value prop instead to listen to the reset handler when the select is used in the filters sheet, also use string to enable reading boolean value, also nullish coalescing is used to display the placeholder, since we use dynamic forms, so the default value is unknown so it is undefined initially and that prevents the placeholder from being displayed, but if the value is "", the placeholder will be displayed
              disabled={disabled}
            >
              <SelectTrigger
                className={cn(
                  "",
                  error &&
                    " focus-visible:ring-border-error-subtle focus:ring-error ring-1 ring-border-error-subtle  border-border-error-subtle",
                  field.value ? "" : "text-placeholder"
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <FieldError error={error} />
    </div>
  );
}

export default CustomSelect;
