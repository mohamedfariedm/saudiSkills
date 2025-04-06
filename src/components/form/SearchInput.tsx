import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FiSearch } from "react-icons/fi";

function SearchInput({
  value,
  onChange,
  className,
  placeholder,
}: {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  placeholder: string;
}) {
  return (
    <div className={cn("w-full max-w-full relative h-9 ", className)}>
      <div className="absolute top-1/2 left-3 rtl:left-auto rtl:right-3  -translate-y-1/2 text-foreground-quaternary-500">
        <FiSearch className=" text- rtl:flip" />
      </div>
      <Input
        className="!w-full !max-w-full pr-3 pl-9 rtl:pr-9 rtl:pl-3 h-full bg-background-disabled-subtle rounded-lg border border-border-primary text-text-disabled text-sm rtl:rtl"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

export default SearchInput;
