"use client";

import { useController, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { IFormElementProps } from "@/types";

import { Checkbox } from "@/components/ui/checkbox";

export default function CustomCheckbox({
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
      <div className={cn("flex flex-col space-y-2", className)}>
        {options ? (
          options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`${name}-${option.value}`}
                checked={value?.includes(option.value)}
                onCheckedChange={(checked) => {
                  const updatedValue = checked
                    ? [...(value || []), option.value]
                    : value?.filter((value: string) => value !== option.value);
                  onChange(updatedValue);
                }}
              />
              <Label htmlFor={`${name}-${option.value}`}>{option.label}</Label>
            </div>
          ))
        ) : (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={name}
              checked={value}
              onCheckedChange={(checked) => {
                onChange(checked);
              }}
            />
            <Label htmlFor={name}>{label}</Label>
          </div>
        )}
      </div>
      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  );
}
