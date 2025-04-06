import { routes } from "@/constants/routes";
import {
  RiDashboardFill,
  RiShoppingBag3Fill,
  RiMapPinTimeLine,
  RiImageFill,
} from "react-icons/ri";
import {
  MdShoppingCart,
  MdCategory,
  MdCampaign,
  MdLoyalty,
  MdSettings,
  MdLocalOffer,
  MdOutlineDiscount,
  MdCardGiftcard,
} from "react-icons/md";
import {
  FaStore,
  FaUsers,
  FaUserShield,
  FaHeadset,
  FaStar,
  FaConciergeBell,
} from "react-icons/fa";
import { GiKnifeFork, GiTicket } from "react-icons/gi";

/**
 ** the translations for this file is placed inside the dictionaries folder
 ** each new route should be added in 3 places, mainNav, modern and classic
 */

export interface MenuItemProps {
  title: string;
  icon: any;
  href?: string;
  child?: MenuItemProps[];
  megaMenu?: MenuItemProps[];
  multi_menu?: MenuItemProps[];
  nested?: MenuItemProps[];
  onClick: () => void;
}
const commonNavRoutes = [
  {
    title: "Dashboard",
    icon: RiDashboardFill,
    child: [
      {
        title: "Dashboard",
        icon: RiDashboardFill,
        href: routes.dashboard.index,
      },
    ],
  },

  {
    title: "menu_management",
    icon: MdCategory,
    child: [
      {
        title: "categories",
        icon: MdCategory,
        href: routes.categories.index,
      },
    ],
  },
  {
    title: "branches",
    icon: FaStore,
    child: [
      {
        title: "branches",
        icon: FaStore,
        href: routes.branches.index,
      },
    ],
  },

  {
    title: "settings",
    icon: MdSettings,
    child: [
      {
        title: "general_setting",
        icon: MdSettings,
        href: routes.settings.index,
      },
      {
        title: "application_setting",
        icon: MdSettings,
        href: routes.settings.application,
      },
    ],
  },
];

export const menusConfig = {
  mainNav: commonNavRoutes,
  sidebarNav: {
    modern: commonNavRoutes,

    classic: [
      {
        isHeader: true,
        title: "dashboard",
      },
      {
        title: "Dashboard",
        icon: RiDashboardFill,
        href: routes.dashboard.index,
      },

      {
        isHeader: true,
        title: "menu_management",
      },
      {
        title: "categories",
        icon: MdCategory,
        href: routes.categories.index,
      },

      {
        isHeader: true,
        title: "branches",
      },
      {
        title: "Branches",
        icon: FaStore,
        href: routes.branches.index,
      },

      {
        isHeader: true,
        title: "settings",
      },
      {
        title: "settings",
        icon: MdSettings,
        child: [
          {
            title: "general_setting",
            href: routes.settings.index,
          },
          {
            title: "application_setting",
            href: routes.settings.application,
          },
        ],
      },
    ],
  },
};

export type ModernNavType = (typeof menusConfig.sidebarNav.modern)[number];
export type ClassicNavType = (typeof menusConfig.sidebarNav.classic)[number];
export type MainNavType = (typeof menusConfig.mainNav)[number];
