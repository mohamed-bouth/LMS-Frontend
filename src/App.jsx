
import { useState } from "react";
import Icon from "./components/Icon.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import { getMyEnrollments } from "./features/courses/services/enrollmentService.js";
import { getManagedCourses, updateCourseStatus } from "./features/courses/services/courseService.js";
import AdminCoursesPage from "./pages/admin/AdminCoursesPage.jsx";
import MyCoursesPage from "./pages/courses/MyCoursesPage.jsx";
import { getCurrentProfile } from "./features/auth/services/profileService.js";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import Sidebar from "./layouts/components/Sidebar.jsx";

function App() {
  const [view, setView] = useState("login");
  const [session, setSession] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [coursesError, setCoursesError] = useState("");
  const [managedCourses, setManagedCourses] = useState([]);
  const [managedCoursesLoading, setManagedCoursesLoading] = useState(false);
  const [managedCoursesError, setManagedCoursesError] = useState("");

  async function handleAuthenticated(nextSession) {
    const profile = await getCurrentProfile(nextSession.token);
    if (!profile) {
      throw new Error("The authenticated profile is missing.");
    }

    const authenticatedSession = { ...nextSession, profile };
    setSession(authenticatedSession);
    setView(profile.role?.toLowerCase() === "admin" ? "admin-courses" : "profile");
    if (profile.role?.toLowerCase() === "admin") {
      await loadManagedCourses(nextSession.token);
    }
  }

  async function loadCourses() {
    setView("my-courses");
    setCoursesLoading(true);
    setCoursesError("");
    try {
      setCourses(await getMyEnrollments(session.token));
    } catch (error) {
      if (error.status === 401) {
        setSession(null);
        setView("login");
      } else if (error.status === 403) {
        setCoursesError("Accès refusé.");
      } else {
        setCoursesError("Unable to load your courses.");
      }
    } finally {
      setCoursesLoading(false);
    }
  }

  function navigate(nextView) {
    if (nextView === "my-courses") {
      loadCourses();
      return;
    }
    if (nextView === "admin-courses") {
      loadManagedCourses();
      return;
    }
    setView(nextView);
  }

  async function loadManagedCourses(token = session?.token) {
    setView("admin-courses");
    setManagedCoursesLoading(true);
    setManagedCoursesError("");
    try {
      setManagedCourses(await getManagedCourses(token));
    } catch (error) {
      if (error.status === 401) {
        setSession(null);
        setView("login");
      } else if (error.status === 403) {
        setManagedCoursesError("Accès refusé.");
      } else {
        setManagedCoursesError("Unable to load courses.");
      }
    } finally {
      setManagedCoursesLoading(false);
    }
  }

  async function changeCourseStatus(course) {
    const action = course.status === "published" ? "unpublish" : "publish";
    try {
      await updateCourseStatus(session.token, course._id, action);
      await loadManagedCourses();
    } catch (error) {
      if (error.status === 401) {
        setSession(null);
        setView("login");
      } else if (error.status === 403) {
        setManagedCoursesError("Accès refusé.");
      } else {
        setManagedCoursesError("Unable to update the course.");
      }
    }
  }

  if (session) {
    return (
      <div className="min-h-screen bg-[#fafafe] text-[#182038]">
        <Sidebar
          profile={session.profile}
          view={view}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onNavigate={navigate}
          onLogout={() => {
            setSession(null);
            setView("login");
          }}
        />
        <div className="min-h-screen lg:ml-[250px]">
          <header className="flex h-[76px] items-center border-b border-[#e7e8ef] bg-white px-5 sm:px-8 lg:px-10">
            <button className="mr-4 text-[#4f46d9] lg:hidden" type="button" aria-label="Open navigation" onClick={() => setSidebarOpen(true)}>
              <Icon name="menu" size={22} />
            </button>
            <div className="ml-auto flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-[#dcecff] text-[11px] font-bold text-[#2b63a7]">
                {(session.profile.name || session.profile.email).slice(0, 1).toUpperCase()}
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold">{session.profile.name || session.profile.email}</p>
                <p className="text-[10px] text-[#969baa]">{session.profile.role}</p>
              </div>
            </div>
          </header>
          {view === "profile" ? (
            <ProfilePage profile={session.profile} onNavigate={navigate} />
          ) : view === "my-courses" ? (
            <MyCoursesPage enrollments={courses} isLoading={coursesLoading} error={coursesError} onRetry={loadCourses} />
          ) : view === "admin-courses" ? (
            <AdminCoursesPage courses={managedCourses} isLoading={managedCoursesLoading} error={managedCoursesError} onRetry={loadManagedCourses} onStatusChange={changeCourseStatus} />
          ) : (
            <main className="grid min-h-[calc(100vh-76px)] place-items-center px-6 text-center">
              <div>
                <h1 className="font-['Poppins'] text-2xl text-[#202647]">My Courses</h1>
                <p className="mt-2 text-sm text-[#697188]">Your enrolled courses will appear here.</p>
              </div>
            </main>
          )}
        </div>
      </div>
    );
  }

  if (view === "register") {
    return <RegisterPage onNavigate={setView} />;
  }

  return <LoginPage onAuthenticated={handleAuthenticated} onNavigate={setView} />;
}

export default App