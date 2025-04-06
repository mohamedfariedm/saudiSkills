import type { ColumnSort, Row } from "@tanstack/react-table";

import { tableFilterComponentsMap } from "@/lib/utils/table";
import { TFunction } from "i18next";

export type StringKeyOf<TData> = Extract<keyof TData, string>;

export interface ExtendedColumnSort<TData> extends Omit<ColumnSort, "id"> {
  //id: StringKeyOf<TData>;
  id: string;
}
export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  count?: number;
  disable?: boolean; // for multi select
}
export type ExtendedSortingState<TData> = ExtendedColumnSort<TData>[];


export interface DataTableFilterField<TData> {
  id: StringKeyOf<TData>;
  type?: "single" | "multi";
  label: string;
  placeholder?: string;
  options?: Option[];
}

export interface DataTableRowAction<TData> {
  row: Row<TData>;
  type: rowActionType;
}

export type rowActionType = "create" | "update" | "view" | "delete";

export type Task = {
  id: string;
  order: number;
  code: string;
  title: string;
  status: "todo" | "in-progress" | "done" | "canceled";
  label: "bug" | "feature" | "enhancement" | "documentation";
  priority: "low" | "medium" | "high";
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type GetTasksInput = {
  page: number;
  perPage: number;
  title?: string;
  status?: string[];
  priority?: string[];
  from?: string;
  to?: string;
  sort?: { id: string; desc: boolean }[];
};
export const taskStatuses = [
  "todo",
  "in-progress",
  "done",
  "canceled",
] as const;
export type TaskStatus = (typeof taskStatuses)[number];

// Task label options
export const taskLabels = [
  "bug",
  "feature",
  "enhancement",
  "documentation",
] as const;
export type TaskLabel = (typeof taskLabels)[number];

// Task priority options
export const taskPriorities = ["low", "medium", "high"] as const;
export type TaskPriority = (typeof taskPriorities)[number];

// Define the type based on the array values
export enum TableActionsEnum {
  CREATE_IN_SAME_PAGE = "CREATE_IN_SAME_PAGE",
  CREATE_IN_NEW_PAGE = "CREATE_IN_NEW_PAGE",
  EDIT_IN_SAME_PAGE = "EDIT_IN_SAME_PAGE",
  EDIT_IN_NEW_PAGE = "EDIT_IN_NEW_PAGE",
  DELETE = "DELETE",
  EXPORT = "EXPORT",
  VIEW = "VIEW",
}
type FilterOption = {
  label: string;
  value: string;
  count?: number;
};
export type TableFilterComponentType = keyof typeof tableFilterComponentsMap;

export type TableFilterField = {
  id?: string;
  label?: string;
  placeholder?: string;
  component?: TableFilterComponentType;
  options?: FilterOption[];
  props?: Record<string, any>;
  type?: "single" | "multi"; //* the value of the filter can e single or array of values in case we use multi select component
};

export type TableFilterFields = {
  search?: TableFilterField[];
  quickFilters?: TableFilterField[];
  sidebarFilters?: TableFilterField[];
};

export interface TableColumnsActionProps<T> {
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<T> | null>
  >;
  actions: TableActionsEnum[];
  tableFor: string;
}

export interface TableActionProps<T> extends TableColumnsActionProps<T> {
  row: Row<T>;
}
export interface TableColumnsProps<T> extends TableColumnsActionProps<T> {
  t: TFunction;
}
