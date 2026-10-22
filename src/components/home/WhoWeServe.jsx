import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Users,
  Baby,
  Heart,
  GraduationCap,
  Accessibility,
  Sprout,
  ShieldCheck,
  HandHeart,
  BriefcaseBusiness,
  HeartPulse,
  ArrowRight,
  CheckCircle2,
  Globe2,
  Lightbulb,
} from "lucide-react";

const beneficiaries = [
  {
    icon: Baby,
    title: "Children",
    description:
      "We support children to access inclusive learning, early childhood development, safe recreational spaces, and opportunities that nurture their growth and potential.",
    focus: [
      "Early childhood development",
      "Access to quality learning opportunities",
      "Safe, inclusive and supportive environments",
    ],
  },
  {
    icon: Heart,
    title: "Women and Girls",
    description:
      "We promote the empowerment, participation, safety, and well-being of women and girls, helping them overcome barriers and participate meaningfully in social and economic development.",
    focus: [
      "Economic empowerment and entrepreneurship",
      "Gender equality and social inclusion",
      "Sexual and reproductive health awareness",
      "Gender-based violence awareness and support pathways",
    ],
  },
  {
    icon: GraduationCap,
    title: "Young People",
    description:
      "As a youth-led social enterprise, FISDEV works to equip young people with the skills, resources, networks, and opportunities needed to build sustainable livelihoods and contribute to their communities.",
    focus: [
      "Digital, technical and employability skills",
      "Entrepreneurship and business incubation",
      "Agribusiness and livelihood development",
      "Innovation, mentorship and access to markets",
    ],
  },
  {
    icon: Accessibility,
    title: "People with Disabilities",
    description:
      "We seek to promote inclusive participation and reduce barriers that prevent people with disabilities from accessing services, developing their abilities, and benefiting from economic and social opportunities.",
    focus: [
      "Inclusive access to opportunities and services",
      "Participation in community development",
      "Skills development and economic inclusion",
      "Respect, accessibility and equal dignity",
    ],
  },
  {
    icon: Users,
    title: "Underserved Communities",
    description:
      "We work with communities facing social and economic exclusion, particularly people with limited access to essential services, livelihood opportunities, and platforms for expressing their concerns.",
    focus: [
      "Community participation and amplified voices",
      "Access to essential social services",
      "Sustainable livelihoods and smart agriculture",
      "Community-led solutions and resilience",
    ],
  },
];

const commitments = [
  {
    icon: HandHeart,
    title: "People-Centred Development",
    description:
      "We recognise people as active participants in development, supporting them to identify challenges, shape solutions, and strengthen their own capabilities.",
  },
  {
    icon: ShieldCheck,
    title: "Inclusion and Dignity",
    description:
      "We work towards fairer opportunities and meaningful participation, with attention to groups who face barriers to services and development.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Economic Empowerment",
    description:
      "We promote skills, entrepreneurship, innovation, and sustainable livelihood opportunities that can strengthen economic independence.",
  },
  {
    icon: HeartPulse,
    title: "Well-being and Essential Services",
    description:
      "We support initiatives that contribute to health awareness, education, safety, and improved access to essential social services.",
  },
  {
    icon: Lightbulb,
    title: "Innovation and Resilience",
    description:
      "We encourage practical, locally relevant solutions that help people and communities adapt, grow, and become more self-reliant.",
  },
  {
    icon: Globe2,
    title: "Community Voices and Partnerships",
    description:
      "We value local knowledge, community participation, collaboration, and partnerships that help create sustainable and inclusive change.",
  },
];

const supportAreas = [
  {
    icon: GraduationCap,
    title: "Skills and Education",
    description: "Supporting learning, digital inclusion, technical training, and employability.",
  },
  {
    icon: Sprout,
    title: "Sustainable Livelihoods",
    description: "Promoting agribusiness, entrepreneurship, innovation, and economic resilience.",
  },
  {
    icon: HeartPulse,
    title: "Health and Well-being",
    description: "Encouraging health awareness, mental well-being, and access to support services.",
  },
  {
    icon: Globe2,
    title: "Voices and Participation",
    description:
      "Creating opportunities for people to express concerns and shape community solutions.",
  },
];

const easing = [0.22, 1, 0.36, 1];

const revealUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easing } },
};

const revealLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: easing } },
};

const revealRight = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: easing } },
};

const staggerChildren = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.04 } },
};

const WhoWeServe = () => {
  const shouldReduceMotion = useReducedMotion();

  const revealProps = shouldReduceMotion
    ? {}
    : { initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.12 } };

  const hoverProps = shouldReduceMotion
    ? {}
    : { whileHover: { y: -5 }, transition: { duration: 0.25, ease: easing } };

  const iconHoverProps = shouldReduceMotion
    ? {}
    : { whileHover: { scale: 1.08, rotate: 4 }, transition: { duration: 0.25, ease: easing } };

  const buttonMotion = shouldReduceMotion ? {} : { whileHover: { scale: 1.035 }, whileTap: { scale: 0.97 } };

  return (
    <main className="min-h-screen overflow-hidden bg-[rgb(245,249,252)] text-gray-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[rgb(3,75,113)] px-5 py-14 text-white sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        {!shouldReduceMotion && (
          <>
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#1BB7C4]/20 blur-3xl"
              animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-sky-300/10 blur-3xl"
              animate={{ scale: [1.08, 1, 1.08], x: [0, 10, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}

        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          variants={staggerChildren}
          className="relative mx-auto max-w-7xl"
        >
          <motion.div
            variants={revealUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold"
          >
            <Users size={17} className="text-[#1BB7C4]" />
            People at the Centre of Development
          </motion.div>

          <motion.h1
            variants={revealUp}
            className="max-w-4xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl"
          >
            Who We <span className="text-[#1BB7C4]">Serve</span>
          </motion.h1>

          <motion.div variants={revealUp} className="mt-4 h-1 w-20 rounded-full bg-[#1BB7C4]" />

          <motion.p
            variants={revealUp}
            className="mt-5 max-w-3xl text-base leading-8 text-sky-100 sm:text-lg"
          >
            FISDEV works with children, women, young people, people with
            disabilities, and underserved communities to advance inclusion,
            strengthen livelihoods, improve access to essential services, and
            promote a life of dignity.
          </motion.p>

          <motion.div variants={revealUp} className="mt-7 flex flex-wrap gap-3">
            <motion.div {...buttonMotion}>
              <Link
                to="/programs"
                className="inline-flex items-center gap-2 rounded-lg bg-[#1BB7C4] px-6 py-3 font-bold text-white transition-colors duration-300 hover:bg-[#159da8]"
              >
                Explore Our Programs
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div {...buttonMotion}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-6 py-3 font-bold text-white transition-colors duration-300 hover:bg-white/10"
              >
                Work With Us
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Introduction */}
      <section className="px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-9 md:grid-cols-2 lg:gap-14">
          <motion.div {...revealProps} variants={revealLeft}>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#159da8]">
              Our Commitment
            </p>

            <h2 className="text-3xl font-extrabold leading-tight text-[#056699] sm:text-4xl">
              Inclusive Opportunities for People and Communities
            </h2>

            <div className="mt-4 h-1 w-16 rounded-full bg-[#1BB7C4]" />

            <p className="mt-5 leading-8 text-gray-600">
              FISDEV is committed to empowering young people and underserved
              communities through innovative, sustainable, and inclusive
              pathways for economic growth, access to essential services, and
              social justice.
            </p>

            <p className="mt-3 leading-8 text-gray-600">
              We recognise that individuals and communities experience
              different challenges. Our work therefore focuses on understanding
              local needs, building capabilities, connecting people to
              opportunities, and supporting solutions that promote long-term
              resilience and self-reliance.
            </p>

            <motion.div variants={staggerChildren} className="mt-6 space-y-3">
              {[
                "Recognising the abilities and potential of every person",
                "Reducing barriers to participation and opportunity",
                "Supporting sustainable and community-led development",
              ].map((item) => (
                <motion.div key={item} variants={revealUp} className="flex items-start gap-3">
                  <CheckCircle2 size={21} className="mt-1 shrink-0 text-[#1BB7C4]" />
                  <p className="text-gray-700">{item}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div {...revealProps} variants={revealRight} className="relative">
            <div className="absolute -left-2 -top-2 h-20 w-20 rounded-tl-3xl border-l-4 border-t-4 border-[#1BB7C4] sm:-left-3 sm:-top-3 sm:h-24 sm:w-24" />

            <motion.div {...hoverProps} className="relative rounded-2xl bg-white p-6 shadow-xl sm:p-8">
              <motion.div
                {...iconHoverProps}
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-[#056699] sm:h-16 sm:w-16"
              >
                <HandHeart size={32} />
              </motion.div>

              <h3 className="text-2xl font-extrabold text-[#056699]">No One Left Behind</h3>

              <p className="mt-3 leading-8 text-gray-600">
                Our commitment is to contribute to a society where people can
                access opportunities, have their voices heard, participate in
                development, and pursue a dignified and sustainable future.
              </p>

              <div className="mt-6 rounded-xl border-l-4 border-[#1BB7C4] bg-[rgb(245,249,252)] p-4 sm:p-5">
                <p className="font-semibold leading-7 text-[#056699]">
                  Empowering people. Strengthening communities. Advancing
                  inclusive and sustainable development.
                </p>
              </div>
            </motion.div>

            <div className="absolute -bottom-2 -right-2 h-16 w-16 rounded-br-3xl border-b-4 border-r-4 border-[#1BB7C4] sm:-bottom-3 sm:-right-3 sm:h-20 sm:w-20" />
          </motion.div>
        </div>
      </section>

      {/* Beneficiary Groups */}
      <section className="bg-white px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            {...revealProps}
            variants={revealUp}
            className="mx-auto mb-9 max-w-3xl text-center"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#159da8]">
              Our Target Groups
            </p>

            <h2 className="text-3xl font-extrabold text-[#056699] sm:text-4xl">
              Who Benefits from Our Work?
            </h2>

            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#1BB7C4]" />

            <p className="mt-5 leading-8 text-gray-600">
              Our programs respond to the needs and potential of different
              groups, creating pathways to skills, services, livelihoods,
              participation, and improved well-being.
            </p>
          </motion.div>

          <motion.div
            {...revealProps}
            variants={staggerChildren}
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {beneficiaries.map((group) => {
              const Icon = group.icon;

              return (
                <motion.article
                  key={group.title}
                  variants={revealUp}
                  {...hoverProps}
                  className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-[rgb(245,249,252)] p-6 transition-colors duration-300 hover:border-[#1BB7C4]/50 hover:shadow-xl sm:p-7"
                >
                  <motion.div
                    {...iconHoverProps}
                    className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-white text-[#056699] shadow-sm transition-colors duration-300 group-hover:bg-[#056699] group-hover:text-white"
                  >
                    <Icon size={29} />
                  </motion.div>

                  <h3 className="text-xl font-extrabold text-[#056699]">{group.title}</h3>

                  <p className="mt-3 leading-7 text-gray-600">{group.description}</p>

                  <div className="my-5 h-px bg-gray-200" />

                  <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-800">
                    Areas of Focus
                  </h4>

                  <ul className="space-y-2.5">
                    {group.focus.map((item, index) => (
                      <motion.li
                        key={item}
                        initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
                        whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.35,
                          delay: shouldReduceMotion ? 0 : index * 0.06,
                          ease: easing,
                        }}
                        className="flex items-start gap-2.5"
                      >
                        <CheckCircle2
                          size={17}
                          className="mt-1 shrink-0 text-[#1BB7C4]"
                          aria-hidden="true"
                        />
                        <span className="text-sm leading-6 text-gray-600">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* How We Support Communities */}
      <section className="px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            {...revealProps}
            variants={revealUp}
            className="mx-auto mb-9 max-w-3xl text-center"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#159da8]">
              How We Make a Difference
            </p>

            <h2 className="text-3xl font-extrabold text-[#056699] sm:text-4xl">
              Turning Needs into Opportunities
            </h2>

            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#1BB7C4]" />

            <p className="mt-5 leading-8 text-gray-600">
              We connect our target groups with practical interventions that
              build skills, expand access, support enterprise, and strengthen
              community participation.
            </p>
          </motion.div>

          <motion.div
            {...revealProps}
            variants={staggerChildren}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {supportAreas.map((item) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  variants={revealUp}
                  {...hoverProps}
                  className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg"
                >
                  <motion.div {...iconHoverProps} className="mb-4 inline-flex">
                    <Icon size={30} className="text-[#1BB7C4]" />
                  </motion.div>

                  <h3 className="text-lg font-bold text-[#056699]">{item.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600">{item.description}</p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Our Commitments */}
      <section className="relative overflow-hidden bg-[#056699] px-5 py-12 text-white sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        {!shouldReduceMotion && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#1BB7C4]/15 blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            {...revealProps}
            variants={revealUp}
            className="mx-auto mb-9 max-w-3xl text-center"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#7ee8ed]">
              Our Promise
            </p>

            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Principles That Guide Our Work
            </h2>

            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#1BB7C4]" />

            <p className="mt-5 leading-8 text-sky-100">
              Every intervention is guided by our commitment to inclusion,
              innovation, accountability, partnership, and sustainable community
              development.
            </p>
          </motion.div>

          <motion.div
            {...revealProps}
            variants={staggerChildren}
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {commitments.map((item) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  variants={revealUp}
                  {...hoverProps}
                  className="rounded-2xl border border-white/15 bg-white/10 p-6 transition-colors duration-300 hover:bg-white/15"
                >
                  <motion.div
                    {...iconHoverProps}
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1BB7C4] text-white"
                  >
                    <Icon size={25} />
                  </motion.div>

                  <h3 className="text-lg font-bold">{item.title}</h3>

                  <p className="mt-3 leading-7 text-sky-100">{item.description}</p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <motion.div
          {...revealProps}
          variants={revealUp}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl bg-white px-6 py-9 text-center shadow-lg sm:px-10 sm:py-12 lg:px-14"
        >
          {!shouldReduceMotion && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-[#1BB7C4]/10 blur-3xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          <div className="relative">
            <motion.div
              {...iconHoverProps}
              className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-[#056699] sm:h-16 sm:w-16"
            >
              <Users size={32} />
            </motion.div>

            <h2 className="text-3xl font-extrabold text-[#056699] sm:text-4xl">
              Let's Build Inclusive Opportunities Together
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-8 text-gray-600">
              Join FISDEV in supporting people and communities to develop their
              potential, access opportunities, and contribute to a more
              inclusive and sustainable future.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <motion.div {...buttonMotion}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#1BB7C4] px-6 py-3 font-bold text-white transition-colors duration-300 hover:bg-[#159da8]"
                >
                  Partner With Us
                  <motion.span
                    animate={shouldReduceMotion ? {} : { x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight size={18} />
                  </motion.span>
                </Link>
              </motion.div>

              <motion.div {...buttonMotion}>
                <Link
                  to="/programs"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#056699] px-6 py-3 font-bold text-[#056699] transition-colors duration-300 hover:bg-sky-50"
                >
                  Discover Our Programs
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default WhoWeServe;