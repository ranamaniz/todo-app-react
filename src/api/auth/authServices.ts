import { SIGNUP_FORM_VALUES } from "../../pages/account/Signup";
import { REGISTER_USER_URL } from "./authUrls";

export const registerUser = async (data: SIGNUP_FORM_VALUES) => {
  try {
    console.log("REGISTER_USER_URL", REGISTER_USER_URL)
    const {confirmPassword, ...registerUserData}=data
    const res = await fetch(REGISTER_USER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerUserData),
    });

    return res;
  } catch (e) {
    return e;
  }
};
