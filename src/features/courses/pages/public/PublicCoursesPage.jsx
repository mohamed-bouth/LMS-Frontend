import { useEffect, useState } from "react";
import Icon from "../../../../components/Icon.jsx";
import CourseCard from "../../components/CourseCard.jsx";
import { getPublicCourses } from "../../services/courseService.js";
import Loader from "../../../../components/Loader.jsx";

function Hero() {
  return (
    <section className="relative mb-10 overflow-hidden rounded-[22px] bg-gradient-to-br from-[#f0f0ff] via-[#eeedff] to-[#f8f3ff] px-6 py-8 sm:px-9 sm:py-10 lg:px-12">
      <div className="absolute -right-16 -top-32 h-[330px] w-[330px] rounded-full border border-[#7770e6]/15 shadow-[0_0_0_45px_rgba(119,112,230,0.04),0_0_0_90px_rgba(119,112,230,0.035)]" />
      <div className="absolute -bottom-28 right-[27%] h-[190px] w-[190px] rounded-full border border-[#7770e6]/10" />
      <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="max-w-[620px]">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#dcd9ff] bg-white/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[1.2px] text-[#5b53c8]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6c63dc]" />
            Your next chapter starts here
          </span>
          <h2 className="mt-4 font-['Poppins'] text-[clamp(27px,4vw,40px)] leading-[1.18] tracking-[-1.4px] text-[#202647]">
            Make room for
            <br className="hidden sm:block" /> what you want to learn.
          </h2>
          <p className="mt-3 max-w-[510px] text-[13px] leading-[1.8] text-[#68708a] sm:text-sm">
            Browse focused courses designed to help you grow your skills and put
            new ideas into practice.
          </p>
        </div>

        <div className="relative rounded-[17px] border border-white/80 bg-white/75 p-5 shadow-[0_12px_35px_rgba(54,50,123,0.07)] backdrop-blur-sm sm:p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[13px] bg-[#eeedff] text-[#4f46d9]">
              <Icon name="book" size={23} />
            </span>
            <div>
              <p className="text-[11px] font-semibold text-[#30364d]">
                Learn at your own pace
              </p>
              <p className="mt-1 text-[10px] leading-relaxed text-[#858b9b]">
                Small steps. Meaningful progress.
              </p>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-2 border-t border-[#eeeef3] pt-4">
            <span className="flex -space-x-2">
              <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-[#34366f] text-[8px] font-semibold text-white">
                JL
              </span>
              <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-[#7871d9] text-[8px] font-semibold text-white">
                AM
              </span>
              <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-[#b386bb] text-[8px] font-semibold text-white">
                SK
              </span>
            </span>
            <p className="text-[10px] text-[#737a90]">
              <span className="font-semibold text-[#4f566b]">
                Curiosity looks good on you.
              </span>
              <br />
              Pick a topic and get started.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PublicCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  async function fetchCourses() {
    setLoading(true);
    try {
      const courses = await getPublicCourses();
      setCourses(courses);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async () => {
      await fetchCourses();
    };
    fetchCourses();
  }, []);

  if (isLoading) {
    return (
      <main className="py-7 mx-auto w-full max-w-[1180px] px-5 pb-12 text-[#182038] sm:px-8 lg:px-10 lg:pb-16">
        <div className="flex items-center justify-center h-screen"><Loader/></div>
      </main>
    );
  }

  return (
    <>
      <main className="py-7 mx-auto w-full max-w-[1180px] px-5 pb-12 text-[#182038] sm:px-8 lg:px-10 lg:pb-16">
        <Hero />
        <section aria-labelledby="course-list-title">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#7770e6]">
                Find your focus
              </p>
              <h2
                className="mt-1 font-['Poppins'] text-[22px] tracking-[-0.7px] text-[#202647]"
                id="course-list-title"
              >
                Courses for curious minds
              </h2>
            </div>
            <p className="text-[11px] text-[#8c92a3]">
              <span className="font-semibold text-[#4f566b]">06</span> courses
              to explore
            </p>
          </div>

          <div className="grid gap-[18px] sm:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <div key={course.id}>
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default PublicCoursesPage;
