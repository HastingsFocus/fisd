
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, AlertCircle, LoaderCircle } from "lucide-react";
import { verifyEmail } from "../../../services/authService";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Verifying your email address...");

  useEffect(() => {
    let active = true;

    const verify = async () => {
      if (!token) {
        setStatus("error");
        setMessage("The verification link is missing its token.");
        return;
      }

      try {
        const response = await verifyEmail(token);

        if (active) {
          setStatus("success");
          setMessage(response.message);
        }
      } catch (error) {
        if (active) {
          setStatus("error");
          setMessage(
            error.response?.data?.message ||
            "Email verification failed. Please try again."
          );
        }
      }
    };

    verify();

    return () => {
      active = false;
    };
  }, [token]);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-xl shadow-blue-900/5 sm:p-10">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
        {status === "loading" && (
          <LoaderCircle className="animate-spin text-[#056699]" size={32} />
        )}
        {status === "success" && (
          <CheckCircle2 className="text-green-600" size={32} />
        )}
        {status === "error" && (
          <AlertCircle className="text-red-500" size={32} />
        )}
      </div>

      <h2 className="text-2xl font-bold text-[#056699]">
        {status === "loading"
          ? "Verifying Email"
          : status === "success"
            ? "Email Verified!"
            : "Verification Failed"}
      </h2>

      <p className="mt-3 text-sm leading-6 text-gray-500">
        {message}
      </p>

      {status !== "loading" && (
        <Link
          to="/cms/login"
          className="mt-7 inline-flex rounded-xl bg-[#056699] px-7 py-3 font-semibold text-white transition hover:bg-[#04547c]"
        >
          Continue to Login
        </Link>
      )}
    </div>
  );
};

export default VerifyEmail;
