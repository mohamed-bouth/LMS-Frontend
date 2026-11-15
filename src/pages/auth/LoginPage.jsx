import Logo from "../../components/Logo.jsx";
import LoginForm from "../../features/auth/components/LoginForm.jsx";
import GuestLayout from "../../layouts/GuestLayout.jsx";

export default function LoginPage({ onAuthenticated, onNavigate }) {
  return (
    <GuestLayout>
      <main className="grid min-h-screen grid-cols-1 bg-white min-[801px]:grid-cols-[minmax(420px,1.07fr)_minmax(500px,0.93fr)]">
        <section className="relative hidden min-h-[700px] overflow-hidden bg-gradient-to-br from-[#f0f0ff] via-[#e6e7ff] to-[#f5f1ff] px-12 py-[45px] min-[801px]:block min-[1101px]:px-[clamp(42px,6vw,92px)]">
          <div className="relative z-[2]">
            <Logo />
          </div>
          <div className="relative z-[2] mt-[clamp(130px,20vh,210px)] max-w-[590px]">
            <span className="text-[11px] font-normal tracking-[2px] text-[#4f46d9]">
              LEARN • GROW • ACHIEVE
            </span>
            <h1 className="mt-[22px] font-['Poppins'] text-[clamp(44px,4.2vw,64px)] font-normal leading-[1.09] tracking-[-2.6px] text-[#202647]">
              Learning that moves
              <br />
              you{" "}
              <em className="relative not-italic text-[#4f46d9] after:absolute after:bottom-[-6px] after:left-[2px] after:right-0 after:h-[5px] after:rotate-[-1deg] after:rounded-[20px] after:bg-[#aaa4f8] after:content-['']">
                forward.
              </em>
            </h1>
            <p className="mt-[26px] max-w-[510px] text-[17px] leading-[1.7] text-[#606982]">
              A focused space for learners to grow and administrators to create
              meaningful learning experiences.
            </p>
            <div className="mt-[46px] flex items-center gap-4">
              <div className="flex">
                <span className="grid h-[38px] w-[38px] place-items-center rounded-full border-[3px] border-[#ececff] bg-[#21294a] text-[10px] font-normal text-white">
                  OM
                </span>
                <span className="-ml-2 grid h-[38px] w-[38px] place-items-center rounded-full border-[3px] border-[#ececff] bg-[#5d55d8] text-[10px] font-normal text-white">
                  NW
                </span>
                <span className="-ml-2 grid h-[38px] w-[38px] place-items-center rounded-full border-[3px] border-[#ececff] bg-[#986fc5] text-[10px] font-normal text-white">
                  SR
                </span>
              </div>
              <p className="text-[12px] leading-[1.45] text-[#6c7388]">
                <strong className="text-[13px] font-normal text-[#333b59]">
                  Simple by design
                </strong>
                <br />
                Built for focused learning
              </p>
            </div>
          </div>
          <div className="absolute right-[-300px] top-[-220px] h-[590px] w-[590px] rounded-full border border-[rgba(80,70,190,0.11)] shadow-[0_0_0_90px_rgba(255,255,255,0.09),0_0_0_180px_rgba(255,255,255,0.08)]" />
          <div className="absolute bottom-[-170px] left-[-180px] h-[330px] w-[330px] rounded-full border border-[rgba(80,70,190,0.11)] shadow-[0_0_0_70px_rgba(255,255,255,0.12)]" />
        </section>
        <section className="relative flex min-h-screen flex-col items-center justify-start px-7 py-8 min-[801px]:min-h-[700px] min-[801px]:justify-center min-[801px]:px-10 min-[801px]:py-[60px] min-[801px]:pb-[30px]">
          <div className="mb-[70px] block w-full max-w-[430px] min-[801px]:hidden">
            <Logo />
          </div>
          <LoginForm onAuthenticated={onAuthenticated} onNavigate={onNavigate} />
          <p className="mt-auto pt-[55px] text-center text-[11px] text-[#a0a5b2] min-[801px]:absolute min-[801px]:bottom-[25px] min-[801px]:mt-0 min-[801px]:pt-0">
            © 2025 EduLearn. Secure learning, thoughtfully designed.
          </p>
        </section>
      </main>
    </GuestLayout>
  );
}
