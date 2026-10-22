import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const AnimatedSDGNumber = ({ number }) => {
  const target = Number(number);
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const element = counterRef.current;
    if (!element || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();

          const duration = 1400;
          const startTime = performance.now();

          const animate = (currentTime) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(easedProgress * target);

            setCount(currentCount);
            if (progress < 1) requestAnimationFrame(animate);
            else setCount(target);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <span ref={counterRef} className="tabular-nums">
      {String(count).padStart(2, "0")}
    </span>
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -45 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 45 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardAnimation = {
  hidden: { opacity: 0, y: 35, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const About = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-[rgb(245,249,252)]">
      {/* ========================= PAGE HERO ========================== */}
      <section className="relative overflow-hidden bg-[rgb(3,75,113)] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        {/* Decorative animated circles */}
        <motion.div
          className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#1BB7C4]/15 blur-3xl"
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#1BB7C4]/10 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1BB7C4]"
          >
            Who We Are
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
          >
            About FISDEV
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 h-1 w-20 origin-left rounded-full bg-[#1BB7C4]"
          />

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-3xl text-base leading-8 text-white/85 sm:text-lg"
          >
            Foundation for Inclusive and Sustainable Development is a Malawian
            youth-led social enterprise committed to building inclusive,
            sustainable and dignified pathways out of poverty.
          </motion.p>
        </div>
      </section>

      {/* ========================= WHO WE ARE ========================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            {/* Text */}
            <motion.div variants={fadeLeft}>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#1BB7C4]">
                Who We Are
              </p>

              <h2 className="mt-3 text-3xl font-bold leading-tight text-[#056699] sm:text-4xl">
                Building Sustainable Pathways Out of Poverty
              </h2>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-4 h-1 rounded-full bg-[#1BB7C4]"
              />

              <p className="mt-6 leading-8 text-gray-600">
                The Foundation for Inclusive and Sustainable Development
                (FISDEV) is a Malawian youth-led social enterprise registered
                under the company's incorporation Act. We are dedicated to
                challenging the social status quo, breaking vicious cycles of
                poverty, and building sustainable pathways for youth and other
                underserved communities in both urban and rural areas to
                achieve economic independence and successfully transition out
                of poverty.
              </p>

              <p className="mt-5 leading-8 text-gray-600">
                FISDEV integrates youth- and community-centric sustainable
                solutions to accelerate inclusive, equitable development across
                Malawi. Our work blends economic empowerment, social service
                access, and advocacy for vulnerable groups.
              </p>
            </motion.div>

            {/* Identity Card */}
            <motion.div
              variants={fadeRight}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="rounded-2xl border border-[#1BB7C4]/15 bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl sm:p-8"
            >
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 150 }}
                className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#1BB7C4]/10 text-[#056699]"
              >
                <svg
                  className="h-7 w-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 21h18" />
                  <path d="M5 21V8l7-5 7 5v13" />
                  <path d="M9 21v-4h6v4" />
                  <path d="M9 10h.01M15 10h.01M9 13h.01M15 13h.01" />
                </svg>
              </motion.div>

              <h3 className="mt-5 text-xl font-bold text-[#056699]">
                A Youth-Led Social Enterprise
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                FISDEV works with young people, communities and partners to
                create practical solutions that promote economic independence,
                access to essential services and social justice.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ========================= PURPOSE AND DIRECTION ========================== */}
      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-[#1BB7C4]">
              Our Purpose and Direction
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#056699] sm:text-4xl">
              Why We Exist and Where We Are Going
            </h2>

            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#1BB7C4]" />

            <p className="mt-5 leading-7 text-gray-600">
              Discover the vision, mission and guiding approach behind our
              commitment to inclusive and sustainable development.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-10 grid gap-6 md:grid-cols-2"
          >
            {/* Vision */}
            <motion.article
              variants={cardAnimation}
              whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25 } }}
              className="rounded-2xl border border-gray-100 bg-[rgb(245,249,252)] p-7 transition-shadow duration-300 hover:shadow-xl sm:p-8"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 3 }}
                transition={{ duration: 0.25 }}
                className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#056699]/10 text-[#056699]"
              >
                <svg
                  className="h-7 w-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </motion.div>

              <h3 className="mt-5 text-xl font-bold text-[#056699]">Our Vision</h3>

              <p className="mt-3 leading-7 text-gray-600">
                A society where youth and communities thrive through inclusive
                opportunities, sustainable solutions and amplified voices
                towards a life with dignity and poverty free.
              </p>
            </motion.article>

            {/* Mission */}
            <motion.article
              variants={cardAnimation}
              whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25 } }}
              className="rounded-2xl border border-gray-100 bg-[rgb(245,249,252)] p-7 transition-shadow duration-300 hover:shadow-xl sm:p-8"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: -3 }}
                transition={{ duration: 0.25 }}
                className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#1BB7C4]/10 text-[#056699]"
              >
                <svg
                  className="h-7 w-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="2.5" />
                  <path d="M12 3v4M21 12h-4M12 21v-4M3 12h4" />
                </svg>
              </motion.div>

              <h3 className="mt-5 text-xl font-bold text-[#056699]">Our Mission</h3>

              <p className="mt-3 leading-7 text-gray-600">
                To empower young people and underserved communities by
                providing innovative, sustainable and inclusive pathways for
                economic growth, access to essential services and social
                justice across diverse sectors.
              </p>
            </motion.article>

            {/* Foundation */}
            <motion.article
              variants={cardAnimation}
              whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25 } }}
              className="rounded-2xl border border-gray-100 bg-[rgb(245,249,252)] p-7 transition-shadow duration-300 hover:shadow-xl sm:p-8"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 3 }}
                transition={{ duration: 0.25 }}
                className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#1BB7C4]/10 text-[#056699]"
              >
                <svg
                  className="h-7 w-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3 4 7v5c0 5 3.5 8 8 9 4.5-1 8-4 8-9V7l-8-4Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </motion.div>

              <h3 className="mt-5 text-xl font-bold text-[#056699]">Our Foundation</h3>

              <p className="mt-3 leading-7 text-gray-600">
                In Malawi, where over 70% of the population is under 35, youth
                face barriers to education, decent work and decision-making.
                Rural communities remain vulnerable to poverty, food insecurity
                and climate shocks — inspiring the creation of FISDEV.
              </p>
            </motion.article>

            {/* Approach */}
            <motion.article
              variants={cardAnimation}
              whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25 } }}
              className="rounded-2xl border border-gray-100 bg-[rgb(245,249,252)] p-7 transition-shadow duration-300 hover:shadow-xl sm:p-8"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: -3 }}
                transition={{ duration: 0.25 }}
                className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#056699]/10 text-[#056699]"
              >
                <svg
                  className="h-7 w-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                  <path d="M5.5 5.5 4 4M18.5 5.5 20 4" />
                </svg>
              </motion.div>

              <h3 className="mt-5 text-xl font-bold text-[#056699]">Our Approach</h3>

              <p className="mt-3 leading-7 text-gray-600">
                We empower youth and underserved communities through three
                strategic pillars: advancing economic empowerment, unlocking
                access to essential social services, and amplifying the voices
                of vulnerable groups on social injustice.
              </p>
            </motion.article>
          </motion.div>
        </div>
      </section>

      {/* ========================= STRATEGIC ALIGNMENT ========================== */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-[#1BB7C4]">
              Our Strategic Alignment
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#056699] sm:text-4xl">
              Working Towards Shared Development Goals
            </h2>

            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#1BB7C4]" />

            <p className="mt-5 leading-7 text-gray-600">
              Our work is connected to Malawi's national development agenda,
              continental priorities and global development commitments.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-10 space-y-6"
          >
            {/* National */}
            <motion.article
              variants={cardAnimation}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl sm:p-9"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#056699]/10 text-[#056699]"
                >
                  <svg
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 21h18" />
                    <path d="M5 21V10l7-5 7 5v11" />
                    <path d="M9 21v-5h6v5" />
                    <path d="M9 11h.01M15 11h.01M9 14h.01M15 14h.01" />
                  </svg>
                </motion.div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-[#056699]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#056699]">
                      01
                    </span>
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#1BB7C4]">
                      National Alignment
                    </p>
                  </div>

                  <h3 className="mt-3 text-2xl font-bold text-[#056699]">Malawi 2063</h3>

                  <p className="mt-4 leading-7 text-gray-600">
                    We are strongly aligned with Malawi 2063 — "an inclusively
                    wealthy and self-reliant nation" — through human capital
                    development, private sector-led growth, agricultural
                    commercialisation and enterprise growth.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {[
                      "Human Capital Development",
                      "Private Sector Growth",
                      "Agricultural Commercialisation",
                      "Enterprise Growth",
                    ].map((item) => (
                      <motion.span
                        key={item}
                        whileHover={{ scale: 1.04 }}
                        className="rounded-full bg-[rgb(245,249,252)] px-3 py-2 text-sm text-gray-600"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>

            {/* African */}
            <motion.article
              variants={cardAnimation}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl sm:p-9"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <motion.div
                  whileHover={{ scale: 1.08, rotate: -3 }}
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#1BB7C4]/10 text-[#056699]"
                >
                  <svg
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18" />
                    <path d="M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9S9.5 5.5 12 3Z" />
                  </svg>
                </motion.div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-[#1BB7C4]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#056699]">
                      02
                    </span>
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#1BB7C4]">
                      African Alignment
                    </p>
                  </div>

                  <h3 className="mt-3 text-2xl font-bold text-[#056699]">
                    African Union Agenda 2063
                  </h3>

                  <p className="mt-4 leading-7 text-gray-600">
                    FISDEV contributes to the aspirations of the African Union
                    Agenda 2063, particularly Aspirations 1, 4 and 6, which
                    promote inclusive growth, transformed economies, youth
                    opportunities and people-driven development.
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {[
                      {
                        title: "Aspiration 1",
                        description:
                          "A prosperous Africa based on inclusive growth and sustainable development.",
                      },
                      {
                        title: "Aspiration 4",
                        description:
                          "Transformed economies creating opportunities, especially for young people.",
                      },
                      {
                        title: "Aspiration 6",
                        description:
                          "People-driven development that puts communities at the centre.",
                      },
                    ].map((item) => (
                      <motion.div
                        key={item.title}
                        whileHover={{ y: -4, scale: 1.02 }}
                        transition={{ duration: 0.25 }}
                        className="rounded-xl bg-[rgb(245,249,252)] p-4"
                      >
                        <p className="text-sm font-bold text-[#056699]">{item.title}</p>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          {item.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>

            {/* Global */}
            <motion.article
              variants={cardAnimation}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl sm:p-9"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#056699]/10 text-[#056699]"
                >
                  <svg
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18" />
                    <path d="M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9S9.5 5.5 12 3Z" />
                    <path d="M5 7h14M5 17h14" />
                  </svg>
                </motion.div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-[#056699]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#056699]">
                      03
                    </span>
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#1BB7C4]">
                      Global Alignment
                    </p>
                  </div>

                  <h3 className="mt-3 text-2xl font-bold text-[#056699]">
                    Sustainable Development Goals
                  </h3>

                  <p className="mt-4 leading-7 text-gray-600">
                    FISDEV's work contributes to the Sustainable Development
                    Goals by addressing poverty, inequality, decent work,
                    innovation, responsible production, climate action and
                    partnerships.
                  </p>

                  <motion.div
                    variants={staggerContainer}
                    className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
                  >
                    {[
                      ["01", "No Poverty"],
                      ["05", "Gender Equality"],
                      ["08", "Decent Work"],
                      ["09", "Industry & Innovation"],
                      ["10", "Reduced Inequalities"],
                      ["12", "Responsible Consumption"],
                      ["13", "Climate Action"],
                      ["17", "Partnerships"],
                    ].map(([number, title]) => (
                      <motion.div
                        key={number}
                        variants={cardAnimation}
                        whileHover={{ y: -4, scale: 1.03 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-center gap-3 rounded-xl bg-[rgb(245,249,252)] p-3.5"
                      >
                        <motion.span
                          whileHover={{ scale: 1.12, rotate: 5 }}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1BB7C4]/15 text-xs font-bold text-[#056699]"
                        >
                          <AnimatedSDGNumber number={number} />
                        </motion.span>
                        <span className="text-sm font-medium text-gray-600">{title}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.article>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default About;