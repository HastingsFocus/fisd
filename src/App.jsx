import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";

import Home from "./components/home/Home";
import About from "./components/home/About";
import Programs from "./components/home/Programs";
import ContactUs from "./components/home/ContactUs";
import Approach from "./components/home/Approach";
import WhoWeServe from "./components/home/WhoWeServe";
import Team from "./components/home/Team";
import GetInvolved from "./components/home/GetInvolved";

function App() {
  return (
    <div className="min-h-screen bg-[rgb(245,249,252)]">
      <Navbar />
      {/* Automatically return to the top whenever the page changes */}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/approach" element={<Approach />} />
        <Route path="/who-we-serve" element={<WhoWeServe />} />
        <Route path="/team" element={<Team />} />
        <Route path="/get-involved" element={<GetInvolved />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route
          path="*"
          element={
            <div className="px-5 py-24 text-center">
              <h1 className="text-4xl font-bold text-[#056699]">404 - Page Not Found</h1>
              <p className="mt-4 text-gray-600">Sorry, the page you are looking for does not exist.</p>
              <a href="/" className="mt-6 inline-flex rounded-lg bg-[#1BB7C4] px-6 py-3 font-semibold text-white transition hover:bg-[#159da8]">
                Back to Home
              </a>
            </div>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;