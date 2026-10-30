import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  Building2,
  UserRound,
  GraduationCap,
  ClipboardList,
  CheckCircle2,
  Mail,
  Globe,
  MapPin,
  FileText,
  AlertCircle,
} from "lucide-react";
import { getPublishedVacancyById } from "../../services/vacancyService";

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

const getVacancyObject = (response) =>
  response?.vacancy ||
  response?.data?.vacancy ||
  response?.data ||
  response;

const DetailSection = ({ title, icon: Icon, children }) => (
  <section className="border-b border-gray-100 py-8 last:border-b-0">
    <div className="mb-5 flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#056699]/10 text-[#056699]">
        <Icon size={20} />
      </div>

      <h2 className="text-xl font-bold text-[#056699] sm:text-2xl">
        {title}
      </h2>
    </div>

    <div className="pl-0 sm:pl-[52px]">{children}</div>
  </section>
);

const VacancyDetails = () => {
  const { id } = useParams();

  const [vacancy, setVacancy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getPublishedVacancyById(id);
        const result = getVacancyObject(response);

        if (!result?._id) {
          throw new Error("This vacancy could not be found.");
        }

        setVacancy(result);
      } catch (err) {
        console.error("Failed to fetch vacancy:", err);

        setError(
          err.response?.data?.message ||
            err.message ||
            "Unable to load this vacancy. It may have been removed or is no longer available."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVacancy();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[rgb(245,249,252)] px-5 py-20">
        <div className="mx-auto max-w-4xl animate-pulse rounded-2xl bg-white p-8 shadow-sm">
          <div className="mb-5 h-8 w-3/4 rounded bg-gray-200" />
          <div className="mb-3 h-4 w-full rounded bg-gray-100" />
          <div className="h-4 w-2/3 rounded bg-gray-100" />
          <div className="mt-12 h-40 rounded bg-gray-100" />
        </div>
      </main>
    );
  }

  if (error || !vacancy) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[rgb(245,249,252)] px-5 py-20">
        <div className="max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <AlertCircle className="mx-auto text-red-500" size={42} />

          <h1 className="mt-5 text-2xl font-bold text-[#056699]">
            Vacancy Not Available
          </h1>

          <p className="mt-3 leading-7 text-gray-600">
            {error || "We couldn't find the vacancy you are looking for."}
          </p>

          <Link
            to="/latest/vacancies"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#056699] px-5 py-3 font-semibold text-white transition hover:bg-[#034f70]"
          >
            <ArrowLeft size={18} />
            Back to Vacancies
          </Link>
        </div>
      </main>
    );
  }

  const responsibilities = vacancy.mainResponsibilities || [];
  const competencies = vacancy.attributesAndCompetencies || [];
  const requiredDocuments = vacancy.howToApply?.requiredDocuments || [];

  return (
    <main className="min-h-screen bg-[rgb(245,249,252)]">
      {/* Vacancy header */}
      <section className="relative overflow-hidden bg-[rgb(3,75,113)] px-5 py-16 text-white sm:px-8 lg:py-20">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#1BB7C4]/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl">
          <Link
            to="/latest/vacancies"
            className="mb-9 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition hover:text-[#1BB7C4]"
          >
            <ArrowLeft size={17} />
            Back to all vacancies
          </Link>

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium">
            <BriefcaseBusiness size={16} />
            Career Opportunity
          </div>

          <h1 className="max-w-4xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {vacancy.title}
          </h1>

          {(vacancy.organisationalUnit ||
  vacancy.organisationUnit ||
  vacancy.organizationalUnit) && (
  <p className="mt-5 flex items-center gap-2 text-white/80">
    <Building2 size={18} />
    {vacancy.organisationalUnit ||
      vacancy.organisationUnit ||
      vacancy.organizationalUnit}
  </p>
)}

          <div className="mt-7 flex flex-wrap gap-5 text-sm text-white/80">
            <span className="flex items-center gap-2">
              <CalendarDays size={17} className="text-[#1BB7C4]" />
              Closing Date: {formatDate(vacancy.closingDate)}
            </span>

            {vacancy.reportingTo && (
              <span className="flex items-center gap-2">
                <UserRound size={17} className="text-[#1BB7C4]" />
                Reports to: {vacancy.reportingTo}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Vacancy content */}
      <section className="px-5 py-12 sm:px-8 lg:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-gray-200/80 bg-white px-6 py-8 shadow-sm sm:px-10 sm:py-10">

            {vacancy.introduction && (
              <DetailSection title="About the Opportunity" icon={BriefcaseBusiness}>
                <p className="whitespace-pre-line leading-8 text-gray-600">
                  {vacancy.introduction}
                </p>
              </DetailSection>
            )}

            {vacancy.overallObjective && (
              <DetailSection title="Overall Objective" icon={ClipboardList}>
                <p className="whitespace-pre-line leading-8 text-gray-600">
                  {vacancy.overallObjective}
                </p>
              </DetailSection>
            )}

            {responsibilities.length > 0 && (
              <DetailSection title="Main Responsibilities" icon={CheckCircle2}>
                <ul className="space-y-3">
                  {responsibilities.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 leading-7 text-gray-600"
                    >
                      <CheckCircle2
                        size={18}
                        className="mt-1 shrink-0 text-[#1BB7C4]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </DetailSection>
            )}

            {vacancy.educationAndExperience && (
              <DetailSection title="Education and Experience" icon={GraduationCap}>
                <p className="whitespace-pre-line leading-8 text-gray-600">
                  {vacancy.educationAndExperience}
                </p>
              </DetailSection>
            )}

            {competencies.length > 0 && (
              <DetailSection title="Attributes and Competencies" icon={UserRound}>
                <ul className="space-y-3">
                  {competencies.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 leading-7 text-gray-600"
                    >
                      <CheckCircle2
                        size={18}
                        className="mt-1 shrink-0 text-[#1BB7C4]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </DetailSection>
            )}

            {vacancy.additionalInformation && (
              <DetailSection title="Additional Information" icon={FileText}>
                <p className="whitespace-pre-line leading-8 text-gray-600">
                  {vacancy.additionalInformation}
                </p>
              </DetailSection>
            )}

            {/* How to Apply */}
            <DetailSection title="How to Apply" icon={Mail}>
              {vacancy.howToApply?.instructions && (
                <p className="whitespace-pre-line leading-8 text-gray-600">
                  {vacancy.howToApply.instructions}
                </p>
              )}

              {requiredDocuments.length > 0 && (
                <div className="mt-6">
                  <h3 className="mb-3 font-semibold text-[#056699]">
                    Required Documents
                  </h3>

                  <ul className="space-y-2">
                    {requiredDocuments.map((document, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-gray-600"
                      >
                        <FileText
                          size={17}
                          className="mt-1 shrink-0 text-[#1BB7C4]"
                        />
                        <span>{document}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {vacancy.howToApply?.applicationEmail && (
                <div className="mt-6 flex items-start gap-3 text-gray-600">
                  <Mail size={18} className="mt-1 shrink-0 text-[#1BB7C4]" />
                  <div>
                    <p className="font-semibold text-[#056699]">
                      Application Email
                    </p>
                    <a
                      href={`mailto:${vacancy.howToApply.applicationEmail}`}
                      className="break-all text-[#056699] hover:underline"
                    >
                      {vacancy.howToApply.applicationEmail}
                    </a>
                  </div>
                </div>
              )}

              {vacancy.howToApply?.onlineApplicationUrl && (
                <div className="mt-6 flex items-start gap-3 text-gray-600">
                  <Globe size={18} className="mt-1 shrink-0 text-[#1BB7C4]" />
                  <div>
                    <p className="font-semibold text-[#056699]">
                      Online Application
                    </p>
                    <a
                      href={vacancy.howToApply.onlineApplicationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="break-all text-[#056699] hover:underline"
                    >
                      Apply Online
                    </a>
                  </div>
                </div>
              )}

              {vacancy.howToApply?.applicationAddress && (
                <div className="mt-6 flex items-start gap-3 text-gray-600">
                  <MapPin size={18} className="mt-1 shrink-0 text-[#1BB7C4]" />
                  <div>
                    <p className="font-semibold text-[#056699]">
                      Application Address
                    </p>
                    <p className="whitespace-pre-line leading-7">
                      {vacancy.howToApply.applicationAddress}
                    </p>
                  </div>
                </div>
              )}

              {vacancy.howToApply?.additionalNotes && (
                <div className="mt-6 rounded-xl bg-[#1BB7C4]/10 p-5">
                  <p className="font-semibold text-[#056699]">
                    Important Note
                  </p>
                  <p className="mt-2 whitespace-pre-line leading-7 text-gray-600">
                    {vacancy.howToApply.additionalNotes}
                  </p>
                </div>
              )}
            </DetailSection>

            {/* Closing date reminder */}
            <div className="mt-8 rounded-xl border border-[#1BB7C4]/30 bg-[#1BB7C4]/10 p-5">
              <div className="flex items-start gap-3">
                <CalendarDays
                  size={21}
                  className="mt-1 shrink-0 text-[#056699]"
                />

                <div>
                  <p className="font-bold text-[#056699]">
                    Application Closing Date
                  </p>

                  <p className="mt-1 text-gray-600">
                    {formatDate(vacancy.closingDate)}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Please ensure that your application is submitted before
                    the stated closing date.
                  </p>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-8 text-center">
            <Link
              to="/latest/vacancies"
              className="inline-flex items-center gap-2 font-semibold text-[#056699] transition hover:text-[#1BB7C4]"
            >
              <ArrowLeft size={18} />
              View All Vacancies
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default VacancyDetails;