import { ApiConfigOptions, ApiError, ApiResponse } from "@/types";
import { notFound } from "next/navigation";
import { toast } from "sonner";
import { getLanguageAndToken } from "./getLanguageAndToken";
import { logOut } from "./logOut";
//import { signOut } from "@/auth";
import endpoints from "./endpoints";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

const IsServerSide = typeof window === "undefined";

const apiClient = async <TResponse = any, TBody = any>(
  endpointName: string,
  options: ApiConfigOptions<TResponse, TBody> = {},
  dynamicEndpoint?: string
): Promise<ApiResponse<TResponse>> => {
  const { params, query, body, onSuccess, onError, next, signal } = options;
  const { lang, token } = await getLanguageAndToken();
  const userToken = token;
  const endpoint = endpoints[endpointName];
  //console.log("apiClient endpointName ...", { endpointName, endpoint });
  if (!endpoint && !dynamicEndpoint) {
    console.error(`Endpoint ${endpointName} not found`);
    throw new Error(`Endpoint ${endpointName} not found`);
  }

  let { url } = endpoint;
  const propagateServerError = endpoint?.config?.propagateServerError ?? true;

  // Replace URL params
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`{${key}}`, String(value));
    });
  }

  // Add query parameters
  if (query) {
    const queryString = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      console.log("apiClient value ...", value);

      if (Array.isArray(value)) {
        value.forEach((val) => queryString.append(key, val)); // Append each array value
      } else {
        queryString.append(key, value); // Append single value
      }
    });

    url += `?${queryString.toString()}`;
  }

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    lang,
    ...(userToken && { authorization: `${userToken}` }),
  };
  //console.log("apiClient defaultHeaders ...", { defaultHeaders });

  const headers = { ...defaultHeaders, ...endpoint.config?.headers };

  const fetchInit: RequestInit = {
    ...endpoint.config,
    headers,
    next,
    signal,
  };

  if (body) {
    if (headers["Content-Type"] === "application/json") {
      fetchInit.body = JSON.stringify(body);
    } else if (headers["Content-Type"] === "multipart/form-data") {
      delete headers["Content-Type"]; // Let the browser set it

      const formData = new FormData();

      // Map over the body and append fields correctly
      Object.entries(body).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value); // Append files directly
        } else if (typeof value === "object" && value !== null) {
          formData.append(key, JSON.stringify(value)); // Convert objects to JSON strings
        } else {
          formData.append(key, String(value)); // Convert other values to strings
        }
      });

      fetchInit.body = formData as BodyInit;
    }
  }

  console.log("apiClient ...", { url, fetchInit });

  try {
    //console.log("apiClient fetching ...", { url });
    const response = await fetch(
      dynamicEndpoint ? dynamicEndpoint : `${BASE_URL}${url}`,
      fetchInit
    );

    //console.log("apiClient response ...", { response });
    if (!response.ok) {
      const err: ApiResponse = await response.json();

      //console.log("apiClient ...", { err });

      // Mimicking Axios error structure
      let error: ApiError = new Error(err.message || "An error occurred");
      /*  error.response = {
        data: {
          ...err,
        },
      }; */
      //console.log("apiClient error before...", { error });

      error = {
        ...error,
        response: {
          data: {
            ...err,
          },
        },
      };
      //console.log("apiClient ...", { error });

      throw error;
    }
    const data: ApiResponse<TResponse> = await response.json();
    console.log("apiClient ...", { data });
    if (
      (endpoint.config?.showToasts || endpoint.config?.showSuccessToast) &&
      !IsServerSide
    ) {
      toast.success(
        data.message
          ? data.message
          : lang === "en"
            ? "Operation done successfully"
            : "تم تنفيذ العملية بنجاح"
      );
    }
    onSuccess?.(data);

    //*if the response encapsulates the pagination logic inside the data, no need for this check and return the data directly
    return data?.pagination
      ? ({
          status: data.status,
          message: data?.message,
          data: {
            items: data.data,
            pagination: data.pagination,
            count: data?.count,
          },
        } as ApiResponse<TResponse>)
      : data;
  } catch (error: ApiError | any) {
    //console.log("apiClient error ...", { error, IsServerSide });
    if (!IsServerSide) {
      if (error?.response?.data?.status === 401) {
        try {
          //logOut();
        } catch (e) {
          console.error("Error signing out:", e);
        }
      }
      if (endpoint.config?.showToasts || endpoint.config?.showErrorToast) {
        toast.error(
          error.message
            ? error.message
            : lang === "en"
              ? "An error occurred"
              : "حدث خطأ"
        );
      }
      if (
        endpoint.config?.redirectOnError &&
        error?.response?.data?.status === 404
      ) {
        notFound();
      }
      onError?.(error);
    } else {
      //console.log("Unauthorized access, on server");
      if (
        endpoint.config?.redirectOnError &&
        error?.response?.data?.status === 404
      ) {
        notFound();
      }
      //console.log("apiClient server-side error", error?.response?.data);
      if (propagateServerError) throw error;
    }
    return error?.response?.data;
  }
};

export default apiClient;

// TODO: add finally
//*for client side we handle errors inside apiClient and it accepts onError that can be passed to it directly or through usePostData
//*for server side we throw the error that will be caught by error.ts file, whereas normally server-side operations are get requests
//*now onSuccess and onError are handled client side only, if we need to handle them on server side we can add onSuccessServer and onErrorServer

//remove | clear: just removes the query from the cache but the data still exist in the ui
//invalidate | : triggers new request but the data still exist in the ui, and if the data has changed the ui changes
//reset: triggers new request and the data will be removed from the ui and replaces with loading or nothing if data is null, but if used here it generates a loop reset=>refetch without token=> get 401 =>reset
//none of the queryClient methods can remove the data from the ui, queryClient interacts only with the cache
