import Cookies from "js-cookie";
import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/endpoints";
export const registerService = async (
  payload
) => {
  const response = await api.post(
    API_ENDPOINTS.REGISTER,
    payload
  );

  return response.data;
};
export const loginService = async (
  payload
) => {
  const response = await api.post(
    API_ENDPOINTS.LOGIN,
    payload
  );
  const result = response.data;
  saveSession(result);
  return result;
};
export const googleLoginService = async (
  credential
) => {
  const response = await api.post(
    API_ENDPOINTS.GOOGLE_LOGIN,
    { credential }
  );
  const result = response.data;
  saveSession(result);
  return result;
};
const saveSession = (result) => {
  if (result.success) {
    Cookies.set(
      "token",
      result.data.access_token,
      {
        expires: 7,
        sameSite: "Strict",
      }
    );
    Cookies.set(
      "user",
      JSON.stringify(result.data.user),
      {
        expires: 7,
        sameSite: "Strict",
      }
    );
  }
};
export const logoutService = () => {
  Cookies.remove("token");
  Cookies.remove("user");

  localStorage.removeItem("user");
};