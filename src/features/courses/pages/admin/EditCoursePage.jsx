import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Icon from "../../../../components/Icon.jsx";
import { updateCourse } from "../../services/courseService.js";
import { findCourseForManage } from "../../services/courseService.js";
import { useAuth } from "../../../auth/contexts/AuthContext.jsx";

function EditCourseForm({ course }) {

  const [values, setValues] = useState({
    title: course.title || "",
    description: course.description || "",
    objectives: Array.isArray(course.objectives)
      ? course.objectives.join("\n")
      : course.objectives || "",
    level: course.level || "beginner",
    category: course.category || "",
    estimatedDuration: course.estimatedDuration || "",
  });
  
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate()

  function updateField(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setError("");
  }

  async function submit(event) {
    event.preventDefault();
    const title = values.title.trim();
    const description = values.description.trim();
    const category = values.category.trim();
    const estimatedDuration = Number(values.estimatedDuration);

    if (
      !title ||
      !description ||
      !category ||
      !values.estimatedDuration ||
      estimatedDuration < 1
    ) {
      setError("Complete all required fields with a valid duration.");
      return;
    }

    setIsSaving(true);
    setError("");
    try {
      await updateCourse(token, course._id, {
        title,
        description,
        objectives: values.objectives
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        level: values.level,
        category,
        estimatedDuration,
      });
      navigate("/manage/courses")
    } catch (error) {
      setError(error.message)
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[760px] px-5 py-7 text-[#182038] sm:px-8 lg:px-10 lg:py-9">
      <Link
        to={"/manage/courses"}
        className="mb-5 inline-flex items-center gap-2 text-xs font-semibold text-[#4f46d9]"
      >
        <Icon name="arrow" size={17} /> Back to courses
      </Link>
      <div className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#7770e6]">
          Courses management
        </p>
        <h1 className="mt-1.5 font-['Poppins'] text-[27px] tracking-[-1px] text-[#202647]">
          Edit course
        </h1>
        <p className="mt-1.5 text-[13px] text-[#858b9b]">
          Update the details learners see for this course.
        </p>
      </div>
      <form
        className="rounded-xl border border-[#e7e8ef] bg-white p-5 shadow-[0_8px_24px_rgba(30,34,65,0.05)] sm:p-7"
        onSubmit={submit}
        noValidate
      >
        <label className="mb-4 block text-xs font-semibold text-[#343a51]">
          Course title *
          <input
            className="mt-1.5 h-11 w-full rounded-lg border border-[#dfe2ea] px-3 text-sm font-normal outline-none focus:border-[#7770e6]"
            name="title"
            value={values.title}
            onChange={updateField}
          />
        </label>
        <label className="mb-4 block text-xs font-semibold text-[#343a51]">
          Description *
          <textarea
            className="mt-1.5 min-h-28 w-full rounded-lg border border-[#dfe2ea] px-3 py-2 text-sm font-normal outline-none focus:border-[#7770e6]"
            name="description"
            value={values.description}
            onChange={updateField}
          />
        </label>
        <label className="mb-4 block text-xs font-semibold text-[#343a51]">
          Objectives
          <textarea
            className="mt-1.5 min-h-24 w-full rounded-lg border border-[#dfe2ea] px-3 py-2 text-sm font-normal outline-none focus:border-[#7770e6]"
            name="objectives"
            value={values.objectives}
            onChange={updateField}
            placeholder="One objective per line"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block text-xs font-semibold text-[#343a51]">
            Category *
            <input
              className="mt-1.5 h-11 w-full rounded-lg border border-[#dfe2ea] px-3 text-sm font-normal outline-none focus:border-[#7770e6]"
              name="category"
              value={values.category}
              onChange={updateField}
              placeholder="Programming"
            />
          </label>
          <label className="block text-xs font-semibold text-[#343a51]">
            Level
            <select
              className="mt-1.5 h-11 w-full rounded-lg border border-[#dfe2ea] bg-white px-3 text-sm font-normal outline-none focus:border-[#7770e6]"
              name="level"
              value={values.level}
              onChange={updateField}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </label>
          <label className="block text-xs font-semibold text-[#343a51]">
            Duration (minutes) *
            <input
              className="mt-1.5 h-11 w-full rounded-lg border border-[#dfe2ea] px-3 text-sm font-normal outline-none focus:border-[#7770e6]"
              name="estimatedDuration"
              type="number"
              min="1"
              value={values.estimatedDuration}
              onChange={updateField}
            />
          </label>
        </div>
        {error && (
          <p className="mb-4 text-sm text-[#a33d50]" role="alert">
            {error}
          </p>
        )}
        <div className="flex justify-end gap-3 border-t border-[#eeeef3] pt-5">
          <Link
            to={"/manage/courses"}
            className="rounded-[9px] border border-[#dfe2ea] px-4 py-2.5 text-xs font-semibold text-[#596077]"
          >
            Cancel
          </Link>
          <button
            className="rounded-[9px] bg-[#4f46d9] px-4 py-2.5 text-xs font-semibold text-white disabled:opacity-60"
            type="submit"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function EditCoursePage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState();
  const [isLoading] = useState(true);
  const { token } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCourse = async () => {
      try{
        const course = await findCourseForManage(token, courseId)
        setCourse(course)
      }catch{
        navigate("/manage/courses")
      }
    }
    fetchCourse()
  },[])

  if (!course) {
    return (
      <main className="grid min-h-[calc(100vh-76px)] place-items-center px-6 text-center">
        <div>
          <p className="text-sm text-[#697188]">
            {isLoading ? "Loading course..." : "Course not found."}
          </p>
          <Link
            to={"/manage/courses"}
            className="mt-4 text-xs font-semibold text-[#4f46d9]"
          >
            Back to courses
          </Link>
        </div>
      </main>
    );
  }

  return <EditCourseForm course={course}/>;
}
