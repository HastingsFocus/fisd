
import { useCallback, useEffect, useState } from "react";
import {
  Plus,
  Search,
  Newspaper,
  FileText,
  Globe,
  Archive,
  Pencil,
  Eye,
  X,
  Image as ImageIcon,
  CalendarDays,
  Upload,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Send,
  Trash2,
  RefreshCw,
} from "lucide-react";

import {
  createNews,
  getNews,
  publishNews,
  archiveNews,
  updateNews,
} from "../../../services/newsService";

const initialForm = {
  title: "",
  date: new Date().toLocaleDateString("en-CA"),
  content: "",
  coverImage: null,
};

const formatDate = (date) => {
  if (!date) return "No date";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getDateInputValue = (date) => {
  if (!date) return new Date().toLocaleDateString("en-CA");

  return String(date).split("T")[0];
};

const StatusBadge = ({ status }) => {
  const styles = {
    draft: "bg-amber-50 text-amber-700 border-amber-200",
    published: "bg-emerald-50 text-emerald-700 border-emerald-200",
    archived: "bg-gray-100 text-gray-600 border-gray-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold capitalize ${
        styles[status] || styles.draft
      }`}
    >
      <span
        className={`mr-2 h-1.5 w-1.5 rounded-full ${
          status === "published"
            ? "bg-emerald-500"
            : status === "draft"
            ? "bg-amber-500"
            : "bg-gray-400"
        }`}
      />
      {status || "draft"}
    </span>
  );
};

const News = () => {
  const [news, setNews] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0,
    archived: 0,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [actionLoading, setActionLoading] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [viewingNews, setViewingNews] = useState(null);

  const [form, setForm] = useState(initialForm);
  const [imagePreview, setImagePreview] = useState("");
  const [existingImage, setExistingImage] = useState("");

  const loadNews = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const params = {
        limit: 100,
      };

      if (statusFilter !== "all") {
        params.status = statusFilter;
      }

      if (search.trim()) {
        params.search = search.trim();
      }

      const [newsResponse, publishedResponse, draftResponse, archivedResponse] =
        await Promise.all([
          getNews(params),
          getNews({ status: "published", limit: 1 }),
          getNews({ status: "draft", limit: 1 }),
          getNews({ status: "archived", limit: 1 }),
        ]);

      const articles = newsResponse.data || [];

      setNews(articles);

      setStats({
        total: newsResponse.pagination?.total ?? articles.length,
        published: publishedResponse.pagination?.total ?? 0,
        drafts: draftResponse.pagination?.total ?? 0,
        archived: archivedResponse.pagination?.total ?? 0,
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load news articles. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  const showNotice = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3500);
  };

  const openCreateModal = () => {
    setEditingNews(null);
    setForm({
      ...initialForm,
      date: new Date().toLocaleDateString("en-CA"),
    });
    setImagePreview("");
    setExistingImage("");
    setIsModalOpen(true);
  };

  const openEditModal = (article) => {
    setEditingNews(article);
    setForm({
      title: article.title || "",
      date: getDateInputValue(article.date),
      content: article.content || "",
      coverImage: null,
    });

    setExistingImage(article.coverImage || "");
    setImagePreview("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingNews(null);
    setForm(initialForm);
    setImagePreview("");
    setExistingImage("");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must not exceed 5MB.");
      return;
    }

    setError("");

    setForm((previous) => ({
      ...previous,
      coverImage: file,
    }));

    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.content.trim() || !form.date) {
      setError("Please complete the title, date and article content.");
      return;
    }

    if (!editingNews && !form.coverImage) {
      setError("Please select a cover image for this news article.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        title: form.title.trim(),
        date: form.date,
        content: form.content.trim(),
        coverImage: form.coverImage,
      };

      if (editingNews) {
        await updateNews(editingNews._id, payload);
        showNotice("News article updated successfully.");
      } else {
        await createNews(payload);
        showNotice("News article created successfully as a draft.");
      }

      closeModal();
      await loadNews();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong while saving the news article."
      );
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async (article) => {
    const confirmed = window.confirm(
      `Are you sure you want to publish "${article.title}"?`
    );

    if (!confirmed) return;

    try {
      setActionLoading(article._id);
      setError("");

      await publishNews(article._id);
      showNotice("News article published successfully.");
      await loadNews();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to publish this news article."
      );
    } finally {
      setActionLoading("");
    }
  };

  const handleArchive = async (article) => {
    const confirmed = window.confirm(
      `Are you sure you want to archive "${article.title}"?`
    );

    if (!confirmed) return;

    try {
      setActionLoading(article._id);
      setError("");

      await archiveNews(article._id);
      showNotice("News article archived successfully.");
      await loadNews();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to archive this news article."
      );
    } finally {
      setActionLoading("");
    }
  };

  const statCards = [
    {
      label: "Total Articles",
      value: stats.total,
      icon: Newspaper,
      iconStyle: "bg-blue-50 text-[#056699]",
    },
    {
      label: "Published",
      value: stats.published,
      icon: Globe,
      iconStyle: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Drafts",
      value: stats.drafts,
      icon: FileText,
      iconStyle: "bg-amber-50 text-amber-600",
    },
    {
      label: "Archived",
      value: stats.archived,
      icon: Archive,
      iconStyle: "bg-gray-100 text-gray-600",
    },
  ];

  return (
    <div className="space-y-7 pb-10">
      {/* PAGE HEADER */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#056699]">
            <Newspaper size={17} />
            Content Management
          </div>

          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Manage News
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-gray-500">
            Create, edit and publish news articles and updates from FISDEV.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#056699] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#034d73]"
        >
          <Plus size={19} />
          Create News
        </button>
      </div>

      {/* FEEDBACK */}
      {error && !isModalOpen && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={19} className="mt-0.5 shrink-0" />
          <span>{error}</span>
          <button
            onClick={() => setError("")}
            className="ml-auto"
            aria-label="Dismiss error"
          >
            <X size={17} />
          </button>
        </div>
      )}

      {notice && (
        <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          <CheckCircle2 size={19} />
          {notice}
        </div>
      )}

      {/* STATISTICS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconStyle}`}
                >
                  <Icon size={23} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* NEWS LIST */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-5">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                News Articles
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Manage all news articles and their publication status.
              </p>
            </div>

            <button
              onClick={loadNews}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
            >
              <RefreshCw
                size={16}
                className={loading ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>

          <div className="mt-5 flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search news by title or content..."
                className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#056699] focus:ring-2 focus:ring-[#056699]/10"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-[#056699] md:w-48"
            >
              <option value="all">All statuses</option>
              <option value="draft">Drafts</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        {loading ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-gray-500">
            <Loader2 size={30} className="animate-spin text-[#056699]" />
            <p className="text-sm">Loading news articles...</p>
          </div>
        ) : news.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center px-5 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-[#056699]">
              <Newspaper size={30} />
            </div>

            <h3 className="text-lg font-semibold text-gray-800">
              No news articles found
            </h3>

            <p className="mt-2 max-w-md text-sm text-gray-500">
              {search || statusFilter !== "all"
                ? "Try changing your search or status filter."
                : "You haven't created any news articles yet. Create your first article to get started."}
            </p>

            {!search && statusFilter === "all" && (
              <button
                onClick={openCreateModal}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#056699] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#034d73]"
              >
                <Plus size={17} />
                Create your first article
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Article</th>
                    <th className="px-5 py-4 font-semibold">News Date</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 font-semibold">Last Updated</th>
                    <th className="px-5 py-4 text-right font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {news.map((article) => (
                    <tr
                      key={article._id}
                      className="transition hover:bg-gray-50/70"
                    >
                      <td className="px-5 py-4">
                        <div className="flex min-w-0 items-center gap-3">
                          {article.coverImage ? (
                            <img
                              src={article.coverImage}
                              alt={article.title}
                              className="h-14 w-20 shrink-0 rounded-lg border border-gray-200 object-cover"
                            />
                          ) : (
                            <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                              <ImageIcon size={22} />
                            </div>
                          )}

                          <div className="min-w-0">
                            <p className="max-w-sm truncate text-sm font-semibold text-gray-800">
                              {article.title}
                            </p>
                            <p className="mt-1 max-w-sm truncate text-xs text-gray-500">
                              {article.content}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                        <span className="inline-flex items-center gap-2">
                          <CalendarDays
                            size={15}
                            className="text-gray-400"
                          />
                          {formatDate(article.date)}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={article.status} />
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                        {formatDate(article.updatedAt || article.createdAt)}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setViewingNews(article)}
                            title="View article"
                            className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#056699]"
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            onClick={() => openEditModal(article)}
                            title="Edit article"
                            className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700"
                          >
                            <Pencil size={16} />
                          </button>

                          {article.status !== "published" &&
                            article.status !== "archived" && (
                              <button
                                onClick={() => handlePublish(article)}
                                disabled={actionLoading === article._id}
                                title="Publish article"
                                className="rounded-lg border border-emerald-200 p-2 text-emerald-600 transition hover:bg-emerald-50 disabled:opacity-50"
                              >
                                {actionLoading === article._id ? (
                                  <Loader2
                                    size={16}
                                    className="animate-spin"
                                  />
                                ) : (
                                  <Send size={16} />
                                )}
                              </button>
                            )}

                          {article.status !== "archived" && (
                            <button
                              onClick={() => handleArchive(article)}
                              disabled={actionLoading === article._id}
                              title="Archive article"
                              className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                            >
                              <Archive size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
              Showing {news.length} article{news.length === 1 ? "" : "s"}
            </div>
          </>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-auto w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {editingNews ? "Edit News Article" : "Create News Article"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {editingNews
                    ? "Update the article information below."
                    : "Add a new news article to the FISDEV website."}
                </p>
              </div>

              <button
                onClick={closeModal}
                disabled={saving}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="max-h-[70vh] space-y-5 overflow-y-auto p-6">
                {error && (
                  <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    <AlertCircle size={17} className="mt-0.5 shrink-0" />
                    {error}
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    News Title <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleInputChange}
                    placeholder="Enter the news headline"
                    maxLength={200}
                    required
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#056699] focus:ring-2 focus:ring-[#056699]/10"
                  />
                  <p className="mt-1 text-right text-xs text-gray-400">
                    {form.title.length}/200 characters
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    News Date <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#056699] focus:ring-2 focus:ring-[#056699]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Cover Image <span className="text-red-500">*</span>
                  </label>

                  <div className="rounded-xl border-2 border-dashed border-gray-200 p-4 transition hover:border-[#1BB7C4]">
                    {imagePreview || existingImage ? (
                      <div className="space-y-3">
                        <img
                          src={imagePreview || existingImage}
                          alt="News cover preview"
                          className="max-h-64 w-full rounded-lg object-cover"
                        />

                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50">
                          <Upload size={16} />
                          Change Image
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                    ) : (
                      <label className="flex cursor-pointer flex-col items-center justify-center py-8 text-center">
                        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-[#056699]">
                          <ImageIcon size={26} />
                        </div>

                        <p className="text-sm font-semibold text-gray-700">
                          Click to upload a cover image
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          PNG, JPG or WEBP · Maximum 5MB
                        </p>

                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    News Content <span className="text-red-500">*</span>
                  </label>

                  <textarea
                    name="content"
                    value={form.content}
                    onChange={handleInputChange}
                    placeholder="Write the full news article here..."
                    rows={9}
                    required
                    className="w-full resize-y rounded-lg border border-gray-200 px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#056699] focus:ring-2 focus:ring-[#056699]/10"
                  />

                  <p className="mt-1 text-xs text-gray-400">
                    Enter the full article content that will appear on the
                    public website.
                  </p>
                </div>

                {!editingNews && (
                  <div className="flex items-start gap-3 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
                    <FileText size={19} className="mt-0.5 shrink-0" />
                    <p>
                      New articles are saved as drafts. You can review and
                      publish them when they are ready.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#056699] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#034d73] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={17} />
                      {editingNews ? "Save Changes" : "Create Draft"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW ARTICLE MODAL */}
      {viewingNews && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-auto w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-bold text-gray-900">
                News Article Preview
              </h2>

              <button
                onClick={() => setViewingNews(null)}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={21} />
              </button>
            </div>

            <div className="max-h-[75vh] space-y-5 overflow-y-auto p-6">
              {viewingNews.coverImage && (
                <img
                  src={viewingNews.coverImage}
                  alt={viewingNews.title}
                  className="max-h-80 w-full rounded-xl object-cover"
                />
              )}

              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status={viewingNews.status} />

                <span className="inline-flex items-center gap-2 text-sm text-gray-500">
                  <CalendarDays size={16} />
                  {formatDate(viewingNews.date)}
                </span>
              </div>

              <h1 className="text-2xl font-bold leading-tight text-gray-900">
                {viewingNews.title}
              </h1>

              <div className="whitespace-pre-wrap text-sm leading-7 text-gray-600">
                {viewingNews.content}
              </div>

              <div className="border-t border-gray-100 pt-4 text-xs text-gray-400">
                Created {formatDate(viewingNews.createdAt)}
                {viewingNews.updatedAt &&
                  ` · Updated ${formatDate(viewingNews.updatedAt)}`}
              </div>
            </div>

            <div className="flex justify-end border-t border-gray-200 bg-gray-50 px-6 py-4">
              <button
                onClick={() => {
                  const article = viewingNews;
                  setViewingNews(null);
                  openEditModal(article);
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-[#056699] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#034d73]"
              >
                <Pencil size={16} />
                Edit Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
