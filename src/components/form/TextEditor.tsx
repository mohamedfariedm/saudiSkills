"use client";

import { useController, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
//import ReactQuill from "react-quill-new";
//import "react-quill-new/dist/quill.snow.css";

interface RichTextEditorProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export default function TextEditor({
  name,
  label,
  placeholder,
  required = false,
  className,
}: RichTextEditorProps) {
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
      {/*  <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
        }}
        className={cn(
          "[&_.ql-editor]:min-h-40 [&_.ql-editor]:max-h-96",
          className
        )}
      /> */}
      <Textarea value={value} onChange={onChange} placeholder={placeholder} />
      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  );
}
