"use client";

import { useController, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { IFormElementProps } from "@/types";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CustomRadioGroup({
  name,
  label,
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
      <RadioGroup
        onValueChange={onChange}
        defaultValue={value}
        className={cn("flex flex-col space-y-1", className)}
      >
        {options?.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem
              value={option.value}
              id={`${name}-${option.value}`}
            />
            <Label htmlFor={`${name}-${option.value}`}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  );
}
