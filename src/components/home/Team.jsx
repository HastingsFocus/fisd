import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
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
  "Managing Director",
  "Learning and Impact Measuring Manager",
  "Research Officer",
  "MEAL Officer",
  "Resource Mobilisation and Partnership Manager",
  "Communications and Engagement Lead",
  "Finance Manager",
  "Programs Manager",
  "Social Development and Behaviour Change Lead",
  "Project Officers",
  "ICT Lead",
  "Business Development Lead",
  "ICT Officer",
  "Accounting Officer",
  "Procurement Officer",
  "Human Resource Manager",
  "Human Resource Officer",
  "Communications Officer",
];

const ease = [0.22, 1, 0.36, 1];

const revealUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

const revealLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
};

const revealRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

const Team = () => {
  const shouldReduceMotion = useReducedMotion();

  const revealProps = (direction = "up") => ({
    initial: shouldReduceMotion ? false : "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.15 },
    variants: direction === "left" ? revealLeft : direction === "right" ? revealRight : revealUp,
    transition: { duration: shouldReduceMotion ? 0 : 0.65, ease },
  });

  const renderPeople = (people) =>
    people.map((person) => (
      <motion.article
        key={person.name}
        variants={revealUp}
        whileHover={shouldReduceMotion ? undefined : { y: -7, transition: { duration: 0.25, ease } }}
        className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
      >
        <div className="relative flex justify-center overflow-hidden bg-gradient-to-br from-sky-50 to-cyan-50 px-5 pt-8">
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { scale: 1.06, rotate: 3 }}
            transition={{ duration: 0.35, ease }}
            className="flex h-36 w-36 items-center justify-center rounded-full border-4 border-white bg-white shadow-md"
          >
            <Users
              size={48}
              strokeWidth={1.5}
              className="text-[#1BB7C4] transition-colors duration-300 group-hover:text-[#056699]"
              aria-hidden="true"
            />
          </motion.div>

          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#1BB7C4]/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />
        </div>

        <div className="px-5 pb-7 pt-6 text-center">
          <h3 className="text-lg font-extrabold text-[#056699] transition-colors duration-300 group-hover:text-[#1BB7C4]">
            {person.name}
          </h3>

          <p className="mx-auto mt-2 max-w-xs text-sm font-semibold leading-6 text-gray-500">
            {person.role}
          </p>

          <motion.div
            initial={false}
            className="mx-auto mt-5 h-1 w-12 rounded-full bg-[#1BB7C4] transition-all duration-300 group-hover:w-20"
          />
        </div>
      </motion.article>
    ));

  return (
    <main className="overflow-hidden bg-[rgb(245,249,252)] text-gray-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[rgb(3,75,113)] px-6 py-20 text-white md:py-28">
        <motion.div
          aria-hidden="true"
          animate={shouldReduceMotion ? undefined : { x: [0, 18, 0], y: [0, 14, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#1BB7C4]/20 blur-3xl"
        />

        <motion.div
          aria-hidden="true"
          animate={shouldReduceMotion ? undefined : { x: [0, -16, 0], y: [0, -12, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -left-16 h-72 w-72 rounded-full bg-sky-300/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm"
          >
            <Users size={17} />
            The People Behind FISDEV
          </motion.div>

          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease }}
            className="text-4xl font-extrabold leading-tight md:text-6xl"
          >
            Meet Our <span className="text-[#1BB7C4]">Team</span>
          </motion.h1>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease }}
            className="mt-6 max-w-3xl text-lg leading-8 text-sky-100 md:text-xl"
          >
            Meet the leaders and professionals working together to advance
            inclusive opportunities, sustainable development, and meaningful
            change for young people and underserved communities.
          </motion.p>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.32, ease }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <motion.a
              href="#board"
              whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.02 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-lg bg-[#1BB7C4] px-6 py-3 font-bold text-white transition-colors duration-300 hover:bg-[#159da8]"
            >
              Meet the Board
              <ArrowRight size={18} />
            </motion.a>

            <motion.a
              href="#management"
              whileHover={shouldReduceMotion ? undefined : { y: -3 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-6 py-3 font-bold text-white transition-colors duration-300 hover:bg-white/10"
            >
              Meet Management
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="px-6 py-14 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-9 md:grid-cols-2 md:items-center">
          <motion.div {...revealProps("left")}>
            <p className="mb-3 font-bold uppercase tracking-[0.2em] text-[#1BB7C4]">
              Leadership & Collaboration
            </p>

            <h2 className="text-3xl font-extrabold leading-tight text-[#056699] md:text-4xl">
              Driven by Purpose. United by Impact.
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              FISDEV brings together organisational leadership, technical
              expertise, and program-focused teams to turn its mission into
              practical action. Our Board provides governance, oversight, and
              strategic guidance, while the management team coordinates
              implementation and organisational operations.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <motion.div
              variants={revealUp}
              whileHover={shouldReduceMotion ? undefined : { y: -5 }}
              className="rounded-2xl bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg"
            >
              <Landmark className="mb-4 text-[#1BB7C4]" size={30} />
              <h3 className="font-bold text-[#056699]">Board</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Providing governance, accountability, and strategic direction.
              </p>
            </motion.div>

            <motion.div
              variants={revealUp}
              whileHover={shouldReduceMotion ? undefined : { y: -5 }}
              className="rounded-2xl bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg"
            >
              <BriefcaseBusiness className="mb-4 text-[#1BB7C4]" size={30} />
              <h3 className="font-bold text-[#056699]">Management</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Leading programs, people, partnerships, and implementation.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Board of Directors */}
      <section id="board" className="scroll-mt-24 bg-white px-6 py-14 md:py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div {...revealProps()} className="mb-10 text-center md:mb-12">
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { rotate: 5, scale: 1.06 }}
              transition={{ duration: 0.25 }}
              className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-[#056699]"
            >
              <Landmark size={30} />
            </motion.div>

            <p className="mb-3 font-bold uppercase tracking-[0.2em] text-[#1BB7C4]">
              Governance & Oversight
            </p>

            <h2 className="text-3xl font-extrabold text-[#056699] md:text-4xl">
              Board of Directors
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-600">
              The Board provides governance and strategic oversight, helping
              safeguard FISDEV's mission, accountability, and long-term
              organisational direction.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4"
          >
            {renderPeople(board)}
          </motion.div>
        </div>
      </section>

      {/* Management Team */}
      <section id="management" className="scroll-mt-24 bg-white px-6 pb-14 pt-8 md:pb-16 md:pt-10">
        <div className="mx-auto max-w-7xl">
          <motion.div {...revealProps()} className="mb-10 text-center md:mb-12">
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { rotate: -5, scale: 1.06 }}
              transition={{ duration: 0.25 }}
              className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-[#056699]"
            >
              <BriefcaseBusiness size={30} />
            </motion.div>

            <p className="mb-3 font-bold uppercase tracking-[0.2em] text-[#1BB7C4]">
              Executive Leadership
            </p>

            <h2 className="text-3xl font-extrabold text-[#056699] md:text-4xl">Management Team</h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-600">
              Our management team drives day-to-day operations, program
              delivery, organisational growth, financial stewardship, and
              stakeholder engagement.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
          >
            {renderPeople(management)}
          </motion.div>
        </div>
      </section>

      {/* Wider Organisational Structure */}
      <section className="px-6 py-14 md:py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div {...revealProps()} className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { rotate: 5, scale: 1.06 }}
              transition={{ duration: 0.25 }}
              className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#056699] shadow-sm"
            >
              <Network size={30} />
            </motion.div>

            <p className="mb-3 font-bold uppercase tracking-[0.2em] text-[#1BB7C4]">
              Organisational Structure
            </p>

            <h2 className="text-3xl font-extrabold text-[#056699] md:text-4xl">
              A Team Working Towards Shared Goals
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              FISDEV's structure brings together program delivery, research,
              learning, finance, communications, technology, and organisational
              support functions.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {managementStructure.map((role) => (
              <motion.div
                key={role}
                variants={revealUp}
                whileHover={shouldReduceMotion ? undefined : { x: 4, y: -2 }}
                className="group flex items-start gap-3 rounded-xl border border-sky-100 bg-white p-5 transition-all duration-300 hover:border-[#1BB7C4]/60 hover:shadow-md"
              >
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-[#1BB7C4] transition-transform duration-300 group-hover:scale-110"
                />

                <span className="font-medium leading-6 text-gray-700 transition-colors duration-300 group-hover:text-[#056699]">
                  {role}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 pb-16 pt-8 md:pb-20">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease }}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-[#056699] px-7 py-12 text-center text-white md:px-14 md:py-16"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-[#1BB7C4]/20 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-12 h-48 w-48 rounded-full bg-sky-300/10 blur-3xl"
          />

          <div className="relative">
            <motion.div
              animate={shouldReduceMotion ? undefined : { y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Target className="mx-auto mb-6 text-[#7ee8ed]" size={42} />
            </motion.div>

            <h2 className="text-3xl font-extrabold md:text-4xl">
              Together, We Can Create Lasting Impact
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-sky-100">
              We believe meaningful development is built through
              collaboration, shared responsibility, and a commitment to
              inclusive and sustainable progress.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.02 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              >
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#1BB7C4] px-6 py-3 font-bold text-white transition-colors duration-300 hover:bg-[#159da8]"
                >
                  Learn About FISDEV
                  <ArrowRight size={18} />
                </Link>
              </motion.div>

              <motion.div
                whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-6 py-3 font-bold text-white transition-colors duration-300 hover:bg-white/10"
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default Team;