import { useState } from "react";
import Icon from "../../../../components/Icon.jsx";
import { createCourse } from "../../services/courseService.js";

const initialValues = {
  title: "",
  description: "",
  objectives: "",
  level: "beginner",
  category: "",
  estimatedDuration: "",
};

export default function CreateCoursePage({ onBack, onCreate, token }) {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

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
      const course = {
        title,
        description,
        objectives: values.objectives
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        level: values.level,
        category,
        estimatedDuration,
      };
      await createCourse(token, course);
      onCreate()
    } catch (error) {
      setError(error.message)
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[760px] px-5 py-7 text-[#182038] sm:px-8 lg:px-10 lg:py-9">
      <button
        className="mb-5 inline-flex items-center gap-2 text-xs font-semibold text-[#4f46d9]"
        type="button"
        onClick={onBack}
      >
        <Icon name="arrow" size={17} /> Back to courses
      </button>
      <div className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#7770e6]">
          Courses management
        </p>
        <h1 className="mt-1.5 font-['Poppins'] text-[27px] tracking-[-1px] text-[#202647]">
          Create new course
        </h1>
        <p className="mt-1.5 text-[13px] text-[#858b9b]">
          Add the essential details learners will see in the course catalog.
        </p>
      </div>
      <form
        className="rounded-xl border border-[#e7e8ef] bg-white p-5 shadow-[0_8px_24px_rgba(30,34,65,0.05)] sm:p-7"
        onSubmit={submit}
        noValidate
      >
        <div className="mb-6 flex items-center gap-3 border-b border-[#eeeef3] pb-5">
          <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-[#eeedff] text-[#4f46d9]">
            <Icon name="courses" size={19} />
          </span>
          <div>
            <h2 className="text-[15px] font-semibold text-[#30364d]">
              Course details
            </h2>
            <p className="mt-0.5 text-[11px] text-[#969baa]">
              Provide clear information about this course.
            </p>
          </div>
        </div>
        <label className="mb-4 block text-xs font-semibold text-[#343a51]">
          Course title *
          <input
            className="mt-1.5 h-11 w-full rounded-lg border border-[#dfe2ea] px-3 text-sm font-normal outline-none focus:border-[#7770e6]"
            name="title"
            value={values.title}
            onChange={updateField}
            placeholder="e.g. JavaScript Fundamentals"
          />
        </label>
        <label className="mb-4 block text-xs font-semibold text-[#343a51]">
          Description *
          <textarea
            className="mt-1.5 min-h-28 w-full rounded-lg border border-[#dfe2ea] px-3 py-2 text-sm font-normal outline-none focus:border-[#7770e6]"
            name="description"
            maxLength="300"
            value={values.description}
            onChange={updateField}
            placeholder="What will learners gain from this course?"
          />
          <span className="mt-1 block text-right text-[10px] font-normal text-[#969baa]">
            {values.description.length}/300
          </span>
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
            Category
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
            Duration (minutes)
            <input
              className="mt-1.5 h-11 w-full rounded-lg border border-[#dfe2ea] px-3 text-sm font-normal outline-none focus:border-[#7770e6]"
              name="estimatedDuration"
              type="number"
              min="1"
              value={values.estimatedDuration}
              onChange={updateField}
              placeholder="120"
            />
          </label>
        </div>
        {error && (
          <p className="mt-5 text-sm text-[#a33d50]" role="alert">
            {error}
          </p>
        )}
        <div className="mt-7 flex justify-end gap-3 border-t border-[#eeeef3] pt-5">
          <button
            className="rounded-[9px] border border-[#dfe2ea] px-4 py-2.5 text-xs font-semibold text-[#596077]"
            type="button"
            onClick={onBack}
          >
            Cancel
          </button>
          <button
            className="rounded-[9px] bg-[#4f46d9] px-4 py-2.5 text-xs font-semibold text-white disabled:opacity-60"
            type="submit"
            disabled={isSaving}
          >
            {isSaving ? "Creating..." : "Create course"}
          </button>
        </div>
      </form>
    </div>
  );
}
