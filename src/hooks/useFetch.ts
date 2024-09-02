import { useEffect, useState } from "react";
import { API_RESPONSE, USE_FETCH_RESPONSE } from "../types";

const useFetch = <T>(
  fetchService: () => Promise<API_RESPONSE<T>>
): USE_FETCH_RESPONSE<T> => {
  const [data, setData] = useState<USE_FETCH_RESPONSE<T>>({
    isLoading: false,
    success: false,
    data: [] as T,
    message: "",
    error: undefined,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData((prevData) => ({ ...prevData, isLoading: true }));

        const resData = await fetchService();

        console.log(resData);

        setData((prevData) => ({
          ...prevData,
          isLoading: false,
          ...resData,
        }));
      } catch (err) {
        setData((prevData) => ({
          ...prevData,
          isLoading: false,
          success: false,
          message: err instanceof Error? err.message:"Unknown error"
          error: err,
        }));
      }
    };

    fetchData();
  }, [fetchService]);

  return data;
};

export default useFetch;
