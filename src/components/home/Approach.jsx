import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Compass,
  Sprout,
  Laptop,
  GraduationCap,
  Landmark,
  HeartPulse,
  TrendingUp,
  Users,
  Handshake,
  Target,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  ShieldCheck,
  Leaf,
  BriefcaseBusiness,
} from "lucide-react";

const approachAreas = [
  {
    number: "01",
    title: "Livelihoods Transformation",
    icon: TrendingUp,
    description:
      "We promote sustainable livelihoods by helping young people and underserved communities build the capabilities, resources and opportunities needed to improve their economic well-being.",
    focus: [
      "Sustainable income generation",
      "Enterprise development",
      "Economic resilience and self-reliance",
      "Access to livelihood opportunities",
    ],
  },
  {
    number: "02",
    title: "Technology Adoption & Digital Inclusion",
    icon: Laptop,
    description:
      "We leverage technology and digital innovation to bridge the digital divide, strengthen digital literacy and expand access to opportunities in the modern economy.",
    focus: [
      "Digital literacy and technical skills",
      "Technology-driven innovation",
      "Digital access and inclusion",
      "Digital employability and entrepreneurship",
    ],
  },
  {
    number: "03",
    title: "Smart Agriculture & Commercialisation",
    icon: Sprout,
    description:
      "We support climate-conscious agriculture and agribusiness by connecting improved production practices with value addition, entrepreneurship and market opportunities.",
    focus: [
      "Climate-smart agricultural practices",
      "Agribusiness and agripreneurship",
      "Agro-processing and value addition",
      "Market access and commercialisation",
    ],
  },
  {
    number: "04",
    title: "Education & Skills Development",
    icon: GraduationCap,
    description:
      "We strengthen access to learning and practical skills that prepare young people and underserved groups for employment, entrepreneurship and meaningful participation in society.",
    focus: [
      "Technical and vocational skills",
      "Digital and employability training",
      "Early childhood development",
      "Practical learning and innovation",
    ],
  },
  {
    number: "05",
    title: "Tourism & Cultural Development",
    icon: Landmark,
    description:
      "We recognise cultural heritage as an opportunity for community identity, youth participation and sustainable economic growth through responsible tourism and creative enterprise.",
    focus: [
      "Cultural heritage preservation",
      "Community-based tourism",
      "Tour guide skills development",
      "Creative enterprise and local income generation",
    ],
  },
  {
    number: "06",
    title: "Health & Well-being",
    icon: HeartPulse,
    description:
      "We promote the physical, mental and social well-being of young people and underserved communities by strengthening awareness, participation and access to essential services.",
    focus: [
      "Youth-friendly health services",
      "Mental health and wellness awareness",
      "Sexual and reproductive health and rights",
      "Gender-based violence prevention and referrals",
    ],
  },
];

const principles = [
  {
    title: "People-Centred Development",
    icon: Users,
    description:
      "We place young people and underserved communities at the centre of development, recognising their capabilities, priorities and potential to lead change.",
  },
  {
    title: "Evidence-Based Innovation",
    icon: Lightbulb,
    description:
      "We use evidence, learning and community feedback to shape relevant interventions, test solutions and improve development outcomes.",
  },
  {
    title: "Inclusion & Equity",
    icon: ShieldCheck,
    description:
      "We work to reduce barriers to opportunity, with particular attention to young people, women, children, persons with disabilities and other underserved groups.",
  },
  {
    title: "Partnership & Collaboration",
    icon: Handshake,
    description:
      "We work with communities, government, development partners and the private sector to mobilise expertise, resources and opportunities for lasting impact.",
  },
];

const developmentStages = [
  {
    number: "01",
    title: "Assess & Engage",
    icon: Target,
    description:
      "Understand community needs, existing capacities, local resources and barriers through engagement and evidence-informed assessment.",
  },
  {
    number: "02",
    title: "Build Capabilities",
    icon: GraduationCap,
    description:
      "Strengthen practical skills, knowledge, confidence and access to the resources people need to pursue sustainable opportunities.",
  },
  {
    number: "03",
    title: "Connect & Grow",
    icon: BriefcaseBusiness,
    description:
      "Link participants to markets, finance, services, technology, mentors and strategic partners that support their progress.",
  },
  {
    number: "04",
    title: "Sustain & Thrive",
    icon: Leaf,
    description:
      "Promote resilience, self-reliance and lasting community ownership so that progress can continue beyond individual project cycles.",
  },
];

const easing = [0.22, 1, 0.36, 1];

const revealUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easing } },
};

const revealLeft = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easing } },
};

const revealRight = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easing } },
};

const staggerChildren = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const Approach = () => {
  const shouldReduceMotion = useReducedMotion();

  const revealProps = shouldReduceMotion
    ? {}
    : { initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.12 } };

  const heroProps = shouldReduceMotion ? {} : { initial: "hidden", animate: "visible" };

  const hoverProps = shouldReduceMotion
    ? {}
    : { whileHover: { y: -6 }, transition: { duration: 0.25, ease: easing } };

  const iconHoverProps = shouldReduceMotion
    ? {}
    : { whileHover: { scale: 1.08, rotate: 4 }, transition: { duration: 0.25, ease: easing } };

  return (
    <main className="min-h-screen overflow-hidden bg-[rgb(245,249,252)]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[rgb(3,75,113)] px-5 py-14 text-white sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        {!shouldReduceMotion && (
          <>
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#1BB7C4]/20 blur-3xl"
              animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#1BB7C4]/10 blur-3xl"
              animate={{ scale: [1.08, 1, 1.08], x: [0, 12, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}

        <motion.div {...heroProps} variants={staggerChildren} className="relative mx-auto max-w-7xl">
          <motion.div
            variants={revealUp}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90"
          >
            <Compass size={16} className="text-[#1BB7C4]" />
            How We Create Lasting Change
          </motion.div>

          <motion.h1
            variants={revealUp}
            className="mt-5 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
          >
            Our Approach
          </motion.h1>

          <motion.div variants={revealUp} className="mt-4 h-1 w-20 rounded-full bg-[#1BB7C4]" />

          <motion.p
            variants={revealUp}
            className="mt-5 max-w-3xl text-base leading-8 text-white/85 sm:text-lg"
          >
            FISDEV adopts a graduation approach and an ecosystem-led model that
            combines immediate support with long-term strategies to strengthen
            resilience, expand opportunities and build self-reliant communities.
          </motion.p>

          <motion.div variants={revealUp} className="mt-7 flex flex-wrap gap-3">
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
            >
              <Link
                to="/programs"
                className="inline-flex items-center gap-2 rounded-lg bg-[#1BB7C4] px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-[#159da8]"
              >
                Explore Our Programs
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-white/10"
              >
                Partner With Us
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Introduction */}
      <section className="px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-9 lg:grid-cols-2 lg:gap-14">
          <motion.div {...revealProps} variants={revealLeft}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#159da8]">
              Our Development Philosophy
            </p>

            <h2 className="mt-3 text-3xl font-bold leading-tight text-[#056699] sm:text-4xl">
              From Immediate Support to Lasting Self-Reliance
            </h2>

            <div className="mt-4 h-1 w-16 rounded-full bg-[#1BB7C4]" />

            <p className="mt-5 leading-8 text-gray-600">
              We recognise that poverty, unemployment, social exclusion and
              limited access to essential services are interconnected
              challenges. Addressing them requires more than short-term
              assistance; it requires coordinated interventions that strengthen
              individual capabilities, community systems and economic
              opportunities.
            </p>

            <p className="mt-3 leading-8 text-gray-600">
              Our approach combines practical support, skills development,
              access to services, enterprise growth and strategic partnerships.
              By connecting people to the resources and systems they need to
              thrive, we work towards sustainable improvements in livelihoods
              and community well-being.
            </p>
          </motion.div>

          <motion.div {...revealProps} variants={revealRight} className="relative">
            <div className="absolute -left-2 -top-2 h-20 w-20 rounded-tl-3xl border-l-4 border-t-4 border-[#1BB7C4] sm:-left-3 sm:-top-3 sm:h-24 sm:w-24" />

            <motion.div
              {...hoverProps}
              className="relative rounded-2xl bg-[rgb(3,75,113)] p-6 text-white shadow-xl sm:p-8"
            >
              <motion.div
                {...iconHoverProps}
                className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#1BB7C4]/15 text-[#1BB7C4]"
              >
                <Compass size={30} strokeWidth={1.7} />
              </motion.div>

              <h3 className="mt-5 text-2xl font-bold">Our Guiding Principle</h3>

              <p className="mt-3 leading-8 text-white/85">
                Sustainable development happens when people have the
                capabilities, resources, supportive systems and meaningful
                opportunities to shape their own futures.
              </p>

              <div className="mt-6 border-t border-white/15 pt-5">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="text-2xl font-bold text-[#1BB7C4]">People</p>
                    <p className="mt-1 text-sm leading-6 text-white/70">At the centre of change</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#1BB7C4]">Systems</p>
                    <p className="mt-1 text-sm leading-6 text-white/70">Enabling lasting progress</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="absolute -bottom-2 -right-2 h-16 w-16 rounded-br-3xl border-b-4 border-r-4 border-[#1BB7C4] sm:-bottom-3 sm:-right-3 sm:h-20 sm:w-20" />
          </motion.div>
        </div>
      </section>

      {/* Graduation Approach */}
      <section className="bg-white px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div {...revealProps} variants={revealUp} className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#159da8]">
              Our Model for Change
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#056699] sm:text-4xl">
              The Graduation Approach
            </h2>

            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#1BB7C4]" />

            <p className="mt-5 leading-8 text-gray-600">
              We view development as a progressive journey. Our approach seeks
              to help individuals and communities build capabilities, access
              opportunities and strengthen their ability to sustain progress
              over time.
            </p>
          </motion.div>

          <motion.div
            {...revealProps}
            variants={staggerChildren}
            className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
          >
            {developmentStages.map((stage, index) => {
              const Icon = stage.icon;

              return (
                <motion.article
                  key={stage.number}
                  variants={revealUp}
                  {...hoverProps}
                  className="relative rounded-2xl border border-gray-100 bg-[rgb(245,249,252)] p-6 transition-colors duration-300 hover:border-[#1BB7C4]/50 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <motion.div
                      {...iconHoverProps}
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1BB7C4]/10 text-[#056699]"
                    >
                      <Icon size={25} strokeWidth={1.8} />
                    </motion.div>

                    <span className="text-2xl font-bold text-[#056699]/15">{stage.number}</span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-[#056699]">{stage.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600">{stage.description}</p>

                  {index < developmentStages.length - 1 && (
                    <div className="mt-4 hidden items-center gap-2 text-sm font-semibold text-[#159da8] xl:flex">
                      <span>Next stage</span>
                      <ArrowRight size={16} />
                    </div>
                  )}
                </motion.article>
              );
            })}
          </motion.div>

          <motion.p
            {...revealProps}
            variants={revealUp}
            className="mx-auto mt-6 max-w-3xl text-center text-sm leading-7 text-gray-500"
          >
            These stages provide a guiding framework. Interventions are adapted
            to the needs, circumstances and opportunities of each community
            rather than applied as a rigid sequence.
          </motion.p>
        </div>
      </section>

      {/* Ecosystem-Led Development */}
      <section className="px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div {...revealProps} variants={revealUp} className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#159da8]">
              Connected Solutions
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#056699] sm:text-4xl">
              An Ecosystem-Led Approach
            </h2>

            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#1BB7C4]" />

            <p className="mt-5 leading-8 text-gray-600">
              We recognise that sustainable outcomes depend on the wider
              environment in which people live, learn, work and do business. We
              therefore connect communities with institutions, services,
              markets and partners that can support lasting change.
            </p>
          </motion.div>

          <motion.div
            {...revealProps}
            variants={staggerChildren}
            className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-3"
          >
            {[
              {
                title: "Empowering People",
                icon: Users,
                description:
                  "Strengthening individual and community capabilities through education, skills development, health awareness and meaningful participation.",
              },
              {
                title: "Strengthening Opportunities",
                icon: BriefcaseBusiness,
                description:
                  "Connecting people to markets, finance, technology, employment, enterprise support and essential services.",
              },
              {
                title: "Building Partnerships",
                icon: Handshake,
                description:
                  "Collaborating with communities, government, development partners and the private sector to mobilise shared resources and expertise.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  variants={revealUp}
                  {...hoverProps}
                  className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg sm:p-7"
                >
                  <motion.div
                    {...iconHoverProps}
                    className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#1BB7C4]/10 text-[#056699]"
                  >
                    <Icon size={29} />
                  </motion.div>

                  <h3 className="mt-4 text-xl font-bold text-[#056699]">{item.title}</h3>

                  <p className="mt-3 leading-7 text-gray-600">{item.description}</p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Six Integrated Areas */}
      <section className="bg-white px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div {...revealProps} variants={revealUp} className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#159da8]">
              Integrated Interventions
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#056699] sm:text-4xl">
              Six Areas, One Shared Vision
            </h2>

            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#1BB7C4]" />

            <p className="mt-5 leading-8 text-gray-600">
              We translate our development approach into six interconnected
              areas of work, bringing together economic empowerment,
              technology, learning, environmental sustainability, culture and
              well-being.
            </p>
          </motion.div>

          <motion.div
            {...revealProps}
            variants={staggerChildren}
            className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {approachAreas.map((area) => {
              const Icon = area.icon;

              return (
                <motion.article
                  key={area.number}
                  variants={revealUp}
                  {...hoverProps}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-[rgb(245,249,252)] transition-colors duration-300 hover:border-[#1BB7C4]/50 hover:shadow-xl"
                >
                  <motion.div
                    className="h-1.5 w-full origin-left bg-gradient-to-r from-[#056699] to-[#1BB7C4]"
                    initial={shouldReduceMotion ? false : { scaleX: 0.35 }}
                    whileInView={shouldReduceMotion ? undefined : { scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: easing }}
                  />

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="flex items-start justify-between">
                      <motion.div
                        {...iconHoverProps}
                        className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#1BB7C4]/10 text-[#056699] transition-colors duration-300 group-hover:bg-[#1BB7C4] group-hover:text-white"
                      >
                        <Icon size={29} strokeWidth={1.7} />
                      </motion.div>

                      <span className="text-3xl font-bold text-[#056699]/10">{area.number}</span>
                    </div>

                    <h3 className="mt-5 text-xl font-bold leading-snug text-[#056699] sm:text-2xl">
                      {area.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
                      {area.description}
                    </p>

                    <div className="mt-5 border-t border-gray-200 pt-4">
                      <h4 className="text-sm font-bold uppercase tracking-wide text-[#056699]">
                        Key Focus Areas
                      </h4>

                      <ul className="mt-3 space-y-2.5">
                        {area.focus.map((item, index) => (
                          <motion.li
                            key={item}
                            initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
                            whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.35,
                              delay: shouldReduceMotion ? 0 : index * 0.07,
                              ease: easing,
                            }}
                            className="flex items-start gap-3 text-sm leading-6 text-gray-600"
                          >
                            <CheckCircle2
                              size={18}
                              className="mt-0.5 shrink-0 text-[#1BB7C4]"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Guiding Principles */}
      <section className="px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div {...revealProps} variants={revealUp} className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#159da8]">
              What Guides Our Work
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#056699] sm:text-4xl">
              Principles Behind Our Approach
            </h2>

            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#1BB7C4]" />

            <p className="mt-5 leading-8 text-gray-600">
              Our work is grounded in values that promote responsible
              leadership, meaningful participation and sustainable development
              outcomes.
            </p>
          </motion.div>

          <motion.div
            {...revealProps}
            variants={staggerChildren}
            className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            {principles.map((principle) => {
              const Icon = principle.icon;

              return (
                <motion.article
                  key={principle.title}
                  variants={revealUp}
                  {...hoverProps}
                  className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-lg sm:gap-5 sm:p-6"
                >
                  <motion.div
                    {...iconHoverProps}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1BB7C4]/10 text-[#056699]"
                  >
                    <Icon size={25} strokeWidth={1.8} />
                  </motion.div>

                  <div>
                    <h3 className="text-lg font-bold text-[#056699] sm:text-xl">
                      {principle.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-gray-600 sm:text-base">
                      {principle.description}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Strategic Alignment */}
      <section className="bg-white px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div {...revealProps} variants={revealUp} className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#159da8]">
              Our Strategic Alignment
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#056699] sm:text-4xl">
              From Malawi to Africa and the World
            </h2>

            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#1BB7C4]" />

            <p className="mt-5 leading-8 text-gray-600">
              FISDEV aligns its interventions with development priorities at
              national, continental and global levels, contributing to a shared
              vision of inclusive prosperity, equity and sustainability.
            </p>
          </motion.div>

          <motion.div
            {...revealProps}
            variants={staggerChildren}
            className="mt-9 grid grid-cols-1 gap-5 lg:grid-cols-3"
          >
            <motion.article
              variants={revealUp}
              {...hoverProps}
              className="rounded-2xl border border-gray-100 bg-[rgb(245,249,252)] p-6 transition-colors duration-300 hover:border-[#1BB7C4]/50 hover:shadow-lg sm:p-7"
            >
              <span className="inline-flex rounded-full bg-[#1BB7C4]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#056699]">
                National
              </span>

              <h3 className="mt-4 text-xl font-bold text-[#056699]">Malawi 2063</h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                We support Malawi's vision of an inclusively wealthy and
                self-reliant nation through human capital development, private
                sector-led growth, agricultural commercialisation and
                industrialisation.
              </p>
            </motion.article>

            <motion.article
              variants={revealUp}
              {...hoverProps}
              className="rounded-2xl border border-gray-100 bg-[rgb(245,249,252)] p-6 transition-colors duration-300 hover:border-[#1BB7C4]/50 hover:shadow-lg sm:p-7"
            >
              <span className="inline-flex rounded-full bg-[#1BB7C4]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#056699]">
                Continental
              </span>

              <h3 className="mt-4 text-xl font-bold text-[#056699]">
                African Union Agenda 2063
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Our work contributes to the aspirations of a prosperous Africa
                based on inclusive growth, a transformed economy, youth
                development, job creation and people-driven development.
              </p>
            </motion.article>

            <motion.article
              variants={revealUp}
              {...hoverProps}
              className="rounded-2xl border border-gray-100 bg-[rgb(245,249,252)] p-6 transition-colors duration-300 hover:border-[#1BB7C4]/50 hover:shadow-lg sm:p-7"
            >
              <span className="inline-flex rounded-full bg-[#1BB7C4]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#056699]">
                Global
              </span>

              <h3 className="mt-4 text-xl font-bold text-[#056699]">Sustainable Development Goals</h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                We contribute to global priorities on poverty reduction, gender
                equality, decent work, innovation, reduced inequalities,
                responsible production, climate action and partnerships.
              </p>

              
            </motion.article>
          </motion.div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-5 pb-14 pt-12 sm:px-8 sm:pb-16 lg:px-12">
        <motion.div
          {...revealProps}
          variants={revealUp}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-[rgb(3,75,113)] px-6 py-8 text-white sm:px-9 sm:py-10 lg:px-12 lg:py-12"
        >
          {!shouldReduceMotion && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#1BB7C4]/15 blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.85, 0.5] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1BB7C4]">
                Be Part of the Change
              </p>

              <h2 className="mt-3 text-2xl font-bold sm:text-3xl lg:text-4xl">
                Together, We Can Build a More Inclusive Future
              </h2>

              <p className="mt-3 leading-7 text-white/85">
                Join FISDEV in creating opportunities, strengthening
                communities and advancing sustainable development across
                Malawi. Through collaboration, we can turn shared commitments
                into meaningful and lasting impact.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-3">
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#1BB7C4] px-5 py-3 font-semibold text-white transition-colors duration-300 hover:bg-[#159da8]"
                >
                  Partner With Us
                  <motion.span
                    animate={shouldReduceMotion ? {} : { x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight size={18} aria-hidden="true" />
                  </motion.span>
                </Link>
              </motion.div>

              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              >
                <Link
                  to="/programs"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-3 font-semibold text-white transition-colors duration-300 hover:bg-white/10"
                >
                  Our Programs
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default Approach;