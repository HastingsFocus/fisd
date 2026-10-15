const values = [
  {
    number: "01",
    title: "Resilience",
    description:
      "Building capacity to withstand shocks, promoting sustainable livelihoods and diversified income beyond project cycles.",
    examples: [
      "Climate-smart agriculture",
      "Enterprise resilience training",
    ],
  },
  {
    number: "02",
    title: "Innovation",
    description:
      "Creative, evidence-based solutions that improve efficiency and impact while responding to evolving needs.",
    examples: ["Digital tools for farmers", "Solar innovation hubs"],
  },
  {
    number: "03",
    title: "Inclusion",
    description:
      "Equitable access for all, especially youth, women, and underserved populations through gender-responsive programs.",
    examples: ["Women-led enterprises", "Youth leadership councils"],
  },
  {
    number: "04",
    title: "Partnerships",
    description:
      "Collaboration with communities, donors, government, and the private sector for greater scale and sustainability.",
    examples: ["Strategic alliances", "Multi-sector collaboration"],
  },
];

const Values = () => {
  return (
    <section className="bg-[rgb(245,249,252)] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#1BB7C4]">
            What Guides Us
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#056699] sm:text-4xl">
            Our Core Values
          </h2>
          <p className="mt-4 leading-7 text-gray-600">
            We put people, sustainable solutions, innovation, and collaboration
            at the centre of our work.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {values.map((value) => (
            <article
              key={value.title}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#1BB7C4]/15 font-bold text-[#056699]">
                {value.number}
              </span>

              <h3 className="mt-5 text-xl font-bold text-[#056699]">
                {value.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
                {value.description}
              </p>

              <ul className="mt-5 space-y-3">
                {value.examples.map((example) => (
                  <li
                    key={example}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#1BB7C4]"
                    />
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;