import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";

import image1 from "../../assets/images/1.jpeg";
import image2 from "../../assets/images/2.jpeg";
import image3 from "../../assets/images/3.jpeg";

const slides = [
  {
    image: image1,
    alt: "Community development and empowerment",
    title: "Building Inclusive and Sustainable Communities",
    description:
      "We empower young people and underserved communities through inclusive opportunities, innovation, and sustainable development.",
  },
  {
    image: image2,
    alt: "Young people learning and developing skills",
    title: "Empowering Youth. Transforming Lives.",
    description:
      "We support young people with the skills, opportunities, and resources they need to shape a brighter future.",
  },
  {
    image: image3,
    alt: "People working together for a sustainable future",
    title: "Creating a Sustainable Future",
    description:
      "Together, we build resilient communities and create pathways to economic empowerment and lasting social change.",
  },
];

const statistics = [
  { value: 2450, suffix: "+", label: "Lives Impacted", description: "Creating meaningful change" },
  { value: 15, suffix: "", label: "Active Projects", description: "Turning ideas into action" },
  { value: 12, suffix: "", label: "Districts Reached", description: "Reaching communities" },
  { value: 70, suffix: "+", label: "Team & Volunteers", description: "Working together for impact" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const slideVariants = {
  enter: (direction) => ({ opacity: 0, x: direction > 0 ? 45 : -45, y: 12 }),
  center: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -35 : 35,
    y: -8,
    transition: { duration: 0.3, ease: "easeIn" },
  }),
};

// Animated number that begins at zero when it enters the viewport.
const AnimatedCounter = ({ value, suffix = "", shouldReduceMotion }) => {
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, { once: true, amount: 0.6 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (shouldReduceMotion) {
      setCount(value);
      return;
    }

    let animationFrame;
    const duration = 2000;
    let startTime;

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out effect: fast at first, then slows down.
      const easedProgress = 1 - Math.pow(1 - progress, 4);

      setCount(Math.floor(easedProgress * value));

      if (progress < 1) animationFrame = requestAnimationFrame(updateCount);
      else setCount(value);
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, shouldReduceMotion]);

  return (
    <span ref={counterRef} className="tabular-nums">
      {count.toLocaleString()}
      {count === value ? suffix : ""}
    </span>
  );
};

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const shouldReduceMotion = useReducedMotion();

  const slide = slides[activeIndex];

  const previousSlide = () => {
    setDirection(-1);
    setActiveIndex((current) => current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setDirection(1);
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  const goToSlide = (index) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* HERO CAROUSEL */}
      <section className="relative flex min-h-[520px] items-center overflow-hidden bg-[#034b71] sm:min-h-[560px] lg:min-h-[620px]">
        {/* Background images */}
        <AnimatePresence initial={false}>
          <motion.img
            key={slide.image}
            src={slide.image}
            alt={slide.alt}
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.1, ease: "easeInOut" },
              scale: { duration: shouldReduceMotion ? 0 : 6, ease: "linear" },
            }}
            className="absolute inset-0 z-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        {/* Blue image overlay */}
        <div className="absolute inset-0 z-[1] bg-[#034b71]/80" />

        {/* Subtle animated light effect */}
        {!shouldReduceMotion && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-[#034b71]/40 via-transparent to-[#1BB7C4]/10"
            animate={{ opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Hero content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-14 py-20 sm:px-20 lg:px-24 lg:py-24">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide.title}
              custom={direction}
              variants={slideVariants}
              initial={shouldReduceMotion ? "center" : "enter"}
              animate="center"
              exit={shouldReduceMotion ? { opacity: 0 } : "exit"}
              className="max-w-3xl text-white"
            >
              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="mb-5 inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-[#65e3e7] backdrop-blur-md sm:text-sm"
              >
                Foundation for Inclusive and Sustainable Development
              </motion.p>

              <motion.h1
                initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.18 }}
                className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl xl:text-6xl"
              >
                {slide.title}
              </motion.h1>

              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.28 }}
                className="mt-5 max-w-2xl text-sm leading-7 text-white/90 sm:text-base lg:text-lg"
              >
                {slide.description}
              </motion.p>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="mt-8 flex flex-col gap-4 sm:flex-row"
              >
                <motion.div
                  variants={itemVariants}
                  whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    to="/about"
                    className="group inline-flex items-center justify-center rounded-lg bg-[#1BB7C4] px-6 py-3.5 font-semibold text-white shadow-lg shadow-black/20 transition-colors duration-300 hover:bg-[#159da8]"
                  >
                    Discover Our Work
                    <motion.span
                      aria-hidden="true"
                      className="ml-2 inline-block"
                      animate={shouldReduceMotion ? {} : { x: [0, 5, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1 }}
                    >
                      →
                    </motion.span>
                  </Link>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    to="/get-involved"
                    className="inline-flex items-center justify-center rounded-lg border border-white/80 bg-white/5 px-6 py-3.5 font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white hover:text-[#034b71]"
                  >
                    Get Involved
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Previous slide */}
        <motion.button
          type="button"
          onClick={previousSlide}
          aria-label="Previous slide"
          whileHover={shouldReduceMotion ? {} : { scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.9 }}
          className="absolute bottom-5 left-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-black/30 text-2xl text-white backdrop-blur-sm transition-colors hover:bg-[#1BB7C4] sm:bottom-auto sm:left-5 sm:top-1/2 sm:-translate-y-1/2"
        >
          ‹
        </motion.button>

        {/* Next slide */}
        <motion.button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          whileHover={shouldReduceMotion ? {} : { scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.9 }}
          className="absolute bottom-5 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-black/30 text-2xl text-white backdrop-blur-sm transition-colors hover:bg-[#1BB7C4] sm:bottom-auto sm:right-5 sm:top-1/2 sm:-translate-y-1/2"
        >
          ›
        </motion.button>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2.5">
          {slides.map((item, index) => (
            <motion.button
              key={item.title}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              animate={{
                width: activeIndex === index ? 32 : 10,
                opacity: activeIndex === index ? 1 : 0.65,
              }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="h-2.5 rounded-full bg-[#1BB7C4]"
            />
          ))}
        </div>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute bottom-0 left-0 z-20 h-1 w-full origin-left bg-gradient-to-r from-[#1BB7C4] via-white/70 to-[#1BB7C4]"
        />
      </section>

      {/* IMPACT STATISTICS */}
      <section className="relative overflow-hidden bg-white px-5 py-12 sm:px-8 sm:py-16">
        {/* Decorative background accents */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-[#1BB7C4]/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-[#056699]/5 blur-3xl" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="relative mx-auto grid max-w-7xl grid-cols-2 gap-y-10 sm:gap-x-8 lg:grid-cols-4"
        >
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={shouldReduceMotion ? {} : { y: -6 }}
              className={`relative flex flex-col items-center px-3 text-center ${
                index < statistics.length - 1 ? "lg:border-r lg:border-slate-200" : ""
              }`}
            >
              <motion.div
                initial={shouldReduceMotion ? false : { scale: 0.85, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-2 text-4xl font-extrabold tracking-tight text-[#056699] sm:text-5xl"
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  shouldReduceMotion={shouldReduceMotion}
                />
              </motion.div>

              <h2 className="text-sm font-bold text-slate-800 sm:text-base">{stat.label}</h2>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">{stat.description}</p>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 36 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="mt-4 h-1 rounded-full bg-[#1BB7C4]"
              />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
};

export default Hero;