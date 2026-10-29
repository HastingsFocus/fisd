
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Send } from "lucide-react";
import { forgotPassword } from "../../../services/authService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);
      const response = await forgotPassword(email.trim().toLowerCase());
      setSuccess(response.message);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to process your request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-xl shadow-blue-900/5 sm:p-9">
      <div className="mb-7 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e6f6f8]">
          <Mail className="text-[#056699]" size={27} />
        </div>

        <h2 className="text-2xl font-bold text-[#056699]">
          Forgot Password?
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          Enter your registered email address and we'll send you instructions to reset your password.
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-5 rounded-lg bg-green-50 p-3 text-sm leading-6 text-green-700">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Email Address
          </label>

          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-gray-800 outline-none focus:border-[#1BB7C4] focus:ring-2 focus:ring-[#1BB7C4]/20"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#056699] py-3.5 font-semibold text-white transition hover:bg-[#04547c] disabled:opacity-60"
        >
          <Send size={17} />
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <Link
        to="/cms/login"
        className="mt-7 flex items-center justify-center gap-2 text-sm font-semibold text-[#056699] hover:text-[#1BB7C4]"
      >
        <ArrowLeft size={16} />
        Back to Login
      </Link>
    </div>
  );
};

export default ForgotPassword;
