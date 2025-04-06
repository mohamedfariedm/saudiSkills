//* these hooks is just a wrapper for apiClient to get benefit of builtin loading,error,success, ...etc states, if you don't need these states, you can use apiClient directly

//* it is recommended to not use it for get requests and stick with apiClient directly to fetch data server-side, unless if you have to use it for infinite scroll for example

export { default as useFetchInfiniteData } from "./use-fetch-infinite-data";
export { default as useFetchData } from "./use-fetch-data";
export { default as usePostData } from "./use-post-data";
