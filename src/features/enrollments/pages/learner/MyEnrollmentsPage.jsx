import { useState } from "react";
import { useEffect } from "react";
import Icon from "../../../../components/Icon.jsx";
import HeroSection from "../../../../layouts/components/HeroSection.jsx";
import { getMyEnrollments } from "../../services/enrollmentService.js";

function CourseVisual() {
  return (
    <div className="relative grid h-[140px] place-items-center overflow-hidden bg-gradient-to-br from-[#4543b5] to-[#6c66df]">
      <div className="absolute inset-0 rotate-[10deg] scale-[1.3] opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:28px_28px]" />
      <span className="relative z-[1] grid h-[62px] w-[62px] rotate-[-4deg] place-items-center rounded-[17px] border border-white/30 bg-white/20 text-white backdrop-blur">
        <Icon name="book" size={34} />
      </span>
      <i className="absolute -right-5 -top-[57px] h-[110px] w-[110px] rounded-full border border-white/20" />
      <b className="absolute -bottom-[65px] -left-[43px] h-[150px] w-[150px] rounded-full border border-white/20" />
    </div>
  );
}

export default function MyEnrollmentsPage({ token }) {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrollments, setEnrollments] = useState([]);
  const [refresh, setRefresh] = useState(true);

  async function getData() {
    try {
      const enrollments = await getMyEnrollments(token);
      setEnrollments(enrollments);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };
    fetchData()
  }, [refresh]);

  const [search, setSearch] = useState("");
  const courses = enrollments
    .map((enrollment) => enrollment.course)
    .filter(Boolean)
    .filter((course) =>
      `${course.title} ${course.description}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );

  return (
    <>
      <HeroSection
        secondTitle="learning"
        mainTitle="my Enrollments"
        description="Courses you're currently enrolled in, all in one place."
      />
      <main className="mx-auto w-full max-w-[1180px] px-5 py-7 text-[#182038] sm:px-8 lg:px-10 lg:py-9">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex h-11 max-w-[360px] flex-1 items-center gap-2 rounded-[10px] border border-[#dfe2ea] bg-white px-3.5 text-[#9298a9]">
            <Icon name="search" size={17} />
            <input
              className="min-w-0 flex-1 border-0 bg-transparent text-sm text-[#182038] outline-none"
              type="search"
              placeholder="Search my courses..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <span className="text-[11px] text-[#8c92a3]">
            <strong className="text-[#4f566b]">{courses.length}</strong>{" "}
            enrolled courses
          </span>
        </div>

        {isLoading ? (
          <div className="rounded-xl border border-[#e7e8ef] bg-white px-6 py-16 text-center text-sm text-[#697188]">
            Loading your courses...
          </div>
        ) : error ? (
          <div
            className="rounded-xl border border-[#f1c7ce] bg-[#fff7f8] px-6 py-12 text-center"
            role="alert"
          >
            <p className="text-sm font-semibold text-[#a33d50]">{error}</p>
            <button
              className="mt-4 rounded-[9px] bg-[#4f46d9] px-4 py-2 text-xs font-semibold text-white"
              type="button"
              onClick={() => setRefresh((current) => !current)}
            >
              Try again
            </button>
          </div>
        ) : courses.length === 0 ? (
          <div className="rounded-xl border border-[#e7e8ef] bg-white px-6 py-16 text-center">
            <Icon name="courses" size={30} />
            <h2 className="mt-3 text-base font-semibold text-[#30364d]">
              {search ? "No enrolled courses found" : "No enrolled courses yet"}
            </h2>
            <p className="mt-2 text-sm text-[#697188]">
              {search
                ? "No enrolled courses match your search."
                : "When you enroll in a course, it will appear here."}
            </p>
            {search && (
              <button
                className="mt-4 text-xs font-semibold text-[#4f46d9]"
                type="button"
                onClick={() => setSearch("")}
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-[18px] md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <article
                className="overflow-hidden rounded-xl border border-[#e7e8ef] bg-white shadow-[0_8px_24px_rgba(30,34,65,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(44,45,91,0.09)]"
                key={course._id}
              >
                <CourseVisual />
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase tracking-[1px] text-[#7770e6]">
                      Enrolled course
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#e3f7f0] px-2 py-1 text-[10px] font-semibold text-[#26966f]">
                      <Icon name="check" size={13} /> Enrolled
                    </span>
                  </div>
                  <h2 className="mt-3 text-[15px] font-semibold text-[#30364d]">
                    {course.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-xs leading-[1.6] text-[#6f7589]">
                    {course.description ||
                      "Continue building your skills with this course."}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
