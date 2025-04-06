"use client";

import apiClient from "@/services/api";
import { ApiConfigOptions } from "@/types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

interface QueryConfig<TResponse> extends ApiConfigOptions<TResponse> {
  queryOptions?: Omit<
    UseQueryOptions<TResponse, Error, TResponse>,
    "queryKey" | "queryFn"
  >;
}

// Custom Hooks
export default function useFetchData<TResponse>(
  endpoint: string,
  config: QueryConfig<TResponse> = {}
) {
  const { params, query, onSuccess, onError, body, queryOptions } = config;
  const queryKey = [
    endpoint,
    ...[params && params, query && query].filter(Boolean),
  ];
  //console.log({ query, queryKey });
  return useQuery<TResponse, Error>({
    queryKey,
    queryFn: () =>
      apiClient<TResponse>(endpoint, {
        params,
        query,
        onSuccess,
        onError,
        body,
      }).then((res) => res.data),
    ...queryOptions,
  });
}
