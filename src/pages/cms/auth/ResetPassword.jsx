
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { KeyRound, Lock, Eye, EyeOff } from "lucide-react";
import { resetPassword } from "../../../services/authService";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      return setError("The password reset link is missing its token.");
    }

    if (password.length < 12) {
      return setError("Password must contain at least 12 characters.");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      setLoading(true);

      const response = await resetPassword({
        token,
        password,
        confirmPassword,
      });

      setSuccess(response.message);

      setTimeout(() => navigate("/cms/login"), 2500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to reset your password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-12 text-gray-800 outline-none focus:border-[#1BB7C4] focus:ring-2 focus:ring-[#1BB7C4]/20";

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-xl shadow-blue-900/5 sm:p-9">
      <div className="mb-7 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e6f6f8]">
          <KeyRound className="text-[#056699]" size={27} />
        </div>

        <h2 className="text-2xl font-bold text-[#056699]">
          Reset Password
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Create a new password for your account.
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-5 rounded-lg bg-green-50 p-3 text-sm text-green-700">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 12 characters"
              className={inputClass}
              minLength={12}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Confirm New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              className={inputClass}
              minLength={12}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !token}
          className="w-full rounded-xl bg-[#056699] py-3.5 font-semibold text-white transition hover:bg-[#04547c] disabled:opacity-60"
        >
          {loading ? "Updating Password..." : "Reset Password"}
        </button>
      </form>

      <Link
        to="/cms/login"
        className="mt-7 block text-center text-sm font-semibold text-[#056699] hover:text-[#1BB7C4]"
      >
        Back to Login
      </Link>
    </div>
  );
};

export default ResetPassword;
