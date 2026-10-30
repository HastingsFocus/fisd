
import { Routes, Route, Navigate, Link, Outlet } from "react-router-dom";

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
import Register from "./pages/cms/auth/Register";
import Login from "./pages/cms/auth/Login";
import VerifyEmail from "./pages/cms/auth/VerifyEmail";
import ForgotPassword from "./pages/cms/auth/ForgotPassword";
import ResetPassword from "./pages/cms/auth/ResetPassword";

// CMS dashboard pages
import DashboardHome from "./pages/cms/dashboard/DashboardHome";
import CmsVacancies from "./pages/cms/vacancies/Vacancies";
import CmsNews from "./pages/cms/news/News";

// CMS placeholder
const CmsPlaceholder = ({ title, description }) => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center">
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e7f3f9] text-[#056699]">
      <span className="text-2xl font-bold">F</span>
    </div>

    <h1 className="mt-6 text-2xl font-extrabold text-gray-900">
      {title}
    </h1>

    <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
      {description}
    </p>

    <p className="mt-5 rounded-full bg-cyan-50 px-4 py-2 text-xs font-bold text-[#159da8]">
      Module coming soon
    </p>

    <Link
      to="/cms/dashboard"
      className="mt-6 text-sm font-bold text-[#056699] hover:text-[#1BB7C4]"
    >
      Back to Dashboard
    </Link>
  </div>
);

// Public website layout
const PublicLayout = () => (
  <div className="min-h-screen bg-[rgb(245,249,252)]">
    <Navbar />
    <ScrollToTop />

    <Outlet />

    <Footer />
  </div>
);

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

        {/* Public fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      {/* ==========================================
          CMS AUTHENTICATION
      ========================================== */}

      <Route path="/cms" element={<AuthLayout />}>
        <Route index element={<Navigate to="login" replace />} />

        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>

      {/* ==========================================
          PROTECTED CMS DASHBOARD
      ========================================== */}

      <Route element={<ProtectedRoute />}>
        <Route path="/cms" element={<DashboardLayout />}>

          <Route
            path="dashboard"
            element={<DashboardHome />}
          />

          <Route
  path="vacancies"
  element={<CmsVacancies />}
/>

         <Route path="news" element={<CmsNews />} />

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
