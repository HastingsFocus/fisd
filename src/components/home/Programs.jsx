import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Mic2,
  Laptop,
  Lightbulb,
  Sprout,
  Baby,
  HeartPulse,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const programs = [
  {
    number: "01",
    title: "Amplified Community Voices & Tourism Drive",
    tagline: "Echoing Voices from the Margins.",
    icon: Mic2,
    description:
      "This program empowers youth and communities to tell their own stories as tools for social change. Young people are trained in community research, persuasive writing, public storytelling, poetry, drama, and acting to document lived experiences, inspire action, and influence policy.",
    additional:
      "The program also creates creative platforms that showcase talent, amplify voices, and commercialize artistic skills for sustainable livelihoods. It promotes cultural heritage preservation through professional tour guide training, historical site conservation, development of model cultural villages, and sustainable tourism initiatives.",
    focus: [
      "Community storytelling and advocacy",
      "Creative arts and talent development",
      "Cultural heritage preservation",
      "Professional tour guide training",
      "Sustainable tourism initiatives",
    ],
  },
  {
    number: "02",
    title: "Ed-Tech Skills Development",
    icon: Laptop,
    description:
      "This program equips young people with practical digital, technical, and employability skills needed to participate effectively in the modern economy.",
    additional:
      "It delivers digital skills training, supports young innovators to develop and commercialize technology solutions, strengthens TEVET skills with a focus on agribusiness, and provides on-the-job training opportunities that help graduates transition into the workforce.",
    focus: [
      "Digital and technical skills development",
      "Technology innovation and commercialization",
      "TEVET skills development",
      "Agribusiness skills",
      "Workplace readiness and on-the-job training",
    ],
  },
  {
    number: "03",
    title: "Spark Incubation Program",
    icon: Lightbulb,
    description:
      "Spark Incubation supports start-ups and emerging enterprises to develop, grow and become investment-ready businesses.",
    additional:
      "The program provides access to finance, co-working spaces, enterprise development training, mentorship and coaching. Start-ups are connected to ecosystem players through networking opportunities, market expos and conferences.",
    focus: [
      "Business incubation and enterprise development",
      "Mentorship and coaching",
      "Access to finance",
      "Co-working spaces",
      "Market access and networking",
      "Investor and industry connections",
    ],
  },
  {
    number: "04",
    title: "Eco-Agri Commercial",
    icon: Sprout,
    description:
      "This program promotes sustainable agribusiness, agricultural commercialization and green entrepreneurship among young people and communities.",
    additional:
      "The program strengthens market access through outlet stores, supports value addition through agri-processing, promotes agricultural innovations to improve productivity, and provides practical agripreneurship training.",
    focus: [
      "Sustainable agriculture and agribusiness",
      "Agricultural commercialization",
      "Agri-processing and value addition",
      "Agricultural innovation",
      "Agripreneurship training",
      "Product branding and marketing",
      "Market access",
    ],
  },
  {
    number: "05",
    title: "Early Child Development",
    icon: Baby,
    description:
      "This program strengthens early learning, creativity and holistic development among young children while supporting the people and systems responsible for early childhood development.",
    additional:
      "It builds the capacity of nursery school teachers, supports curriculum development, establishes quality assurance mechanisms and facilitates exchange visits. The program also creates child-friendly innovation spaces such as the Dreamers' Corner and safe entertainment and play areas.",
    focus: [
      "Early learning and child development",
      "Nursery school teacher capacity building",
      "Curriculum development and support",
      "Quality assurance",
      "Exchange visits",
      "Child-friendly innovation spaces",
      "Safe entertainment and play areas",
    ],
  },
  {
    number: "06",
    title: "Youth Friendly Health Corner",
    icon: HeartPulse,
    description:
      "The Youth-Friendly Health Corner promotes the physical, mental and social well-being of young people by improving access to information, support and essential services.",
    additional:
      "The program provides mental health and wellness support through peer educators and trained youth workers, facilitates access to sexual and reproductive health and rights services, and addresses gender-based violence through awareness, survivor support and referral systems.",
    focus: [
      "Mental health and youth wellness",
      "Youth-friendly health services",
      "SRHR awareness and access",
      "GBV awareness and prevention",
      "Survivor support and referrals",
      "Sports and physical activities",
      "Youth talent identification and development",
    ],
  },
];

const easing = [0.22, 1, 0.36, 1];

const revealUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easing },
  },
};

const revealLeft = {
  hidden: { opacity: 0, x: -25 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easing },
  },
};

const staggerChildren = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const Programs = () => {
  const shouldReduceMotion = useReducedMotion();

  const revealProps = shouldReduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.12 },
      };

  return (
    <main className="min-h-screen overflow-hidden bg-[rgb(245,249,252)]">
      {/* ========================= PAGE HERO ========================== */}
      <section className="relative isolate overflow-hidden bg-[rgb(3,75,113)] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        {!shouldReduceMotion && (
          <>
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 -z-0 h-72 w-72 rounded-full bg-[#1BB7C4]/20 blur-3xl"
              animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.75, 0.45] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 -left-20 -z-0 h-72 w-72 rounded-full bg-[#1BB7C4]/10 blur-3xl"
              animate={{ x: [0, 18, 0], y: [0, -12, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}

        <motion.div
          className="relative z-10 mx-auto max-w-7xl"
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          variants={staggerChildren}
        >
          <motion.p
            variants={revealUp}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1BB7C4]"
          >
            What We Do
          </motion.p>

          <motion.h1
            variants={revealUp}
            className="mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
          >
            Our Programs
          </motion.h1>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: easing }}
            className="mt-5 h-1 w-20 origin-left rounded-full bg-[#1BB7C4]"
          />

          <motion.p
            variants={revealUp}
            className="mt-6 max-w-3xl text-base leading-8 text-white/85 sm:text-lg"
          >
            FISDEV delivers inclusive and sustainable programs that empower
            young people, strengthen communities, expand access to essential
            services and create pathways to economic independence.
          </motion.p>
        </motion.div>
      </section>

      {/* ========================= INTRODUCTION ========================== */}
      <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-18">
        <motion.div
          {...revealProps}
          variants={staggerChildren}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.p
            variants={revealUp}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1BB7C4]"
          >
            Our Areas of Work
          </motion.p>

          <motion.h2
            variants={revealUp}
            className="mt-3 text-3xl font-bold text-[#056699] sm:text-4xl"
          >
            Creating Opportunities. Transforming Lives.
          </motion.h2>

          <motion.div
            variants={revealUp}
            className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#1BB7C4]"
          />

          <motion.p
            variants={revealUp}
            className="mt-6 text-base leading-8 text-gray-600 sm:text-lg"
          >
            Our programs respond to the needs, challenges and potential of
            young people and underserved communities. Through skills
            development, enterprise support, sustainable agriculture, early
            childhood development, health and community empowerment, FISDEV
            works to create opportunities that can lead to lasting social and
            economic change.
          </motion.p>
        </motion.div>
      </section>

      {/* ========================= PROGRAM CARDS ========================== */}
      <section className="px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            {...revealProps}
            variants={staggerChildren}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {programs.map((program) => {
              const Icon = program.icon;

              return (
                <motion.article
                  key={program.number}
                  variants={revealUp}
                  whileHover={
                    shouldReduceMotion ? undefined : { y: -7, transition: { duration: 0.25 } }
                  }
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-[#1BB7C4]/60 hover:shadow-xl"
                >
                  {/* Animated top accent */}
                  <div className="relative h-1.5 w-full overflow-hidden bg-gray-100">
                    <motion.div
                      className="absolute inset-0 origin-left bg-gradient-to-r from-[#056699] to-[#1BB7C4]"
                      initial={shouldReduceMotion ? false : { scaleX: 0.25 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: easing }}
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    {/* Icon and number */}
                    <div className="flex items-start justify-between">
                      <motion.div
                        whileHover={
                          shouldReduceMotion ? undefined : { scale: 1.09, rotate: -4 }
                        }
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#1BB7C4]/10 text-[#056699] transition-colors duration-300 group-hover:bg-[#1BB7C4] group-hover:text-white"
                      >
                        <Icon size={29} strokeWidth={1.7} aria-hidden="true" />
                      </motion.div>

                      <span className="text-3xl font-bold text-[#056699]/10 transition-colors duration-300 group-hover:text-[#1BB7C4]/40">
                        {program.number}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="mt-6 text-xl font-bold leading-snug text-[#056699] transition-colors duration-300 group-hover:text-[#159da8] sm:text-2xl">
                      {program.title}
                    </h2>

                    {/* Tagline */}
                    {program.tagline && (
                      <p className="mt-2 text-sm font-semibold italic text-[#159da8]">
                        {program.tagline}
                      </p>
                    )}

                    {/* Description */}
                    <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                      {program.description}
                    </p>

                    <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                      {program.additional}
                    </p>

                    {/* Focus areas */}
                    <div className="mt-6 border-t border-gray-100 pt-5">
                      <h3 className="text-sm font-bold uppercase tracking-wide text-[#056699]">
                        Key Focus Areas
                      </h3>

                      <ul className="mt-4 space-y-3">
                        {program.focus.map((item, index) => (
                          <motion.li
                            key={item}
                            initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.35,
                              delay: shouldReduceMotion ? 0 : index * 0.045,
                              ease: easing,
                            }}
                            className="flex items-start gap-3 text-sm leading-6 text-gray-600"
                          >
                            <CheckCircle2
                              size={18}
                              className="mt-0.5 shrink-0 text-[#1BB7C4]"
                              strokeWidth={2}
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Enquiry link */}
                    <div className="mt-auto pt-7">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 font-semibold text-[#056699] transition-colors duration-300 hover:text-[#159da8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1BB7C4]"
                      >
                        Enquire about this program
                        <motion.span
                          className="inline-flex"
                          animate={shouldReduceMotion ? undefined : { x: [0, 3, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 1.5,
                            ease: "easeInOut",
                          }}
                        >
                          <ArrowRight size={18} aria-hidden="true" />
                        </motion.span>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ========================= CLOSING CTA ========================== */}
      <section className="px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12">
        <motion.div
          {...revealProps}
          variants={revealUp}
          className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-2xl bg-[rgb(3,75,113)] px-7 py-9 text-white sm:px-10 sm:py-10 lg:px-12 lg:py-12"
        >
          {!shouldReduceMotion && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-24 -z-0 h-64 w-64 rounded-full bg-[#1BB7C4]/15 blur-3xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          <div className="relative z-10 flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1BB7C4]">
                Work With Us
              </p>

              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                Support Inclusive and Sustainable Development
              </h2>

              <p className="mt-4 leading-7 text-white/85">
                Whether you are an organisation, institution, investor,
                community group or individual, there are opportunities to
                collaborate with FISDEV and contribute to meaningful change.
              </p>
            </div>

            <motion.div
              whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.03 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to="/contact"
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#1BB7C4] px-6 py-3 font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-[#159da8] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Contact Us
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default Programs;