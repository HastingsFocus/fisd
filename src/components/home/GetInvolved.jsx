
import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Handshake,
  HeartHandshake,
  Users,
  HandHeart,
  BriefcaseBusiness,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Mail,
  Sprout,
  MessageCircle,
  Award,
  Lightbulb,
  Target,
} from "lucide-react";

const opportunities = [
  {
    number: "01",
    icon: Handshake,
    title: "Partner Us",
    description:
      "Support our existing initiatives or collaborate with FISDEV to co-design and implement innovative projects aligned with our strategic goals and shared development priorities.",
    points: [
      "Support existing FISDEV initiatives",
      "Co-design innovative development projects",
      "Build partnerships around shared priorities",
    ],
    button: "Join Our Community",
    link: "https://chat.whatsapp.com/DQqgLnEvY7kD8L9QHbO5bp?s=cl&p=a&mlu=4&ilr=4&iam=2",
  },
  {
    number: "02",
    icon: HandHeart,
    title: "Join as Volunteer",
    description:
      "Contribute your time, skills, and expertise to transform communities while gaining practical experience and advancing your personal and professional growth.",
    points: [
      "Contribute your time and skills",
      "Support community development activities",
      "Gain practical and professional experience",
    ],
    button: "Join as Volunteer",
    link: "https://chat.whatsapp.com/FiH5age4i1cBrGuGDikyXn?s=cl&p=a&mlu=4&ilr=4&iam=2",
  },
  {
    number: "03",
    icon: Users,
    title: "Pool of Mentors",
    description:
      "Share your knowledge and experience to guide young people, women, and early-stage entrepreneurs towards personal growth, business success, and sustainable livelihoods.",
    points: [
      "Share knowledge and professional experience",
      "Guide emerging entrepreneurs",
      "Support personal growth and sustainable livelihoods",
    ],
    button: "Join the Mentor Pool",
    link: "https://chat.whatsapp.com/EEe05Ld3dbLKN9wuSmUmS0?s=cl&p=a&mlu=4&ilr=4&iam=2",
  },
  {
    number: "04",
    icon: Lightbulb,
    title: "Pool of Coaches",
    description:
      "Empower early-stage entrepreneurs to strengthen their business models, mobilise resources, access markets, and build resilient, sustainable enterprises.",
    points: [
      "Strengthen business models",
      "Support resource mobilisation and market access",
      "Build resilient and sustainable enterprises",
    ],
    button: "Join the Coach Pool",
    link: "https://chat.whatsapp.com/K9eQ8p6k0oC3sMJ18efUXX?s=cl&p=a&mlu=4&ilr=4&iam=2",
  },
  {
    number: "05",
    icon: Award,
    title: "Certified Trainers",
    description:
      "Apply your expertise in enterprise development, youth leadership, digital innovation, skills development, or community-led systems change to build capacity and empower communities.",
    points: [
      "Deliver training and capacity-building initiatives",
      "Share expertise in relevant development fields",
      "Empower communities through practical learning",
    ],
    button: "Join the Trainer Pool",
    link: "https://chat.whatsapp.com/GuTQCAb8HL8JyCU8QiNiLk?s=cl&p=a&mlu=4&ilr=4&iam=2",
  },
];

const principles = [
  "Inclusion and equal opportunity",
  "Integrity and accountability",
  "Innovation and practical solutions",
  "Partnership and collaboration",
  "Sustainability and community resilience",
];

const partners = [
  { icon: Users, title: "Community Groups" },
  { icon: BriefcaseBusiness, title: "Businesses" },
  { icon: GraduationCap, title: "Educators and Trainers" },
  { icon: Sprout, title: "Development Organisations" },
];

const ease = [0.22, 1, 0.36, 1];

const revealUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const GetInvolved = () => {
  const shouldReduceMotion = useReducedMotion();

  const revealProps = {
    initial: shouldReduceMotion ? false : "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.15 },
    variants: revealUp,
  };

  const hoverLift = shouldReduceMotion
    ? undefined
    : { y: -5, transition: { duration: 0.25, ease } };

  return (
    <main className="overflow-hidden bg-[rgb(245,249,252)] text-gray-800">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[rgb(3,75,113)] px-5 py-20 text-white sm:px-8 md:py-28 lg:px-12">
        <motion.div
          aria-hidden="true"
          animate={
            shouldReduceMotion
              ? undefined
              : { x: [0, 18, 0], y: [0, 14, 0], scale: [1, 1.08, 1] }
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
            shouldReduceMotion ? undefined : { x: [0, -16, 0], y: [0, -12, 0] }
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
            {...revealProps}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm"
          >
            <HeartHandshake size={18} />
            Be Part of the Change
          </motion.div>

          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="max-w-4xl text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl"
          >
            Get <span className="text-[#1BB7C4]">Involved</span>
          </motion.h1>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mt-6 max-w-3xl text-lg leading-8 text-sky-100 md:text-xl"
          >
            Be part of a growing community of partners, volunteers, mentors,
            coaches, and trainers working together to empower people and
            transform communities through sustainable development.
          </motion.p>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3, ease }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#opportunities"
              className="inline-flex items-center gap-2 rounded-lg bg-[#1BB7C4] px-6 py-3 font-bold text-white transition-colors duration-300 hover:bg-[#159da8]"
            >
              Explore Opportunities
              <ArrowRight size={18} />
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-6 py-3 font-bold text-white transition-colors duration-300 hover:bg-white/10"
            >
              Contact FISDEV
            </Link>
          </motion.div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="px-5 py-14 sm:px-8 md:py-16 lg:px-12">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2 md:gap-12">
          <motion.div {...revealProps}>
            <p className="mb-3 font-bold uppercase tracking-[0.2em] text-[#1BB7C4]">
              Make a Difference
            </p>

            <h2 className="text-3xl font-extrabold leading-tight text-[#056699] md:text-4xl">
              Lasting Change Takes All of Us
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              Sustainable development is a shared responsibility. FISDEV
              welcomes individuals, professionals, institutions, businesses,
              and organisations who want to contribute their knowledge,
              experience, time, and resources towards meaningful community
              development.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              Whether you want to volunteer, mentor an entrepreneur, coach a
              growing business, deliver training, or collaborate on development
              initiatives, there is an opportunity for you to contribute.
            </p>

            <div className="mt-7 space-y-3">
              {principles.map((principle) => (
                <div key={principle} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="mt-1 shrink-0 text-[#1BB7C4]"
                  />
                  <p className="text-gray-700">{principle}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            {...revealProps}
            whileHover={hoverLift}
            className="rounded-3xl border border-gray-100 bg-white p-7 shadow-lg sm:p-9"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-[#056699]">
              <Target size={34} />
            </div>

            <h3 className="text-2xl font-extrabold text-[#056699]">
              Your Skills. Our Shared Mission.
            </h3>

            <p className="mt-4 leading-8 text-gray-600">
              Every contribution matters. By bringing people, knowledge,
              expertise, and opportunities together, we can support innovative
              solutions, strengthen local capacity, and create pathways towards
              sustainable livelihoods.
            </p>

            <div className="mt-7 rounded-xl border-l-4 border-[#1BB7C4] bg-[rgb(245,249,252)] p-5">
              <p className="font-semibold leading-7 text-[#056699]">
                Choose an opportunity that matches your experience, interests,
                and passion for community development.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FIVE PARTICIPATION OPPORTUNITIES */}
      <section
        id="opportunities"
        className="scroll-mt-24 bg-white px-5 py-14 sm:px-8 md:py-16 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            {...revealProps}
            className="mx-auto mb-10 max-w-3xl text-center md:mb-12"
          >
            <p className="mb-3 font-bold uppercase tracking-[0.2em] text-[#1BB7C4]">
              Ways to Participate
            </p>

            <h2 className="text-3xl font-extrabold text-[#056699] md:text-4xl">
              Find Your Place in Our Mission
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              Explore our five participation opportunities and connect with
              the community that aligns with your interests, skills, and
              experience.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {opportunities.map((item) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.number}
                  variants={revealUp}
                  whileHover={hoverLift}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-[rgb(245,249,252)] p-6 transition-all duration-300 hover:border-[#1BB7C4]/60 hover:shadow-xl sm:p-7"
                >
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#056699] to-[#1BB7C4]" />

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-[#056699] shadow-sm transition-colors duration-300 group-hover:bg-[#056699] group-hover:text-white">
                      <Icon size={28} strokeWidth={1.8} />
                    </div>

                    <span className="text-3xl font-extrabold text-[#056699]/15">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-extrabold leading-snug text-[#056699] transition-colors duration-300 group-hover:text-[#159da8] sm:text-2xl">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-7 text-gray-600">
                    {item.description}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <CheckCircle2
                          size={17}
                          className="mt-1 shrink-0 text-[#1BB7C4]"
                        />
                        <span className="text-sm leading-6 text-gray-600">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#056699] px-5 py-3 font-bold text-white transition-all duration-300 hover:bg-[#034b71] focus:outline-none focus:ring-2 focus:ring-[#1BB7C4] focus:ring-offset-2"
                  >
                    <MessageCircle size={18} />
                    {item.button}
                    <ArrowRight size={17} />
                  </a>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* WHO CAN PARTICIPATE */}
      <section className="px-5 py-14 sm:px-8 md:py-16 lg:px-12">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2 md:gap-12">
          <motion.div {...revealProps}>
            <p className="mb-3 font-bold uppercase tracking-[0.2em] text-[#1BB7C4]">
              Stronger Together
            </p>

            <h2 className="text-3xl font-extrabold leading-tight text-[#056699] md:text-4xl">
              Collaboration Across Communities and Sectors
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              We welcome people and organisations with diverse experiences,
              perspectives, and expertise. Together, we can build meaningful
              relationships, share knowledge, and strengthen community-led
              development.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-2 gap-4"
          >
            {partners.map((partner) => {
              const Icon = partner.icon;

              return (
                <motion.div
                  key={partner.title}
                  variants={revealUp}
                  whileHover={hoverLift}
                  className="group rounded-xl border border-sky-100 bg-white p-5 text-center transition-all duration-300 hover:border-[#1BB7C4]/60 hover:shadow-md"
                >
                  <Icon
                    size={30}
                    className="mx-auto mb-3 text-[#1BB7C4] transition-colors duration-300 group-hover:text-[#056699]"
                  />

                  <h3 className="font-bold text-[#056699]">
                    {partner.title}
                  </h3>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 pb-16 pt-4 sm:px-8 md:pb-20 lg:px-12">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease }}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-[#056699] px-6 py-12 text-center text-white sm:px-10 md:px-14 md:py-16"
        >
          <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-[#1BB7C4]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-12 h-48 w-48 rounded-full bg-sky-300/10 blur-3xl" />

          <div className="relative">
            <HeartHandshake
              className="mx-auto mb-6 text-[#7ee8ed]"
              size={44}
            />

            <h2 className="text-3xl font-extrabold md:text-4xl">
              Together, We Can Make a Difference
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-sky-100">
              Your knowledge, skills, time, and commitment can help create
              opportunities and advance sustainable community development.
              Connect with FISDEV and become part of the change.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-[#1BB7C4] px-6 py-3 font-bold text-white transition-colors duration-300 hover:bg-[#159da8]"
              >
                <Mail size={18} />
                Get in Touch
              </Link>

              <Link
                to="/programs"
                className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-6 py-3 font-bold text-white transition-colors duration-300 hover:bg-white/10"
              >
                Explore Our Programs
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default GetInvolved;
