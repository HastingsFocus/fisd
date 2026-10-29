
import {
  LayoutDashboard,
  BriefcaseBusiness,
  Newspaper,
  LogOut,
  X,
  ShieldCheck,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navigation = [
  {
    name: "Dashboard",
    path: "/cms/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Manage Vacancies",
    path: "/cms/vacancies",
    icon: BriefcaseBusiness,
  },
  {
    name: "Manage News",
    path: "/cms/news",
    icon: Newspaper,
  },
];

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/cms/login", { replace: true });
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-gray-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex h-20 items-center justify-between border-b border-gray-100 px-6">
          <NavLink
            to="/cms/dashboard"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#056699] text-white">
              <ShieldCheck size={25} />
            </div>

            <div>
              <h1 className="text-lg font-extrabold tracking-tight text-[#056699]">
                FISDEV
              </h1>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                Content Management
              </p>
            </div>
          </NavLink>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={21} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-7">
          <p className="mb-4 px-3 text-xs font-bold uppercase tracking-widest text-gray-400">
            Workspace
          </p>

          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-[#056699] text-white shadow-md shadow-[#056699]/20"
                        : "text-gray-600 hover:bg-[#f0f7fb] hover:text-[#056699]"
                    }`
                  }
                >
                  <Icon size={19} strokeWidth={2} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Logged-in user and logout */}
        <div className="border-t border-gray-100 p-4">
          <div className="mb-4 flex items-center gap-3 rounded-xl bg-[#f5f9fc] p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#056699] text-sm font-bold uppercase text-white">
              {(user?.name || user?.email || "U").charAt(0)}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-gray-800">
                {user?.name || "CMS User"}
              </p>
              <p className="truncate text-xs capitalize text-gray-500">
                {user?.role || "Staff"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            <LogOut size={19} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
