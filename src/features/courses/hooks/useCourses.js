import { useEffect, useState } from "react";
import {
  createCourse,
  getManagedCourses,
  updateCourse,
  updateCourseStatus,
} from "../services/courseService.js";
import { getMyEnrollments } from "../services/enrollmentService.js";

export default function useCourses(token, pathname, setSession, routerNavigate) {
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [coursesError, setCoursesError] = useState("");
  const [coursesRetryCount, setCoursesRetryCount] = useState(0);

  const [managedCourses, setManagedCourses] = useState([]);
  const [managedCoursesLoading, setManagedCoursesLoading] = useState(false);
  const [managedCoursesError, setManagedCoursesError] = useState("");
  const [managedCoursesRetryCount, setManagedCoursesRetryCount] = useState(0);

  function retryCourses() {
    setCoursesRetryCount((count) => count + 1);
  }

  function retryManagedCourses() {
    setManagedCoursesRetryCount((count) => count + 1);
  }

  useEffect(() => {
    if (!token) return;

    if (pathname === "/courses/my") {
      async function loadLearnerCourses() {
        setCoursesLoading(true);
        setCoursesError("");
        try {
          setCourses(await getMyEnrollments(token));
        } catch (error) {
          if (error.status === 401) {
            setSession(null);
            routerNavigate("/login", { replace: true });
          } else if (error.status === 403) {
            setCoursesError("Accès refusé.");
          } else {
            setCoursesError("Unable to load your courses.");
          }
        } finally {
          setCoursesLoading(false);
        }
      }

      loadLearnerCourses();
    }

    if (pathname === "/admin/courses" || pathname.endsWith("/edit")) {
      async function loadAdminCourses() {
        setManagedCoursesLoading(true);
        setManagedCoursesError("");
        try {
          setManagedCourses(await getManagedCourses(token));
        } catch (error) {
          if (error.status === 401) {
            setSession(null);
            routerNavigate("/login", { replace: true });
          } else if (error.status === 403) {
            setManagedCoursesError("Accès refusé.");
          } else {
            setManagedCoursesError("Unable to load courses.");
          }
        } finally {
          setManagedCoursesLoading(false);
        }
      }

      loadAdminCourses();
    }
  }, [
    pathname,
    token,
    coursesRetryCount,
    managedCoursesRetryCount,
    setSession,
    routerNavigate,
  ]);

  async function changeCourseStatus(course) {
    const action = course.status === "published" ? "unpublish" : "publish";
    try {
      await updateCourseStatus(token, course._id, action);
      retryManagedCourses();
    } catch (error) {
      if (error.status === 401) {
        setSession(null);
        routerNavigate("/login", { replace: true });
      } else if (error.status === 403) {
        setManagedCoursesError("Accès refusé.");
      } else {
        setManagedCoursesError("Unable to update the course.");
      }
    }
  }

  async function saveCourse(courseId, changes) {
    try {
      await updateCourse(token, courseId, changes);
    } catch (error) {
      if (error.status === 401) {
        setSession(null);
        routerNavigate("/login", { replace: true });
      }
      throw error;
    }
  }

  async function archiveCourse(course) {
    try {
      await updateCourseStatus(token, course._id, "archived");
      retryManagedCourses();
    } catch (error) {
      if (error.status === 401) {
        setSession(null);
        routerNavigate("/login", { replace: true });
      } else if (error.status === 403) {
        setManagedCoursesError("Accès refusé.");
      } else {
        setManagedCoursesError("Unable to archive the course.");
      }
    }
  }

  async function handleCreateCourse(course) {
    try {
      await createCourse(token, course);
      routerNavigate("/admin/courses");
      retryManagedCourses();
    } catch (error) {
      if (error.status === 401) {
        setSession(null);
        routerNavigate("/login", { replace: true });
      }
      throw error;
    }
  }

  return {
    courses,
    coursesLoading,
    coursesError,
    retryCourses,
    managedCourses,
    managedCoursesLoading,
    managedCoursesError,
    retryManagedCourses,
    changeCourseStatus,
    saveCourse,
    archiveCourse,
    handleCreateCourse,
  };
}
