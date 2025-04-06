"use client";

import * as React from "react";
import { IoMdCheckmark } from "react-icons/io";
import { GoChevronDown } from "react-icons/go";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type ComboboxProps = {
  options: { value: string; label: string }[];
  placeholder?: string;
  notFoundMessage?: string;
  className?: string;
  value: string; // Add value prop
  onChange: (value: string) => void; // Add onChange prop
};

export default function Combobox({
  options,
  placeholder = "Select an option...",
  notFoundMessage = "No options found.",
  className = "",
  value, // Destructure value prop
  onChange, // Destructure onChange prop
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-[200px] flex justify-between rtl:text-right",
            className
          )}
        >
          <span className="grow truncate ">
            {value
              ? options.find((item) => item.value === value)?.label
              : placeholder}
          </span>
          <GoChevronDown
            className={cn(
              "ml-2 h-5 w-5 shrink-0 opacity-50 transition-transform duration-200 rtl:ml-0 rtl:mr-2",
              open ? "rotate-180" : "rotate-0"
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("PopoverContent p-0", className)}>
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>{notFoundMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue); // Update via onChange
                    setOpen(false);
                  }}
                >
                  <IoMdCheckmark
                    className={cn(
                      "mr-2 h-4 w-4 opacity-0 rtl:ml-2 rtl:mr-0", // Check icon adjusted for RTL
                      value === item.value && "opacity-100"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
