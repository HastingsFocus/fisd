import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const currentYear = new Date().getFullYear();

  const linkGroups = [
    {
      title: "Useful Links",
      links: [
        { label: "Home", to: "/" },
        { label: "About", to: "/about" },
        { label: "Programs", to: "/programs" },
      ],
    },
    {
      title: "Get Involved",
      links: [
        { label: "Partner", to: "/contact" },
        { label: "Volunteer", to: "/contact" },
        { label: "Support", to: "/contact" },
        { label: "Donate", to: "/contact" },
      ],
    },
  ];

  const socialLinks = [
    { label: "Facebook", href: "https://www.facebook.com/", Icon: FaFacebookF },
    { label: "LinkedIn", href: "https://www.linkedin.com/", Icon: FaLinkedinIn },
    { label: "Instagram", href: "https://www.instagram.com/", Icon: FaInstagram },
  ];

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    window.alert(
      "Newsletter subscriptions are not connected yet. Please contact info@fisdev.org for updates."
    );
    setEmail("");
  };

  return (
    <footer className="bg-[#034b71] text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-5 gap-y-6 px-5 py-5 sm:grid-cols-2 sm:gap-x-8 sm:px-8 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-4 lg:px-12">
        {/* Organization information */}
        <div>
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-base font-bold text-[#056699]">
              F
            </span>
            <span className="text-lg font-bold">FISDEV</span>
          </Link>

          <p className="mt-2 text-xs leading-5 text-white/80">
            Building inclusive and sustainable pathways for youth and
            underserved communities across Malawi.
          </p>

          <address className="mt-3 space-y-1.5 text-xs not-italic text-white/80">
            <p className="flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 shrink-0 text-[#1BB7C4]" />
              <span>Chintheche, Nkhata Bay, Malawi</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone size={14} className="shrink-0 text-[#1BB7C4]" />
              <a href="tel:+265991020491" className="hover:text-[#1BB7C4]">
                +265 991 020 491
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Mail size={14} className="shrink-0 text-[#1BB7C4]" />
              <a
                href="mailto:info@fisdev.org"
                className="break-all hover:text-[#1BB7C4]"
              >
                info@fisdev.org
              </a>
            </p>
          </address>

          <div className="mt-3 flex items-center gap-2">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 transition hover:-translate-y-0.5 hover:border-[#1BB7C4] hover:bg-[#1BB7C4]"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Footer navigation */}
        {linkGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm font-bold">{group.title}</h3>
            <ul className="mt-2 space-y-1.5">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-xs text-white/80 transition hover:text-[#1BB7C4]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter */}
        <div>
          <h3 className="text-sm font-bold">Our Newsletter</h3>
          <p className="mt-2 text-xs leading-5 text-white/80">
            Subscribe for impact updates and opportunities.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="mt-3">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <div className="flex flex-col gap-2">
              <input
                id="newsletter-email"
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Your email address"
                autoComplete="email"
                required
                className="w-full min-w-0 rounded-md border border-white/20 bg-white px-3 py-2 text-xs text-gray-900 outline-none focus:ring-2 focus:ring-[#1BB7C4]"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 self-start rounded-md bg-[#1BB7C4] px-3 py-2 text-xs font-semibold transition hover:bg-[#159da8]"
              >
                <Send size={13} />
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/15 px-4 py-3 text-center text-[11px] text-white/70">
        <p>
          © {currentYear} <span className="font-semibold text-white">FISDEV</span>.
          All Rights Reserved.
        </p>
        <p className="mt-1">
          Designed by{" "}
          <a
            href="https://kalumw.com/?app=KALUMW&mwenecho=I87734106212723202515"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-white transition hover:text-[#1BB7C4] hover:underline"
          >
            Kalu ICT Solutions
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;