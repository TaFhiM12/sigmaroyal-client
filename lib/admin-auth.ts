const TOKEN_KEY = "royal_admin_token";
const USER_KEY = "royal_admin_user";

export const setAdminSession = (token: string, user: { email: string; role: string; name: string }) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  document.cookie = `admin_token=${token}; path=/; max-age=${60 * 60 * 12}; samesite=lax`;
};

export const getAdminToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const getAdminUser = () => {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as { email: string; role: string; name: string };
  } catch {
    return null;
  }
};

export const clearAdminSession = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  document.cookie = "admin_token=; path=/; max-age=0; samesite=lax";
};

export const getAdminAuthHeaders = () => {
  const token = getAdminToken();

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const isAdminLoggedIn = () => {
  return Boolean(getAdminToken());
};
