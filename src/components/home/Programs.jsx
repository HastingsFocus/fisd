import React from "react";

const programs = [
  {
    number: "01",
    title: "Amplified Community Voices & Tourism Drive",
    tagline: "Echoing Voices from the Margins.",
    icon: "voices",
    description:
      "This program empowers youth and communities to tell their own stories as tools for social change. Young people are trained in community research, persuasive writing, public storytelling, poetry, drama, and acting to document lived experiences, inspire action, and influence policy. The program facilitates creative platforms that showcase talent, amplify voices, and commercialize artistic skills for sustainable livelihoods. It also promotes cultural heritage preservation through professional tour guide training, historical site conservation, development of model cultural villages, and sustainable tourism initiatives.",
    focus: [
      "Community storytelling and advocacy",
      "Creative arts and talent development",
      "Cultural heritage and sustainable tourism",
    ],
  },
  {
    number: "02",
    title: "Ed-Tech Skills Development",
    icon: "technology",
    description:
      "The program equips youth with practical digital, technical, and employability skills for the modern economy. It delivers digital skills training, supports young innovators to develop and commercialize tech solutions, strengthens TEVET skills with a focus on agribusiness, and provides on-the-job training opportunities to help graduates transition smoothly into the workforce.",
    focus: [
      "Digital and technical skills training",
      "Technology innovation and commercialization",
      "TEVET and workplace readiness",
    ],
  },
  {
    number: "03",
    title: "Spark Incubation Program",
    icon: "incubation",
    description:
      "Spark Incubation supports start-ups and emerging enterprises to grow into investment-ready businesses. The program provides access to finance, co-working spaces, enterprise development training, mentorship, and coaching. Start-ups are connected to ecosystem players through networking, market expos, and conferences, enabling market access, partnerships, and exposure to investors and industry trends.",
    focus: [
      "Business incubation and mentorship",
      "Access to finance and co-working spaces",
      "Market access and investor connections",
    ],
  },
  {
    number: "04",
    title: "Eco-Agri Commercial",
    icon: "agriculture",
    description:
      "This program promotes sustainable agribusiness and green entrepreneurship. It supports market access through outlet stores, strengthens value addition via agri-processing, promotes agri-innovations to boost productivity, delivers hands-on agripreneurship training, and offers product branding and marketing services to improve visibility, competitiveness, and profitability.",
    focus: [
      "Sustainable agriculture and agribusiness",
      "Agri-processing and value addition",
      "Product branding, marketing and market access",
    ],
  },
  {
    number: "05",
    title: "Early Child Development",
    icon: "child",
    description:
      "The program strengthens early learning and creativity for young children. It builds the capacity of nursery school teachers, supports curriculum development, establishes quality assurance mechanisms, and facilitates exchange visits. It also creates child-friendly innovation spaces such as the Dreamers’ Corner and safe entertainment and play areas to nurture creativity, curiosity, and holistic development.",
    focus: [
      "Early learning and teacher development",
      "Curriculum support and quality assurance",
      "Safe, creative and child-friendly spaces",
    ],
  },
  {
    number: "06",
    title: "Youth Friendly Health Corner",
    icon: "health",
    description:
      "The Youth-Friendly Health Corner promotes the physical, mental, and social well-being of young people. It provides mental health and wellness support through peer educators and trained youth workers, facilitates access to SRHR services, and addresses GBV through awareness, survivor support, and referral systems. Sports and physical activities are used to promote healthy lifestyles, identify talent, and link youth to further development opportunities.",
    focus: [
      "Mental health and youth wellness",
      "SRHR awareness and access to services",
      "GBV awareness, support and referrals",
    ],
  },
];

const ProgramIcon = ({ name }) => {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-8 w-8",
    "aria-hidden": true,
  };

  switch (name) {
    case "voices":
      return (
        <svg {...props}>
          <path d="M12 18a6 6 0 0 0 6-6V7a6 6 0 0 0-12 0v5a6 6 0 0 0 6 6Z" />
          <path d="M9 7v5M12 5v8M15 8v4M5 12a7 7 0 0 0 14 0M12 19v3M8 22h8" />
        </svg>
      );

    case "technology":
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M8 21h8M12 17v4M8 9l-2 2 2 2M16 9l2 2-2 2M13.5 8l-3 6" />
        </svg>
      );

    case "incubation":
      return (
        <svg {...props}>
          <path d="M12 3v4M12 7l-6 4M12 7l6 4" />
          <circle cx="12" cy="4" r="2" />
          <circle cx="5" cy="13" r="3" />
          <circle cx="19" cy="13" r="3" />
          <path d="M12 13v4M9 21h6M10 17h4" />
        </svg>
      );

    case "agriculture":
      return (
        <svg {...props}>
          <path d="M12 21v-9" />
          <path d="M12 14C5 14 3 9 3 5c6 0 9 3 9 9Z" />
          <path d="M12 11c0-5 3-8 9-8 0 5-3 8-9 8Z" />
          <path d="M4 21h16" />
        </svg>
      );

    case "child":
      return (
        <svg {...props}>
          <circle cx="12" cy="8" r="4" />
          <path d="M5 21v-2a7 7 0 0 1 14 0v2M9 8h.01M15 8h.01" />
          <path d="M10 11a3 3 0 0 0 4 0" />
        </svg>
      );

    case "health":
      return (
        <svg {...props}>
          <path d="M12 21s-8-4.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.5-8 11-8 11Z" />
          <path d="M8 12h2.5l1.5-3 2 6 1.5-3H18" />
        </svg>
      );

    default:
      return null;
  }
};

const Programs = () => {
  return (
    <main className="min-h-screen bg-[rgb(245,249,252)]">
      {/* Page hero */}
      <section className="relative isolate overflow-hidden bg-[rgb(3,75,113)] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full bg-[#1BB7C4]/20 blur-3xl" />
        <div className="absolute -bottom-28 -left-20 -z-10 h-72 w-72 rounded-full bg-[#1BB7C4]/10 blur-3xl" />

        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1BB7C4]">
            What We Do
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Our Programs
          </h1>

          <div className="mt-5 h-1 w-20 rounded-full bg-[#1BB7C4]" />

          <p className="mt-6 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
            Discover how FISDEV empowers young people, strengthens communities
            and creates sustainable opportunities through inclusive
            development programs across diverse sectors.
          </p>

          <a
            href="/#contact"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#1BB7C4] px-6 py-3 font-semibold text-white transition hover:bg-[#159da8] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#034b71]"
          >
            Partner With Us
            <span className="ml-2" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </section>

      {/* Programs grid */}
      <section
        id="program-list"
        className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#1BB7C4]">
              Key Programs &amp; Services
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#056699] sm:text-4xl">
              Creating Opportunities. Transforming Lives.
            </h2>

            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#1BB7C4]" />

            <p className="mt-5 leading-7 text-gray-600 sm:text-lg">
              From youth empowerment and digital skills to sustainable
              agriculture, enterprise development, early learning and health,
              our programs respond to the needs and potential of communities.
            </p>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-7 md:grid-cols-2 xl:grid-cols-3">
            {programs.map((program) => (
              <article
                key={program.number}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#1BB7C4]/50 hover:shadow-xl"
              >
                <div className="h-1.5 w-full bg-gradient-to-r from-[#056699] to-[#1BB7C4]" />

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#1BB7C4]/10 text-[#056699] transition duration-300 group-hover:bg-[#1BB7C4] group-hover:text-white">
                      <ProgramIcon name={program.icon} />
                    </div>

                    <span className="text-3xl font-bold text-[#056699]/15">
                      {program.number}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold leading-snug text-[#056699] sm:text-2xl">
                    {program.title}
                  </h3>

                  {program.tagline && (
                    <p className="mt-2 font-semibold italic text-[#159da8]">
                      {program.tagline}
                    </p>
                  )}

                  <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                    {program.description}
                  </p>

                  <div className="mt-6 border-t border-gray-100 pt-5">
                    <h4 className="text-sm font-bold uppercase tracking-wide text-[#056699]">
                      Key Focus Areas
                    </h4>

                    <ul className="mt-3 space-y-3">
                      {program.focus.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm leading-6 text-gray-600"
                        >
                          <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1BB7C4]/15 text-xs font-bold text-[#056699]">
                            ✓
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="/#contact"
                    className="mt-7 inline-flex items-center gap-2 self-start font-semibold text-[#056699] transition hover:text-[#159da8] focus:outline-none focus:underline"
                    aria-label={`Enquire about ${program.title}`}
                  >
                    Enquire about this program
                    <span
                      className="transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 rounded-2xl bg-[rgb(3,75,113)] p-7 text-white sm:p-10 lg:flex-row lg:items-center lg:p-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#1BB7C4]">
              Make a Difference
            </p>

            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Help Us Build a More Inclusive Future
            </h2>

            <p className="mt-4 leading-7 text-white/85">
              Partner with FISDEV to support young people, strengthen
              communities and create lasting opportunities for sustainable
              development.
            </p>
          </div>

          <a
            href="/#contact"
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-lg bg-[#1BB7C4] px-6 py-3 font-semibold text-white transition hover:bg-[#159da8] focus:outline-none focus:ring-2 focus:ring-white"
          >
            Get in Touch →
          </a>
        </div>
      </section>
    </main>
  );
};

export default Programs;