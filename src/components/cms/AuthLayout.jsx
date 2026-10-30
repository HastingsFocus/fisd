
import { Outlet, Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#f5f9fc] flex flex-col">
      <header className="px-6 py-5 border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-[#056699] flex items-center justify-center">
              <ShieldCheck className="text-white" size={25} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#056699]">
                FISDEV
              </h1>
              <p className="text-xs text-gray-500 tracking-wider">
                CONTENT MANAGEMENT SYSTEM
              </p>
            </div>
          </Link>

          <Link
            to="/"
            className="text-sm font-semibold text-[#056699] hover:text-[#1BB7C4]"
          >
            Visit Website →
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>

      <footer className="py-5 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} FISDEV. All rights reserved.
      </footer>
    </div>
  );
};

export default AuthLayout;
