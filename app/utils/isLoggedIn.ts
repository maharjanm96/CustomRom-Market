import Cookies from "js-cookie";

export const isLoggedIn = (): boolean => {
  const token = Cookies.get("token");
  return !!token;
};
