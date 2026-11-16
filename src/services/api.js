const API_BASE_URL = import.meta.env.VITE_DOMAIN_URL;

export async function apiRequest(path, options = {}) {
  return fetch(`${API_BASE_URL.replace(/\/$/, "")}${path}`, options);
}

export async function authenticatedRequest(path, token, options = {}) {
  return apiRequest(path, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
}
