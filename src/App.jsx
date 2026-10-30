
import { Routes, Route, Navigate, Link, Outlet } from "react-router-dom";

import { useAuth } from "./context/AuthContext";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";

// Public website pages
import Home from "./components/home/Home";
import About from "./components/home/About";
import Programs from "./components/home/Programs";
import ContactUs from "./components/home/ContactUs";
import Approach from "./components/home/Approach";
import WhoWeServe from "./components/home/WhoWeServe";
import Team from "./components/home/Team";
import GetInvolved from "./components/home/GetInvolved";
import Vacancies from "./components/home/Vacancies";
import VacancyDetails from "./components/home/VacancyDetails";
import PublicNews from "./components/home/News";
import PublicNewsDetails from "./components/home/NewsDetails";

// CMS layouts
import AuthLayout from "./components/cms/AuthLayout";
import ProtectedRoute from "./components/cms/ProtectedRoute";
import DashboardLayout from "./components/cms/DashboardLayout";

// CMS authentication pages
import Login from "./pages/cms/auth/Login";
import ForgotPassword from "./pages/cms/auth/ForgotPassword";
import ResetPassword from "./pages/cms/auth/ResetPassword";
import AcceptInvitation from "./pages/cms/auth/AcceptInvitation";

// CMS dashboard pages
import DashboardHome from "./pages/cms/dashboard/DashboardHome";
import CmsVacancies from "./pages/cms/vacancies/Vacancies";
import CmsNews from "./pages/cms/news/News";
import UserManagement from "./pages/cms/users/UserManagement";

// Public website layout
const PublicLayout = () => (
  <div className="min-h-screen bg-[rgb(245,249,252)]">
    <Navbar />
    <ScrollToTop />

    <Outlet />

    <Footer />
  </div>
);

// Administrator-only route guard.
const AdminRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-[#056699]" />
      </div>
    );
  }

  if (user?.role !== "admin") {
    return <Navigate to="/cms/dashboard" replace />;
  }

  return <Outlet />;
};

function App() {
  return (
    <Routes>
      {/* ==========================================
          PUBLIC WEBSITE ROUTES
      ========================================== */}

      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />

        <Route path="about" element={<About />} />
        <Route path="programs" element={<Programs />} />
        <Route path="approach" element={<Approach />} />
        <Route path="who-we-serve" element={<WhoWeServe />} />
        <Route path="team" element={<Team />} />
        <Route path="get-involved" element={<GetInvolved />} />
        <Route path="contact" element={<ContactUs />} />

        {/* Latest */}
        <Route path="latest/vacancies" element={<Vacancies />} />
        <Route path="latest/vacancies/:id" element={<VacancyDetails />} />

        <Route path="latest/news" element={<PublicNews />} />
        <Route path="latest/news/:id" element={<PublicNewsDetails />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      {/* ==========================================
          CMS AUTHENTICATION
      ========================================== */}

      <Route path="/cms" element={<AuthLayout />}>
        <Route index element={<Navigate to="login" replace />} />

        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="accept-invitation" element={<AcceptInvitation />} />
      </Route>

      {/* ==========================================
          PROTECTED CMS DASHBOARD
      ========================================== */}

      <Route element={<ProtectedRoute />}>
        <Route path="/cms" element={<DashboardLayout />}>
          <Route path="dashboard" element={<DashboardHome />} />

          <Route path="vacancies" element={<CmsVacancies />} />

          <Route path="news" element={<CmsNews />} />

          {/* Administrator-only pages */}
          <Route element={<AdminRoute />}>
            <Route path="users" element={<UserManagement />} />
          </Route>
        </Route>
      </Route>

      {/* ==========================================
          GLOBAL FALLBACK
      ========================================== */}

      <Route
        path="*"
        element={
          <div className="flex min-h-screen flex-col items-center justify-center bg-[#f5f9fc] px-5 text-center">
            <h1 className="text-4xl font-bold text-[#056699]">
              404 - Page Not Found
            </h1>

            <p className="mt-4 text-gray-600">
              Sorry, the page you are looking for does not exist.
            </p>

            <Link
              to="/"
              className="mt-6 inline-flex rounded-lg bg-[#1BB7C4] px-6 py-3 font-semibold text-white transition hover:bg-[#159da8]"
            >
              Back to Home
            </Link>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
