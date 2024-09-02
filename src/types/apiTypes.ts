export type API_RESPONSE<T> = {
  success: boolean;
  data: T;
  message: string;
};

export type USE_FETCH_RESPONSE<T> = {
  isLoading: boolean;
  data: T;
  success: boolean;
  message: string;
  error: unknown;
};
