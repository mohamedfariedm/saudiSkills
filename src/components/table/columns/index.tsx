"use client";

import { DataTableColumnHeader } from "@/components/table/ui/column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { tablesNames } from "@/constants";
import { formatDate } from "@/lib/utils";
import {
  LocalizedField,
  TableActionsEnum,
  TableColumnsProps,
  taskLabels,
  taskPriorities,
  taskStatuses,
  type Task,
} from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { getI18n } from "react-i18next";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { DateCell, TableActions } from "../ui";
import { getBranchesColumns } from "./branches-columns";
import { getCategoriesColumns } from "./categories-columns";

export function getLocalizedField(field: LocalizedField) {
  const locale = getI18n().language as keyof LocalizedField;
  return field[locale];
}

export function CommonTableColumns<T>({
  setRowAction,
  actions,
  t,
  tableFor,
}: TableColumnsProps<T>): ColumnDef<T>[] {
  return [
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("table.createdAt")}
          className="whitespace-nowrap"
        />
      ),
      cell: ({ cell }) => <DateCell value={cell.getValue<Date>()} />,
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("table.updatedAt")}
          className="whitespace-nowrap"
        />
      ),
      cell: ({ cell }) => <DateCell value={cell.getValue<Date>()} />,
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        return (
          <TableActions
            actions={actions}
            row={row}
            setRowAction={setRowAction}
            tableFor={tableFor}
          />
        );
      },
      size: 80,
    },
  ];
}
export function getColumns<T>({
  setRowAction,
  actions,
}: TableColumnsProps<T>): ColumnDef<T>[] {
  //console.log({ actions });
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
    },
    {
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Task" />
      ),
      cell: ({ row }) => <div className="w-20">{row.getValue("code")}</div>,
    },
    {
      accessorKey: "order",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="order" />
      ),
      cell: ({ row }) => <div className="w-20">{row.getValue("order")}</div>,
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => {
        const label = taskLabels.find(
          (label) => label === (row.original as Task).label
        );

        return (
          <div className="flex space-x-2">
            {label && <Badge variant="outline">{label}</Badge>}
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue("title")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = taskStatuses.find(
          (status) => status === (row.original as Task).status
        );

        if (!status) return null;

        return (
          <div className="flex w-[6.25rem] items-center">
            <span className="capitalize">{status}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "priority",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Priority" />
      ),
      cell: ({ row }) => {
        const priority = taskPriorities.find(
          (priority) => priority === (row.original as Task).priority
        );

        if (!priority) return null;

        return (
          <div className="flex items-center">
            <span className="capitalize">{priority}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "archived",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Archived" />
      ),
      cell: ({ row }) => (
        <Badge variant="outline">
          {(row.original as Task).archived ? "Yes" : "No"}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ cell }) => formatDate(cell.getValue() as Date),
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        return (
          <div className="flex space-x-2">
            {/* Edit Button */}
            {actions.includes(TableActionsEnum.EDIT_IN_SAME_PAGE) && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setRowAction({ row, type: "update" })}
                  >
                    <FiEdit className="size-4" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Edit</TooltipContent>
              </Tooltip>
            )}

            {/* View Button */}
            {actions.includes(TableActionsEnum.VIEW) && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setRowAction({ row, type: "view" })}
                  >
                    <FiEye className="size-4" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View</TooltipContent>
              </Tooltip>
            )}

            {/* Delete Button */}
            {actions.includes(TableActionsEnum.DELETE) && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setRowAction({ row, type: "delete" })}
                  >
                    <FiTrash2
                      className="size-4 text-red-500"
                      aria-hidden="true"
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete</TooltipContent>
              </Tooltip>
            )}
          </div>
        );
      },
      size: 80,
    },
  ];
}

export const TABLE_COLUMNS_MAP: Record<
  string,
  <T>(props: TableColumnsProps<T>) => ColumnDef<T>[]
> = {
  users: getColumns,
  [tablesNames.categories]: getCategoriesColumns,
  [tablesNames.branches]: getBranchesColumns,
};
