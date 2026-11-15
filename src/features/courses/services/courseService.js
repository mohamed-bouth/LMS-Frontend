import { authenticatedRequest } from "../../../services/api.js";

async function requestCourse(path, token, options = {}) {
  const response = await authenticatedRequest(path, token, options);
  if (!response.ok) {
    const error = new Error(`Course request failed with status ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

export async function getManagedCourses(token) {
  const payload = await requestCourse("/api/trainer/Courses", token);
  return payload.data?.courses || [];
}

export async function updateCourseStatus(token, courseId, action) {
  return requestCourse(`/api/courses/${courseId}/${action}`, token, { method: "PATCH" });
}

export async function updateCourse(token, courseId, changes) {
  return requestCourse(`/api/courses/${courseId}`, token, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(changes),
  });
}
