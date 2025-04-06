"use client";

import { DataTableColumnHeader } from "@/components/table/ui/column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { Branch, TableColumnsProps } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { CommonTableColumns, getLocalizedField } from ".";
import { CopyToClipboardCell, StatusCell, TableCell } from "../ui";

export function getBranchesColumns<T>({
  setRowAction,
  actions,
  t,
  tableFor,
}: TableColumnsProps<T>): ColumnDef<T>[] {
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
          className="translate-y-0.5 mr-3.5 rtl:mr-0 rtl:ml-3.5"
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
      accessorKey: "_id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table._id")} />
      ),
      cell: ({ row }) => <CopyToClipboardCell value={row.getValue("_id")} />,
    },
    {
      accessorKey: "referenceCode",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("table.referenceCode")}
        />
      ),
      cell: ({ row }) => (
        <CopyToClipboardCell value={row.getValue("referenceCode")} />
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.name")} />
      ),
      cell: ({ row }) => (
        <CopyToClipboardCell
          value={getLocalizedField(row.getValue("name"))}
          className="w-40"
        />
      ),
    },
    {
      accessorKey: "address",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.address")} />
      ),
      cell: ({ row }) => (
        <TableCell value={getLocalizedField(row.getValue("address"))} />
      ),
    },
    {
      accessorKey: "phone",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.phone")} />
      ),
      cell: ({ row }) => (
        <CopyToClipboardCell value={row.getValue("phone")} className="w-fit" />
      ),
    },
    {
      accessorKey: "active",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.active")} />
      ),
      cell: ({ row }) => (
        <StatusCell value={row.getValue("active")} name="active" t={t} styled />
      ),
    },
    {
      accessorKey: "archive",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.archive")} />
      ),
      cell: ({ row }) => (
        <StatusCell
          value={row.getValue("archive")}
          name="archive"
          t={t}
          styled={false}
        />
      ),
    },
    {
      accessorKey: "pickup",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.pickup")} />
      ),
      cell: ({ row }) => (
        <StatusCell
          value={row.getValue("pickup")}
          name="pickup"
          t={t}
          styled={false}
        />
      ),
    },
    {
      accessorKey: "carPickup",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.carPickup")} />
      ),
      cell: ({ row }) => (
        <StatusCell
          value={row.getValue("carPickup")}
          name="carPickup"
          t={t}
          styled={false}
        />
      ),
    },
    {
      accessorKey: "autoConfirmation",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("table.autoConfirmation")}
        />
      ),
      cell: ({ row }) => (
        <StatusCell
          value={row.getValue("autoConfirmation")}
          name="autoConfirmation"
          t={t}
          styled={false}
        />
      ),
    },
    {
      accessorKey: "autoCancellation",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("table.autoCancellation")}
        />
      ),
      cell: ({ row }) => (
        <StatusCell
          value={row.getValue("autoCancellation")}
          name="autoCancellation"
          t={t}
          styled={false}
        />
      ),
    },
    {
      accessorKey: "autoCancellationMinutes",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("table.autoCancellationMinutes")}
        />
      ),
      cell: ({ row }) => (
        <TableCell value={row.getValue("autoCancellationMinutes")} />
      ),
    },

    {
      accessorKey: "subscriptionActive",
      //id: "subscription.active", // Use a unique ID for the column
      //accessorFn: (row) => (row as Branch).subscription.active, // Use accessorFn instead of accessorKey
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("table.subscription")}
        />
      ),
      cell: ({ row }) => (
        <StatusCell
          //value={row.getValue("subscription.active")}
          value={row.getValue("subscriptionActive")}
          name="subscription"
          t={t}
        />
      ),
    },
    {
      //id: "delivery.active", // Use a unique ID for the column
      //accessorFn: (row) => (row as Branch).delivery.active, // Use accessorFn instead of accessorKey
      accessorKey: "deliveryActive",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.delivery")} />
      ),
      cell: ({ row }) => (
        <StatusCell
          //value={row.getValue("delivery.active")}
          value={row.getValue("deliveryActive")}
          name="delivery"
          t={t}
        />
      ),
    },
    {
      accessorKey: "deliveryFees",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("table.deliveryFees")}
        />
      ),
      cell: ({ row }) => <TableCell value={row.getValue("deliveryFees")} />,
    },
    {
      accessorKey: "mapLocation",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.mapLocation")} />
      ),
      cell: ({ row }) => <TableCell value={row.getValue("mapLocation")} />,
    },
    {
      accessorKey: "noLocationOrder",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("table.noLocationOrder")}
        />
      ),
      cell: ({ row }) => <TableCell value={row.getValue("noLocationOrder")} />,
    },
    {
      accessorKey: "mapOrder",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.mapOrder")} />
      ),
      cell: ({ row }) => <TableCell value={row.getValue("mapOrder")} />,
    },
    ...CommonTableColumns<T>({ setRowAction, actions, t, tableFor }),
  ];
}
