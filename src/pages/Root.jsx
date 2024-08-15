import { Outlet } from "react-router-dom";
import ToastNotification from "../components/common/ToastNotification";

const Root = () => {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-gradient-to-br from-[#f3e7e9] via-[#e3eeff] to-[#e7e9f3] py-7 text-black">
      <div className="pointer-events-none absolute inset-0">
        <div className="h-[200%] w-[200%] translate-x-[-50%] translate-y-[-50%] transform bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-[#ffecd2] via-[#fcb69f] to-transparent opacity-30"></div>
      </div>
      <div className="container relative z-10 mx-auto">
        <Outlet />
      </div>
      <ToastNotification />
    </div>
  );
};

export default Root;
