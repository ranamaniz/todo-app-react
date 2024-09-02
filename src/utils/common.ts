const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error(
    "API_BASE_URL is not defined. Please check your environment variables."
  );
}

export const getApiBaseUrl = (url: string) => {
  return `${API_BASE_URL}${url}`;
};
