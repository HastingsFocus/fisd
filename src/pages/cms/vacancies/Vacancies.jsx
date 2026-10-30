
import { useEffect, useMemo, useState } from "react";
import {
  Archive,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Edit3,
  Eye,
  FilePlus2,
  FileText,
  Loader2,
  Plus,
  Search,
  Send,
  X,
} from "lucide-react";

import {
  createVacancy,
  getVacancies,
  updateVacancy,
  publishVacancy,
  archiveVacancy,
} from "../../../services/vacancyService";

const emptyForm = {
  title: "",
  organisationalUnit: "",
  reportingTo: "",
  closingDate: "",
  introduction: "",
  overallObjective: "",
  mainResponsibilities: "",
  educationAndExperience: "",
  attributesAndCompetencies: "",
  additionalInformation: "",
  howToApply: {
    instructions: "",
    applicationEmail: "",
    applicationAddress: "",
    onlineApplicationUrl: "",
    requiredDocuments: "",
    additionalNotes: "",
  },
};

const getVacancyList = (response) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.data?.vacancies)) {
    return response.data.vacancies;
  }
  if (Array.isArray(response?.vacancies)) {
    return response.vacancies;
  }
  return [];
};

const getVacancyObject = (response) => {
  return response?.data?.vacancy || response?.data || response?.vacancy || response;
};

const toDateInput = (date) => {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "";

  return parsedDate.toISOString().split("T")[0];
};

const formatDate = (date) => {
  if (!date) return "Not specified";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const splitLines = (value) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

const getFormData = (vacancy) => ({
  title: vacancy.title || "",
  organisationalUnit: vacancy.organisationalUnit || "",
  reportingTo: vacancy.reportingTo || "",
  closingDate: toDateInput(vacancy.closingDate),
  introduction: vacancy.introduction || "",
  overallObjective: vacancy.overallObjective || "",
  mainResponsibilities: (vacancy.mainResponsibilities || []).join("\n"),
  educationAndExperience: vacancy.educationAndExperience || "",
  attributesAndCompetencies: (
    vacancy.attributesAndCompetencies || []
  ).join("\n"),
  additionalInformation: vacancy.additionalInformation || "",
  howToApply: {
    instructions: vacancy.howToApply?.instructions || "",
    applicationEmail: vacancy.howToApply?.applicationEmail || "",
    applicationAddress: vacancy.howToApply?.applicationAddress || "",
    onlineApplicationUrl: vacancy.howToApply?.onlineApplicationUrl || "",
    requiredDocuments: (
      vacancy.howToApply?.requiredDocuments || []
    ).join("\n"),
    additionalNotes: vacancy.howToApply?.additionalNotes || "",
  },
});

const preparePayload = (form) => ({
  title: form.title.trim(),
  organisationalUnit: form.organisationalUnit.trim(),
  reportingTo: form.reportingTo.trim(),
  closingDate: form.closingDate,
  introduction: form.introduction.trim(),
  overallObjective: form.overallObjective.trim(),
  mainResponsibilities: splitLines(form.mainResponsibilities),
  educationAndExperience: form.educationAndExperience.trim(),
  attributesAndCompetencies: splitLines(
    form.attributesAndCompetencies
  ),
  additionalInformation: form.additionalInformation.trim(),
  howToApply: {
    instructions: form.howToApply.instructions.trim(),
    applicationEmail: form.howToApply.applicationEmail.trim(),
    applicationAddress: form.howToApply.applicationAddress.trim(),
    onlineApplicationUrl: form.howToApply.onlineApplicationUrl.trim(),
    requiredDocuments: splitLines(
      form.howToApply.requiredDocuments
    ),
    additionalNotes: form.howToApply.additionalNotes.trim(),
  },
});

const statusStyles = {
  published: "bg-green-100 text-green-700",
  draft: "bg-amber-100 text-amber-700",
  archived: "bg-slate-200 text-slate-700",
};

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
      statusStyles[status] || "bg-slate-100 text-slate-600"
    }`}
  >
    {status || "Unknown"}
  </span>
);

const StatCard = ({ title, value, icon: Icon, description }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </div>

      <div className="rounded-xl bg-sky-50 p-3 text-[#056699]">
        <Icon size={23} />
      </div>
    </div>
  </div>
);

const FormSection = ({ title, description, children }) => (
  <section className="space-y-4 border-b border-slate-200 pb-6">
    <div>
      <h3 className="text-base font-bold text-slate-900">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      )}
    </div>

    <div className="space-y-4">{children}</div>
  </section>
);

const Field = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  readOnly = false,
  rows,
  help,
}) => (
  <div>
    <label className="mb-2 block text-sm font-semibold text-slate-700">
      {label}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>

    {rows ? (
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        readOnly={readOnly}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#056699] focus:ring-2 focus:ring-sky-100 read-only:bg-slate-50"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        readOnly={readOnly}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#056699] focus:ring-2 focus:ring-sky-100 read-only:bg-slate-50"
      />
    )}

    {help && <p className="mt-1.5 text-xs text-slate-500">{help}</p>}
  </div>
);

const Vacancies = () => {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [actionId, setActionId] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchVacancies = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getVacancies({ limit: 1000 });
      setVacancies(getVacancyList(response));
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load vacancies. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, []);

  const stats = useMemo(
    () => ({
      total: vacancies.length,
      published: vacancies.filter((item) => item.status === "published").length,
      drafts: vacancies.filter((item) => item.status === "draft").length,
      archived: vacancies.filter((item) => item.status === "archived").length,
    }),
    [vacancies]
  );

  const filteredVacancies = useMemo(() => {
    const query = search.trim().toLowerCase();

    return vacancies.filter((vacancy) => {
      const matchesSearch =
        !query ||
        vacancy.title?.toLowerCase().includes(query) ||
        vacancy.organisationalUnit?.toLowerCase().includes(query) ||
        vacancy.reportingTo?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" || vacancy.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [vacancies, search, statusFilter]);

  const openCreateModal = () => {
    setModalMode("create");
    setSelectedVacancy(null);
    setForm(emptyForm);
    setError("");
    setModalOpen(true);
  };

  const openEditModal = (vacancy) => {
    setModalMode("edit");
    setSelectedVacancy(vacancy);
    setForm(getFormData(vacancy));
    setError("");
    setModalOpen(true);
  };

  const openViewModal = (vacancy) => {
    setModalMode("view");
    setSelectedVacancy(vacancy);
    setForm(getFormData(vacancy));
    setError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;

    setModalOpen(false);
    setSelectedVacancy(null);
    setForm(emptyForm);
    setError("");
  };

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const updateHowToApply = (field, value) => {
    setForm((previous) => ({
      ...previous,
      howToApply: {
        ...previous.howToApply,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = preparePayload(form);

      if (modalMode === "edit" && selectedVacancy?._id) {
        await updateVacancy(selectedVacancy._id, payload);
        setSuccess("Vacancy updated successfully.");
      } else {
        await createVacancy(payload);
        setSuccess("Vacancy created successfully as a draft.");
      }

      setModalOpen(false);
      setSelectedVacancy(null);
      setForm(emptyForm);
      await fetchVacancies();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to save vacancy. Please check your information."
      );
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async (vacancy) => {
    if (
      !window.confirm(
        `Are you sure you want to publish "${vacancy.title}"? It will become visible on the public website.`
      )
    ) {
      return;
    }

    try {
      setActionId(vacancy._id);
      setError("");
      setSuccess("");

      await publishVacancy(vacancy._id);

      setSuccess("Vacancy published successfully.");
      await fetchVacancies();
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to publish this vacancy."
      );
    } finally {
      setActionId(null);
    }
  };

  const handleArchive = async (vacancy) => {
    if (
      !window.confirm(
        `Are you sure you want to archive "${vacancy.title}"?`
      )
    ) {
      return;
    }

    try {
      setActionId(vacancy._id);
      setError("");
      setSuccess("");

      await archiveVacancy(vacancy._id);

      setSuccess("Vacancy archived successfully.");
      await fetchVacancies();
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to archive this vacancy."
      );
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="space-y-7">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <BriefcaseBusiness size={16} />
            <span>CMS / Vacancies</span>
          </div>

          <h1 className="mt-2 text-2xl font-bold text-slate-900">
            Manage Vacancies
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create, update, publish and manage FISDEV job opportunities.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#056699] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#034f77]"
        >
          <Plus size={18} />
          Create Vacancy
        </button>
      </div>

      {/* Notifications */}
      {error && !modalOpen && (
        <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <X size={18} className="mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      {success && (
        <div className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
          {success}
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Vacancies"
          value={stats.total}
          icon={BriefcaseBusiness}
          description="All vacancy records"
        />

        <StatCard
          title="Published"
          value={stats.published}
          icon={CheckCircle2}
          description="Visible on the website"
        />

        <StatCard
          title="Drafts"
          value={stats.drafts}
          icon={Clock3}
          description="Not yet published"
        />

        <StatCard
          title="Archived"
          value={stats.archived}
          icon={Archive}
          description="No longer active"
        />
      </div>

      {/* Vacancy list */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-bold text-slate-900">All Vacancies</h2>
            <p className="mt-1 text-sm text-slate-500">
              View and manage your vacancy advertisements.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search vacancies..."
                className="w-full rounded-lg border border-slate-300 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#056699] sm:w-64"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#056699]"
            >
              <option value="all">All statuses</option>
              <option value="draft">Drafts</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-64 items-center justify-center gap-3 text-sm text-slate-500">
            <Loader2 className="animate-spin" size={21} />
            Loading vacancies...
          </div>
        ) : filteredVacancies.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-5 text-center">
            <div className="rounded-full bg-sky-50 p-4 text-[#056699]">
              <FileText size={28} />
            </div>

            <h3 className="mt-4 font-bold text-slate-800">
              No vacancies found
            </h3>

            <p className="mt-1 max-w-sm text-sm text-slate-500">
              {search || statusFilter !== "all"
                ? "Try changing your search or status filter."
                : "You have not created any vacancies yet. Start by creating your first vacancy."}
            </p>

            {!search && statusFilter === "all" && (
              <button
                onClick={openCreateModal}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#056699] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#034f77]"
              >
                <Plus size={17} />
                Create your first vacancy
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Vacancy</th>
                    <th className="px-5 py-4 font-semibold">Closing Date</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 text-right font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredVacancies.map((vacancy) => (
                    <tr
                      key={vacancy._id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-800">
                          {vacancy.title}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {vacancy.organisationalUnit || "No unit specified"}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        <span className="inline-flex items-center gap-2">
                          <CalendarDays size={15} />
                          {formatDate(vacancy.closingDate)}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={vacancy.status} />
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            title="View vacancy"
                            onClick={() => openViewModal(vacancy)}
                            className="rounded-lg p-2 text-slate-500 hover:bg-sky-50 hover:text-[#056699]"
                          >
                            <Eye size={17} />
                          </button>

                          <button
                            title="Edit vacancy"
                            onClick={() => openEditModal(vacancy)}
                            className="rounded-lg p-2 text-slate-500 hover:bg-amber-50 hover:text-amber-600"
                          >
                            <Edit3 size={17} />
                          </button>

                          {vacancy.status !== "published" &&
                            vacancy.status !== "archived" && (
                              <button
                                title="Publish vacancy"
                                disabled={actionId === vacancy._id}
                                onClick={() => handlePublish(vacancy)}
                                className="rounded-lg p-2 text-green-600 hover:bg-green-50 disabled:opacity-50"
                              >
                                {actionId === vacancy._id ? (
                                  <Loader2 size={17} className="animate-spin" />
                                ) : (
                                  <Send size={17} />
                                )}
                              </button>
                            )}

                          {vacancy.status !== "archived" && (
                            <button
                              title="Archive vacancy"
                              disabled={actionId === vacancy._id}
                              onClick={() => handleArchive(vacancy)}
                              className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                            >
                              <Archive size={17} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="divide-y divide-slate-100 md:hidden">
              {filteredVacancies.map((vacancy) => (
                <div key={vacancy._id} className="space-y-4 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {vacancy.title}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {vacancy.organisationalUnit || "No unit specified"}
                      </p>
                    </div>

                    <StatusBadge status={vacancy.status} />
                  </div>

                  <p className="flex items-center gap-2 text-xs text-slate-500">
                    <CalendarDays size={15} />
                    Closes: {formatDate(vacancy.closingDate)}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => openViewModal(vacancy)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600"
                    >
                      <Eye size={14} /> View
                    </button>

                    <button
                      onClick={() => openEditModal(vacancy)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600"
                    >
                      <Edit3 size={14} /> Edit
                    </button>

                    {vacancy.status !== "published" &&
                      vacancy.status !== "archived" && (
                        <button
                          onClick={() => handlePublish(vacancy)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-green-200 px-3 py-2 text-xs font-semibold text-green-700"
                        >
                          <Send size={14} /> Publish
                        </button>
                      )}

                    {vacancy.status !== "archived" && (
                      <button
                        onClick={() => handleArchive(vacancy)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600"
                      >
                        <Archive size={14} /> Archive
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {!loading && filteredVacancies.length > 0 && (
          <div className="border-t border-slate-200 bg-slate-50 px-5 py-3 text-xs text-slate-500">
            Showing {filteredVacancies.length} of {vacancies.length} vacancies
          </div>
        )}
      </div>

      {/* Create / Edit / View modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-3 sm:p-6">
          <div className="flex max-h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-7">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {modalMode === "create"
                    ? "Create Vacancy"
                    : modalMode === "edit"
                      ? "Edit Vacancy"
                      : "Vacancy Details"}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {modalMode === "view"
                    ? "Review the complete vacancy advertisement."
                    : "Complete the information below to manage this vacancy."}
                </p>
              </div>

              <button
                onClick={closeModal}
                disabled={saving}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={21} />
              </button>
            </div>

            {error && (
              <div className="mx-5 mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 sm:mx-7">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="flex-1 space-y-7 overflow-y-auto p-5 sm:p-7">
                <FormSection
                  title="Vacancy Information"
                  description="Basic information about the position."
                >
                  <Field
                    label="Job Title"
                    value={form.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    placeholder="e.g. Insurance Officer Grade D3"
                    required
                    readOnly={modalMode === "view"}
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Organisational Unit"
                      value={form.organisationalUnit}
                      onChange={(e) =>
                        updateField("organisationalUnit", e.target.value)
                      }
                      placeholder="e.g. Executive Director Corporate Services"
                      readOnly={modalMode === "view"}
                    />

                    <Field
                      label="Reporting To"
                      value={form.reportingTo}
                      onChange={(e) =>
                        updateField("reportingTo", e.target.value)
                      }
                      placeholder="e.g. Insurance Manager"
                      readOnly={modalMode === "view"}
                    />
                  </div>

                  <Field
                    label="Closing Date"
                    type="date"
                    value={form.closingDate}
                    onChange={(e) =>
                      updateField("closingDate", e.target.value)
                    }
                    required
                    readOnly={modalMode === "view"}
                  />

                  <Field
                    label="Introduction"
                    value={form.introduction}
                    onChange={(e) =>
                      updateField("introduction", e.target.value)
                    }
                    placeholder="Introduce the organisation and the vacancy..."
                    rows={4}
                    required
                    readOnly={modalMode === "view"}
                  />

                  <Field
                    label="Overall Objective"
                    value={form.overallObjective}
                    onChange={(e) =>
                      updateField("overallObjective", e.target.value)
                    }
                    placeholder="Describe the main objective of this position..."
                    rows={4}
                    required
                    readOnly={modalMode === "view"}
                  />
                </FormSection>

                <FormSection
                  title="Main Responsibilities"
                  description="Enter each responsibility on a separate line. Each line becomes a bullet on the public vacancy page."
                >
                  <Field
                    label="Responsibilities"
                    value={form.mainResponsibilities}
                    onChange={(e) =>
                      updateField("mainResponsibilities", e.target.value)
                    }
                    placeholder={"Develop and implement plans...\nPrepare reports...\nMonitor and evaluate activities..."}
                    rows={7}
                    required
                    readOnly={modalMode === "view"}
                    help="Enter one responsibility per line."
                  />
                </FormSection>

                <FormSection
                  title="Education and Experience"
                  description="Specify the required qualifications and experience."
                >
                  <Field
                    label="Education and Experience Requirements"
                    value={form.educationAndExperience}
                    onChange={(e) =>
                      updateField("educationAndExperience", e.target.value)
                    }
                    placeholder="Bachelor's Degree in a relevant field and at least five years of relevant experience..."
                    rows={4}
                    required
                    readOnly={modalMode === "view"}
                  />
                </FormSection>

                <FormSection
                  title="Attributes and Competencies"
                  description="Enter each required attribute or competency on a separate line."
                >
                  <Field
                    label="Attributes and Competencies"
                    value={form.attributesAndCompetencies}
                    onChange={(e) =>
                      updateField("attributesAndCompetencies", e.target.value)
                    }
                    placeholder={"Excellent communication skills\nTeamwork and collaboration\nPlanning and organising"}
                    rows={6}
                    required
                    readOnly={modalMode === "view"}
                    help="Enter one competency per line."
                  />
                </FormSection>

                <FormSection
                  title="Additional Information"
                  description="Optional information or notices about the vacancy."
                >
                  <Field
                    label="Additional Information"
                    value={form.additionalInformation}
                    onChange={(e) =>
                      updateField("additionalInformation", e.target.value)
                    }
                    placeholder="Include integrity vetting notices, important conditions or other information..."
                    rows={4}
                    readOnly={modalMode === "view"}
                  />
                </FormSection>

                <FormSection
                  title="How to Apply"
                  description="Provide clear instructions on how candidates should submit their applications."
                >
                  <Field
                    label="Application Instructions"
                    value={form.howToApply.instructions}
                    onChange={(e) =>
                      updateHowToApply("instructions", e.target.value)
                    }
                    placeholder="Interested candidates should submit their applications using the details below..."
                    rows={4}
                    required
                    readOnly={modalMode === "view"}
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Application Email"
                      type="email"
                      value={form.howToApply.applicationEmail}
                      onChange={(e) =>
                        updateHowToApply("applicationEmail", e.target.value)
                      }
                      placeholder="recruitment@example.org"
                      readOnly={modalMode === "view"}
                    />

                    <Field
                      label="Online Application URL"
                      type="url"
                      value={form.howToApply.onlineApplicationUrl}
                      onChange={(e) =>
                        updateHowToApply(
                          "onlineApplicationUrl",
                          e.target.value
                        )
                      }
                      placeholder="https://example.org/apply"
                      readOnly={modalMode === "view"}
                    />
                  </div>

                  <Field
                    label="Physical Application Address"
                    value={form.howToApply.applicationAddress}
                    onChange={(e) =>
                      updateHowToApply("applicationAddress", e.target.value)
                    }
                    placeholder="Enter the postal or physical address..."
                    rows={3}
                    readOnly={modalMode === "view"}
                  />

                  <Field
                    label="Required Documents"
                    value={form.howToApply.requiredDocuments}
                    onChange={(e) =>
                      updateHowToApply("requiredDocuments", e.target.value)
                    }
                    placeholder={"Updated CV\nCover letter\nCopies of certificates"}
                    rows={4}
                    readOnly={modalMode === "view"}
                    help="Enter each required document on a separate line."
                  />

                  <Field
                    label="Additional Application Notes"
                    value={form.howToApply.additionalNotes}
                    onChange={(e) =>
                      updateHowToApply("additionalNotes", e.target.value)
                    }
                    placeholder="Add any other application requirements or instructions..."
                    rows={3}
                    readOnly={modalMode === "view"}
                  />
                </FormSection>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                >
                  {modalMode === "view" ? "Close" : "Cancel"}
                </button>

                {modalMode !== "view" && (
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#056699] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#034f77] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ? (
                      <>
                        <Loader2 size={17} className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        {modalMode === "create" ? (
                          <FilePlus2 size={17} />
                        ) : (
                          <Edit3 size={17} />
                        )}
                        {modalMode === "create"
                          ? "Save as Draft"
                          : "Save Changes"}
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vacancies;
