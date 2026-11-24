const backEndUrl = import.meta.env.VITE_BACK_END_URL

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${backEndUrl}${path}`, options);
  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message);
    error.status = response.status;
    throw error;
  }

  return data;
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
