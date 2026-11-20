import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import ProtectedView from "./components/ProtectedView.jsx";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout.jsx";
import GuestLayout from "./layouts/GuestLayout.jsx";

import LoginPage from "./features/auth/pages/LoginPage.jsx";
import RegisterPage from "./features/auth/pages/RegisterPage.jsx";
import ProfilePage from "./features/profile/pages/ProfilePage.jsx";
import AdminCoursesPage from "./features/courses/pages/admin/AdminCoursesPage.jsx";
import CreateCoursePage from "./features/courses/pages/admin/CreateCoursePage.jsx";
import EditCoursePage from "./features/courses/pages/admin/EditCoursePage.jsx";
import MyCoursesPage from "./features/courses/pages/learner/MyCoursesPage.jsx";

import { getCurrentProfile } from "./features/auth/services/profileService.js";
import useCourses from "./features/courses/hooks/useCourses.js";
import CourseModules from "./features/modules/pages/learner/CourseModules.jsx";

function App() {
  const routerNavigate = useNavigate();
  const location = useLocation();

  const [session, setSession] = useState(() => {
    try {
      const savedSession = sessionStorage.getItem("lms-session");
      return savedSession ? JSON.parse(savedSession) : null;
    } catch {
      sessionStorage.removeItem("lms-session");
      return null;
    }
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (session?.token) {
      sessionStorage.setItem(
        "lms-session",
        JSON.stringify({ token: session.token, user: session.user }),
      );
    } else {
      sessionStorage.removeItem("lms-session");
    }
  }, [session]);

  const courseData = useCourses(
    session?.token,
    location.pathname,
    setSession,
    routerNavigate,
  );

  async function handleAuthenticated(nextSession) {
    const user = await getCurrentProfile(nextSession.token);
    if (!user) {
      throw new Error("The authenticated profile is missing.");
    }

    setSession({ ...nextSession, user });
    const isManager = ["admin", "trainer"].includes(user.role?.toLowerCase());
    routerNavigate(isManager ? "/admin/courses" : "/profile", {
      replace: true,
    });
  }

  function navigate(nextView) {
    const paths = {
      login: "/login",
      register: "/register",
      profile: "/profile",
      myCourses: "/courses/my",
      courseModules: "/courses/modules",
      adminCourses: "/admin/courses",
      createCourse: "/admin/courses/new",
    };
    const path = paths[nextView];
    if (!path) return;

    if (location.pathname === path) {
      if (nextView === "myCourses") courseData.retryCourses();
      if (nextView === "adminCourses") courseData.retryManagedCourses();
      return;
    }

    routerNavigate(path);
  }

  const isManager = ["admin", "trainer"].includes(
    session?.user?.role?.toLowerCase(),
  );

  let layout

  if(session){
    layout = <AuthenticatedLayout
              user={session.user}
              sidebarOpen={sidebarOpen}
              onCloseSidebar={() => setSidebarOpen(false)}
              onOpenSidebar={() => setSidebarOpen(true)}
              onNavigate={navigate}
              onLogout={() => {
                setSession(null);
                routerNavigate("/login", { replace: true })
              }}/>;
  }else{
    layout = <Navigate to="/login" replace />
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route element={<GuestLayout/>}>
        <Route
          path="/login"
          element={
            <LoginPage
              onAuthenticated={handleAuthenticated}
              onNavigate={navigate}
            />
          }
        />
        <Route
          path="/register"
          element={<RegisterPage onNavigate={navigate} />}
        />
      </Route>
      <Route element={layout}>
        <Route
          path="/profile"
          element={<ProfilePage user={session?.user}/>}
        />
        <Route
          path="/courses/my"
          element={
            <MyCoursesPage
              enrollments={courseData.courses}
              isLoading={courseData.coursesLoading}
              error={courseData.coursesError}
              onRetry={courseData.retryCourses}
            />
          }
        />
        <Route
          path="/courses/modules"
          element={<CourseModules></CourseModules>}
        />
        <Route
          path="/admin/courses"
          element={
            <ProtectedView
              role={session?.user?.role}
              allowedRoles={["admin", "trainer"]}
            >
              <AdminCoursesPage
                courses={courseData.managedCourses}
                isLoading={courseData.managedCoursesLoading}
                error={courseData.managedCoursesError}
                onRetry={courseData.retryManagedCourses}
                onEdit={(course) =>
                  routerNavigate(`/admin/courses/${course._id}/edit`)
                }
                onStatusChange={courseData.changeCourseStatus}
                onArchive={courseData.archiveCourse}
                onCreate={() => navigate("createCourse")}
              />
            </ProtectedView>
          }
        />
        <Route
          path="/admin/courses/new"
          element={
            <ProtectedView
              role={session?.user?.role}
              allowedRoles={["admin", "trainer"]}
            >
              <CreateCoursePage
                onBack={() => navigate("adminCourses")}
                onCreate={courseData.handleCreateCourse}
              />
            </ProtectedView>
          }
        />
        <Route
          path="/admin/courses/:courseId/edit"
          element={
            <ProtectedView
              role={session?.user?.role}
              allowedRoles={["admin", "trainer"]}
            >
              <EditCoursePage
                courses={courseData.managedCourses}
                isLoading={courseData.managedCoursesLoading}
                onBack={() => navigate("adminCourses")}
                onSave={courseData.saveCourse}
              />
            </ProtectedView>
          }
        />
      </Route>
      <Route
        path="*"
        element={
          <Navigate
            to={
              session ? (isManager ? "/admin/courses" : "/profile") : "/login"
            }
            replace
          />
        }
      />
    </Routes>
  );
}

export default App;
