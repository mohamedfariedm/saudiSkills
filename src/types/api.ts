export type ApiResponse<T = any> = {
  status: number;
  message: string;
  data: T;
  count?: number;
  pagination?: PaginationMeta;
};
export interface PaginationMeta {
  totalPages: number;
  currentPage: number;
  limit: number;
  next: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  count: number;
  pagination: PaginationMeta;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type CrudOperation = "get" | "create" | "update" | "delete";

export interface EndpointConfig {
  url: string;
  config?: {
    method: HttpMethod;
    headers?: Record<string, string>;
    cache?: RequestCache;
    redirectOnError?: boolean;
    showToasts?: boolean;
    showSuccessToast?: boolean;
    showErrorToast?: boolean;
    propagateServerError?: boolean;
  };
}
export interface ApiConfigOptions<TResponse = any, TBody = any> {
  params?: Record<string, string | number>;
  query?: Record<string, string | string[]>;
  body?: TBody;
  signal?: AbortSignal;
  accessToken?: string;
  onSuccess?: (data: ApiResponse<TResponse>) => void;
  onError?: (error: ApiError) => void;
  next?: {
    tags?: string[];
    revalidate?: number | false;
  };
}

export type ApiError = Error & {
  response?: {
    data: ApiResponse;
  };
};
export type OriginalApiError = {
  statusCode: number;
  message: string;
  error: string;
};

export interface _Pagination_Meta {
  totalPages: number;
  currentPage: number;
  limit: number;
  next?: number;
}

interface _Paginated_Response<T> {
  items: T[];
  meta: _Pagination_Meta;
}
