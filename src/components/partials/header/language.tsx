"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UseLanguageChange from "@/hooks/UseLanguageChange";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store";
import { Check } from "lucide-react";
import Image from "next/image";

type LanguageType = {
  name: string;
  flag: string;
  code: string;
};

const languages: LanguageType[] = [
  {
    name: "English",
    code: "en",
    flag: "/assets/usa-flag.svg",
  },
  {
    name: "العربية",
    code: "ar",
    flag: "/assets/saudi-arabia-flag.svg",
  },
];
const Language = () => {
  const { setRtl } = useThemeStore();

  const { currentLocale, handleChange } = UseLanguageChange();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          className="bg-transparent  hover:bg-transparent w-7 h-7 rounded-full overflow-hidden shrink-0 px-0 py-0"
        >
          <Image
            loading="eager"
            src={
              languages.find((item) => item.code === currentLocale)?.flag ||
              languages[0].flag
            }
            width={150}
            height={150}
            alt={"lang-flag"}
            className="w-full h-full object-cover "
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 space-y-2">
        {languages.map((lang, index) => (
          <DropdownMenuItem
            key={`flag-${index}`}
            className={cn(
              "py-1.5 px-2 cursor-pointer dark:hover:bg-background gap-2",
              {
                "bg-primary-100 ": currentLocale === lang.code,
              }
            )}
            onClick={() => {
              setRtl(lang.code === "ar");
              handleChange(lang.code);
            }}
          >
            <span className="w-6 h-6 rounded-full me-1.5">
              <Image
                src={lang.flag}
                alt={lang.name}
                width={150}
                height={150}
                className="w-full h-full object-cover rounded-full"
              />
            </span>
            <span className="text-sm text-default-600 capitalize">
              {lang.name}
            </span>
            {currentLocale === lang.code && (
              <Check className="w-4 h-4 flex-none ltr:ml-auto rtl:mr-auto text-default-700" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Language;
