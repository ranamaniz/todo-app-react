import { API_RESPONSE, TODOS } from "../../types";
import { TODOS_URL } from "./todoUrls";

export const getTodos = async (): Promise<API_RESPONSE<TODOS>> => {
  try {
    const res = await fetch(TODOS_URL, { method: "GET" });

    if (!res.ok) {
      const errorData = await res.json();

      const error = new Error(
        errorData?.message || `HTTP error! Status:${res.status}`
      );

      // TODO:create a custom Error class to enable throwing Error response and others
      // error.status = response.status;
      // error.response = response;

      throw error;
    }

    const resData = await res.json();
    console.log("resData", resData);
    return resData;
  } catch (error) {
    console.log("Service error:", error);
    throw error;
  }
};
