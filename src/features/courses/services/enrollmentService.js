import { authenticatedRequest } from "../../../services/api.js";

export async function getMyEnrollments(token) {
  const response = await authenticatedRequest("/api/enrollments/me", token);
  if (!response.ok) {
    const error = new Error(`Enrollment request failed with status ${response.status}`);
    error.status = response.status;
    throw error;
  }

  const payload = await response.json();
  return payload.data?.enrollments || [];
}
