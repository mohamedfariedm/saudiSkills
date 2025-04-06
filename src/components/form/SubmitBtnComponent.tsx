import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Loader } from "../layout";

interface ISubmitBtnComponentProps {
  value: string;
  disabled?: boolean;
  isSubmitting?: boolean;
  isPending?: boolean;
  alignment?: "vertical" | "horizontal";
  className?: string;
}

function SubmitBtnComponent({
  value = "Send",
  disabled,
  isSubmitting,
  isPending,
  className,
}: ISubmitBtnComponentProps) {
  return (
    <Button
      disabled={disabled}
      className={cn("h-input w-full disabled:opacity-70", className)}
      type="submit"
    >
      <span>{isSubmitting || isPending ? <Loader /> : value}</span>
    </Button>
  );
}

export default SubmitBtnComponent;
