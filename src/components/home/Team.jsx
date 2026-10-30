
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Users, ArrowRight, Target } from "lucide-react";
import { Link } from "react-router-dom";

import tommyBanks from "../../assets/images/tommyBanks.jpeg";
import ethielSiliya from "../../assets/images/ethielSiliya.jpeg";
import orossPhiri from "../../assets/images/orossPhiri.jpeg";
import mosesMhango from "../../assets/images/mosesMhango.jpeg";

const teamMembers = [
  {
    name: "Tommy Banks",
    role: "Managing Director",
    image: tommyBanks,
  },
  {
    name: "Ethiel Siliya",
    role: "Business Development Lead",
    image: ethielSiliya,
  },
  {
    name: "Oross Phiri",
    role: "Social Development & Behaviour Change Lead",
    image: orossPhiri,
  },
  {
    name: "Moses Mhango",
    role: "Board Secretary",
    image: mosesMhango,
  },
];

const ease = [0.22, 1, 0.36, 1];

const revealUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const Team = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="overflow-hidden bg-[rgb(245,249,252)] text-gray-800">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[rgb(3,75,113)] px-6 py-20 text-white md:py-28">

        <motion.div
          aria-hidden="true"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, 18, 0],
                  y: [0, 14, 0],
                  scale: [1, 1.08, 1],
                }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#1BB7C4]/20 blur-3xl"
        />

        <motion.div
          aria-hidden="true"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, -16, 0],
                  y: [0, -12, 0],
                }
          }
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
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
            Meet the dedicated individuals working together to advance
            inclusive opportunities, sustainable development, and meaningful
            change for young people and underserved communities.
          </motion.p>

        </div>
      </section>

      {/* Team Introduction */}
      <section className="px-6 py-16 md:py-20">

        <div className="mx-auto max-w-7xl">

          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={revealUp}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <p className="mb-3 font-bold uppercase tracking-[0.2em] text-[#1BB7C4]">
              Leadership & Collaboration
            </p>

            <h2 className="text-3xl font-extrabold leading-tight text-[#056699] md:text-4xl">
              Driven by Purpose. United by Impact.
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              FISDEV brings together leadership, expertise, and a shared
              commitment to turning its mission into practical action.
              Through collaboration and dedicated service, our team works
              towards creating lasting and sustainable impact.
            </p>
          </motion.div>

          {/* Team Members */}
          <motion.div
            variants={staggerContainer}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4"
          >
            {teamMembers.map((person) => (
              <motion.article
                key={person.name}
                variants={revealUp}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -8,
                        transition: { duration: 0.3, ease },
                      }
                }
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
              >
                {/* Profile Image */}
                <div className="relative flex justify-center overflow-hidden bg-gradient-to-br from-sky-50 to-cyan-50 px-5 pt-8">

                  <motion.div
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : { scale: 1.06 }
                    }
                    transition={{ duration: 0.4, ease }}
                    className="h-40 w-40 overflow-hidden rounded-full border-4 border-white bg-white shadow-md"
                  >
                    <img
                      src={person.image}
                      alt={person.name}
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    />
                  </motion.div>

                  <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#1BB7C4]/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />

                </div>

                {/* Profile Details */}
                <div className="px-5 pb-7 pt-6 text-center">

                  <h3 className="text-lg font-extrabold text-[#056699] transition-colors duration-300 group-hover:text-[#1BB7C4]">
                    {person.name}
                  </h3>

                  <p className="mx-auto mt-2 min-h-[48px] max-w-xs text-sm font-semibold leading-6 text-gray-500">
                    {person.role}
                  </p>

                  <motion.div
                    initial={false}
                    className="mx-auto mt-5 h-1 w-12 rounded-full bg-[#1BB7C4] transition-all duration-300 group-hover:w-20"
                  />

                </div>
              </motion.article>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 pb-16 pt-4 md:pb-20">

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
              animate={
                shouldReduceMotion
                  ? undefined
                  : { y: [0, -5, 0] }
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Target
                className="mx-auto mb-6 text-[#7ee8ed]"
                size={42}
              />
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
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -3, scale: 1.02 }
                }
                whileTap={
                  shouldReduceMotion
                    ? undefined
                    : { scale: 0.97 }
                }
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
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -3 }
                }
                whileTap={
                  shouldReduceMotion
                    ? undefined
                    : { scale: 0.97 }
                }
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
