"use client";

//* the filter state is saved in 2 places, in the url using the nuqs library as object of key value pairs and in the react table state using setColumnFilters as array of {id, value}
import type { ExtendedSortingState, TableFilterFields } from "@/types";
import {
  type ColumnFiltersState,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type TableOptions,
  type TableState,
  type Updater,
  type VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  type Parser,
  type UseQueryStateOptions,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryState,
  useQueryStates,
} from "nuqs";
import * as React from "react";

import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import { getSortingStateParser } from "@/lib/utils/table";

interface UseDataTableProps<TData>
  extends Omit<
      TableOptions<TData>,
      | "state"
      | "pageCount"
      | "getCoreRowModel"
      | "manualFiltering"
      | "manualPagination"
      | "manualSorting"
    >,
    Required<Pick<TableOptions<TData>, "pageCount">> {
  filters?: TableFilterFields;

  /**
   * Determines how query updates affect history.
   * `push` creates a new history entry; `replace` (default) updates the current entry.
   * @default "replace"
   */
  history?: "push" | "replace";

  /**
   * Indicates whether the page should scroll to the top when the URL changes.
   * @default false
   */
  scroll?: boolean;

  /**
   * Shallow mode keeps query states client-side, avoiding server calls.
   * Setting to `false` triggers a network request with the updated querystring.
   * @default true
   */
  shallow?: boolean;

  /**
   * Maximum time (ms) to wait between URL query string updates.
   * Helps with browser rate-limiting. Minimum effective value is 50ms.
   * @default 50
   */
  throttleMs?: number;

  /**
   * Debounce time (ms) for filter updates to enhance performance during rapid input.
   * @default 300
   */
  debounceMs?: number;

  /**
   * Observe Server Component loading states for non-shallow updates.
   * Pass `startTransition` from `React.useTransition()`.
   * Sets `shallow` to `false` automatically.
   * So shallow: true` and `startTransition` cannot be used at the same time.
   * @see https://react.dev/reference/react/useTransition
   */
  startTransition?: React.TransitionStartFunction;

  /**
   * Clear URL query key-value pair when state is set to default.
   * Keep URL meaning consistent when defaults change.
   * @default false
   */
  clearOnDefault?: boolean;

  initialState?: Omit<Partial<TableState>, "sorting"> & {
    // Extend to make the sorting id typesafe
    sorting?: ExtendedSortingState<TData>;
  };
}

export function useDataTable<TData>({
  pageCount = -1,
  filters,
  history = "replace",
  scroll = false,
  shallow = true,
  throttleMs = 50,
  debounceMs = 300,
  clearOnDefault = false,
  startTransition,
  initialState,
  ...props
}: UseDataTableProps<TData>) {
  const queryStateOptions = React.useMemo<
    Omit<UseQueryStateOptions<string>, "parse">
  >(() => {
    return {
      history,
      scroll,
      shallow,
      throttleMs,
      debounceMs,
      clearOnDefault,
      startTransition,
    };
  }, [
    history,
    scroll,
    shallow,
    throttleMs,
    debounceMs,
    clearOnDefault,
    startTransition,
  ]);

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(
    initialState?.rowSelection ?? {}
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(initialState?.columnVisibility ?? {});

  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withOptions(queryStateOptions).withDefault(1)
  );

  const [limit, setLimit] = useQueryState(
    "limit",
    parseAsInteger
      .withOptions(queryStateOptions)
      .withDefault(initialState?.pagination?.pageSize ?? 10)
  );

  const [sorting, setSorting] = useQueryState(
    "sort",
    getSortingStateParser<TData>()
      .withOptions(queryStateOptions)
      .withDefault(initialState?.sorting ?? [])
  );

  const getAllFilters = React.useMemo(() => {
    return [
      ...(filters?.search?.length ? filters.search : []),
      ...(filters?.quickFilters ?? []),
      ...(filters?.sidebarFilters ?? []),
    ];
  }, [filters]);

  // Create parsers for each filter field
  const filterParsers = React.useMemo(() => {
    return getAllFilters.length
      ? getAllFilters.reduce<Record<string, Parser<string> | Parser<string[]>>>(
          (acc, field) => {
            // Use array parser for multi-select fields
            if (field.type === "multi") {
              acc[field.id!] = parseAsArrayOf(parseAsString, ",").withOptions(
                queryStateOptions
              );
            } else {
              // Use single value parser for everything else
              acc[field.id!] = parseAsString.withOptions(queryStateOptions);
            }
            return acc;
          },
          {}
        )
      : {};
  }, [getAllFilters, queryStateOptions]);

  const [filterValues, setFilterValues] = useQueryStates(filterParsers);

  const debouncedSetFilterValues = useDebouncedCallback(
    setFilterValues,
    debounceMs
  );

  // Paginate
  const pagination: PaginationState = {
    pageIndex: page - 1, // zero-based index -> one-based index
    pageSize: limit,
  };

  function onPaginationChange(updaterOrValue: Updater<PaginationState>) {
    //console.log("typeof updaterOrValue", typeof updaterOrValue, updaterOrValue);
    if (typeof updaterOrValue === "function") {
      const newPagination = updaterOrValue(pagination);
      void setPage(newPagination.pageIndex + 1);
      void setLimit(newPagination.pageSize);
    } else {
      void setPage(updaterOrValue.pageIndex + 1);
      void setLimit(updaterOrValue.pageSize);
    }
  }

  // Sort
  function onSortingChange(updaterOrValue: Updater<SortingState>) {
    if (typeof updaterOrValue === "function") {
      const newSorting = updaterOrValue(sorting) as ExtendedSortingState<TData>;
      void setSorting(newSorting);
    }
  }

  // Filter
  const initialColumnFilters: ColumnFiltersState = React.useMemo(() => {
    return Object.entries(filterValues).reduce<ColumnFiltersState>(
      (filters, [key, value]) => {
        if (value !== null) {
          filters.push({
            id: key,
            value: Array.isArray(value) ? value : [value],
          });
        }
        return filters;
      },
      []
    );
  }, [filterValues]);

  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>(initialColumnFilters);
  //console.log("columnFilters", columnFilters);
  // Memoize computation of singleValueFilters and multiValuesFilters
  const { singleValueFilters, multiValuesFilters } = React.useMemo(() => {
    return {
      singleValueFilters: getAllFilters.filter(
        (field) => field.type !== "multi"
      ),
      multiValuesFilters: getAllFilters.filter(
        (field) => field.type === "multi"
      ),
    };
  }, [getAllFilters]);
  //console.log({ singleValueFilters, multiValuesFilters });

  const updateMultipleFilters = React.useCallback(
    (nextNuqsFiltersStructure: Record<string, string | string[] | null>) => {
      //*the accepted filters are the next filters, and they are in nuqsFiltersStructure
      const cleanNuqsFilters = Object.fromEntries(
        Object.entries(nextNuqsFiltersStructure).filter(
          ([_, value]) => value !== ""
        )
      );
      setColumnFilters((prev) => {
        //console.log({ nextNuqsFiltersStructure });
        // Create a new array to hold the updated nextNuqsFiltersStructure, and the previos filters wheread nextNuqsFiltersStructure doesnt include the preivous filters
        const tanStackTableFiltersStructure: ColumnFiltersState = [...prev];

        // convert the nextNuqsFiltersStructure to the tanStackTableFiltersStructure structure
        Object.entries(cleanNuqsFilters).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            if (
              //if the filter doesn't exist, add the whole object
              !tanStackTableFiltersStructure.some((filter) => filter.id === key)
            ) {
              tanStackTableFiltersStructure.push({
                id: key,
                value: Array.isArray(value) ? value : [value],
              });
            } else {
              //if exists, only update the value
              tanStackTableFiltersStructure.forEach((filter) => {
                if (filter.id === key) {
                  filter.value = Array.isArray(value) ? value : [value];
                }
              });
            }
          }
        });
        //if a previous filter doesn't exit in the nextNuqsFiltersStructure filter, set it to null to remove it from the url
        /* for (const prevFilter of prev) {
          if (!(prevFilter.id in nextNuqsFiltersStructure)) {
            nextNuqsFiltersStructure[prevFilter.id] = null;
          }
        } */
        void setPage(1);
        debouncedSetFilterValues(cleanNuqsFilters);

        return tanStackTableFiltersStructure;
      });
    },
    [debouncedSetFilterValues, setPage, setColumnFilters]
  );
  const onColumnFiltersChange = React.useCallback(
    (updaterOrValue: Updater<ColumnFiltersState>) => {
      setColumnFilters((prev) => {
        //*the accepted filters are the next filters, and they are in tanStackTableFiltersStructure, and already includes the previous TanStackTableFilters
        const nextTanStackTableFiltersStructure =
          typeof updaterOrValue === "function"
            ? updaterOrValue(prev)
            : updaterOrValue;

        /*  console.log({
          updaterOrValue,
          nextTanStackTableFiltersStructure,
          prev,
          type: typeof updaterOrValue,
        }); */

        // convert the nextTanStackTableFiltersStructure to the nuqsFiltersStructure
        const nuqsFiltersStructure = nextTanStackTableFiltersStructure.reduce<
          Record<string, string | string[] | null>
        >((acc, filter) => {
          if (singleValueFilters.find((col) => col.id === filter.id)) {
            // For single value filters, use the value directly
            acc[filter.id] = filter.value as string;
          } else if (multiValuesFilters.find((col) => col.id === filter.id)) {
            // For multi values filters, use the array of values
            acc[filter.id] = filter.value as string[];
          }
          return acc;
        }, {});

        // since nextTanStackTableFiltersStructure includes previos and next (new) filters, so nuqsFiltersStructure also includes them, but to actually get the prev filters we use prev
        //if a previous filter doesn't exit in the nextTanStackTableFiltersStructure filter, set it to null to remove it from the url
        for (const prevFilter of prev) {
          if (
            !nextTanStackTableFiltersStructure.some(
              (filter) => filter.id === prevFilter.id
            )
          ) {
            nuqsFiltersStructure[prevFilter.id] = null;
          }
        }

        void setPage(1);

        debouncedSetFilterValues(nuqsFiltersStructure);
        return nextTanStackTableFiltersStructure;
      });
    },
    [debouncedSetFilterValues, multiValuesFilters, singleValueFilters, setPage]
  );

  const table = useReactTable({
    ...props,
    initialState,
    pageCount,
    state: {
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters: columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange,
    onSortingChange,
    onColumnFiltersChange,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  });

  return { table, updateMultipleFilters };
}
