import { useState } from "react";
import Icon from "../../components/Icon.jsx";

export default function AdminCoursesPage({ courses, isLoading, error, onRetry, onStatusChange, onSave, onArchive }) {
  const [search, setSearch] = useState("");
  const [editingCourse, setEditingCourse] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", estimatedDuration: "" });
  const filteredCourses = courses.filter((course) => `${course.title} ${course.description} ${course.category}`.toLowerCase().includes(search.toLowerCase()));

  function startEditing(course) {
    setEditingCourse(course);
    setForm({ title: course.title || "", description: course.description || "", estimatedDuration: course.estimatedDuration || "" });
  }

  function submitEdit(event) {
    event.preventDefault();
    onSave(editingCourse._id, { ...form, estimatedDuration: Number(form.estimatedDuration) });
    setEditingCourse(null);
  }

  return (
    <div className="mx-auto w-full max-w-[1180px] px-5 py-7 text-[#182038] sm:px-8 lg:px-10 lg:py-9">
      <div className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#7770e6]">Administration</p>
        <h1 className="mt-1.5 font-['Poppins'] text-[27px] tracking-[-1px] text-[#202647]">Courses Management</h1>
        <p className="mt-1.5 text-[13px] text-[#858b9b]">Review courses and manage their publication status.</p>
      </div>
      <label className="mb-5 flex h-11 max-w-[380px] items-center gap-2 rounded-[10px] border border-[#dfe2ea] bg-white px-3.5 text-[#9298a9]">
        <Icon name="search" size={17} />
        <input className="min-w-0 flex-1 border-0 bg-transparent text-sm outline-none" type="search" placeholder="Search courses..." value={search} onChange={(event) => setSearch(event.target.value)} />
      </label>
      {isLoading ? (
        <div className="rounded-xl border border-[#e7e8ef] bg-white px-6 py-16 text-center text-sm text-[#697188]">Loading courses...</div>
      ) : error ? (
        <div className="rounded-xl border border-[#f1c7ce] bg-[#fff7f8] px-6 py-12 text-center" role="alert">
          <p className="text-sm font-semibold text-[#a33d50]">{error}</p>
          <button className="mt-4 rounded-[9px] bg-[#4f46d9] px-4 py-2 text-xs font-semibold text-white" type="button" onClick={onRetry}>Try again</button>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="rounded-xl border border-[#e7e8ef] bg-white px-6 py-16 text-center">
          <h2 className="text-base font-semibold text-[#30364d]">No courses found</h2>
          <p className="mt-2 text-sm text-[#697188]">There are no courses matching your search.</p>
        </div>
      ) : (
        <div className="grid gap-[18px] md:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course) => {
            const isPublished = course.status === "published";
            return (
              <article className="overflow-hidden rounded-xl border border-[#e7e8ef] bg-white shadow-[0_8px_24px_rgba(30,34,65,0.05)]" key={course._id}>
                <div className="h-3 bg-gradient-to-r from-[#4f46d9] to-[#8f72dd]" />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-[15px] font-semibold text-[#30364d]">{course.title}</h2>
                    <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${isPublished ? "bg-[#e3f7f0] text-[#26966f]" : "bg-[#fff0d8] text-[#9a671e]"}`}>{course.status}</span>
                  </div>
                  <p className="mt-2 line-clamp-3 text-xs leading-[1.6] text-[#6f7589]">{course.description || "No description provided."}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-[#eeeef3] pt-3">
                    <span className="text-[10px] text-[#969baa]">{course.category || "Uncategorized"}</span>
                    <div className="flex items-center gap-3">
                      <button className="text-xs font-semibold text-[#4f46d9]" type="button" onClick={() => startEditing(course)}>Edit</button>
                      <button className="text-xs font-semibold text-[#4f46d9]" type="button" onClick={() => onStatusChange(course)}>{isPublished ? "Unpublish" : "Publish"}</button>
                      <button className="text-xs font-semibold text-[#a33d50]" type="button" onClick={() => onArchive(course)}>Archive</button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
      {editingCourse && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#182038]/35 px-5">
          <form className="w-full max-w-[460px] rounded-xl bg-white p-6 shadow-2xl" onSubmit={submitEdit}>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#30364d]">Edit course</h2>
              <button className="text-[#858b9b]" type="button" onClick={() => setEditingCourse(null)}>Close</button>
            </div>
            <label className="mb-4 block text-xs font-semibold text-[#343a51]">Title<input className="mt-1.5 h-10 w-full rounded-lg border border-[#dfe2ea] px-3 text-sm outline-none focus:border-[#7770e6]" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required /></label>
            <label className="mb-4 block text-xs font-semibold text-[#343a51]">Description<textarea className="mt-1.5 min-h-24 w-full rounded-lg border border-[#dfe2ea] px-3 py-2 text-sm outline-none focus:border-[#7770e6]" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></label>
            <label className="mb-5 block text-xs font-semibold text-[#343a51]">Estimated duration<input className="mt-1.5 h-10 w-full rounded-lg border border-[#dfe2ea] px-3 text-sm outline-none focus:border-[#7770e6]" type="number" min="1" value={form.estimatedDuration} onChange={(event) => setForm({ ...form, estimatedDuration: event.target.value })} required /></label>
            <button className="h-10 w-full rounded-lg bg-[#4f46d9] text-sm font-semibold text-white" type="submit">Save changes</button>
          </form>
        </div>
      )}
    </div>
  );
}
