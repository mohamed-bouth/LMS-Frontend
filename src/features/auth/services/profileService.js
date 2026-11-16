import { authenticatedRequest } from "../../../services/api.js";

export async function getCurrentProfile(token) {
  const response = await authenticatedRequest("/api/profiles/me", token);
  if (!response.ok) {
    throw new Error(`Profile request failed with status ${response.status}`);
  }

  const payload = await response.json();
  return payload.data?.user;
}
