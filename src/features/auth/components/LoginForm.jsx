import { useState } from "react";
import Icon from "../../../components/Icon.jsx";
import { login } from "../services/authService.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import { Link } from "react-router";
import Loader from "../../../components/Loader.jsx";

export default function LoginForm() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { handleAuthenticated } = useAuth()

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!values.email.trim() || !values.password) {
      setError("Email and password are required.");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const data = await login(values);

      if (!data.token) {
        setError("The login response is invalid.");
        return;
      }
      await handleAuthenticated(data);
    } catch{
      setError("Unable to reach the authentication service.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="w-full max-w-[430px]" noValidate onSubmit={handleSubmit}>
        <span className="text-[11px] font-normal tracking-[2px] text-[#4f46d9]">WELCOME BACK</span>
        <h2 className="mt-2 font-['Poppins'] text-[31px] tracking-[-1.1px]">Sign in to EduLearn</h2>
        <p className="my-[10px] mb-[30px] leading-[1.6] text-[#697188]">
          Enter your details to continue to your learning space.
        </p>
        <div className="mb-5 flex flex-col gap-[7px]">
          <label className="text-[13px] font-normal text-[#343a51]" htmlFor="email">Email address</label>
          <div className="flex h-12 items-center gap-2.5 rounded-[10px] border border-[#dfe2ea] bg-white px-3.5 text-[#9298a9] transition focus-within:border-[#7770e6] focus-within:shadow-[0_0_0_3px_rgba(79,70,217,0.1)]">
            <Icon name="mail" size={18} />
            <input
              id="email"
              name="email"
              className="h-full min-w-0 flex-1 border-0 text-[#182038] outline-none"
              type="email"
              placeholder="you@example.com"
              value={values.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-5 flex flex-col gap-[7px]">
          <div className="flex items-center justify-between text-[13px] font-normal text-[#343a51]">
            <label htmlFor="password">Password</label>
            <button type="button" className="border-0 bg-transparent p-0 text-[12px] font-normal text-[#4f46d9]">
              Forgot password?
            </button>
          </div>
          <div className="flex h-12 items-center gap-2.5 rounded-[10px] border border-[#dfe2ea] bg-white px-3.5 text-[#9298a9] transition focus-within:border-[#7770e6] focus-within:shadow-[0_0_0_3px_rgba(79,70,217,0.1)]">
            <Icon name="lock" size={18} />
            <input
              id="password"
              name="password"
              className="h-full min-w-0 flex-1 border-0 text-[#182038] outline-none"
              type="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <label className="mb-6 flex w-max cursor-pointer items-center gap-2 text-[13px] text-[#51576a]">
          <input className="peer sr-only" type="checkbox" defaultChecked />
          <span className="grid h-[18px] w-[18px] place-items-center rounded-[5px] border border-[#d4d8e1] text-transparent peer-checked:border-[#4f46d9] peer-checked:bg-[#4f46d9] peer-checked:text-white">
            <Icon name="check" size={13} />
          </span>
          Remember me
        </label>
        {error && <p className="mb-4 text-sm text-red-600" role="alert">{error}</p>}
        <button className="flex h-12 w-full items-center justify-center gap-2 rounded-[9px] border border-transparent bg-[#4f46d9] text-sm font-normal text-white shadow-[0_5px_12px_rgba(79,70,217,0.18)] transition hover:-translate-y-px hover:bg-[#4338ca] disabled:cursor-not-allowed disabled:opacity-70" type="submit" disabled={isLoading}>
          {isLoading ? <div className="flex items-center justify-center h-screen"><Loader darkMode={true}/></div> : "Sign in"}
          {!isLoading && <Icon name="arrow" size={17} />}
        </button>
        <div className="my-[25px] flex items-center gap-3 text-[11px] text-[#9ba0ae] before:h-px before:flex-1 before:bg-[#eaecf1] after:h-px after:flex-1 after:bg-[#eaecf1]">
          <span>Preview a demo account</span>
        </div>
        <p className="mt-[22px] text-center text-[12px] text-[#777e91]">
          New to EduLearn?{" "}
          <Link className="border-0 bg-transparent p-0 font-normal text-[#4f46d9] hover:underline" to={"/register"}>
          Create an account
          </Link>
        </p>
      </form>
  );
}
