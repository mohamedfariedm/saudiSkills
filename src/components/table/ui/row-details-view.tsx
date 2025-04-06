"use client";

import { cn } from "@/lib/utils";
import { TFunction } from "i18next";
import type React from "react";
import { CopyToClipboardCell, DateCell, ImageCell, StatusCell } from ".";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface RowDetailsViewProps<TData> {
  data: TData;
  t: TFunction;
  className?: string;
  order?: string[];
  exclude?: string[];
}

const defaultFormatters: Record<
  string,
  (value: any, name: string, t: TFunction) => React.ReactNode
> = {
  _id: (value: string) => <CopyToClipboardCell value={value} />,
  active: (value: boolean, name: string, t: TFunction) => (
    <StatusCell value={value} name={name} t={t} styled />
  ),
  // Add default date formatters
  createdAt: (value: Date) => <DateCell value={value} />,
  updatedAt: (value: Date) => <DateCell value={value} />,
  image: (value: string) => <ImageCell src={value} alt={value} />,
};

export function RowDetailsView<TData>({
  data,
  order = [],
  exclude = [],
  className,
  t,
}: RowDetailsViewProps<TData>) {
  const excludeFields = ["products", "branches", ...exclude];

  if (!data || typeof data !== "object") {
    console.error("Invalid data provided to RowDetailsView:", data);
    return <div className="text-red-500">Error: Invalid data provided</div>;
  }

  const allFields = Object.keys(data as Record<string, unknown>).filter(
    (field) => !excludeFields.includes(field)
  );

  const sortedFields = [
    ...order,
    ...allFields.filter((field) => !order.includes(field)).sort(),
  ].filter((field) => allFields.includes(field));

  const formatValue = (field: string, value: any) => {
    if (value === null || value === undefined) {
      return <span className="text-muted-foreground">Not set</span>;
    }

    if (defaultFormatters[field]) {
      return defaultFormatters[field](value, field, t);
    }

    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }

    if (Array.isArray(value)) {
      return (
        value.join(", ") || <span className="text-muted-foreground">None</span>
      );
    }

    if (typeof value === "object" && !Array.isArray(value)) {
      // Check if it's a language object
      if (value.en !== undefined || value.ar !== undefined) {
        return (
          <div className="flex flex-col gap-1">
            {value.en && (
              <div>
                <span className="font-semibold">EN:</span> {value.en}
              </div>
            )}
            {value.ar && (
              <div>
                <span className="font-semibold">AR:</span> {value.ar}
              </div>
            )}
          </div>
        );
      }

      return JSON.stringify(value, null, 2);
    }

    return value.toString();
  };

  const shouldTakeFullWidth = (field: string, value: any): boolean => {
    if (field === "_id") return true;

    /* if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      return true;
    } */

    if (Array.isArray(value) && value.length > 2) {
      return true;
    }

    if (typeof value === "string" && value.length > 100 && field !== "image") {
      return true;
    }

    return false;
  };

  // Group fields into pairs or full width
  const groupFields = () => {
    const groups: Array<string[]> = [];
    let currentPair: string[] = [];

    sortedFields.forEach((field) => {
      const value = (data as Record<string, unknown>)[field];

      if (shouldTakeFullWidth(field, value)) {
        // If we have a partial pair, add it first
        if (currentPair.length > 0) {
          groups.push([...currentPair]);
          currentPair = [];
        }
        // Add the full width field as its own group
        groups.push([field]);
      } else {
        currentPair.push(field);
        if (currentPair.length === 2) {
          groups.push([...currentPair]);
          currentPair = [];
        }
      }
    });

    // Add any remaining field
    if (currentPair.length > 0) {
      groups.push([...currentPair]);
    }

    return groups;
  };

  const fieldGroups = groupFields();

  if (fieldGroups.length === 0) {
    return <div className="p-4 text-muted-foreground">No data to display</div>;
  }
  console.log({ fieldGroups });
  return (
    <div className={cn("", className)}>
      <Table>
        <TableBody>
          {fieldGroups.map((group, index) => {
            const isFullWidth =
              group.length === 1 &&
              shouldTakeFullWidth(
                group[0],
                (data as Record<string, unknown>)[group[0]]
              );

            return (
              <TableRow
                key={index}
                className={index % 2 === 0 ? "bg-muted/50" : ""}
              >
                {isFullWidth ? (
                  // Full width field
                  <>
                    <TableCell className="font-medium text-muted-foreground w-1/6">
                      {t(`table.${group[0]}`)}:
                    </TableCell>
                    <TableCell
                      className="whitespace-normal break-all"
                      colSpan={3}
                    >
                      {formatValue(
                        group[0],
                        (data as Record<string, unknown>)[group[0]]
                      )}
                    </TableCell>
                  </>
                ) : (
                  // Two fields side by side
                  <>
                    <TableCell className="font-medium text-muted-foreground w-1/6 whitespace-nowrap">
                      {t(`table.${group[0]}`)}:
                    </TableCell>
                    <TableCell className="w-1/3">
                      {formatValue(
                        group[0],
                        (data as Record<string, unknown>)[group[0]]
                      )}
                    </TableCell>
                    {group[1] && (
                      <>
                        <TableCell className="font-medium text-muted-foreground w-1/6 whitespace-nowrap">
                          {t(`table.${group[1]}`)}:
                        </TableCell>
                        <TableCell className="w-1/3">
                          {formatValue(
                            group[1],
                            (data as Record<string, unknown>)[group[1]]
                          )}
                        </TableCell>
                      </>
                    )}
                  </>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
