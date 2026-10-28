import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import fisdevIcon from "../../assets/logos/fisd-icon.jpg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Programs", to: "/programs" },
    { name: "Projects", to: "/projects" },
    { name: "Our Approach", to: "/approach" },
    { name: "Team", to: "/team" },
    { name: "Latest", to: "/latest" },
    { name: "Get Involved", to: "/get-involved" },
    { name: "Contact Us", to: "/contact" },
  ];

  const isActive = (link) => {
    if (link.to === "/") {
      return location.pathname === "/";
    }

    if (link.to === "/latest") {
      return (
        location.pathname === "/latest" ||
        location.pathname.startsWith("/latest/")
      );
    }

    return location.pathname === link.to;
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const linkClass = (link) =>
    `whitespace-nowrap text-sm font-medium transition-colors duration-200 lg:text-base ${
      link.name === "Contact Us"
        ? "rounded-lg bg-[#1BB7C4] px-4 py-2.5 text-white hover:bg-[#159da8]"
        : isActive(link)
          ? "text-[#056699]"
          : "text-gray-700 hover:text-[#1BB7C4]"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/70 bg-[rgb(245,249,252)]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-2 py-4 sm:px-4 lg:px-6">
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
          {navLinks.map((link) => (
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
          className="inline-flex items-center justify-center rounded-lg p-2 text-[#056699] transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1BB7C4] md:hidden"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile navigation */}
      {menuOpen && (
        <div className="border-t border-gray-200 bg-[rgb(245,249,252)] px-4 py-3 sm:px-6 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={closeMenu}
                aria-current={isActive(link) ? "page" : undefined}
                className={`rounded-lg px-4 py-3 font-medium transition-colors ${
                  link.name === "Contact Us"
                    ? "bg-[#1BB7C4] text-white hover:bg-[#159da8]"
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