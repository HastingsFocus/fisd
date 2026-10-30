
import {
  motion,
  useReducedMotion,
} from "framer-motion";

const stats = [
  { value: "2,450+", label: "Lives Impacted" },
  { value: "15", label: "Active Projects" },
  { value: "12", label: "Districts Reached" },
  { value: "70+", label: "Team & Volunteers" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
};

function ImpactStats() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      

      {/* OUR STORY */}
      <section className="relative overflow-hidden bg-[rgb(245,249,252)] px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        {/* Decorative background accents */}
        <div className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rounded-full bg-[#1BB7C4]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#056699]/10 blur-3xl" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="relative mx-auto max-w-5xl"
        >
          {/* Section label */}
          <motion.div
            variants={itemVariants}
            className="mb-5 flex items-center gap-3"
          >
            <span className="h-1 w-10 rounded-full bg-[#1BB7C4]" />

            <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#056699]">
              Our Story
            </span>
          </motion.div>

          {/* Story heading */}
          <motion.h2
            variants={itemVariants}
            className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-[#056699] sm:text-4xl lg:text-5xl"
          >
            Every Life Holds Potential.{" "}
            <span className="text-[#1BB7C4]">
              Every Community Deserves a Chance.
            </span>
          </motion.h2>

          {/* Story content */}
          <div className="mt-8 space-y-5 text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
            <motion.p variants={itemVariants}>
              Imagine a young person with big dreams but no job opportunities,
              a woman working tirelessly to feed her family but struggling to
              earn a sustainable income, or a child whose future is limited by
              a lack of access to early learning. Imagine a rural community
              rich in talent and natural resources, yet held back by poverty,
              digital exclusion, and climate challenges.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="border-l-4 border-[#1BB7C4] py-1 pl-5 text-lg font-bold text-[#056699] sm:text-xl"
            >
              These are not just challenges. They are opportunities for change.
            </motion.p>

            <motion.p variants={itemVariants}>
              At the Foundation for Inclusive and Sustainable Development
              (FISDEV), we believe that no one should be left behind because
              of their age, gender, disability, or circumstances. Every
              individual deserves the opportunity to learn, innovate, earn a
              dignified living, and shape their own future.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-xl font-extrabold text-[#056699] sm:text-2xl"
            >
              That is why we exist.
            </motion.p>

            <motion.p variants={itemVariants}>
              We work alongside young people, women, children, persons with
              disabilities, and underserved communities to turn potential
              into progress through inclusive education, skills development,
              entrepreneurship, digital innovation, sustainable livelihoods,
              and climate resilience.
            </motion.p>

            <motion.p variants={itemVariants}>
              By bringing communities, partners, and innovative ideas together,
              we help create solutions that address today's challenges while
              building a more inclusive and sustainable tomorrow.
            </motion.p>
          </div>

          {/* Closing belief */}
          <motion.div
            variants={itemVariants}
            className="mt-10 rounded-2xl border border-[#1BB7C4]/20 bg-white p-6 shadow-sm sm:p-8"
          >
            <div
              aria-hidden="true"
              className="mb-3 text-3xl font-bold text-[#1BB7C4]"
            >
              “
            </div>

            <p className="text-lg font-semibold italic leading-8 text-[#056699] sm:text-xl sm:leading-9">
              Our belief is simple: when people are empowered, communities
              thrive, and sustainable development becomes possible for everyone.
            </p>

            <div className="mt-5 h-1 w-16 rounded-full bg-[#1BB7C4]" />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}

export default ImpactStats;
