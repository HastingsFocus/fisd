
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Newspaper,
  Loader2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

import { getPublishedNewsById } from "../../services/newsService";

const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const NewsDetails = () => {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getPublishedNewsById(id);
        setArticle(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load this news article."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center gap-3 bg-[rgb(245,249,252)] text-gray-500">
        <Loader2 size={35} className="animate-spin text-[#056699]" />
        <p className="text-sm">Loading news article...</p>
      </main>
    );
  }

  if (error || !article) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[rgb(245,249,252)] px-5 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
          <AlertCircle size={30} />
        </div>

        <h1 className="text-2xl font-bold text-[#034b71]">
          News Article Not Found
        </h1>

        <p className="mt-3 max-w-md text-sm leading-7 text-gray-500">
          {error ||
            "The news article you are looking for may have been removed or is no longer available."}
        </p>

        <Link
          to="/latest/news"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#056699] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#034b71]"
        >
          <ArrowLeft size={17} />
          Back to News
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[rgb(245,249,252)]">
      {/* ARTICLE HEADER */}
      <section className="bg-[rgb(3,75,113)] px-5 py-12 text-white sm:px-8 lg:py-16">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/latest/news"
            className="mb-9 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition hover:text-[#1BB7C4]"
          >
            <ArrowLeft size={17} />
            Back to News
          </Link>

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90">
            <Newspaper size={16} />
            FISDEV News
          </div>

          <h1 className="max-w-4xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>

          <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-white/75">
            <span className="inline-flex items-center gap-2">
              <CalendarDays size={17} className="text-[#1BB7C4]" />
              {formatDate(article.date)}
            </span>
          </div>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <section className="px-5 py-12 sm:px-8 lg:py-16">
        <div className="mx-auto max-w-5xl">
          <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            {article.coverImage && (
              <div className="bg-gray-100">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="max-h-[560px] w-full object-cover"
                />
              </div>
            )}

            <div className="mx-auto max-w-4xl px-6 py-9 sm:px-10 sm:py-12">
              <div className="mb-8 flex items-center gap-3 border-b border-gray-100 pb-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#056699]/10 text-[#056699]">
                  <Newspaper size={21} />
                </div>

                <div>
                  <p className="text-sm font-bold text-[#034b71]">
                    FISDEV
                  </p>
                  <p className="text-xs text-gray-500">
                    News and Updates
                  </p>
                </div>
              </div>

              <h2 className="mb-6 text-2xl font-bold leading-snug text-[#034b71] sm:text-3xl">
                {article.title}
              </h2>

              <div className="whitespace-pre-wrap break-words text-base leading-8 text-gray-700">
                {article.content}
              </div>
            </div>
          </article>

          {/* BACK TO NEWS */}
          <div className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-gray-200 pt-8 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg font-bold text-[#034b71]">
                Explore more from FISDEV
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Stay connected with our latest stories and updates.
              </p>
            </div>

            <Link
              to="/latest/news"
              className="inline-flex items-center gap-2 rounded-lg bg-[#056699] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#034b71]"
            >
              More News
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NewsDetails;
