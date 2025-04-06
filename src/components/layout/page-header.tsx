import Link from "next/link";
import type { Url } from "next/dist/shared/lib/router/router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PageHeaderAction } from "@/types";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: PageHeaderAction[];
}

export default function PageHeader({
  title,
  subtitle,
  actions,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {actions && actions.length > 0 && (
        <div className="flex flex-wrap items-center gap-4">
          {actions.map((action, index) => {
            if (action.href) {
              return (
                <Link
                  key={index}
                  href={action.href}
                  className={cn(
                    "gap-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2",
                    action.className
                  )}
                >
                  {action.icon && <action.icon className=" h-4 w-4" />}
                  {action.text}
                </Link>
              );
            }
            return (
              <Button
                key={index}
                onClick={action.handler}
                className={cn("gap-2", action.className)}
              >
                {action.icon && <action.icon className=" h-4 w-4" />}
                {action.text}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}
