import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    //{ name: "Services", to: "/#services" },
    { name: "Programs", to: "/programs" },
    { name: "Contact Us", to: "/contact" },
  ];

  const isActive = (link) => {
    if (link.name === "Home") return location.pathname === "/";
    if (link.name === "About") return location.pathname === "/about";
    if (link.name === "Programs") return location.pathname === "/programs";
    if (link.name === "Contact Us") return location.pathname === "/contact";
    return false;
  };

  const linkClass = (link) =>
    `text-sm font-medium transition-colors duration-200 lg:text-base ${
      link.name === "Contact Us"
        ? "rounded-lg bg-[#1BB7C4] px-4 py-2.5 text-white hover:bg-[#159da8]"
        : isActive(link)
          ? "text-[#056699]"
          : "text-gray-700 hover:text-[#1BB7C4]"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/70 bg-[rgb(245,249,252)]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Website branding */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="shrink-0 text-2xl font-bold tracking-tight text-[#056699] sm:text-3xl"
        >
          FISDEV
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-5 md:flex lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
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
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
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
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-4 py-3 font-medium transition-colors hover:bg-[#1BB7C4]/10 hover:text-[#056699] ${
                  link.name === "Contact Us"
                    ? "text-[#056699]"
                    : isActive(link)
                      ? "bg-[#1BB7C4]/10 text-[#056699]"
                      : "text-gray-700"
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