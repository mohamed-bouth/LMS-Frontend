import { Outlet } from "react-router-dom";

function GuestLayout() {
  return <>
          <div className="min-h-screen bg-white text-[#182038]">
            <Outlet/>
          </div>
        </>;
}

export default GuestLayout