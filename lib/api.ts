const DEFAULT_API_BASE_URL = "https://sigmaroyal-server.vercel.app/api/v1";

export function getApiBaseUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_API_URL?.trim() || DEFAULT_API_BASE_URL;
  const baseUrl = configuredUrl.replace(/\/+$/, "");

  if (baseUrl.endsWith("/api/v1")) {
    return baseUrl;
  }

  return `${baseUrl}/api/v1`;
}

export function apiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}
