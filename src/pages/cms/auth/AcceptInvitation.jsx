
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ShieldCheck, Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";

import { acceptInvitation } from "../../../services/authService";

const AcceptInvitation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!token) {
      setError("Your invitation link is missing its token.");
      return;
    }

    if (password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await acceptInvitation({
        token,
        password,
        confirmPassword,
      });

      setSuccess(
        response.message || "Your account has been activated successfully."
      );

      setTimeout(() => {
        navigate("/cms/login", { replace: true });
      }, 2500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to accept your invitation. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg">
      <div className="mb-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e7f3f9] text-[#056699]">
          <ShieldCheck size={32} />
        </div>

        <h1 className="mt-6 text-2xl font-extrabold text-gray-900">
          Accept Your Invitation
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          Create a secure password to activate your FISDEV CMS account.
        </p>
      </div>

      {!token ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-center">
          <p className="font-semibold text-red-700">
            Invalid invitation link
          </p>

          <p className="mt-2 text-sm text-red-600">
            This link does not contain a valid invitation token. Please
            contact your administrator for a new invitation.
          </p>

          <Link
            to="/cms/login"
            className="mt-5 inline-block text-sm font-bold text-[#056699] hover:underline"
          >
            Go to Login
          </Link>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/50 sm:p-8"
        >
          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-5 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
              <span>{success} Redirecting you to login...</span>
            </div>
          )}

          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Create Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                minLength={8}
                required
                autoComplete="new-password"
                className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-12 text-sm outline-none transition focus:border-[#056699] focus:ring-2 focus:ring-[#056699]/10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <p className="mt-2 text-xs text-gray-400">
              Use at least 8 characters.
            </p>
          </div>

          <div className="mb-7">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Confirm Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                minLength={8}
                required
                autoComplete="new-password"
                className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-12 text-sm outline-none transition focus:border-[#056699] focus:ring-2 focus:ring-[#056699]/10"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || Boolean(success)}
            className="flex w-full items-center justify-center rounded-xl bg-[#056699] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#056699]/20 transition hover:bg-[#034b71] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Activating Account..." : "Create Password & Activate"}
          </button>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/cms/login"
              className="font-bold text-[#056699] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      )}
    </div>
  );
};

export default AcceptInvitation;
