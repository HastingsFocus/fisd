import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BriefcaseBusiness, CalendarDays } from "lucide-react";
import { getPublishedVacancies } from "../../services/vacancyService";

const getVacancyList = (response) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.vacancies)) return response.vacancies;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.data?.vacancies)) {
    return response.data.vacancies;
  }
  return [];
};

const formatDate = (date) => {
  if (!date) return "Not specified";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "Not specified";

  return parsedDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const Vacancies = () => {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getPublishedVacancies();
        setVacancies(getVacancyList(response));
      } catch (err) {
        console.error("Failed to fetch vacancies:", err);
        setError(
          err.response?.data?.message ||
            "We couldn't load vacancies at the moment. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVacancies();
  }, []);

  return (
    <main className="min-h-screen bg-[rgb(245,249,252)]">
      {/* Page Hero */}
      <section className="relative overflow-hidden bg-[rgb(3,75,113)] px-5 py-20 text-white sm:px-8 lg:py-24">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#1BB7C4]/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#1BB7C4]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white">
            <BriefcaseBusiness size={16} />
            Career Opportunities
          </div>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Make a Difference.
            <span className="block text-[#1BB7C4]">
              Grow With FISDEV.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
            Explore current career opportunities and discover how your skills,
            experience and passion can contribute to meaningful development.
          </p>
        </div>
      </section>

      {/* Vacancies */}
      <section className="px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#1BB7C4]">
              Join Our Team
            </p>

            <h2 className="text-3xl font-bold text-[#056699] sm:text-4xl">
              Current Vacancies
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-gray-600">
              Browse the opportunities currently available at FISDEV. Select
              an opportunity to read the full job description and application
              requirements.
            </p>
          </div>

          {loading ? (
            <div className="space-y-5">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-2xl border border-gray-200 bg-white p-7"
                >
                  <div className="mb-4 h-6 w-2/3 rounded bg-gray-200" />
                  <div className="mb-2 h-4 w-full rounded bg-gray-100" />
                  <div className="h-4 w-4/5 rounded bg-gray-100" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
              <p className="font-medium text-red-700">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 font-semibold text-[#056699] hover:underline"
              >
                Try again
              </button>
            </div>
          ) : vacancies.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#056699]/10 text-[#056699]">
                <BriefcaseBusiness size={28} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#056699]">
                No Current Vacancies
              </h3>

              <p className="mx-auto mt-3 max-w-md leading-7 text-gray-600">
                There are currently no open vacancies. Please check back
                regularly for future career opportunities.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {vacancies.map((vacancy) => (
                <article
                  key={vacancy._id}
                  className="group rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#1BB7C4]/50 hover:shadow-lg sm:p-8"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-bold leading-snug text-[#056699] transition-colors group-hover:text-[#1BB7C4] sm:text-2xl">
                        {vacancy.title}
                      </h3>

                      <div className="mt-5">
                        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                          Overall Objective
                        </p>

                        <p className="leading-7 text-gray-600">
                          {vacancy.overallObjective ||
                            vacancy.introduction ||
                            "Please see the full vacancy advertisement for more information."}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-col items-start gap-4 sm:items-end">
                      {vacancy.closingDate && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <CalendarDays
                            size={16}
                            className="text-[#1BB7C4]"
                          />
                          <span>
                            Closes: {formatDate(vacancy.closingDate)}
                          </span>
                        </div>
                      )}

                      <Link
                        to={`/latest/vacancies/${vacancy._id}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#056699] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#034f70]"
                      >
                        See More
                        <ArrowRight
                          size={17}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Vacancies;