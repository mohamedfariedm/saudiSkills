import { ThemeName } from "./thems";

export const siteConfig: SiteConfig = {
  name: "Sahl Solution",
  description: null,
  theme: "primary",
  layout: "vertical",
  hideSideBar: false,
  sidebarType: "classic",
  sidebarColor: null,
  navbarType: "sticky",
  footerType: "hidden",
  sidebarBg: "none",
  radius: 0.5,
};

interface SiteConfig {
  name: string;
  description: string | null;
  theme: ThemeName;
  layout: "semibox" | "horizontal" | "vertical";
  hideSideBar: boolean;
  sidebarType: "popover" | "classic" | "module";
  sidebarColor: string | null;
  navbarType: "sticky" | "floating" | "static";
  footerType: "sticky" | "static" | "hidden";
  sidebarBg: "none" | string;
  radius: number;
}
