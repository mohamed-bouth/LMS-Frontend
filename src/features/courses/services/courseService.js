import { apiRequest, authenticatedRequest } from "../../../services/api.js";


export async function getPublicCourses(){
  const payload = await apiRequest("/api/courses")

  return payload.data?.courses || [];
}

export async function getManagedCourses(token) {
  const payload = await authenticatedRequest("/api/trainer/courses", token);
  return payload.data?.courses || [];
}

export async function findCourseForManage(token, courseId){
  const payload = await authenticatedRequest(`/api/courses/manage/${courseId}`, token)
  return payload.data?.course || null
}

export async function createCourse(token, course) {
  return authenticatedRequest("/api/courses", token, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  });
}

export async function updateCourseStatus(token, courseId, action) {
  return authenticatedRequest(`/api/courses/${courseId}/${action}`, token, { method: "PATCH" });
}

export async function updateCourse(token, courseId, changes) {
  return authenticatedRequest(`/api/courses/${courseId}`, token, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(changes),
  });
}

export async function archiveCourse(token, courseId) {
  return authenticatedRequest(`/api/courses/${courseId}/archived`, token, {
    method: "PATCH",
  })
}
