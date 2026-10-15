const testimonials = [
  {
    name: "Grace Banda",
    role: "Community Voice",
    quote:
      "Replace this sample with an approved testimonial from a community member describing their experience with FISDEV.",
  },
  {
    name: "Esther Mwale",
    role: "Youth Voice",
    quote:
      "Replace this sample with a verified account of how a FISDEV programme has supported a young person.",
  },
  {
    name: "Chikondi Phiri",
    role: "Partner Voice",
    quote:
      "Replace this sample with an approved statement from an actual FISDEV partner.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#1BB7C4]">
            Testimonials
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#056699] sm:text-4xl">
            Community Voices
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
            The people and partnerships at the heart of our work.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.role}
              className="flex flex-col rounded-2xl border border-gray-100 bg-[rgb(245,249,252)] p-6 sm:p-8"
            >
              <span
                aria-hidden="true"
                className="text-5xl font-bold leading-none text-[#1BB7C4]"
              >
                “
              </span>

              <blockquote className="mt-3 flex-1 leading-7 text-gray-600">
                {testimonial.quote}
              </blockquote>

              <div className="mt-6 border-t border-gray-200 pt-4">
                <h3 className="font-bold text-[#056699]">
                  {testimonial.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {testimonial.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;