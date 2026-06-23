export const AUTH_KEYS = {
  token: "accessToken",
  name: "currentUser",
  role: "currentUserRole",
} as const;

export type AuthRole = "ADMIN" | "RECEPTIONIST" | "DOCTOR" | "CUSTOMER";

export type AuthSession = {
  token?: string;
  user?: {
    fullName?: string;
    role?: AuthRole;
  };
};

export function saveSession(session: AuthSession) {
  if (session.token) {
    localStorage.setItem(AUTH_KEYS.token, session.token);
  }
  if (session.user?.fullName) {
    localStorage.setItem(AUTH_KEYS.name, session.user.fullName);
  }
  if (session.user?.role) {
    localStorage.setItem(AUTH_KEYS.role, session.user.role);
  }
  notifyLocalStorageChange();
}

export function clearSession() {
  localStorage.removeItem(AUTH_KEYS.token);
  localStorage.removeItem(AUTH_KEYS.name);
  localStorage.removeItem(AUTH_KEYS.role);
  notifyLocalStorageChange();
}

export function getSessionRole() {
  return localStorage.getItem(AUTH_KEYS.role);
}

export function getAccessToken() {
  return localStorage.getItem(AUTH_KEYS.token);
}
import { notifyLocalStorageChange } from "@/hooks/useLocalStorageValue";
