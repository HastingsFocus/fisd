import React from "react";
import { Link } from "react-router-dom";
import { Users, BriefcaseBusiness, Landmark, ArrowRight, Network, Target, CheckCircle2 } from "lucide-react";

import tommyBanks from "../../assets/images/tommyBanks.jpeg";
import ethielSiliya from "../../assets/images/ethielSiliya.jpeg";
import justiceMwadzera from "../../assets/images/justiceMwadzera.jpeg";
import orossPhiri from "../../assets/images/orossPhiri.jpeg";
import thokozaniKhanyanga from "../../assets/images/thokozaniKhanyanga.jpeg";
import alexanderGombar from "../../assets/images/alexanderGombar.jpeg";
import rashidMpinganjira from "../../assets/images/rashidMpinganjira.jpeg";
import mosesMhango from "../../assets/images/mosesMhango.jpeg";
import alfredMsinda from "../../assets/images/alfredMsinda.jpeg";
import nancyKawiya from "../../assets/images/nancyKawiya.jpeg";

const management = [
  { name: "Tommy Banks", role: "Managing Director", image: tommyBanks },
  { name: "Ethiel Siliya", role: "Business Development Lead", image: ethielSiliya },
  { name: "Justice Mwadzera", role: "Programs Manager", image: justiceMwadzera },
  { name: "Oross Phiri", role: "Social Development & Behaviour Change Lead", image: orossPhiri },
  { name: "Thokozani Khanyanga", role: "Finance Manager", image: thokozaniKhanyanga },
  { name: "Alexander Gombar", role: "Communications & Engagement Lead", image: alexanderGombar },
];

const board = [
  { name: "Rashid Mpinganjira", role: "Board Chair", image: rashidMpinganjira },
  { name: "Moses Mhango", role: "Board Secretary", image: mosesMhango },
  { name: "Alfred Msinda", role: "Board Treasurer", image: alfredMsinda },
  { name: "Nancy Kawiya", role: "Resource Mobilisation & Program Advisor", image: nancyKawiya },
];

const managementStructure = [
  "Managing Director", "Learning and Impact Measuring Manager", "Research Officer", "MEAL Officer",
  "Resource Mobilisation and Partnership Manager", "Communications and Engagement Lead", "Finance Manager",
  "Programs Manager", "Social Development and Behaviour Change Lead", "Project Officers", "ICT Lead",
  "Business Development Lead", "ICT Officer", "Accounting Officer", "Procurement Officer",
  "Human Resource Manager", "Human Resource Officer", "Communications Officer",
];

const Team = () => {
  
const renderPeople = (people) =>
  people.map((person) => (
    <article
      key={person.name}
      className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Temporary placeholder instead of a profile photo */}
      <div className="flex justify-center bg-gradient-to-br from-sky-50 to-cyan-50 px-5 pt-8">
        <div className="flex h-36 w-36 items-center justify-center rounded-full border-4 border-white bg-white shadow-md">
          <Users
            size={48}
            strokeWidth={1.5}
            className="text-[#1BB7C4]"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="px-5 pb-7 pt-6 text-center">
        <h3 className="text-lg font-extrabold text-[#056699]">
          {person.name}
        </h3>

        <p className="mx-auto mt-2 max-w-xs text-sm font-semibold leading-6 text-gray-500">
          {person.role}
        </p>

        <div className="mx-auto mt-5 h-1 w-12 rounded-full bg-[#1BB7C4] transition-all group-hover:w-20" />
      </div>
    </article>
  ));

  return (
    <main className="bg-[rgb(245,249,252)] text-gray-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[rgb(3,75,113)] px-6 py-24 text-white md:py-32">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#1BB7C4]/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-16 h-72 w-72 rounded-full bg-sky-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">
            <Users size={17} />
            The People Behind FISDEV
          </div>

          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
            Meet Our <span className="text-[#1BB7C4]">Team</span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-sky-100 md:text-xl">
            Meet the leaders and professionals working together to advance inclusive opportunities, sustainable
            development, and meaningful change for young people and underserved communities.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#board" className="inline-flex items-center gap-2 rounded-lg bg-[#1BB7C4] px-6 py-3 font-bold text-white transition hover:bg-[#159da8]">
              Meet the Board <ArrowRight size={18} />
            </a>
            <a href="#management" className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-6 py-3 font-bold text-white transition hover:bg-white/10">
              Meet Management
            </a>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 font-bold uppercase tracking-[0.2em] text-[#1BB7C4]">Leadership & Collaboration</p>
            <h2 className="text-3xl font-extrabold leading-tight text-[#056699] md:text-4xl">
              Driven by Purpose. United by Impact.
            </h2>
            <p className="mt-5 leading-8 text-gray-600">
              FISDEV brings together organisational leadership, technical expertise, and program-focused teams to
              turn its mission into practical action. Our Board provides governance, oversight, and strategic
              guidance, while the management team coordinates implementation and organisational operations.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <Landmark className="mb-4 text-[#1BB7C4]" size={30} />
              <h3 className="font-bold text-[#056699]">Board</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Providing governance, accountability, and strategic direction.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <BriefcaseBusiness className="mb-4 text-[#1BB7C4]" size={30} />
              <h3 className="font-bold text-[#056699]">Management</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Leading programs, people, partnerships, and implementation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Board FIRST */}
      <section id="board" className="scroll-mt-24 bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-[#056699]">
              <Landmark size={30} />
            </div>
            <p className="mb-3 font-bold uppercase tracking-[0.2em] text-[#1BB7C4]">Governance & Oversight</p>
            <h2 className="text-3xl font-extrabold text-[#056699] md:text-4xl">Board of Directors</h2>
            <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-600">
              The Board provides governance and strategic oversight, helping safeguard FISDEV's mission,
              accountability, and long-term organisational direction.
            </p>
          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">{renderPeople(board)}</div>
        </div>
      </section>

      {/* Management SECOND */}
      <section id="management" className="scroll-mt-24 bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-[#056699]">
              <BriefcaseBusiness size={30} />
            </div>
            <p className="mb-3 font-bold uppercase tracking-[0.2em] text-[#1BB7C4]">Executive Leadership</p>
            <h2 className="text-3xl font-extrabold text-[#056699] md:text-4xl">Management Team</h2>
            <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-600">
              Our management team drives day-to-day operations, program delivery, organisational growth, financial
              stewardship, and stakeholder engagement.
            </p>
          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">{renderPeople(management)}</div>
        </div>
      </section>

      {/* Wider organisational structure */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#056699] shadow-sm">
              <Network size={30} />
            </div>
            <p className="mb-3 font-bold uppercase tracking-[0.2em] text-[#1BB7C4]">Organisational Structure</p>
            <h2 className="text-3xl font-extrabold text-[#056699] md:text-4xl">A Team Working Towards Shared Goals</h2>
            <p className="mt-5 leading-8 text-gray-600">
              FISDEV's structure brings together program delivery, research, learning, finance, communications,
              technology, and organisational support functions.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {managementStructure.map((role) => (
              <div
                key={role}
                className="flex items-start gap-3 rounded-xl border border-sky-100 bg-white p-5 transition hover:border-[#1BB7C4]/60 hover:shadow-sm"
              >
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-[#1BB7C4]" />
                <span className="font-medium leading-6 text-gray-700">{role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-[#056699] px-7 py-12 text-center text-white md:px-14 md:py-16">
          <Target className="mx-auto mb-6 text-[#7ee8ed]" size={42} />
          <h2 className="text-3xl font-extrabold md:text-4xl">Together, We Can Create Lasting Impact</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-sky-100">
            We believe meaningful development is built through collaboration, shared responsibility, and a
            commitment to inclusive and sustainable progress.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/about" className="inline-flex items-center gap-2 rounded-lg bg-[#1BB7C4] px-6 py-3 font-bold text-white transition hover:bg-[#159da8]">
              Learn About FISDEV <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-6 py-3 font-bold text-white transition hover:bg-white/10">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Team;