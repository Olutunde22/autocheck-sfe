/* eslint-disable @typescript-eslint/no-explicit-any */
import { FetchOptions, FetchResponse } from "@/types";
import { getErrorMessage } from "./utils";

async function fetcher<T>(
  url: string,
  options: FetchOptions,
  errorMessage: string = "Oops! Something went wrong",
): Promise<FetchResponse<T>> {
  options.headers = {
    ...options.headers,
  };

  const headers: Record<string, any> = {
    ...options.headers,
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const fetchOptions: RequestInit = {
    ...options,
    headers,
    body:
      options.body instanceof FormData
        ? options.body
        : JSON.stringify(options.body),
  };

  const path = url.startsWith("/") ? url : `/${url}`;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${path}`,
      fetchOptions,
    );
    if (!response.ok) {
      let errorData: {
        message: string;
        rawErrors?: string[];
      } = {
        message: errorMessage,
      };

      try {
        errorData = await response.json();
      } catch {
        throw {
          statusCode: response.status,
          message: response?.statusText,
        };
      }

      const description =
        errorData.message || response?.statusText || errorMessage;

      throw {
        statusCode: response.status,
        message: description,
        rawErrors: errorData?.rawErrors,
      };
    }

    let data;
    if (options.method !== "DELETE") {
      data = await response.json();
    }

    const headers = response.headers;

    const totalCount = headers.get("x-total-count");

    return {
      data,
      success: true,
      ...(totalCount && { totalCount: Number(totalCount) }),
    };
  } catch (error: any) {
    return {
      data: null,
      success: false,
      message: getErrorMessage(error, { message: errorMessage }),
    };
  }
}

export const api = {
  get: <T>(
    url: string,
    options: FetchOptions = {},
    errorMessage?: string,
  ): Promise<FetchResponse<T>> =>
    fetcher<T>(url, { ...options, method: "GET" }, errorMessage),

  post: <T>(
    url: string,
    body?: any,
    options: FetchOptions = {},
    errorMessage?: string,
  ): Promise<FetchResponse<T>> =>
    fetcher<T>(url, { ...options, method: "POST", body }, errorMessage),

  put: <T>(
    url: string,
    body?: any,
    options: FetchOptions = {},
    errorMessage?: string,
  ): Promise<FetchResponse<T>> =>
    fetcher<T>(url, { ...options, method: "PUT", body }, errorMessage),

  patch: <T>(
    url: string,
    body?: any,
    options: FetchOptions = {},
    errorMessage?: string,
  ): Promise<FetchResponse<T>> =>
    fetcher<T>(url, { ...options, method: "PATCH", body }, errorMessage),

  delete: <T>(
    url: string,
    options: FetchOptions = {},
    errorMessage?: string,
  ): Promise<FetchResponse<T>> =>
    fetcher<T>(url, { ...options, method: "DELETE" }, errorMessage),
};
