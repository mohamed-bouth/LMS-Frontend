import Icon from "../../../components/Icon.jsx";

function StatusBadge({ status }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e3f7f0] px-2.5 py-1 text-[10px] font-semibold text-[#26966f]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#36b88b]" />
      {status}
    </span>
  );
}

export default function ProfilePage({ user, onNavigate }) {
  const name = user.name || user.email;
  const role = user.role || "Learner";
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const status = user.status || "Active";

  return (
    <div className="mx-auto w-full max-w-[1180px] px-5 py-7 text-[#182038] sm:px-8 lg:px-10 lg:py-9">
      <div className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#7770e6]">My account</p>
        <h1 className="mt-1.5 font-['Poppins'] text-[27px] tracking-[-1px] text-[#202647]">My Profile</h1>
        <p className="mt-1.5 text-[13px] text-[#858b9b]">View your personal information and account details.</p>
      </div>

      <section className="mb-5 overflow-hidden rounded-xl border border-[#e7e8ef] bg-white shadow-[0_8px_24px_rgba(30,34,65,0.05)]">
        <div className="relative grid h-[116px] place-items-center overflow-hidden bg-gradient-to-br from-[#4641b6] via-[#6d65dd] to-[#8f72dd] text-white before:absolute before:inset-0 before:opacity-[0.18] before:[background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] before:[background-size:20px_20px]">
          <div className="absolute -right-[90px] -top-[210px] h-[350px] w-[350px] rounded-full border border-white/20 shadow-[0_0_0_50px_rgba(255,255,255,0.04)]" />
          <span className="relative z-[1] scale-[2.4] opacity-20">
            <Icon name="book" size={34} />
          </span>
        </div>
        <div className="relative flex min-h-[92px] items-center gap-3.5 px-5 pb-4 pt-5 sm:pl-[126px] sm:pr-7">
          <div className="absolute left-5 top-[-35px] grid h-[78px] w-[78px] place-items-center rounded-full border-[5px] border-white bg-[#e4e2ff] text-xl font-bold text-[#4540b1] shadow-[0_5px_15px_rgba(30,34,65,0.12)] sm:left-7">
            {initials}
          </div>
          <div>
            <h2 className="text-[17px] font-semibold">{name}</h2>
            <p className="mt-0.5 text-[11px] text-[#858b9b]">{role} at EduLearn</p>
          </div>
          <div className="ml-auto">
            <StatusBadge status={status} />
          </div>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[1.7fr_1fr]">
        <section className="rounded-xl border border-[#e7e8ef] bg-white p-5 shadow-[0_8px_24px_rgba(30,34,65,0.05)] sm:p-[25px]">
          <div className="mb-2 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-[#eeedff] text-[#4f46d9]">
              <Icon name="profile" size={19} />
            </span>
            <div>
              <h2 className="text-[15px] font-semibold text-[#30364d]">Personal information</h2>
              <p className="mt-0.5 text-[11px] text-[#969baa]">Your account details</p>
            </div>
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-2">
            <div className="border-t border-[#eeeef3] py-4 sm:pr-5">
              <dt className="mb-1.5 text-[10px] text-[#969baa]">Full name</dt>
              <dd className="text-xs font-semibold text-[#353b51]">{name}</dd>
            </div>
            <div className="border-t border-[#eeeef3] py-4 sm:pl-5 sm:border-l">
              <dt className="mb-1.5 text-[10px] text-[#969baa]">Email address</dt>
              <dd className="break-all text-xs font-semibold text-[#353b51]">{user.email}</dd>
            </div>
            <div className="border-t border-[#eeeef3] py-4 sm:pr-5">
              <dt className="mb-1.5 text-[10px] text-[#969baa]">Role</dt>
              <dd>
                <span className="inline-flex rounded-full bg-[#eeedff] px-2.5 py-1 text-[10px] font-semibold text-[#5048c7]">{role}</span>
              </dd>
            </div>
            <div className="border-t border-[#eeeef3] py-4 sm:pl-5 sm:border-l">
              <dt className="mb-1.5 text-[10px] text-[#969baa]">Account status</dt>
              <dd><StatusBadge status={status} /></dd>
            </div>
          </dl>
        </section>

        <aside className="rounded-xl border border-[#dedbf8] bg-gradient-to-br from-[#f7f6ff] to-[#efedff] p-5 shadow-[0_8px_24px_rgba(30,34,65,0.05)] sm:p-[25px]">
          <span className="grid h-[46px] w-[46px] place-items-center rounded-[11px] bg-[#4f46d9] text-white shadow-[0_8px_18px_rgba(79,70,217,0.2)]">
            <Icon name="courses" size={24} />
          </span>
          <h3 className="mt-[18px] text-[15px] font-semibold text-[#30364d]">Your learning space</h3>
          <p className="my-2.5 text-[11px] leading-[1.6] text-[#6f7589]">Access the courses you&apos;re enrolled in and continue building your skills.</p>
          <button
            className="inline-flex h-10 items-center justify-center gap-2 rounded-[9px] bg-[#4f46d9] px-4 text-xs font-semibold text-white shadow-[0_5px_12px_rgba(79,70,217,0.18)] transition hover:bg-[#4338ca]"
            type="button"
            onClick={() => onNavigate("myCourses")}
          >
            View my courses
            <Icon name="arrow" size={17} />
          </button>
        </aside>
      </div>
    </div>
  );
}
