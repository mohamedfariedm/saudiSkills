"use client";

import apiClient from "@/services/api";
import { ApiConfigOptions, ApiResponse, PaginatedResponse } from "@/types";
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { useCallback, useMemo, useRef } from "react";

// Define the structure that matches the infinite query data
type InfiniteQueryData<T> = {
  pages: Array<ApiResponse<PaginatedResponse<T>>>;
  pageParams: Array<number>;
};

interface InfiniteQueryConfig<TResponse>
  extends ApiConfigOptions<PaginatedResponse<TResponse>> {
  queryOptions?: Omit<
    UseInfiniteQueryOptions<
      ApiResponse<PaginatedResponse<TResponse>>,
      Error,
      InfiniteQueryData<TResponse>
    >,
    "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam"
  >;
}

export default function useFetchInfiniteData<TResponse>(
  endpoint: string,
  config: InfiniteQueryConfig<TResponse>
) {
  const { params, query, onSuccess, onError, body, queryOptions } = config;
  const queryKey = [
    endpoint,
    ...[params && params, query && query].filter(Boolean),
  ];
  const infiniteQuery = useInfiniteQuery<
    ApiResponse<PaginatedResponse<TResponse>>,
    Error,
    InfiniteQueryData<TResponse>
  >({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      return apiClient<PaginatedResponse<TResponse>>(endpoint, {
        params,
        query: {
          page: String(pageParam),
          limit: process.env.NEXT_PUBLIC_PAGINATION_LIMIT || "10",
          ...query,
        },
        body,
        onSuccess,
        onError,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.data?.pagination?.next) return undefined;
      const { currentPage, totalPages } = lastPage?.data?.pagination;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    ...queryOptions,
  });

  const flattenedData = useMemo(() => {
    //console.log("newdata", infiniteQuery.data);
    return infiniteQuery.data?.pages.reduce<TResponse[]>((acc, page) => {
      return page?.data?.items ? [...acc, ...page?.data?.items] : acc;
    }, []);
  }, [infiniteQuery.data]);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (infiniteQuery.isFetchingNextPage) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && infiniteQuery.hasNextPage) {
          infiniteQuery.fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [
      infiniteQuery.fetchNextPage,
      infiniteQuery.hasNextPage,
      infiniteQuery.isFetchingNextPage,
    ]
  );

  return {
    ...infiniteQuery,
    flattenedData,
    lastElementRef,
  };
}
