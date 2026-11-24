import {useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router";

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

import CourseModules from "./features/modules/pages/learner/CourseModules.jsx";
import { useAuth } from "./features/auth/contexts/AuthContext.jsx";

function App() {
  const routerNavigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {session, handleAuthenticated, isManager} = useAuth()

  function navigate(nextView) {
    const paths = {
      login: "/login",
      register: "/register",
      profile: "/profile",
      myEnrollments: "/enrollments/my",
      courses: "/courses",
      courseModules: "/courses/modules",
      adminCourses: "/manage/courses",
      createCourse: "/manage/courses/new",
    };
    const path = paths[nextView];
    if (!path) return;

    routerNavigate(path);
  }

  let layout

  if(session){
    layout = <AuthenticatedLayout
              user={session.user}
              sidebarOpen={sidebarOpen}
              onCloseSidebar={() => setSidebarOpen(false)}
              onOpenSidebar={() => setSidebarOpen(true)}
              onNavigate={navigate}/>
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
          element={<ProfilePage/>}
        />
        <Route
          path="/enrollments/my"
          element={
            <ProtectedView
              role={session?.user?.role}
              allowedRoles={["learner"]}
            >
              <MyEnrollmentsPage/>
            </ProtectedView>
          }
        />
        <Route
          path="/courses/modules"
          element={<CourseModules></CourseModules>}
        />
        <Route
          path="/manage/courses"
          element={
            <ProtectedView
              role={session?.user?.role}
              allowedRoles={["admin", "trainer"]}
            >
              <AdminCoursesPage
                onEdit={(course) =>
                  routerNavigate(`/manage/courses/${course._id}/edit`)
                }
                onCreate={() => navigate("createCourse")}
              />
            </ProtectedView>
          }
        />
        <Route
          path="/manage/courses/new"
          element={
            <ProtectedView
              role={session?.user?.role}
              allowedRoles={["admin", "trainer"]}
            >
              <CreateCoursePage
                onBack={() => navigate("adminCourses")}
                onCreate={() => navigate("adminCourses")}
              />
            </ProtectedView>
          }
        />
        <Route
          path="/manage/courses/:courseId/edit"
          element={
            <ProtectedView
              role={session?.user?.role}
              allowedRoles={["admin", "trainer"]}
            >
              <EditCoursePage
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
