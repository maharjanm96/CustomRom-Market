/**
 * Array of routes accessible to public
 * These routes do not require authentication
 * @types {string[]}
 */
export const publicRoutes = ["/"];

export const authRoutes = ["/auth/login", "/auth/signup"];

export const apiAuthPrefix = "/api";

export const DEFAULT_LOGIN_REDIRECT = "/profile";

export const ADMIN_DEFAULT_LOGIN_REDIRECT = "/admin/dashboard";
