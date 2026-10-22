import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Handshake,
  HeartHandshake,
  Users,
  HandHeart,
  BriefcaseBusiness,
  Lightbulb,
  Sprout,
  GraduationCap,
  Megaphone,
  Landmark,
  Globe2,
  ArrowRight,
  CheckCircle2,
  Mail,
  Target,
  HeartPulse,
} from "lucide-react";

const opportunities = [
  {
    icon: Handshake,
    title: "Strategic Partnerships",
    description:
      "Partner with FISDEV to design and implement inclusive, sustainable initiatives that respond to the needs of young people and underserved communities.",
    points: [
      "Collaborate on development programs",
      "Share expertise, networks, and resources",
      "Support community-led solutions",
    ],
  },
  {
    icon: HandHeart,
    title: "Volunteer With Us",
    description:
      "Contribute your time, knowledge, and energy to initiatives that promote skills development, community participation, well-being, and sustainable livelihoods.",
    points: [
      "Support community activities",
      "Mentor young people and emerging entrepreneurs",
      "Contribute professional or technical skills",
    ],
  },
  {
    icon: BriefcaseBusiness,
    title: "Resource Mobilisation",
    description:
      "Help mobilise financial, technical, material, and institutional resources to support FISDEV's mission and strategic programs.",
    points: [
      "Explore funding and grant opportunities",
      "Contribute relevant equipment or expertise",
      "Connect FISDEV with potential supporters",
    ],
  },
  {
    icon: Lightbulb,
    title: "Innovation and Enterprise",
    description:
      "Work with FISDEV to nurture ideas, strengthen entrepreneurship, encourage technology adoption, and create pathways for sustainable business growth.",
    points: [
      "Share innovative ideas and solutions",
      "Support enterprise development and mentorship",
      "Connect innovators to networks and markets",
    ],
  },
  {
    icon: GraduationCap,
    title: "Skills and Knowledge Sharing",
    description:
      "Help expand access to practical knowledge and skills that strengthen employability, digital inclusion, education, and community resilience.",
    points: [
      "Deliver or support training activities",
      "Provide career guidance and mentorship",
      "Share digital, technical, or business expertise",
    ],
  },
  {
    icon: Megaphone,
    title: "Community Voice and Advocacy",
    description:
      "Support initiatives that amplify the experiences and perspectives of vulnerable groups and encourage participation in addressing social injustice.",
    points: [
      "Support community dialogue and storytelling",
      "Promote inclusive participation",
      "Help raise awareness of community priorities",
    ],
  },
];

const impactAreas = [
  {
    icon: Sprout,
    number: "01",
    title: "Economic Empowerment",
    description:
      "Help strengthen livelihoods through entrepreneurship, smart agriculture, agribusiness, digital skills, and access to economic opportunities.",
  },
  {
    icon: HeartPulse,
    number: "02",
    title: "Essential Social Services",
    description:
      "Support initiatives that contribute to education, early childhood development, health awareness, well-being, and inclusive access to services.",
  },
  {
    icon: Users,
    number: "03",
    title: "Amplifying Community Voices",
    description:
      "Help children, women, young people, people with disabilities, and underserved communities participate meaningfully in development and social justice initiatives.",
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
  { icon: Landmark, title: "Institutions" },
  { icon: BriefcaseBusiness, title: "Businesses" },
  { icon: Globe2, title: "Development Partners" },
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
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const GetInvolved = () => {
  const shouldReduceMotion = useReducedMotion();

  const revealProps = (direction = "up") => ({
    initial: shouldReduceMotion ? false : "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.15 },
    variants: direction === "left" ? revealLeft : direction === "right" ? revealRight : revealUp,
  });

  const hoverLift = shouldReduceMotion ? undefined : { y: -6, transition: { duration: 0.25, ease } };
  const tapScale = shouldReduceMotion ? undefined : { scale: 0.97 };

  return (
    <main className="overflow-hidden bg-[rgb(245,249,252)] text-gray-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[rgb(3,75,113)] px-6 py-20 text-white md:py-28">
        <motion.div
          aria-hidden="true"
          animate={
            shouldReduceMotion ? undefined : { x: [0, 18, 0], y: [0, 14, 0], scale: [1, 1.08, 1] }
          }
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
            <HeartHandshake size={18} />
            Be Part of the Change
          </motion.div>

          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease }}
            className="max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl"
          >
            Get <span className="text-[#1BB7C4]">Involved</span>
          </motion.h1>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mt-6 max-w-3xl text-lg leading-8 text-sky-100 md:text-xl"
          >
            Join FISDEV in empowering young people and underserved communities
            through inclusive opportunities, sustainable solutions, access to
            essential services, and stronger community voices.
          </motion.p>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3, ease }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <motion.a
              href="#opportunities"
              whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.02 }}
              whileTap={tapScale}
              className="inline-flex items-center gap-2 rounded-lg bg-[#1BB7C4] px-6 py-3 font-bold text-white transition-colors duration-300 hover:bg-[#159da8]"
            >
              Explore Opportunities
              <motion.span
                animate={shouldReduceMotion ? undefined : { x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex"
              >
                <ArrowRight size={18} />
              </motion.span>
            </motion.a>

            <motion.div whileHover={hoverLift} whileTap={tapScale}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-6 py-3 font-bold text-white transition-colors duration-300 hover:bg-white/10"
              >
                Contact FISDEV
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="px-6 py-14 md:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-9 md:grid-cols-2 md:gap-12">
          <motion.div {...revealProps("left")}>
            <p className="mb-3 font-bold uppercase tracking-[0.2em] text-[#1BB7C4]">
              Make a Difference
            </p>

            <h2 className="text-3xl font-extrabold leading-tight text-[#056699] md:text-4xl">
              Lasting Change Takes All of Us
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              Sustainable development is a shared responsibility. FISDEV
              welcomes collaboration with individuals, institutions,
              development organisations, businesses, educators, innovators,
              and community stakeholders who share a commitment to inclusive
              and sustainable progress.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              Whether you bring professional expertise, practical skills,
              resources, ideas, networks, or time, your contribution can help
              create opportunities and strengthen community-led development.
            </p>

            <motion.div
              variants={staggerContainer}
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-7 space-y-3"
            >
              {principles.map((principle) => (
                <motion.div key={principle} variants={revealUp} className="group flex items-start gap-3">
                  <CheckCircle2
                    size={21}
                    className="mt-1 shrink-0 text-[#1BB7C4] transition-transform duration-300 group-hover:scale-110"
                  />
                  <p className="text-gray-700 transition-colors duration-300 group-hover:text-[#056699]">
                    {principle}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            {...revealProps("right")}
            whileHover={shouldReduceMotion ? undefined : { y: -4 }}
            transition={{ duration: 0.3, ease }}
            className="rounded-3xl border border-gray-100 bg-white p-8 shadow-lg md:p-10"
          >
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { rotate: 6, scale: 1.06 }}
              transition={{ duration: 0.25 }}
              className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-[#056699]"
            >
              <Target size={34} />
            </motion.div>

            <h3 className="text-2xl font-extrabold text-[#056699]">Where Your Contribution Can Help</h3>

            <p className="mt-4 leading-8 text-gray-600">
              Our work focuses on improving economic opportunities, unlocking
              access to essential social services, and amplifying the voices
              of vulnerable groups facing exclusion and social injustice.
            </p>

            <div className="mt-7 rounded-xl border-l-4 border-[#1BB7C4] bg-[rgb(245,249,252)] p-5 transition-colors duration-300 hover:bg-sky-50">
              <p className="font-semibold leading-7 text-[#056699]">
                Together, we can turn shared commitment into practical,
                sustainable community impact.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Opportunities */}
      <section id="opportunities" className="scroll-mt-24 bg-white px-6 py-14 md:py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div {...revealProps()} className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
            <p className="mb-3 font-bold uppercase tracking-[0.2em] text-[#1BB7C4]">
              Ways to Participate
            </p>

            <h2 className="text-3xl font-extrabold text-[#056699] md:text-4xl">
              Find Your Way to Get Involved
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              There are different ways to contribute to our mission. Explore
              the opportunities below and identify where your interests,
              experience, or resources align with FISDEV's work.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="grid gap-7 md:grid-cols-2 lg:grid-cols-3"
          >
            {opportunities.map((item) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  variants={revealUp}
                  whileHover={shouldReduceMotion ? undefined : { y: -7, transition: { duration: 0.25, ease } }}
                  className="group rounded-2xl border border-gray-100 bg-[rgb(245,249,252)] p-7 transition-all duration-300 hover:border-[#1BB7C4]/50 hover:shadow-xl"
                >
                  <motion.div
                    whileHover={shouldReduceMotion ? undefined : { rotate: 5, scale: 1.06 }}
                    transition={{ duration: 0.25 }}
                    className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white text-[#056699] shadow-sm transition-colors duration-300 group-hover:bg-[#056699] group-hover:text-white"
                  >
                    <Icon size={29} />
                  </motion.div>

                  <h3 className="text-xl font-extrabold text-[#056699] transition-colors duration-300 group-hover:text-[#1BB7C4]">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-7 text-gray-600">{item.description}</p>

                  <ul className="mt-6 space-y-3">
                    {item.points.map((point) => (
                      <li key={point} className="group/point flex items-start gap-2.5">
                        <CheckCircle2
                          size={17}
                          className="mt-1 shrink-0 text-[#1BB7C4] transition-transform duration-300 group-hover/point:scale-110"
                        />
                        <span className="text-sm leading-6 text-gray-600">{point}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className="mt-7 inline-flex items-center gap-2 font-bold text-[#056699] transition-colors duration-300 hover:text-[#1BB7C4]"
                  >
                    Express Your Interest
                    <motion.span
                      className="inline-flex"
                      whileHover={shouldReduceMotion ? undefined : { x: 4 }}
                    >
                      <ArrowRight size={17} />
                    </motion.span>
                  </Link>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Strategic Pillars */}
      <section className="px-6 py-14 md:py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div {...revealProps()} className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
            <p className="mb-3 font-bold uppercase tracking-[0.2em] text-[#1BB7C4]">
              Aligned With Our Mission
            </p>

            <h2 className="text-3xl font-extrabold text-[#056699] md:text-4xl">
              Three Areas Where We Drive Change
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              Contributions and collaborations can support FISDEV's three
              strategic pillars and help create more inclusive, resilient
              communities.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-7 md:grid-cols-3"
          >
            {impactAreas.map((area) => {
              const Icon = area.icon;

              return (
                <motion.article
                  key={area.number}
                  variants={revealUp}
                  whileHover={hoverLift}
                  className="group rounded-2xl border border-sky-100 bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-extrabold text-[#1BB7C4]/50 transition-colors duration-300 group-hover:text-[#1BB7C4]">
                      {area.number}
                    </span>

                    <motion.div
                      whileHover={shouldReduceMotion ? undefined : { rotate: -6, scale: 1.1 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Icon size={30} className="text-[#056699]" />
                    </motion.div>
                  </div>

                  <h3 className="mt-5 text-xl font-extrabold text-[#056699] transition-colors duration-300 group-hover:text-[#1BB7C4]">
                    {area.title}
                  </h3>

                  <p className="mt-4 leading-7 text-gray-600">{area.description}</p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Who Can Collaborate */}
      <section className="bg-white px-6 py-14 md:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-9 md:grid-cols-2 md:gap-12">
          <motion.div {...revealProps("left")}>
            <p className="mb-3 font-bold uppercase tracking-[0.2em] text-[#1BB7C4]">
              Stronger Together
            </p>

            <h2 className="text-3xl font-extrabold leading-tight text-[#056699] md:text-4xl">
              Collaboration Across Communities and Sectors
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              We recognise the importance of partnerships in mobilising
              resources, sharing knowledge, developing practical solutions,
              and extending the reach of sustainable development initiatives.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {partners.map((partner) => {
              const Icon = partner.icon;

              return (
                <motion.div
                  key={partner.title}
                  variants={revealUp}
                  whileHover={hoverLift}
                  className="group rounded-xl border border-sky-100 bg-[rgb(245,249,252)] p-5 text-center transition-colors duration-300 hover:border-[#1BB7C4]/60 hover:bg-white hover:shadow-md"
                >
                  <motion.div
                    whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.08 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Icon
                      size={29}
                      className="mx-auto mb-3 text-[#1BB7C4] transition-colors duration-300 group-hover:text-[#056699]"
                    />
                  </motion.div>

                  <h3 className="font-bold text-[#056699]">{partner.title}</h3>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 pb-16 pt-8 md:pb-20">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease }}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-[#056699] px-7 py-12 text-center text-white md:px-14 md:py-16"
        >
          <motion.div
            aria-hidden="true"
            animate={shouldReduceMotion ? undefined : { x: [0, 12, 0], y: [0, 8, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-[#1BB7C4]/20 blur-3xl"
          />

          <div className="pointer-events-none absolute -bottom-20 -left-12 h-48 w-48 rounded-full bg-sky-300/10 blur-3xl" />

          <div className="relative">
            <motion.div
              animate={shouldReduceMotion ? undefined : { y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <HeartHandshake className="mx-auto mb-6 text-[#7ee8ed]" size={42} />
            </motion.div>

            <h2 className="text-3xl font-extrabold md:text-4xl">Ready to Make a Difference?</h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-sky-100">
              Tell us how you would like to contribute, collaborate, or support
              FISDEV's mission. Let's explore opportunities to work together.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <motion.div whileHover={hoverLift} whileTap={tapScale}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#1BB7C4] px-6 py-3 font-bold text-white transition-colors duration-300 hover:bg-[#159da8]"
                >
                  <Mail size={18} />
                  Get in Touch
                </Link>
              </motion.div>

              <motion.div whileHover={hoverLift} whileTap={tapScale}>
                <Link
                  to="/programs"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-6 py-3 font-bold text-white transition-colors duration-300 hover:bg-white/10"
                >
                  Explore Our Programs
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default GetInvolved;