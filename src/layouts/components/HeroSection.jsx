import Icon from "../../components/Icon";

function HeroSection({secondTitle, mainTitle, description}) {
  return (
    <>
      <main className="mx-auto w-full max-w-[1180px] px-5 py-7 text-[#182038] sm:px-8 lg:px-10 lg:py-9">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#eeedff] text-[#4f46d9]">
            <Icon name="file" size={23} />
          </span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#7770e6]">
              {secondTitle}
            </p>
            <h1 className="font-['Poppins'] text-[27px] tracking-[-1px] text-[#202647]">
              {mainTitle}
            </h1>
            <p className="mt-1.5 text-[13px] text-[#858b9b]">{description}</p>
          </div>
        </div>
      </main>
    </>
  );
}

export default HeroSection;
