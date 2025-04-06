import { tablesNames } from ".";

export type CrudRoutes = {
  index: string;
  create: string;
  edit: (id: string) => string;
};

// Define a base type for all routes
type BaseRoutesType = {
  [key: string]: CrudRoutes | Record<string, string>;
};

// Define a more specific type that enforces dashboard to be Record<string, string>
// and all other keys to be CrudRoutes
type RoutesType = BaseRoutesType & {
  dashboard: Record<string, string>;
};

// Create the routes object
const routesObj = {
  dashboard: {
    index: "/dashboard",
  },
  settings: {
    index: "/settings",
    application: "/settings/application",
  },
  [tablesNames.categories]: {
    index: "/categories",
  },
  [tablesNames.branches]: {
    index: "/branches",
    create: "/branches/create",
    edit: (id: string) => `/branches/edit/${id}`,
  },
};

// Use a type assertion to tell TypeScript that our object matches the expected type
export const routes = routesObj;
//export const routes = routesObj as RoutesType;
