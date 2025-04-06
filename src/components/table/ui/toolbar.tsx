"use client";

import type { TableFilterFields } from "@/types";
import type { Table } from "@tanstack/react-table";
import { Download, X } from "lucide-react";
import * as React from "react";

import { ColumnsViewController } from "@/components/table/ui/columns-view-controller";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { exportTableToCSV } from "@/lib/export";
import { cn } from "@/lib/utils";
import { tableFilterComponentsMap } from "@/lib/utils/table";
import { DeleteRowsDialog } from "../dialogs/delete-dialog";

interface TableToolbarProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>;
  endpointQuery: string;
  actions: string[];
  filters?: TableFilterFields;
}

export default function TableToolbar<TData>({
  table,
  filters,
  children,
  className,
  actions,
  endpointQuery,

  ...props
}: TableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div
      className={cn(
        "flex w-full items-center justify-between gap-2 overflow-auto p-1",
        className
      )}
      {...props}
    >
      <div className="flex flex-1 items-center gap-2">
        {filters?.search &&
          filters?.search?.length > 0 &&
          filters?.search.map(
            (column) =>
              table.getColumn(column.id ? String(column.id) : "") && (
                <Input
                  key={String(column.id)}
                  placeholder={column.placeholder}
                  value={
                    (table
                      .getColumn(String(column.id))
                      ?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn(String(column.id))
                      ?.setFilterValue(event.target.value)
                  }
                  className="h-8 w-40 lg:w-64"
                />
              )
          )}

        {filters?.quickFilters &&
          filters?.quickFilters?.length > 0 &&
          filters?.quickFilters?.map(({ id, component, props, ...rest }) => {
            if (!component || !(component in tableFilterComponentsMap))
              return null; // Type-safe check

            const Component = tableFilterComponentsMap[component];

            return (
              <Component
                key={id}
                id={id}
                //name={id} // is needed only when rendering custom form element that uses the name in register of react hook form
                column={table.getColumn(id ? String(id) : "")}
                {...props}
                {...rest}
              />
            );
          })}
        {isFiltered && (
          <Button
            aria-label="Reset filters"
            variant="ghost"
            className="h-8 px-2 lg:px-3"
            onClick={() => table.resetColumnFilters()}
          >
            Reset
            <X className="ml-2 size-4" aria-hidden="true" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          {actions?.includes("DELETE") &&
          table.getFilteredSelectedRowModel().rows.length > 0 ? (
            <DeleteRowsDialog
              selectedRows={table
                .getFilteredSelectedRowModel()
                .rows.map((row) => row.original)}
              onSuccess={() => table.toggleAllRowsSelected(false)}
              endpointQuery={endpointQuery}
            />
          ) : null}
          {actions?.includes("EXPORT") && (
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                exportTableToCSV(table, {
                  filename: "tasks",
                  excludeColumns: ["select", "actions"],
                })
              }
              className="gap-2"
            >
              <Download className="size-4" aria-hidden="true" />
              Export
            </Button>
          )}
          {children}
          {/**
           * Other actions can be added here.
           * For example, import, view, etc.
           */}
        </div>
        <ColumnsViewController table={table} />
      </div>
    </div>
  );
}
