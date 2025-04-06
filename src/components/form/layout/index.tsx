"use client";

import type React from "react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import type { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FormSection } from "./form-section";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { FormTabSection } from "@/types";
import { usePostData } from "@/hooks/useFetch";
import {
  CustomInput,
  CustomSelect,
  TextEditor,
  DragDropArea,
  MultiSelect,
  CustomRadioGroup,
  CustomCheckbox,
  CustomTextArea,
} from "@/components/form";
export const formComponentsMap = {
  input: CustomInput,
  select: CustomSelect,
  textArea: CustomTextArea,
  textEditor: TextEditor,
  dragDrop: DragDropArea,
  multiSelect: MultiSelect,
  radio: CustomRadioGroup,
  checkbox: CustomCheckbox,
};
interface FormLayoutProps<T> {
  sections: FormTabSection[];
  schema: z.ZodType<any>;
  endpointQuery: string;
  title?: string;
  description?: string;
  showProgress?: boolean;
  className?: string;
  defaultValues?: Record<string, string>;
  extraFooterBtn?: React.JSX.Element;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export default function FormLayout<T>({
  title,
  description,
  sections,
  schema,
  showProgress = false,
  className,
  extraFooterBtn,
  endpointQuery,
  onSuccess,
  onError,
  defaultValues,
}: FormLayoutProps<T>) {
  const [activeTab, setActiveTab] = useState(sections[0].id);
  const [progress, setProgress] = useState(100 / sections.length);

  const methods = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues,
  });
  console.log(
    "create-update defaultValues",
    methods.watch(),
    methods.formState.errors
  );
  const {
    formState: { errors },
  } = methods;

  const isMultiStep = sections.length > 1;
  const shouldShowProgress = showProgress && sections.length > 1;
  const isSendingFile = useMemo(
    () =>
      sections.some((section) =>
        section.fields.some((field) => field.type === "file")
      ),
    [sections]
  );
  const { mutate: SubmitForm, isPending } = usePostData<string, any>(
    endpointQuery,
    {
      onSuccess: (data) => {
        methods.reset();
        onSuccess?.(data);
      },
      onError: (error) => {
        onError?.(error);
      },
    }
  );
  // Function to find the first section with errors
  const findFirstSectionWithErrors = useCallback(() => {
    for (const section of sections) {
      const sectionFields = section?.fields?.map((field) => field.name);
      const hasError = sectionFields?.some((fieldName) => errors[fieldName]);
      if (hasError) {
        return section.id;
      }
    }
    return null;
  }, [errors, sections]);

  const handleTabChange = useCallback(
    (value: string) => {
      setActiveTab(value);
      const sectionIndex = sections.findIndex((s) => s.id === value);
      setProgress(((sectionIndex + 1) * 100) / sections.length);
    },
    [sections]
  );

  const handleSubmit = async (body: any) => {
    const sectionWithErrors = findFirstSectionWithErrors();

    if (sectionWithErrors) {
      handleTabChange(sectionWithErrors);
      toast.error("Please fix the errors before submitting", {
        description: `There are validation errors in the ${sections.find((s) => s.id === sectionWithErrors)?.label} section`,
      });
      return;
    }
    SubmitForm({
      body,
      params: defaultValues ? { _id: defaultValues?._id } : undefined,
    });
    console.log("data submitted:", body);
  };

  // Watch for changes in errors and update tab if necessary
  useEffect(() => {
    const sectionWithErrors = findFirstSectionWithErrors();
    if (sectionWithErrors && Object.keys(errors).length > 0) {
      handleTabChange(sectionWithErrors);
    }
  }, [errors, findFirstSectionWithErrors, handleTabChange]);

  return (
    <div
      className={cn(
        " bg-white dark:from-gray-900 dark:to-gray-800  ",
        className
      )}
    >
      <Card className="max-w-4xl mx-auto border-none shadow-none bg-white/80 red-800 h-full dark:bg-gray-900/80 backdrop-blur-lg p-4 flex flex-col">
        {(title || description) && (
          <CardHeader className="   p-0">
            <CardTitle className="text-3xl font-bold tracking-tight">
              {title ?? ""}
            </CardTitle>
            <CardDescription className="text-base">
              {description ?? ""}
            </CardDescription>
          </CardHeader>
        )}
        <CardContent className="p-0 space-y-3 grow">
          {shouldShowProgress && isMultiStep && (
            <Progress value={progress} className="h-2 " />
          )}
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(handleSubmit)}
              className=" bg -green-400 h-full flex flex-col relative"
              encType={
                isSendingFile
                  ? "multipart/form-data"
                  : "application/x-www-form-urlencoded"
              }
            >
              {isMultiStep ? (
                <Tabs
                  value={activeTab}
                  onValueChange={handleTabChange}
                  className="w-full "
                >
                  <TabsList className="flex w-full bg -green-300 transparent  border-b border-border-secondary rounded-none p-0 mb-6">
                    {sections.map((section) => {
                      const Icon = section?.icon;
                      // Check if this section has any errors
                      const sectionFields = section?.fields?.map(
                        (field) => field.name
                      );
                      const hasError = sectionFields?.some(
                        (fieldName) => errors[fieldName]
                      );

                      return (
                        <TabsTrigger
                          key={section.id}
                          value={section.id}
                          className="grow relative text-sm font-medium text-muted-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none hover:text-foreground flex items-center justify-center gap-2 bg-transparent place-self-stretch focus-visible:ring-0"
                        >
                          {Icon && (
                            <Icon
                              className={`w-4 h-4 ${hasError ? "text-destructive" : ""}`}
                            />
                          )}
                          <span className={hasError ? "text-destructive" : ""}>
                            {section.label}
                          </span>
                          {activeTab === section.id && (
                            <motion.div
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                              layoutId="activeTab"
                              initial={false}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                              }}
                            />
                          )}
                          {hasError && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                          )}
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>

                  {sections.map((section) => (
                    <TabsContent
                      key={section.id}
                      value={section.id}
                      className="mt-0"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FormSection section={section} />
                      </motion.div>
                    </TabsContent>
                  ))}
                </Tabs>
              ) : (
                <FormSection section={sections?.[0]} />
              )}

              <div className="flex justify-end py-6 mt-auto gap-5">
                {extraFooterBtn ?? ""}
                <Button
                  isPending={isPending}
                  //disabled={isPending || !methods.formState.isValid}
                  type="submit"
                  className="min-w-[120px]"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
