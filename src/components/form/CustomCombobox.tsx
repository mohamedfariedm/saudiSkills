"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { IFormElementProps } from "@/types";
import { Controller, useFormContext } from "react-hook-form";
import FieldError from "./FieldError";
import Combobox from "./Combobox";

function CustomCombobox({
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
    formState: { errors },
  } = useFormContext();

  const error =
    ServerErrors?.response?.data?.errors?.[name]?.[0] ||
    (errors?.[name]?.message as string);
  return (
    <Label
      className={cn(
        `w-full flex flex-col items-start gap-1.5`,
        label ? "min-h-[94px]" : "min-h-[64px]",
        className
      )}
      htmlFor={name}
    >
      {label && (
        <h3
          className={cn(
            `text-sm text-secondary-700 font-medium flex items-center gap-0.5 whitespace-nowrap`,
            error && "text-error"
          )}
        >
          {label}{" "}
          {required && (
            <span className="text-[#2318fb] dark:text-[#94969C]">*</span>
          )}
        </h3>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Combobox
            value={field.value} // Pass value from react-hook-form
            onChange={field.onChange}
            options={options!} // Pass options
            placeholder={placeholder}
            className={cn("!w-full")}
          />
        )}
      />
      <FieldError error={error} />
    </Label>
  );
}

export default CustomCombobox;
