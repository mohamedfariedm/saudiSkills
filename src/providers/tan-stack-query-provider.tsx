"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import React from "react";
import { queryClient } from "./query-client-instance";
type props = {
  children: React.ReactNode;
};
export default function TanStackQueryProvider({ children }: props) {
  return (
    <QueryClientProvider client={queryClient}>
      {children} <ReactQueryDevtools initialIsOpen={false} position="left" />
    </QueryClientProvider>
  );
}
