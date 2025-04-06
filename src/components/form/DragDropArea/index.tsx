"use client";

import { useController, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FileUploader } from "./file-uploader";

interface DragDropAreaProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  maxSize?: number;
  maxFileCount?: number;
}

export default function DragDropArea({
  name,
  label,
  placeholder,
  required = false,
  className,
  maxSize = 5 * 1024 * 1024,
  maxFileCount = 2,
}: DragDropAreaProps) {
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
    <div className={cn("w-full space-y-2", className)}>
      {label && (
        <Label
          htmlFor={name}
          className={cn("text-sm font-medium", error && "text-destructive")}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      <FileUploader
        value={value}
        onValueChange={onChange}
        maxFileCount={maxFileCount}
        maxSize={maxSize}
        progresses={{ "file1.png": 50 }}
        // pass the onUpload function here for direct upload
        // onUpload={uploadFiles}
        //disabled={disabled}
        //defaultUploadedFiles={[]}
      />

      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  );
}
