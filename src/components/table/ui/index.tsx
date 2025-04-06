import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CrudRoutes, routes } from "@/constants/routes";
import { cn, formatDate } from "@/lib/utils";
import { TableActionProps, TableActionsEnum } from "@/types";
import { TFunction } from "i18next";
import { CheckCircle, Copy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";

interface ImageCellProps {
  src: string;
  alt: string;
  thumbnailSize?: { width: number; height: number };
  fullSize?: { width: number; height: number };
}
export function ImageCell({
  src,
  alt,
  thumbnailSize = { width: 50, height: 50 },
  fullSize = { width: 300, height: 300 },
}: ImageCellProps) {
  const imageElement = (
    <div
      className="relative rounded-md overflow-hidden border border-border mx-auto"
      style={{ width: thumbnailSize.width, height: thumbnailSize.height }}
    >
      <Image
        src={src || "/assets/placeholder.jpeg"}
        alt={alt}
        fill
        className="object-cover"
        sizes={`${thumbnailSize.width}px`}
      />
    </div>
  );

  if (!src) {
    return imageElement;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="cursor-pointer mx-auto ">{imageElement}</div>
      </TooltipTrigger>
      <TooltipContent className="p-0 overflow-hidden border border-border rounded-md   bg -red-500 z-[-100000000]">
        <div
          style={{
            width: fullSize.width,
            height: fullSize.height,
            overflow: "hidden",
          }}
        >
          <Image
            src={src || "/assets/placeholder.jpeg"}
            alt={alt}
            fill
            className="object-cover"
            sizes={`${fullSize.width}px`}
          />
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
export function StatusCell({
  value,
  name,
  t,
  styled,
}: {
  value: boolean;
  name: string;
  t: TFunction;
  styled?: boolean;
}) {
  return (
    <h3
      className={cn(
        "text-center mx-auto rounded-full border py-0.5 w-fit px-2.5",
        styled
          ? value
            ? "text-green-500 border-green-500"
            : "text-red-500 border-red-400"
          : ""
      )}
    >
      {t(`table.${name}`, {
        context: value ? "true" : "false",
      })}
    </h3>
  );
}
export function TableCell({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  return <h3 className={cn("text-center", className)}>{value}</h3>;
}

export function DateCell({ value }: { value: Date }) {
  return <h3 className="text-center">{formatDate(value)}</h3>;
}
export function TableActions<T>({
  actions,
  setRowAction,
  row,
  tableFor,
}: TableActionProps<T>) {
  const { t } = useTranslation("common");

  return (
    <div className="flex space-x-2">
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
          <TooltipContent>{t("table.actions.edit")}</TooltipContent>
        </Tooltip>
      )}
      {actions.includes(TableActionsEnum.EDIT_IN_NEW_PAGE) && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={(routes[tableFor] as CrudRoutes).edit(
                (row.original as any)._id
              )}
              target="_blank"
              className={cn(buttonVariants({ variant: "ghost" }), "px-3")}
            >
              <FiEdit className="size-4" aria-hidden="true" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>{t("table.actions.edit")}</TooltipContent>
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
          <TooltipContent>{t("table.actions.view")}</TooltipContent>
        </Tooltip>
      )}

      {/* Delete Button */}
      {actions.includes(TableActionsEnum.DELETE) && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              color="destructive"
              onClick={() => setRowAction({ row, type: "delete" })}
            >
              <FiTrash2 className="size-4 " aria-hidden="true" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-destructive/80 border-none  text-destructive-foreground">
            {t("table.actions.delete")}
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
export const CopyToClipboardCell = ({
  value,
  className,
}: {
  value: string;
  className?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(
      () => {
        setCopied(true);
        toast("ID has been copied to clipboard");

        // Reset the copied state after 2 seconds
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <div
      className={cn("flex items-center justify-center gap-2 w-32", className)}
    >
      <span title={value ?? ""} className="truncate">
        {value}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 shrink-0"
        onClick={handleCopy}
      >
        {copied ? (
          <CheckCircle className="h-3.5 w-3.5 text-green-500" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
        <span className="sr-only">{copied ? "Copied" : "Copy ID"}</span>
      </Button>
    </div>
  );
};
