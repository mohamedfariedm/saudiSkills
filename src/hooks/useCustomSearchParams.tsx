"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
type SearchParamEntry = {
  name: string;
  value: string;
};

export default function useCustomSearchParams() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");
      if (value === "") {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );

  const createUrlWithSearchParams = useCallback(
    (name: string, value: string) => {
      const queryString = createQueryString(name, value);
      return queryString ? `${pathname}?${queryString}` : pathname;
    },
    [pathname, createQueryString]
  );

  const setSearchParams = useCallback(
    (
      name: string,
      value: string,
      type: "push" | "replace" = "push",
      scroll: boolean = true
    ) => {
      const url = createUrlWithSearchParams(name, value);
      router[type](url, { scroll });
    },
    [router, createUrlWithSearchParams]
  );
  const createMultipleQueryStrings = useCallback(
    (entries: SearchParamEntry[] | SearchParamEntry) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");

      const entriesArray = Array.isArray(entries) ? entries : [entries];

      entriesArray.forEach(({ name, value }) => {
        if (value === "") {
          params.delete(name);
        } else {
          params.set(name, value);
        }
      });

      return params.toString();
    },
    [searchParams]
  );

  const createUrlWithMultipleSearchParams = useCallback(
    (entries: SearchParamEntry[] | SearchParamEntry) => {
      const queryString = createMultipleQueryStrings(entries);
      return queryString ? `${pathname}?${queryString}` : pathname;
    },
    [pathname, createMultipleQueryStrings]
  );
  // Multiple params update
  const setMultipleSearchParams = useCallback(
    (
      entries: { name: string; value: string }[],
      type: "push" | "replace" = "push",
      scroll: boolean = true
    ) => {
      const url = createUrlWithMultipleSearchParams(entries);
      router[type](url, { scroll });
    },
    [router, createUrlWithMultipleSearchParams]
  );

  return {
    searchParams,
    setSearchParams,
    setMultipleSearchParams,
    createQueryString,
    createUrlWithSearchParams,
  };
}
