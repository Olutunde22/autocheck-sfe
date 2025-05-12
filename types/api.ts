export type FetchOptions<T = Record<string, unknown>> = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: HeadersInit;
  body?: Record<string, unknown> | FormData;
  params?: T;
  next?: RequestInit["next"];
};

export type FetchResponse<T = Record<string, unknown>> = {
  data: T | null;
  message?: string;
  success?: boolean;
  statusCode?: number;
  totalCount?: number;
};

export interface IFilters {
  _page?: number;
  _per_page?: number;
  _sort?: string;
  q?: string;
}
