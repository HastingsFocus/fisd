
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Newspaper,
  Search,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

import { getPublishedNews } from "../../services/newsService";

const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const News = () => {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getPublishedNews({ limit: 100 });
      setArticles(response.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load news articles. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const filteredArticles = articles.filter((article) => {
    const query = search.toLowerCase().trim();

    return (
      article.title?.toLowerCase().includes(query) ||
      article.content?.toLowerCase().includes(query)
    );
  });

  return (
    <main className="min-h-screen bg-[rgb(245,249,252)]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[rgb(3,75,113)] px-5 py-20 text-white sm:px-8 lg:py-28">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#1BB7C4]/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90">
            <Newspaper size={17} />
            FISDEV Updates
          </div>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            News, Stories &{" "}
            <span className="text-[#1BB7C4]">Updates</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
            Stay informed about our work, initiatives, achievements and
            developments as we continue creating positive change in
            communities.
          </p>
        </div>
      </section>

      {/* NEWS CONTENT */}
      <section className="px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-wider text-[#1BB7C4]">
                Latest Updates
              </p>

              <h2 className="text-3xl font-bold text-[#034b71] sm:text-4xl">
                What's Happening at FISDEV
              </h2>

              <p className="mt-3 max-w-2xl text-gray-600">
                Explore our latest news, activities and stories from across
                our programmes and communities.
              </p>
            </div>

            <div className="relative w-full md:max-w-xs">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search news..."
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-[#056699] focus:ring-2 focus:ring-[#056699]/10"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-gray-500">
              <Loader2
                size={34}
                className="animate-spin text-[#056699]"
              />
              <p className="text-sm">Loading the latest news...</p>
            </div>
          ) : error ? (
            <div className="flex min-h-64 flex-col items-center justify-center text-center">
              <AlertCircle size={35} className="mb-3 text-red-500" />
              <p className="max-w-md text-sm text-gray-600">{error}</p>

              <button
                onClick={fetchNews}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#056699] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#034b71]"
              >
                <RefreshCw size={16} />
                Try Again
              </button>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-[#056699]">
                <Newspaper size={30} />
              </div>

              <h3 className="text-xl font-bold text-gray-800">
                {search ? "No matching articles" : "No news available yet"}
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                {search
                  ? "Try another search term to find the article you're looking for."
                  : "Our latest updates and stories will appear here. Please check back soon."}
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-semibold text-gray-800">
                    {filteredArticles.length}
                  </span>{" "}
                  {filteredArticles.length === 1 ? "article" : "articles"}
                </p>
              </div>

              <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {filteredArticles.map((article) => (
                  <article
                    key={article._id}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <Link
                      to={`/latest/news/${article._id}`}
                      className="relative block aspect-[16/10] overflow-hidden bg-gray-100"
                    >
                      {article.coverImage ? (
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-gray-400">
                          <Newspaper size={42} />
                        </div>
                      )}

                      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#056699] shadow-sm">
                        FISDEV News
                      </span>
                    </Link>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex items-center gap-2 text-xs font-medium text-gray-500">
                        <CalendarDays
                          size={15}
                          className="text-[#1BB7C4]"
                        />
                        {formatDate(article.date)}
                      </div>

                      <h3 className="text-xl font-bold leading-snug text-[#034b71] transition group-hover:text-[#056699]">
                        <Link to={`/latest/news/${article._id}`}>
                          {article.title}
                        </Link>
                      </h3>

                      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-7 text-gray-600">
                        {article.content}
                      </p>

                      <Link
                        to={`/latest/news/${article._id}`}
                        className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#056699] transition hover:gap-3"
                      >
                        Read Full Story
                        <ArrowRight size={17} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default News;
