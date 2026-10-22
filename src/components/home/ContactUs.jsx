import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Phone, Mail, ExternalLink, Clock, Navigation } from "lucide-react";

const contactDetails = [
  {
    icon: MapPin,
    title: "Our Location",
    description: "Chintheche, Nkhata Bay, Malawi",
    action: "Get Directions",
    href: "https://www.google.com/maps/search/?api=1&query=Chintheche%2C%20Nkhata%20Bay%2C%20Malawi",
    external: true,
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "+265 991 020 491",
    action: "Call FISDEV",
    href: "tel:+265991020491",
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "info@fisdev.org",
    action: "Send an Email",
    href: "mailto:info@fisdev.org",
  },
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
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const ContactUs = () => {
  const shouldReduceMotion = useReducedMotion();

  const revealProps = (direction = "up") => ({
    initial: shouldReduceMotion ? false : "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.15 },
    variants: direction === "left" ? revealLeft : direction === "right" ? revealRight : revealUp,
  });

  const hoverLift = shouldReduceMotion ? undefined : { y: -5, transition: { duration: 0.25, ease } };
  const tapScale = shouldReduceMotion ? undefined : { scale: 0.97 };

  return (
    <section
      id="contact"
      className="scroll-mt-24 overflow-hidden bg-[rgb(245,249,252)] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div {...revealProps()} className="mx-auto max-w-2xl text-center">
          <motion.span
            whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
            className="inline-flex items-center gap-2 rounded-full bg-[#1BB7C4]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#056699]"
          >
            <motion.span
              animate={shouldReduceMotion ? undefined : { scale: [1, 1.25, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-2 w-2 rounded-full bg-[#1BB7C4]"
            />
            Get in Touch
          </motion.span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#056699] sm:text-4xl lg:text-5xl">
            Let&apos;s Build a Better Future Together
          </h2>

          <p className="mt-5 text-base leading-8 text-gray-600 sm:text-lg">
            Have a question, partnership idea, or want to support our work?
            We would love to hear from you. Reach out and let&apos;s explore
            how we can create meaningful change together.
          </p>
        </motion.div>

        {/* Contact cards */}
        <motion.div
          variants={staggerContainer}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {contactDetails.map((item) => {
            const Icon = item.icon;

            return (
              <motion.a
                key={item.title}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                variants={revealUp}
                whileHover={shouldReduceMotion ? undefined : { y: -7, transition: { duration: 0.25, ease } }}
                whileTap={tapScale}
                className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#1BB7C4]/40 hover:shadow-xl sm:p-7"
              >
                <motion.div
                  whileHover={shouldReduceMotion ? undefined : { rotate: 5, scale: 1.08 }}
                  transition={{ duration: 0.25 }}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1BB7C4]/10 text-[#056699] transition-colors duration-300 group-hover:bg-[#056699] group-hover:text-white"
                >
                  <Icon size={26} strokeWidth={1.8} />
                </motion.div>

                <h3 className="mt-5 text-lg font-bold text-[#056699] transition-colors duration-300 group-hover:text-[#1BB7C4]">
                  {item.title}
                </h3>

                <p className="mt-2 break-words leading-7 text-gray-600">{item.description}</p>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#1BB7C4]">
                  {item.action}
                  <motion.span
                    className="inline-flex"
                    whileHover={shouldReduceMotion ? undefined : { x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ExternalLink size={15} />
                  </motion.span>
                </span>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Map and contact information */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.75, ease }}
          className="mt-12 grid overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg lg:grid-cols-5"
        >
          {/* Google Map */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease }}
            className="relative min-h-[350px] overflow-hidden lg:col-span-3 lg:min-h-[500px]"
          >
            <iframe
              title="FISDEV location in Chintheche, Nkhata Bay, Malawi"
              src="https://www.google.com/maps?q=Chintheche%2C%20Nkhata%20Bay%2C%20Malawi&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, position: "absolute", inset: 0, minHeight: "350px" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>

          {/* Information beside the map */}
          <motion.div
            {...revealProps("right")}
            className="flex flex-col justify-center p-7 sm:p-10 lg:col-span-2 lg:p-10"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-[#1BB7C4]">
              Find Us
            </span>

            <h3 className="mt-3 text-2xl font-extrabold leading-snug text-[#056699] sm:text-3xl">
              Visit FISDEV
            </h3>

            <p className="mt-4 leading-7 text-gray-600">
              Connect with the Foundation for Inclusive and Sustainable
              Development. We welcome conversations about community
              development, youth empowerment, partnerships, and sustainable
              solutions.
            </p>

            <div className="mt-7 space-y-5">
              <motion.div whileHover={hoverLift} className="flex items-start gap-4">
                <motion.div
                  whileHover={shouldReduceMotion ? undefined : { rotate: 5, scale: 1.05 }}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1BB7C4]/10 text-[#056699]"
                >
                  <MapPin size={21} />
                </motion.div>

                <div>
                  <h4 className="font-bold text-gray-800">Office Location</h4>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Chintheche, Nkhata Bay, Malawi
                  </p>
                </div>
              </motion.div>

              <motion.div whileHover={hoverLift} className="flex items-start gap-4">
                <motion.div
                  whileHover={shouldReduceMotion ? undefined : { rotate: -5, scale: 1.05 }}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1BB7C4]/10 text-[#056699]"
                >
                  <Phone size={21} />
                </motion.div>

                <div>
                  <h4 className="font-bold text-gray-800">Phone</h4>
                  <a
                    href="tel:+265991020491"
                    className="mt-1 inline-block text-sm text-gray-600 transition-colors duration-300 hover:text-[#056699]"
                  >
                    +265 991 020 491
                  </a>
                </div>
              </motion.div>

              <motion.div whileHover={hoverLift} className="flex items-start gap-4">
                <motion.div
                  whileHover={shouldReduceMotion ? undefined : { rotate: 5, scale: 1.05 }}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1BB7C4]/10 text-[#056699]"
                >
                  <Mail size={21} />
                </motion.div>

                <div>
                  <h4 className="font-bold text-gray-800">Email</h4>
                  <a
                    href="mailto:info@fisdev.org"
                    className="mt-1 inline-block break-all text-sm text-gray-600 transition-colors duration-300 hover:text-[#056699]"
                  >
                    info@fisdev.org
                  </a>
                </div>
              </motion.div>
            </div>

            <motion.div whileHover={hoverLift} whileTap={tapScale}>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Chintheche%2C%20Nkhata%20Bay%2C%20Malawi"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#056699] px-5 py-4 font-bold text-white transition-colors duration-300 hover:bg-[#1BB7C4] sm:w-fit"
              >
                <Navigation size={19} />
                Open Google Maps
                <ExternalLink size={16} />
              </a>
            </motion.div>

            <p className="mt-4 text-xs leading-5 text-gray-400">
              The map currently shows the general Chintheche area. Contact us
              for specific office directions.
            </p>
          </motion.div>
        </motion.div>

        {/* Closing message */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease }}
          className="relative mt-10 overflow-hidden rounded-2xl bg-[#056699] px-6 py-8 text-center sm:px-10 sm:py-10"
        >
          <motion.div
            aria-hidden="true"
            animate={shouldReduceMotion ? undefined : { x: [0, 12, 0], y: [0, -8, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-[#1BB7C4]/20 blur-3xl"
          />

          <div className="relative">
            <motion.div
              animate={shouldReduceMotion ? undefined : { y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Clock size={30} className="mx-auto text-[#1BB7C4]" />
            </motion.div>

            <h3 className="mt-4 text-xl font-bold text-white sm:text-2xl">
              Every Partnership Starts with a Conversation
            </h3>

            <p className="mx-auto mt-3 max-w-2xl leading-7 text-white/80">
              Whether you are a young person, community member, organisation,
              or potential partner, your ideas and contributions matter.
              Let&apos;s work together towards inclusive and sustainable
              development.
            </p>

            <motion.div
              whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.02 }}
              whileTap={tapScale}
              className="mt-6 inline-block"
            >
              <a
                href="mailto:info@fisdev.org?subject=Enquiry%20to%20FISDEV"
                className="inline-flex items-center gap-2 rounded-xl bg-[#1BB7C4] px-6 py-3 font-bold text-white transition-colors duration-300 hover:bg-white hover:text-[#056699]"
              >
                Contact Our Team
                <Mail size={18} />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;