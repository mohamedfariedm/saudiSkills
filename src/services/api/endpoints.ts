import { EndpointConfig } from "@/types";
import {
  BRANCH_DETAILS,
  BRANCHES,
  BRANCHES_CREATE,
  BRANCHES_UPDATE,
  CATEGORIES,
  CATEGORIES_CREATE,
  CATEGORIES_DELETE,
  CATEGORIES_UPDATE,
  CHECK_BRANCH_LOCATION,
  LOGIN
} from "./queries";

const categories: Record<string, EndpointConfig> = {
  [CATEGORIES]: {
    url: "/categories",
    config: {
      method: "GET",
    },
  },
  [CATEGORIES_CREATE]: {
    url: "/categories",
    config: {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      showToasts: true,
    },
  },
  [CATEGORIES_UPDATE]: {
    url: "/categories/{_id}",
    config: {
      method: "PATCH",
      headers: { "Content-Type": "multipart/form-data" },
      showToasts: true,
    },
  },
  [CATEGORIES_DELETE]: {
    url: "/categories/{_id}",
    config: {
      method: "DELETE",
    },
  },
};
const branches: Record<string, EndpointConfig> = {
  [BRANCHES]: {
    url: "/branches",
    config: {
      method: "GET",
    },
  },
  [BRANCHES_CREATE]: {
    url: "/branches",
    config: {
      method: "POST",
      showToasts: true,
    },
  },
  [BRANCHES_UPDATE]: {
    url: "/branches/{_id}",
    config: {
      method: "PUT",
      showToasts: true,
    },
  },
  [BRANCH_DETAILS]: {
    url: "/branches/{_id}",
    config: {
      method: "GET",
    },
  },
  [CHECK_BRANCH_LOCATION]: {
    url: "/branches/check-location/{_id}",
    config: {
      method: "POST",
    },
  },
};

const endpoints: Record<string, EndpointConfig> = {
  [LOGIN]: {
    url: "/login",
    config: {
      method: "POST",
    },
  },
  ...categories,
  ...branches,
};
export default endpoints;
