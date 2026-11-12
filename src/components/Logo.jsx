import Icon from "./Icon.jsx";

function Logo({ compact = false }) {
  return (
    <div className="flex items-center gap-[11px]">
      <span className="grid h-[38px] w-[38px] place-items-center rounded-[11px] bg-gradient-to-br from-[#6c63eb] to-[#4038bf] text-white shadow-[0_7px_18px_rgba(79,70,217,0.25)]">
        <Icon name="book" size={22} />
      </span>
      {!compact && (
        <span className="font-['Poppins'] text-[21px] font-normal tracking-[-0.8px] text-[#212946]">
          Edu<span className="text-[#4f46d9]">Learn</span>
        </span>
      )}
    </div>
  );
}

export default Logo