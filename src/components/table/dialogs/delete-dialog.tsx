"use client";

import type { Row } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

import { executeServerAction } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";

interface DeleteRowsDialogProps<TData>
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  selectedRows: Row<TData>["original"][];
  endpointQuery: string;
  showTrigger?: boolean;
  onSuccess?: () => void;
}

export function DeleteRowsDialog<TData>({
  selectedRows,
  showTrigger = true,
  onSuccess,
  endpointQuery,
  ...props
}: DeleteRowsDialogProps<TData>) {
  const [isDeletePending, startDeleteTransition] = React.useTransition();
  const isDesktop = useMediaQuery("(min-width: 640px)");

  function onDelete() {
    startDeleteTransition(async () => {
      const { data, error } = await executeServerAction(endpointQuery, {
        params: {
          _id: (selectedRows?.[0] as any)?._id,
          // _id: selectedRows?.length===1?selectedRows[0]._id:selectedRows.map((task) => task._id),
        },
      });
      //console.log({ clientRes: res });

      if (error) {
        toast.error(error?.response?.data?.message);
        return;
      }

      props.onOpenChange?.(false);
      toast.success(data?.message);
      onSuccess?.();
    });
  }

  if (isDesktop) {
    return (
      <Dialog {...props}>
        {showTrigger ? (
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Trash className="mr-2 size-4" aria-hidden="true" />
              Delete ({selectedRows.length})
            </Button>
          </DialogTrigger>
        ) : null}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your{" "}
              <span className="font-medium">{selectedRows.length}</span>
              {selectedRows.length === 1 ? " row" : " rows"} from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:space-x-0">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              aria-label="Delete selected rows"
              onClick={onDelete}
              variant="outline"
              color="destructive"
              disabled={isDeletePending}
              isPending={isDeletePending}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer {...props}>
      {showTrigger ? (
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm">
            <Trash className="mr-2 size-4" aria-hidden="true" />
            Delete ({selectedRows.length})
          </Button>
        </DrawerTrigger>
      ) : null}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>
            This action cannot be undone. This will permanently delete your{" "}
            <span className="font-medium">{selectedRows.length}</span>
            {selectedRows.length === 1 ? " row" : " rows"} from our servers.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="gap-2 sm:space-x-0">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button
            aria-label="Delete selected rows"
            variant="outline"
            color="destructive"
            onClick={onDelete}
            disabled={isDeletePending}
            isPending={isDeletePending}
          >
            Delete
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
