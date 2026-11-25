import Icon from "../../../components/Icon";

const backgrounds = [
  "from-[#c77b5b] to-[#f0b48f]",
  "from-[#3d91a8] to-[#7ed2d0]",
  "from-[#b87855] to-[#edbd83]",
  "from-[#79a878] to-[#c4df9e]",
  "from-[#9670b5] to-[#d0a9df]",
  "from-[#c77491] to-[#f1b2bd]",
  "from-[#d26f5c] to-[#ffb27a]",
  "from-[#347f9b] to-[#72c5e8]",
  "from-[#9a7a3f] to-[#e6ca72]",
  "from-[#4f9b79] to-[#a7df9b]",
  "from-[#7055a5] to-[#b7a2f0]",
  "from-[#b5537c] to-[#f08ab1]",
];

function CourseCard({course }) {
    const randomNumber = Math.floor(Math.random() * 12)
    console.log(randomNumber)


  return (
    <>
      <div
        className="group overflow-hidden rounded-xl border border-[#e7e8ef] bg-white shadow-[0_8px_24px_rgba(30,34,65,0.05)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(44,45,91,0.09)]"
      >
        <div
          className={`relative flex h-[154px] items-end overflow-hidden bg-gradient-to-br ${backgrounds[randomNumber]} p-5`}
        >
          <div className="absolute inset-0 rotate-[10deg] scale-[1.3] opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:28px_28px]" />
          <span className="absolute -right-8 -top-14 h-[135px] w-[135px] rounded-full border border-white/20" />
          <span className="absolute -bottom-[90px] -left-8 h-[170px] w-[170px] rounded-full border border-white/20" />
          <span className="relative z-[1] grid h-10 w-10 place-items-center rounded-xl border border-white/30 bg-white/15 text-white backdrop-blur-sm">
            <Icon name="book" size={22} />
          </span>
          <span className="relative z-[1] ml-3 rounded-full border border-white/25 bg-black/10 px-2.5 py-1 text-[9px] font-medium text-white/95 backdrop-blur-sm">
            {course.category}
          </span>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 text-[10px] text-[#8c92a3]">
            <span>{course.level}</span>
            <span className="h-1 w-1 rounded-full bg-[#c4c7d2]" />
            <span>{course.duration}</span>
          </div>
          <h3 className="mt-2 text-[15px] font-semibold leading-[1.4] text-[#30364d] transition-colors group-hover:text-[#4f46d9]">
            {course.title}
          </h3>
          <p className="mt-2 min-h-[58px] text-xs leading-[1.7] text-[#6f7589]">
            {course.description}
          </p>
          <div className="mt-4 flex items-center justify-between border-t border-[#eeeef3] pt-3">
            <span className="text-[10px] text-[#969baa]">
              Self-paced learning
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#4f46d9]">
              Explore course
              <Icon name="arrow" size={14} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseCard;
