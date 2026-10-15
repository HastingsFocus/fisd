const ContactUs = () => {
  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-[rgb(245,249,252)] px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#1BB7C4]">
            Get in Touch
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#056699] sm:text-4xl">
            Contact Us
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Chintheche%2C+Nkhata+Bay%2C+Malawi"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-gray-100 bg-white p-6 text-center transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h3 className="font-bold text-[#056699]">Our Location</h3>
            <p className="mt-3 leading-7 text-gray-600">
              Chintheche, Nkhata Bay, Malawi
            </p>
          </a>

          <a
            href="tel:+265991020491"
            className="rounded-2xl border border-gray-100 bg-white p-6 text-center transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h3 className="font-bold text-[#056699]">Call Us</h3>
            <p className="mt-3 leading-7 text-gray-600">
              +265 991 020 491
            </p>
          </a>

          <a
            href="mailto:info@fisdev.org"
            className="rounded-2xl border border-gray-100 bg-white p-6 text-center transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h3 className="font-bold text-[#056699]">Email Us</h3>
            <p className="mt-3 break-words leading-7 text-gray-600">
              info@fisdev.org
            </p>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;