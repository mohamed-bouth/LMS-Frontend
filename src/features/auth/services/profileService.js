import { authenticatedRequest } from "../../../services/api.js";

export async function getCurrentProfile(token) {
  const payload = await authenticatedRequest("/api/profiles/me", token);

  return payload.data?.user;
}
