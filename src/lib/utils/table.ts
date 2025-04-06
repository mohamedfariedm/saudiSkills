import { DateRangePicker } from "@/components/date-range-picker";
import {
  CustomCombobox,
  CustomInput,
  CustomSelect,
  MultiSelect,
} from "@/components/form";
import { DataTableFacetedFilter } from "@/components/table/ui/faceted-filter";
import { CrudRoutes, routes } from "@/constants/routes";
import { PageHeaderAction, TableActionsEnum } from "@/types";
import type { Column } from "@tanstack/react-table";
import { ReadonlyURLSearchParams } from "next/navigation";
import { FiPlusCircle } from "react-icons/fi";
import type { ExtendedSortingState } from "@/types";
import type { Row } from "@tanstack/react-table";
import { createParser } from "nuqs/server";
import { z } from "zod";


/**
 * Generate common pinning styles for a table column.
 *
 * This function calculates and returns CSS properties for pinned columns in a data table.
 * It handles both left and right pinning, applying appropriate styles for positioning,
 * shadows, and z-index. The function also considers whether the column is the last left-pinned
 * or first right-pinned column to apply specific shadow effects.
 *
 * @param options - The options for generating pinning styles.
 * @param options.column - The column object for which to generate styles.
 * @param options.withBorder - Whether to show a box shadow between pinned and scrollable columns.
 * @returns A React.CSSProperties object containing the calculated styles.
 */
export function getCommonPinningStyles<TData>({
  column,
  withBorder = true,
}: {
  column: Column<TData>;
  /**
   * Show box shadow between pinned and scrollable columns.
   * @default false
   */
  withBorder?: boolean;
}): React.CSSProperties {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    boxShadow: withBorder
      ? isLastLeftPinnedColumn
        ? "-4px 0 4px -4px hsl(var(--border)) inset"
        : isFirstRightPinnedColumn
          ? "4px 0 4px -4px hsl(var(--border)) inset"
          : undefined
      : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    opacity: isPinned ? 0.97 : 1,
    position: isPinned ? "sticky" : "relative",
    background: isPinned ? "hsl(var(--default-100))" : "hsl(var(--background))",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
}
export const tableFilterComponentsMap: Record<
  | "input"
  | "select"
  | "combobox"
  | "multiSelect"
  | "dateRange"
  | "facetedFilter",
  React.ComponentType<any>
> = {
  input: CustomInput,
  select: CustomSelect,
  combobox: CustomCombobox,
  multiSelect: MultiSelect,
  dateRange: DateRangePicker,
  facetedFilter: DataTableFacetedFilter,
};

export function generateActions({
  tableFor,
  actions,
  setRowAction,
  t,
}: {
  tableFor: string;
  actions: TableActionsEnum[];
  setRowAction: React.Dispatch<React.SetStateAction<any>>;
  t: (key: string) => string;
}): PageHeaderAction[] {
  const generatedActions: PageHeaderAction[] = [];

  // Handle CREATE actions
  if (actions.includes(TableActionsEnum.CREATE_IN_SAME_PAGE)) {
    generatedActions.push({
      text: t("page_header.actions.create"),
      handler: () => setRowAction({ row: {}, type: "create" }),
      icon: FiPlusCircle,
    });
  } else if (actions.includes(TableActionsEnum.CREATE_IN_NEW_PAGE)) {
    generatedActions.push({
      text: t("page_header.actions.create"),
      href: (routes[tableFor] as CrudRoutes).create,
      icon: FiPlusCircle,
    });
  }

  // Extra action example: Import

  return generatedActions;
}
export function parseSearchParams(
  searchParams: ReadonlyURLSearchParams | Record<string, string>
): Record<string, string | string[]> {
  // Convert searchParams to regular object of key value pairs if it's URLSearchParams, params = {page:1, limit:10}
  const params =
    searchParams instanceof URLSearchParams
      ? Object.fromEntries(searchParams.entries())
      : searchParams;

  // Initialize with default pagination
  const result: Record<string, string | string[]> = {
    page: params.page ?? "1",
    limit: params.limit ?? "10",
  };

  // Process all other params filters
  for (const [key, value] of Object.entries(params)) {
    // Skip pagination params as they're already handled
    if (key === "page" || key === "limit" || !value || value === "undefined")
      continue;

    // Handle array values (comma-separated)
    if (value?.includes(",")) {
      result[key] = value.split(",");
    } else if (value) {
      result[key] = value;
    }
  }
  /* console.log("searchParams", {
    params: params,
    result: result,
  }); */

  return result;
}

export const tableActionsInSamePage = [
  TableActionsEnum.CREATE_IN_SAME_PAGE,
  TableActionsEnum.EDIT_IN_SAME_PAGE,
  TableActionsEnum.VIEW,
  TableActionsEnum.DELETE,
  TableActionsEnum.EXPORT,
];

export const tableActionsInNewPage = [
  TableActionsEnum.CREATE_IN_NEW_PAGE,
  TableActionsEnum.EDIT_IN_NEW_PAGE,
  TableActionsEnum.VIEW,
  TableActionsEnum.DELETE,
  TableActionsEnum.EXPORT,
];


export const sortingItemSchema = z.object({
  id: z.string(),
  desc: z.boolean(),
});

/**
 * Creates a parser for TanStack Table sorting state.
 * @param originalRow The original row data to validate sorting keys against.
 * @returns A parser for TanStack Table sorting state.
 */
export const getSortingStateParser = <TData>(
  originalRow?: Row<TData>["original"]
) => {
  const validKeys = originalRow ? new Set(Object.keys(originalRow)) : null;

  return createParser<ExtendedSortingState<TData>>({
    parse: (value) => {
      try {
        const parsed = JSON.parse(value);
        const result = z.array(sortingItemSchema).safeParse(parsed);

        if (!result.success) return null;

        if (validKeys && result.data.some((item) => !validKeys.has(item.id))) {
          return null;
        }

        return result.data as ExtendedSortingState<TData>;
      } catch {
        return null;
      }
    },
    serialize: (value) => JSON.stringify(value),
    eq: (a, b) =>
      a.length === b.length &&
      a.every(
        (item, index) =>
          item.id === b[index]?.id && item.desc === b[index]?.desc
      ),
  });
};
