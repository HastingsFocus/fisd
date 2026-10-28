
import { motion, useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  Lightbulb,
  UsersRound,
  Handshake,
  Scale,
  ClipboardCheck,
} from "lucide-react";

const values = [
  {
    title: "Resilience",
    description:
      "Remain adaptable, determined, and committed in the face of challenges and change while building communities' capacity to withstand shocks and uncertainties.",
    icon: ShieldCheck,
  },
  {
    title: "Innovation",
    description:
      "Embrace creativity, new ideas and adaptive approaches to address challenges and create sustainable solutions.",
    icon: Lightbulb,
  },
  {
    title: "Inclusion",
    description:
      "Foster equitable access for all, especially youth, women, and underserved populations through gender-responsive programs.",
    icon: UsersRound,
  },
  {
    title: "Partnership",
    description:
      "Collaborate with communities, donors, government and private sector players to scale and sustain our work.",
    icon: Handshake,
  },
  {
    title: "Integrity",
    description:
      "Uphold honesty, ethical conduct and strong moral principles in everything we do.",
    icon: Scale,
  },
  {
    title: "Accountability",
    description:
      "Take responsibility for our decisions, actions and results.",
    icon: ClipboardCheck,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

function Values() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="core-values"
      className="relative overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-20 lg:py-24"
    >
      {/* Decorative background accents */}
      <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-[#1BB7C4]/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#056699]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="mx-auto mb-12 max-w-3xl text-center sm:mb-16"
        >
          <motion.div
            variants={cardVariants}
            className="mb-4 flex items-center justify-center gap-3"
          >
            <span className="h-1 w-10 rounded-full bg-[#1BB7C4]" />

            <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#056699]">
              What Guides Us
            </span>

            <span className="h-1 w-10 rounded-full bg-[#1BB7C4]" />
          </motion.div>

          <motion.h2
            variants={cardVariants}
            className="text-3xl font-extrabold tracking-tight text-[#056699] sm:text-4xl lg:text-5xl"
          >
            Our Core{" "}
            <span className="text-[#1BB7C4]">Values</span>
          </motion.h2>

          <motion.p
            variants={cardVariants}
            className="mt-5 text-base leading-8 text-slate-600 sm:text-lg"
          >
            Our values shape how we work, how we partner with communities,
            and how we create lasting, inclusive and sustainable change.
          </motion.p>
        </motion.div>

        {/* Core value cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={containerVariants}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <motion.article
                key={value.title}
                variants={cardVariants}
                whileHover={shouldReduceMotion ? {} : { y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-[rgb(245,249,252)] p-6 transition-shadow duration-300 hover:border-[#1BB7C4]/50 hover:shadow-xl hover:shadow-[#056699]/5 sm:p-8"
              >
                {/* Accent line */}
                <div className="absolute left-0 top-0 h-1 w-0 bg-[#1BB7C4] transition-all duration-300 group-hover:w-full" />

                {/* Icon */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#056699]/10 text-[#056699] transition-colors duration-300 group-hover:bg-[#056699] group-hover:text-white">
                  <Icon size={28} strokeWidth={1.8} />
                </div>

                {/* Number and title */}
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-sm font-bold tracking-widest text-[#1BB7C4]">
                    0{index + 1}
                  </span>

                  <h3 className="text-xl font-bold text-[#056699] sm:text-2xl">
                    {value.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  {value.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default Values;
