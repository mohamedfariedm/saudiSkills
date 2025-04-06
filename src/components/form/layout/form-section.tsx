"use client";
import { Separator } from "@/components/ui/separator";
import { FormTabSection, FormTabSectionField } from "@/types";
import { Fragment } from "react";
import { formComponentsMap } from ".";

const DynamicFormField = ({
  field: { component, type, props, ...rest },
}: {
  field: FormTabSectionField;
}) => {
  // If type is "CustomComponent", render the component directly
  if (type === "CustomComponent") {
    const CustomComponent = component as React.ComponentType<any>;
    return <CustomComponent {...rest} {...props} />;
  }

  // Otherwise, get the component from the map
  const Component =
    formComponentsMap[component as keyof typeof formComponentsMap];
  return <Component {...rest} {...props} type={type} />;
};

export function FormSection({
  section: { label, fields },
}: {
  section: FormTabSection;
}) {
  return (
    <div className="w-full">
      {/*  <h3 className="text-lg font-medium">{label}</h3> */}

      <div className="grid grid-cols-2 gap-x-4 gap-y-1 w-full bg -red-200">
        {fields.map((field, index) => (
          <Fragment key={field.name}>
            <DynamicFormField field={field} />
            {(index + 1) % 2 === 0 && (
              <div className="col-span-2  mb-3">
                <Separator />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
