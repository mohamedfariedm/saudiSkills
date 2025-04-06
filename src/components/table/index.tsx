"use client";

import { useDataTable } from "@/hooks/use-data-table";
import {
  FormTabSection,
  PaginatedResponse,
  TableActionsEnum,
  TableFilterFields,
  type DataTableRowAction,
} from "@/types";
import * as React from "react";

import { PageHeader } from "@/components/layout";
import { DataTableSkeleton } from "@/components/table/ui/skeleton";
import { useFetchData } from "@/hooks/useFetch";
import {
  generateActions,
  parseSearchParams,
  tableActionsInSamePage,
} from "@/lib/utils/table";
import { queryClient } from "@/providers/query-client-instance";
import { TABLE_QUERY_MAP } from "@/services/api/queries";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { TABLE_COLUMNS_MAP } from "./columns";
import { DataTable } from "./data-table";
import CreateUpdateViewSheet from "./dialogs/create-update-view-sheet";
import { DeleteRowsDialog } from "./dialogs/delete-dialog";
import TableFiltersSheet from "./dialogs/filters-sheet";
import TableToolbar from "./ui/toolbar";

/**
   * Steps to create a new table
   * 0-update the menus file with the new route, if CREATE_IN_NEW_PAGE and EDIT_IN_NEW_PAGE add /    create and /edit routes as well
   * 1-update the tablesNames object with the new table name, this new name must be exact in the locales folder, columns, schema
   * 2-update the queries.ts and endpoints.ts files with the crud details
   * 3-customize the actions if needed
   * 4-add filterFields configuration
   * 5-add formFields configuration
   * 6-add the new table columns
   * 7-add the schema for create and update fields
   * 8-customize the DataTableSkeleton
   
*/
export default function DataTablePage<T>({
  tableFor,
  actions = tableActionsInSamePage,
  filterFields,
  formFields,
}: {
  tableFor: string;
  actions?: TableActionsEnum[];
  filterFields?: TableFilterFields;
  formFields?: FormTabSection[];
}) {
  const searchParams = useSearchParams();
  const parsedSearchParams = parseSearchParams(searchParams);
  //console.log("parsedSearchParams", parsedSearchParams);
  const tableQuery = TABLE_QUERY_MAP[tableFor];

  const { data, isPending, isLoading, isFetching, isRefetching } = useFetchData<
    PaginatedResponse<T>
  >(tableQuery.get, {
    query: parsedSearchParams,
  });
  const { t } = useTranslation(tableFor);
  console.log("teeet", {
    data,
  });

  const [rowAction, setRowAction] =
    React.useState<DataTableRowAction<T> | null>(null);

  const getTableColumns = TABLE_COLUMNS_MAP[tableFor];

  const columns = React.useMemo(
    () => getTableColumns<T>({ setRowAction, actions, t, tableFor }),
    []
  );

  /*  console.log("statuses", {
    isPending,
    isLoading,
    isFetching,
    isRefetching,
  }); */

  const { table, updateMultipleFilters } = useDataTable({
    data: data?.items || [],
    columns,
    pageCount: data?.pagination?.totalPages || 0,
    filters: filterFields,
    initialState: {
      //sorting: [{ id: "createdAt", desc: true }],
      columnPinning: { right: ["actions"], left: ["select"] },
    },
    getRowId: (originalRow: any) => originalRow.id,
    shallow: false,
    clearOnDefault: true,
    defaultColumn: {
      enableSorting: false,
      enableHiding: true,
    },
  });

  const pageActions = React.useMemo(
    () => generateActions({ tableFor, actions, setRowAction, t }),
    [tableFor, actions]
  );

  return (
    <>
      <PageHeader
        title={t("page_header.title")}
        subtitle={t("page_header.subtitle")}
        actions={pageActions}
      />
      {isLoading ? (
        <DataTableSkeleton
          columnCount={columns.length}
          searchableColumnCount={filterFields?.search?.length ?? 0}
          filterableColumnCount={filterFields?.quickFilters?.length ?? 0}
          cellWidths={[
            "10rem",
            "10rem",
            "40rem",
            "12rem",
            "12rem",
            "8rem",
            "8rem",
          ]}
          shrinkZero
        />
      ) : (
        <DataTable table={table} floatingBar>
          <TableToolbar
            table={table}
            filters={filterFields}
            actions={actions}
            endpointQuery={tableQuery.delete}
          >
            {filterFields?.sidebarFilters &&
              filterFields?.sidebarFilters?.length > 0 && (
                <TableFiltersSheet
                  sidebarFilters={filterFields?.sidebarFilters}
                  searchParamsValues={parsedSearchParams}
                  updateMultipleFilters={updateMultipleFilters}
                  resetFilters={() => table.resetColumnFilters()}
                />
              )}
          </TableToolbar>
        </DataTable>
      )}
      {formFields && (
        <CreateUpdateViewSheet<T>
          rowAction={rowAction}
          setRowAction={setRowAction}
          formFields={formFields}
          tableQuery={tableQuery}
          tableFor={tableFor}
          t={t}
        />
      )}
      <DeleteRowsDialog
        open={rowAction?.type === "delete"}
        onOpenChange={() => setRowAction(null)}
        selectedRows={rowAction?.row.original ? [rowAction?.row.original] : []}
        showTrigger={false}
        onSuccess={() => {
          rowAction?.row.toggleSelected(false);
          queryClient.refetchQueries({
            queryKey: [tableQuery.get],
          });
        }}
        endpointQuery={tableQuery.delete}
      />
    </>
  );
}
