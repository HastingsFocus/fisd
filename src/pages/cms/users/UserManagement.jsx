
import { useEffect, useMemo, useState } from "react";
import {
  UserPlus,
  Users,
  Search,
  ShieldCheck,
  Shield,
  Mail,
  UserCheck,
  UserX,
  Clock,
  X,
  RefreshCw,
} from "lucide-react";

import {
  getUsers,
  inviteUser,
  updateUserStatus,
} from "../../../services/userService";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const [showInviteForm, setShowInviteForm] = useState(false);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "editor",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getUsers();
      setUsers(response.users || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load CMS users. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return users;

    return users.filter((user) => {
      return (
        user.name?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term) ||
        user.role?.toLowerCase().includes(term)
      );
    });
  }, [users, search]);

  const activeCount = users.filter((user) => user.isActive).length;

  const pendingCount = users.filter(
    (user) => !user.invitationAcceptedAt && !user.emailVerified
  ).length;

  const adminCount = users.filter(
    (user) => user.role === "admin"
  ).length;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleInvite = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      setSubmitting(true);

      const response = await inviteUser({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        role: formData.role,
      });

      setSuccess(response.message || "Invitation sent successfully.");

      setFormData({
        name: "",
        email: "",
        role: "editor",
      });

      setShowInviteForm(false);

      await loadUsers();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to send invitation. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (user) => {
    const nextStatus = !user.isActive;

    const confirmed = window.confirm(
      nextStatus
        ? `Are you sure you want to activate ${user.name}'s account?`
        : `Are you sure you want to deactivate ${user.name}'s account?`
    );

    if (!confirmed) return;

    const userId = user._id || user.id;

    setError("");
    setSuccess("");
    setUpdatingId(userId);

    try {
      const response = await updateUserStatus(userId, nextStatus);

      setUsers((previous) =>
        previous.map((item) =>
          (item._id || item.id) === userId
            ? { ...item, ...response.user }
            : item
        )
      );

      setSuccess(response.message);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to update the user's account."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatus = (user) => {
    if (!user.invitationAcceptedAt && !user.emailVerified) {
      return {
        label: "Invitation Pending",
        className: "bg-amber-50 text-amber-700",
        icon: Clock,
      };
    }

    if (user.isActive) {
      return {
        label: "Active",
        className: "bg-green-50 text-green-700",
        icon: UserCheck,
      };
    }

    return {
      label: "Inactive",
      className: "bg-red-50 text-red-700",
      icon: UserX,
    };
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-7">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-[#1BB7C4]">
            Administration
          </p>

          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            User Management
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Invite staff members and manage access to the FISDEV CMS.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setShowInviteForm(true);
            setError("");
            setSuccess("");
          }}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#056699] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#056699]/20 transition hover:bg-[#034b71]"
        >
          <UserPlus size={18} />
          Invite User
        </button>
      </div>

      {/* Feedback */}
      {error && (
        <div className="flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>{error}</span>
          <button onClick={() => setError("")} aria-label="Dismiss error">
            <X size={18} />
          </button>
        </div>
      )}

      {success && (
        <div className="flex items-start justify-between gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          <span>{success}</span>
          <button onClick={() => setSuccess("")} aria-label="Dismiss message">
            <X size={18} />
          </button>
        </div>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#056699]">
              <Users size={22} />
            </div>
            <span className="text-xs font-semibold text-gray-400">
              Total accounts
            </span>
          </div>

          <p className="mt-4 text-3xl font-extrabold text-gray-900">
            {users.length}
          </p>
          <p className="mt-1 text-sm text-gray-500">CMS users</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <UserCheck size={22} />
            </div>
            <span className="text-xs font-semibold text-gray-400">
              Enabled
            </span>
          </div>

          <p className="mt-4 text-3xl font-extrabold text-gray-900">
            {activeCount}
          </p>
          <p className="mt-1 text-sm text-gray-500">Active accounts</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock size={22} />
            </div>
            <span className="text-xs font-semibold text-gray-400">
              Awaiting setup
            </span>
          </div>

          <p className="mt-4 text-3xl font-extrabold text-gray-900">
            {pendingCount}
          </p>
          <p className="mt-1 text-sm text-gray-500">Pending invitations</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <ShieldCheck size={22} />
            </div>
            <span className="text-xs font-semibold text-gray-400">
              Privileged
            </span>
          </div>

          <p className="mt-4 text-3xl font-extrabold text-gray-900">
            {adminCount}
          </p>
          <p className="mt-1 text-sm text-gray-500">Administrators</p>
        </div>
      </div>

      {/* Invite form */}
      {showInviteForm && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-extrabold text-gray-900">
                Invite a CMS User
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                An invitation email will be sent to the user.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowInviteForm(false)}
              className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              aria-label="Close invitation form"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleInvite}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  maxLength={100}
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#056699] focus:ring-2 focus:ring-[#056699]/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#056699] focus:ring-2 focus:ring-[#056699]/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  User Role
                </label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#056699] focus:ring-2 focus:ring-[#056699]/10"
                >
                  <option value="editor">Editor</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-xl bg-[#f0f7fb] p-4">
              <Mail size={20} className="mt-0.5 shrink-0 text-[#056699]" />

              <p className="text-sm leading-6 text-gray-600">
                The invited user will receive an email with a secure link
                to create their password. The invitation expires after
                24 hours.
              </p>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowInviteForm(false)}
                className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-600 transition hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#056699] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#034b71] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Mail size={17} />
                {submitting ? "Sending Invitation..." : "Send Invitation"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-extrabold text-gray-900">
              CMS Accounts
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Manage users who have access to the content management system.
            </p>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users..."
                className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#056699]"
              />
            </div>

            <button
              type="button"
              onClick={loadUsers}
              disabled={loading}
              className="rounded-xl border border-gray-200 p-2.5 text-gray-500 transition hover:bg-gray-50 hover:text-[#056699] disabled:opacity-50"
              title="Refresh users"
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-64 items-center justify-center">
            <div className="flex items-center gap-3 text-sm font-semibold text-gray-500">
              <RefreshCw size={19} className="animate-spin text-[#056699]" />
              Loading CMS users...
            </div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f0f7fb] text-[#056699]">
              <Users size={26} />
            </div>

            <h3 className="mt-4 font-bold text-gray-800">
              {search ? "No matching users" : "No CMS users found"}
            </h3>

            <p className="mt-2 max-w-sm text-sm text-gray-500">
              {search
                ? "Try searching with a different name, email or role."
                : "Invite your first CMS user to get started."}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead className="bg-gray-50">
                  <tr className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date Added</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.map((user) => {
                    const status = getStatus(user);
                    const StatusIcon = status.icon;
                    const userId = user._id || user.id;

                    return (
                      <tr key={userId} className="transition hover:bg-gray-50/70">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e7f3f9] font-bold uppercase text-[#056699]">
                              {(user.name || user.email || "U").charAt(0)}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-sm font-bold text-gray-800">
                                {user.name}
                              </p>

                              <p className="mt-1 truncate text-xs text-gray-500">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-2 text-sm font-semibold capitalize text-gray-600">
                            {user.role === "admin" ? (
                              <ShieldCheck size={17} className="text-purple-600" />
                            ) : (
                              <Shield size={17} className="text-[#056699]" />
                            )}

                            {user.role}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${status.className}`}
                          >
                            <StatusIcon size={14} />
                            {status.label}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDate(user.createdAt)}
                        </td>

                        <td className="px-6 py-4 text-right">
                          {user.invitationAcceptedAt || user.emailVerified ? (
                            <button
                              type="button"
                              onClick={() => handleStatusChange(user)}
                              disabled={updatingId === userId}
                              className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-bold transition disabled:opacity-50 ${
                                user.isActive
                                  ? "bg-red-50 text-red-600 hover:bg-red-100"
                                  : "bg-green-50 text-green-700 hover:bg-green-100"
                              }`}
                            >
                              {updatingId === userId ? (
                                <RefreshCw size={14} className="animate-spin" />
                              ) : user.isActive ? (
                                <UserX size={14} />
                              ) : (
                                <UserCheck size={14} />
                              )}

                              {user.isActive ? "Deactivate" : "Activate"}
                            </button>
                          ) : (
                            <span className="text-xs font-semibold text-gray-400">
                              Awaiting acceptance
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="border-t border-gray-100 px-6 py-4">
              <p className="text-xs text-gray-500">
                Showing <strong>{filteredUsers.length}</strong> of{" "}
                <strong>{users.length}</strong> users
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
