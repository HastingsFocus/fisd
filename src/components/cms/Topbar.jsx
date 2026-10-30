
import { Menu, Bell, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Topbar = ({ onMenuClick }) => {
  const { user } = useAuth();

  const displayName = user?.name || "CMS User";
  const displayRole = user?.role || "Staff";
  const displayEmail = user?.email || "";

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={24} />
        </button>

        <div>
          <h2 className="text-base font-bold text-gray-800 sm:text-lg">
            FISDEV CMS
          </h2>
          <p className="hidden text-xs text-gray-500 sm:block">
            Manage your website content
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 sm:gap-5">
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-full p-2.5 text-gray-500 transition hover:bg-gray-100 hover:text-[#056699]"
        >
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#1BB7C4]" />
        </button>

        <div className="hidden h-9 w-px bg-gray-200 sm:block" />

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-bold text-gray-800">
              {displayName}
            </p>
            <p className="text-xs capitalize text-gray-500">
              {displayRole}
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e7f3f9] font-bold uppercase text-[#056699]">
            {displayName.charAt(0)}
          </div>

          <ChevronDown
            size={17}
            className="hidden text-gray-400 sm:block"
          />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
