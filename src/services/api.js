const API_BASE_URL = import.meta.env.VITE_DOMAIN_URL;

export async function apiRequest(path, options = {}) {
  return fetch(`${API_BASE_URL}${path}`, options);
}
