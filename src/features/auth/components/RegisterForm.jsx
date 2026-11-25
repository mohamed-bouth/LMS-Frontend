import { useState } from "react";
import Icon from "../../../components/Icon.jsx";
import { register } from "../services/authService.js";
import { Link } from "react-router";

export default function RegisterForm() {
  const [values, setValues] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setError("");
    setSuccess("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!values.name.trim() || !values.email.trim() || !values.password || !values.confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (values.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }
    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      await register({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
      });
  
      setSuccess("Account created successfully. You can now sign in.");
    } catch {
      setError("Unable to reach the registration service.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="w-full max-w-[470px]" noValidate onSubmit={handleSubmit}>
      <span className="text-[11px] font-normal tracking-[2px] text-[#4f46d9]">CREATE YOUR ACCOUNT</span>
      <h2 className="mt-2 font-['Poppins'] text-[31px] tracking-[-1.1px]">Join EduLearn</h2>
      <p className="my-[10px] mb-[22px] leading-[1.6] text-[#697188]">
        Set up your learner account to access your courses.
      </p>
      <div className="mb-[15px] flex flex-col gap-[7px]">
        <label className="text-[13px] font-normal text-[#343a51]" htmlFor="register-name">Full name</label>
        <div className="flex h-12 items-center gap-2.5 rounded-[10px] border border-[#dfe2ea] bg-white px-3.5 text-[#9298a9] focus-within:border-[#7770e6] focus-within:shadow-[0_0_0_3px_rgba(79,70,217,0.1)]">
          <Icon name="profile" size={18} />
          <input
            id="register-name"
            name="name"
            className="h-full min-w-0 flex-1 border-0 text-[#182038] outline-none"
            placeholder="e.g. Maya Anderson"
            autoComplete="name"
            value={values.name}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mb-[15px] flex flex-col gap-[7px]">
        <label className="text-[13px] font-normal text-[#343a51]" htmlFor="register-email">Email address</label>
        <div className="flex h-12 items-center gap-2.5 rounded-[10px] border border-[#dfe2ea] bg-white px-3.5 text-[#9298a9] focus-within:border-[#7770e6] focus-within:shadow-[0_0_0_3px_rgba(79,70,217,0.1)]">
          <Icon name="mail" size={18} />
          <input
            id="register-email"
            name="email"
            className="h-full min-w-0 flex-1 border-0 text-[#182038] outline-none"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-0 min-[621px]:grid-cols-2 min-[621px]:gap-3">
        <div className="mb-[15px] flex flex-col gap-[7px]">
          <label className="text-[13px] font-normal text-[#343a51]" htmlFor="register-password">Password</label>
          <div className="flex h-12 items-center gap-2.5 rounded-[10px] border border-[#dfe2ea] bg-white px-3.5 text-[#9298a9] focus-within:border-[#7770e6] focus-within:shadow-[0_0_0_3px_rgba(79,70,217,0.1)]">
            <Icon name="lock" size={18} />
            <input
              id="register-password"
              name="password"
              className="h-full min-w-0 flex-1 border-0 text-[#182038] outline-none"
              type="password"
              placeholder="At least 8 characters"
              autoComplete="new-password"
              value={values.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-[15px] flex flex-col gap-[7px]">
          <label className="text-[13px] font-normal text-[#343a51]" htmlFor="confirm-password">Confirm password</label>
          <div className="flex h-12 items-center gap-2.5 rounded-[10px] border border-[#dfe2ea] bg-white px-3.5 text-[#9298a9] focus-within:border-[#7770e6] focus-within:shadow-[0_0_0_3px_rgba(79,70,217,0.1)]">
            <Icon name="lock" size={18} />
            <input
              id="confirm-password"
              name="confirmPassword"
              className="h-full min-w-0 flex-1 border-0 text-[#182038] outline-none"
              type="password"
              placeholder="Repeat your password"
              autoComplete="new-password"
              value={values.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <label className="mb-5 flex cursor-pointer items-start gap-2 text-[12px] leading-[1.5] text-[#51576a]">
        <input className="peer sr-only" type="checkbox" defaultChecked />
        <span className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-[5px] border border-[#d4d8e1] text-transparent peer-checked:border-[#4f46d9] peer-checked:bg-[#4f46d9] peer-checked:text-white">
          <Icon name="check" size={13} />
        </span>
        <span>
          I agree to the <button className="border-0 bg-transparent p-0 font-normal text-[#4f46d9]" type="button">Terms of Service</button> and{" "}
          <button className="border-0 bg-transparent p-0 font-normal text-[#4f46d9]" type="button">Privacy Policy</button>.
        </span>
      </label>
      {error && <p className="mb-4 text-sm text-red-600" role="alert">{error}</p>}
      {success && <p className="mb-4 text-sm text-green-700" role="status">{success}</p>}
      <button className="flex h-12 w-full items-center justify-center gap-2 rounded-[9px] border border-transparent bg-[#4f46d9] text-sm font-normal text-white shadow-[0_5px_12px_rgba(79,70,217,0.18)] transition hover:-translate-y-px hover:bg-[#4338ca] disabled:cursor-not-allowed disabled:opacity-70" type="submit" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create account"}
        {!isLoading && <Icon name="arrow" size={17} />}
      </button>
      <p className="mt-[22px] text-center text-[12px] text-[#777e91]">
        Already have an account?{" "}
        <Link className="border-0 bg-transparent p-0 font-normal text-[#4f46d9] hover:underline" to={"/login"}>
          Sign in
        </Link>
      </p>
    </form>
  );
}
