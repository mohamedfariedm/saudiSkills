"use client";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store";
import { Inter } from "next/font/google";
//import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });
const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, radius } = useThemeStore();

  //const location = usePathname();

  /*  if (location === "/") {
    return (
      <body className={cn("dash-tail-app ", inter.className)}>
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          defaultTheme="light"
        >
          <div className={cn("h-full  ")}>
            <TooltipProvider>{children}</TooltipProvider>
            <ReactToaster />
          </div>
          <Toaster />
          <SonnToaster />
        </ThemeProvider>
      </body>
    );
  } */
  return (
    <body
      className={cn("dash-tail-app ", inter.className, "theme-" + theme)}
      style={
        {
          "--radius": `${radius}rem`,
        } as React.CSSProperties
      }
    >
      <div className={cn("h-full  ")}>{children}</div>
    </body>
  );
};

export default AppThemeProvider;
