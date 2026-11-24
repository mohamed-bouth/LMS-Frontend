import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
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
import MyEnrollmentsPage from "./features/enrollments/pages/learner/MyEnrollmentsPage.jsx";
import PublicCoursesPage from "./features/courses/pages/public/PublicCoursesPage.jsx";

import { getCurrentProfile } from "./features/auth/services/profileService.js";
import CourseModules from "./features/modules/pages/learner/CourseModules.jsx";

function App() {
  const routerNavigate = useNavigate();

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
      myEnrollments: "/enrollments/my",
      courses: "/courses",
      courseModules: "/courses/modules",
      adminCourses: "/admin/courses",
      createCourse: "/admin/courses/new",
    };
    const path = paths[nextView];
    if (!path) return;

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
          path="/courses"
          element={<PublicCoursesPage></PublicCoursesPage>}
        />
        <Route
          path="/profile"
          element={<ProfilePage user={session?.user}/>}
        />
        <Route
          path="/enrollments/my"
          element={
            <ProtectedView
              role={session?.user?.role}
              allowedRoles={["learner"]}
            >
              <MyEnrollmentsPage token={session?.token}/>
            </ProtectedView>
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
                token={session?.token}
                onEdit={(course) =>
                  routerNavigate(`/admin/courses/${course._id}/edit`)
                }
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
                onCreate={() => navigate("adminCourses")}
                token={session?.token}
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
                token={session?.token}
                onBack={() => navigate("adminCourses")}
                onSave={() => navigate("adminCourses")}
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
