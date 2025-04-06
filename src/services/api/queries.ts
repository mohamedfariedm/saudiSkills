import { tablesNames } from "@/constants";
import { CrudOperation } from "@/types";

export const LOGIN = "login";

//* Categories *//

export const CATEGORIES = "getAllCategories";
export const CATEGORIES_CREATE = "createCategory";
export const CATEGORIES_UPDATE = "updateCategory";
export const CATEGORIES_DELETE = "deleteCategory";

//* Branches *//

export const BRANCHES = "getAllBranches";
export const BRANCHES_CREATE = "createBranch";
export const BRANCHES_UPDATE = "updateBranch";
export const BRANCHES_DELETE = "deleteBranch";
export const BRANCH_DETAILS = "getBranchDetails";
export const CHECK_BRANCH_LOCATION = "checkBranchLocation";

export const TABLE_QUERY_MAP: Record<string, Record<CrudOperation, string>> = {
  [tablesNames.categories]: {
    get: CATEGORIES,
    create: CATEGORIES_CREATE,
    update: CATEGORIES_UPDATE,
    delete: CATEGORIES_DELETE,
  },
  [tablesNames.branches]: {
    get: BRANCHES,
    create: BRANCHES_CREATE,
    update: BRANCHES_UPDATE,
    delete: BRANCHES_DELETE,
  },
};
