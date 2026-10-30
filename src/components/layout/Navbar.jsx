
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  X,
  BriefcaseBusiness,
  Newspaper,
} from "lucide-react";
import fisdevIcon from "../../assets/logos/fisd-icon.jpg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [latestOpen, setLatestOpen] = useState(false);
  const [mobileLatestOpen, setMobileLatestOpen] = useState(false);

  const location = useLocation();

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Programs", to: "/programs" },
    { name: "Our Approach", to: "/approach" },
    { name: "Team", to: "/team" },
    { name: "Get Involved", to: "/get-involved" },
    { name: "Contact Us", to: "/contact" },
  ];

  const latestLinks = [
    {
      name: "Vacancies",
      to: "/latest/vacancies",
      description: "Explore career opportunities at FISDEV.",
      icon: BriefcaseBusiness,
    },
    {
      name: "News",
      to: "/latest/news",
      description: "Discover our latest news and updates.",
      icon: Newspaper,
    },
  ];

  const isLatestActive = location.pathname.startsWith("/latest");

  const isActive = (link) => {
    if (link.to === "/") {
      return location.pathname === "/";
    }

    return (
      location.pathname === link.to ||
      location.pathname.startsWith(`${link.to}/`)
    );
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setLatestOpen(false);
    setMobileLatestOpen(false);
  };

  const linkClass = (link) =>
    `whitespace-nowrap text-sm font-medium transition-colors duration-200 lg:text-base ${
      link.name === "Contact Us"
        ? "rounded-lg bg-[#1BB7C4] px-4 py-2.5 text-white shadow-sm hover:bg-[#159da8]"
        : isActive(link)
          ? "text-[#056699]"
          : "text-gray-700 hover:text-[#1BB7C4]"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/70 bg-[rgb(245,249,252)] shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-3 py-4 sm:px-5 lg:px-6">

        {/* Website branding */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-3 text-2xl font-bold tracking-tight text-[#056699] sm:gap-4 sm:text-3xl"
        >
          <div className="flex h-10 w-10 items-center justify-center sm:h-11 sm:w-11">
            <img
              src={fisdevIcon}
              alt="FISDEV logo"
              className="h-full w-full object-contain"
            />
          </div>

          <span>FISDEV</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-3 md:flex lg:gap-4 xl:gap-5">

          {/* Links before Latest */}
          {navLinks.slice(0, 5).map((link) => (
            <Link
              key={link.name}
              to={link.to}
              onClick={closeMenu}
              className={linkClass(link)}
              aria-current={isActive(link) ? "page" : undefined}
            >
              {link.name}
            </Link>
          ))}

          {/* Latest dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setLatestOpen(true)}
            onMouseLeave={() => setLatestOpen(false)}
          >
            <button
              type="button"
              onClick={() => setLatestOpen((open) => !open)}
              onKeyDown={(event) => {
                if (event.key === "Escape") setLatestOpen(false);
              }}
              aria-expanded={latestOpen}
              aria-haspopup="true"
              className={`flex items-center gap-1 whitespace-nowrap text-sm font-medium transition-colors duration-200 lg:text-base ${
                isLatestActive
                  ? "text-[#056699]"
                  : "text-gray-700 hover:text-[#1BB7C4]"
              }`}
            >
              Latest

              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  latestOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Desktop dropdown menu */}
            <div
              className={`absolute right-0 top-full z-50 w-72 pt-4 transition-all duration-200 ${
                latestOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible translate-y-2 opacity-0"
              }`}
            >
              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-xl">
                {/* Vertical accent line */}
                <div className="border-l-4 border-[#1BB7C4] pl-3">
                  {latestLinks.map((item) => {
                    const Icon = item.icon;
                    const active = location.pathname.startsWith(item.to);

                    return (
                      <Link
                        key={item.name}
                        to={item.to}
                        onClick={closeMenu}
                        className={`mb-1 flex items-start gap-3 rounded-lg p-3 transition-colors last:mb-0 ${
                          active
                            ? "bg-[#1BB7C4]/10"
                            : "hover:bg-[#1BB7C4]/10"
                        }`}
                      >
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                            active
                              ? "bg-[#056699] text-white"
                              : "bg-[#056699]/10 text-[#056699]"
                          }`}
                        >
                          <Icon size={19} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-[#056699]">
                            {item.name}
                          </p>

                          <p className="mt-1 text-xs leading-relaxed text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Get Involved and Contact Us */}
          {navLinks.slice(5).map((link) => (
            <Link
              key={link.name}
              to={link.to}
              onClick={closeMenu}
              className={linkClass(link)}
              aria-current={isActive(link) ? "page" : undefined}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-[#056699] transition hover:bg-[#1BB7C4]/10 focus:outline-none focus:ring-2 focus:ring-[#1BB7C4] md:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* Mobile navigation */}
      {menuOpen && (
        <div className="border-t border-gray-200 bg-[rgb(245,249,252)] px-4 py-4 shadow-lg sm:px-6 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">

            {/* Links before Latest */}
            {navLinks.slice(0, 5).map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={closeMenu}
                aria-current={isActive(link) ? "page" : undefined}
                className={`rounded-lg px-4 py-3 font-medium transition-colors ${
                  isActive(link)
                    ? "bg-[#1BB7C4]/10 text-[#056699]"
                    : "text-gray-700 hover:bg-[#1BB7C4]/10 hover:text-[#056699]"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Latest dropdown */}
            <div className="overflow-hidden rounded-lg">
              <button
                type="button"
                onClick={() => setMobileLatestOpen((open) => !open)}
                aria-expanded={mobileLatestOpen}
                className={`flex w-full items-center justify-between rounded-lg px-4 py-3 font-medium transition-colors ${
                  isLatestActive
                    ? "bg-[#1BB7C4]/10 text-[#056699]"
                    : "text-gray-700 hover:bg-[#1BB7C4]/10 hover:text-[#056699]"
                }`}
              >
                <span>Latest</span>

                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 ${
                    mobileLatestOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileLatestOpen && (
                <div className="ml-4 mt-1 flex flex-col gap-1 border-l-4 border-[#1BB7C4]/50 pl-3">
                  {latestLinks.map((item) => {
                    const Icon = item.icon;
                    const active = location.pathname.startsWith(item.to);

                    return (
                      <Link
                        key={item.name}
                        to={item.to}
                        onClick={closeMenu}
                        className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                          active
                            ? "bg-[#1BB7C4]/10 text-[#056699]"
                            : "text-gray-600 hover:bg-[#1BB7C4]/10 hover:text-[#056699]"
                        }`}
                      >
                        <Icon size={17} />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Get Involved and Contact Us */}
            {navLinks.slice(5).map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={closeMenu}
                aria-current={isActive(link) ? "page" : undefined}
                className={`rounded-lg px-4 py-3 font-medium transition-colors ${
                  link.name === "Contact Us"
                    ? "mt-2 bg-[#1BB7C4] text-center text-white hover:bg-[#159da8]"
                    : isActive(link)
                      ? "bg-[#1BB7C4]/10 text-[#056699]"
                      : "text-gray-700 hover:bg-[#1BB7C4]/10 hover:text-[#056699]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
