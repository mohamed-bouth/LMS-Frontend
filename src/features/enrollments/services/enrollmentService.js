import { authenticatedRequest } from "../../../services/api.js";

export async function getMyEnrollments(token) {

  const payload = await authenticatedRequest("/api/enrollments/me", token);

  return payload.data.enrollments
}
