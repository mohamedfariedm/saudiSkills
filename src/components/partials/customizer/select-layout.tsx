import React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { themes } from "@/config/thems";
import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import {
  RiLayoutLeftFill,
  RiLayoutTopFill,
  RiLayoutFill,
} from "react-icons/ri";

import { Icon } from "@iconify/react";
const layoutOptions = [
  {
    key: "vertical",
    label: "Vertical",
    icon: RiLayoutLeftFill,
  },
  {
    key: "horizontal",
    label: "Horizontal",
    icon: RiLayoutTopFill,
  },
  {
    key: "semibox",
    label: "Semi-Box",
    icon: RiLayoutFill,
  },
];

const SelectLayout = () => {
  const { layout, setLayout } = useThemeStore();
  const { theme, setTheme, resolvedTheme: mode } = useTheme();
  const { theme: config, setTheme: setConfig } = useThemeStore();
  const newTheme = themes.find((theme) => theme.name === config);

  return (
    <div
      style={
        {
          "--theme-primary": `hsl(${
            newTheme?.cssVars[mode === "dark" ? "dark" : "light"].primary
          })`,
        } as React.CSSProperties
      }
    >
      <div className="mb-2 relative inline-block px-3 py-[3px] rounded-md before:bg-[--theme-primary] before:absolute before:top-0 before:left-0 before:w-full  before:h-full before:rounded before:opacity-10 before:z-[-1]  text-[--theme-primary]  text-xs font-medium">
        Layout
      </div>
      <div className="text-muted-foreground font-normal text-xs mb-4">
        Choose your layout
      </div>
      <div className=" grid grid-cols-3 gap-3">
        {layoutOptions.map((layoutOption) => (
          <div key={layoutOption.key}>
            <button
              onClick={() => setLayout(layoutOption.key)}
              className={cn("border block  rounded relative h-[72px] w-full ", {
                "text-[--theme-primary] border-[--theme-primary]":
                  layout === layoutOption.key,
                "text-muted-foreground border-border":
                  layout !== layoutOption.key,
              })}
            >
              {layout === layoutOption.key && (
                <Icon
                  icon="heroicons:check-circle-20-solid"
                  className=" text-[--theme-primary] absolute top-1 right-1"
                />
              )}
              <layoutOption.icon className="text-6xl mx-auto" />
            </button>

            <Label className=" text-muted-foreground font-normal block mt-2">
              {layoutOption.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectLayout;
