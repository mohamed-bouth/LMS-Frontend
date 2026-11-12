import Icon from "../../components/Icon.jsx";
import Logo from "../../components/Logo.jsx";
import RegisterForm from "../../features/auth/components/RegisterForm.jsx";
import GuestLayout from "../../layouts/GuestLayout.jsx";

export default function RegisterPage() {
  return (
    <GuestLayout>
      <main className="grid min-h-screen grid-cols-1 bg-white min-[801px]:grid-cols-[minmax(420px,1.07fr)_minmax(500px,0.93fr)]">
        <section className="relative flex min-h-screen flex-col items-center justify-start px-7 py-7 min-[621px]:py-[35px] min-[801px]:min-h-[700px] min-[801px]:justify-center min-[801px]:px-10 min-[801px]:pb-[35px]">
          <div className="mb-[38px] block w-full max-w-[470px] min-[801px]:hidden">
            <Logo />
          </div>
          <RegisterForm />
          <p className="mt-auto pt-[55px] text-center text-[11px] text-[#a0a5b2] min-[801px]:absolute min-[801px]:bottom-[25px] min-[801px]:mt-0 min-[801px]:pt-0">
            © 2025 EduLearn. Secure learning, thoughtfully designed.
          </p>
        </section>
        <section className="relative hidden min-h-[700px] overflow-hidden bg-gradient-to-br from-[#f0f0ff] via-[#e6e7ff] to-[#f5f1ff] px-12 py-[45px] min-[801px]:block min-[1101px]:px-[clamp(42px,6vw,92px)]">
          <div className="relative z-[2]">
            <Logo />
          </div>
          <div className="relative z-[2] mt-[clamp(105px,16vh,165px)] max-w-[590px]">
            <span className="text-[11px] font-normal tracking-[2px] text-[#4f46d9]">
              YOUR LEARNING STARTS HERE
            </span>
            <h1 className="mt-[22px] font-['Poppins'] text-[clamp(44px,4.2vw,64px)] font-normal leading-[1.09] tracking-[-2.6px] text-[#202647]">
              Grow your skills,
              <br />
              one course{" "}
              <em className="relative not-italic text-[#4f46d9] after:absolute after:bottom-[-6px] after:left-[2px] after:right-0 after:h-[5px] after:rotate-[-1deg] after:rounded-[20px] after:bg-[#aaa4f8] after:content-['']">
                at a time.
              </em>
            </h1>
            <p className="mt-[26px] max-w-[510px] text-[17px] leading-[1.7] text-[#606982]">
              Create your learner account and keep all of your enrolled courses
              together in one focused, easy-to-use space.
            </p>
            <div className="mt-[38px] flex flex-col gap-[13px]">
              <span className="flex items-center gap-2.5 text-[13px] font-normal text-[#4f5872]">
                <span className="rounded-full bg-[#4f46d9] p-[3px] text-white">
                  <Icon name="check" size={16} />
                </span>
                A simple, focused learning space
              </span>
              <span className="flex items-center gap-2.5 text-[13px] font-normal text-[#4f5872]">
                <span className="rounded-full bg-[#4f46d9] p-[3px] text-white">
                  <Icon name="check" size={16} />
                </span>
                Your enrolled courses in one place
              </span>
            </div>
          </div>
          <div className="absolute right-[-300px] top-[-220px] h-[590px] w-[590px] rounded-full border border-[rgba(80,70,190,0.11)] shadow-[0_0_0_90px_rgba(255,255,255,0.09),0_0_0_180px_rgba(255,255,255,0.08)]" />
          <div className="absolute bottom-[-170px] left-[-180px] h-[330px] w-[330px] rounded-full border border-[rgba(80,70,190,0.11)] shadow-[0_0_0_70px_rgba(255,255,255,0.12)]" />
        </section>
      </main>
    </GuestLayout>
  );
}
