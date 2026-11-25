import { useState } from "react";
import { Navigate, Route, Routes } from "react-router";

import RoleGuard from "./components/guard/RoleGuard.jsx";
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
import AuthGuard from "./components/guard/AuthGuard.jsx";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { session, isManager } = useAuth();


  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route element={<GuestLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route
        element={
          <AuthenticatedLayout
            sidebarOpen={sidebarOpen}
            onCloseSidebar={() => setSidebarOpen(false)}
            onOpenSidebar={() => setSidebarOpen(true)}
          />
        }
      >
        {/* public routes */}
        <Route
          path="/courses"
          element={<PublicCoursesPage></PublicCoursesPage>}
        />

        {/* auth layout */}
        <Route element={<AuthGuard />}>
          <Route path="/profile" element={<ProfilePage />} />

          {/* learner routes */}
          <Route element={<RoleGuard allowedRoles={["learner"]} />}>
            <Route path="/enrollments/my" element={<MyEnrollmentsPage />} />
            <Route
              path="/courses/modules"
              element={<CourseModules></CourseModules>}
            />
          </Route>

          {/* admin and trainer routes */}
          <Route
            path="/manage"
            element={<RoleGuard allowedRoles={["admin", "trainer"]} />}
          >
            <Route path="courses" element={ <AdminCoursesPage/> } />
            <Route path="courses/new" element={ <CreateCoursePage/> } />

            <Route path="courses/:courseId/edit" element={ <EditCoursePage/> }/>
          </Route>
        </Route>
      </Route>
      <Route
        path="*"
        element={
          <Navigate
            to={
              session ? (isManager ? "/manage/courses" : "/profile") : "/login"
            }
            replace
          />
        }
      />
    </Routes>
  );
}

export default App;
