import { getApiBaseUrl } from "../../utils/common";

const REGISTER_USER_URL = getApiBaseUrl("/register");
const AUTHENTICATE_USER_URL = getApiBaseUrl("/authenticate");


export { REGISTER_USER_URL, AUTHENTICATE_USER_URL };
