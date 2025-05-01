import { AUTHENTICATE_USER_URL, REGISTER_USER_URL } from "./authUrls";
import { LOGIN_FORM_VALUES, SIGNUP_FORM_VALUES } from "./type";

export const registerUser = async (data: SIGNUP_FORM_VALUES) => {
  try {
    console.log("REGISTER_USER_URL", REGISTER_USER_URL);
    const { confirmPassword, ...registerUserData } = data;
    const res = await fetch(REGISTER_USER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerUserData),
    });

    return await res.json();
  } catch (e) {
    throw e;
  }
};

export const authenticateUser = async (data: LOGIN_FORM_VALUES) => {
  try {
    console.log("data", data);

    // TODO: may be create a api call for all post get add delete put methods

    // TODO: set type for the data to be provided. is there a way to do it automatically
    const res: any = await fetch(AUTHENTICATE_USER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const resData = await res.json();

      const errorMessage = resData?.message;
      throw new Error(errorMessage || "Sorry could not login");
    }
    return await res.json();
  } catch (e) {
    console.log("error", e);

    throw e;
  }
};
