
import {
  BriefcaseBusiness,
  Newspaper,
  ArrowUpRight,
  LayoutDashboard,
  Plus,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const DashboardHome = () => {
  const { user } = useAuth();

  const firstName = user?.name
    ? user.name.trim().split(" ")[0]
    : "there";

  const overviewCards = [
    {
      title: "Manage Vacancies",
      description: "Create, update and manage job opportunities published on the FISDEV website.",
      icon: BriefcaseBusiness,
      path: "/cms/vacancies",
      iconBg: "bg-blue-50",
      iconColor: "text-[#056699]",
    },
    {
      title: "Manage News",
      description: "Publish organisational updates, announcements and news articles.",
      icon: Newspaper,
      path: "/cms/news",
      iconBg: "bg-cyan-50",
      iconColor: "text-[#159da8]",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page heading */}
      <div>
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#056699]">
          <LayoutDashboard size={17} />
          <span>Dashboard</span>
        </div>

        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          Welcome back, {firstName}!
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
          Welcome to the FISDEV Content Management System. Manage your
          website content from one central place.
        </p>
      </div>

      {/* Welcome banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#056699] to-[#0786a8] px-6 py-8 text-white shadow-lg shadow-[#056699]/10 sm:px-9 sm:py-10">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-cyan-100">
            FISDEV Content Management
          </p>

          <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl">
            Keep your website up to date.
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-blue-50 sm:text-base">
            Use the CMS to share opportunities, communicate organisational
            updates and keep visitors informed about FISDEV's work.
          </p>

          <Link
            to="/cms/vacancies"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-[#056699] transition hover:bg-cyan-50"
          >
            Manage content
            <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="absolute -right-12 -top-16 h-64 w-64 rounded-full border-[35px] border-white/10" />
        <div className="absolute -bottom-28 right-24 h-64 w-64 rounded-full border-[35px] border-white/10" />
      </section>

      {/* Management sections */}
      <section>
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-900">
            Content Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Select a section to manage your website content.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {overviewCards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.title}
                to={card.path}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#1BB7C4] hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.iconBg} ${card.iconColor}`}
                  >
                    <Icon size={24} />
                  </div>

                  <ArrowUpRight
                    size={20}
                    className="text-gray-400 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#056699]"
                  />
                </div>

                <h3 className="mt-5 text-lg font-bold text-gray-900">
                  {card.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {card.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-bold text-[#056699]">
                  Open section
                  <ArrowUpRight size={16} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Getting started */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-7">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e7f7f8] text-[#159da8]">
            <Globe size={22} />
          </div>

          <div className="flex-1">
            <h2 className="text-base font-bold text-gray-900">
              Your website workspace
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              The FISDEV CMS provides a central workspace for maintaining
              website content. Start by selecting a management section
              from the sidebar or the cards above.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/cms/vacancies"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-[#056699] hover:text-[#056699]"
              >
                <Plus size={16} />
                Vacancies
              </Link>

              <Link
                to="/cms/news"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-[#056699] hover:text-[#056699]"
              >
                <Plus size={16} />
                News
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardHome;
