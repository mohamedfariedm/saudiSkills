"use client";

import { useController, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import MultipleSelector, { Option } from "./MultipleSelector";
import { IFormElementProps } from "@/types";

interface MultiSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export default function MultiSelect({
  name,
  label,
  placeholder,
  required = false,
  className,
  options,
}: IFormElementProps) {
  const { control } = useFormContext();
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    //rules: { required },
  });

  return (
    <div className="w-full space-y-2">
      {label && (
        <Label
          htmlFor={name}
          className={cn("text-sm font-medium", error && "text-destructive")}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      <MultipleSelector
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
            no results found.
          </p>
        }
      />
      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  );
}
