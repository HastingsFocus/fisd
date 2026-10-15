import React from "react";

const organizationalCards = [
  {
    title: "Our Vision",
    icon: "vision",
    description:
      "A society where youth and communities thrive through inclusive opportunities, sustainable solutions and amplified voices towards a life with dignity and poverty free.",
  },
  {
    title: "Our Mission",
    icon: "mission",
    description:
      "To empower young people and underserved communities by providing innovative, sustainable and inclusive pathways for economic growth, access to essential services and social justice across diverse sectors.",
  },
  {
    title: "Our Foundation",
    icon: "foundation",
    description:
      "In Malawi, where over 70% of the population is under 35, youth face barriers to education, decent work and decision-making. Rural communities remain vulnerable to poverty, food insecurity and climate shocks — inspiring the creation of FISDEV.",
  },
  {
    title: "Our Approach",
    icon: "approach",
    description:
      "We empower youth and underserved communities through three strategic pillars: advancing economic empowerment, unlocking access to essential social services, and amplifying the voices of vulnerable groups on social injustice.",
  },
  {
    title: "Our Alignment",
    icon: "alignment",
    description:
      'We are strongly aligned with Malawi 2063 vision — "an inclusively wealthy and self-reliant nation" — through human capital development, private sector-led growth, agricultural commercialisation and enterprise growth.',
  },
];

const Icon = ({ name }) => {
  const sharedProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-7 w-7",
    "aria-hidden": true,
  };

  switch (name) {
    case "vision":
      return (
        <svg {...sharedProps}>
          <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
          <circle cx="12" cy="12" r="3" />
          <circle cx="12" cy="12" r="1" />
        </svg>
      );

    case "mission":
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5.5" />
          <circle cx="12" cy="12" r="2" />
          <path d="m13.5 10.5 6-6" />
          <path d="M16 4.5h3.5V8" />
        </svg>
      );

    case "foundation":
      return (
        <svg {...sharedProps}>
          <path d="M12 21V11" />
          <path d="M12 14C6 14 4 10 4 6c5 0 8 2 8 8Z" />
          <path d="M12 11c0-5 3-8 8-8 0 5-2 8-8 8Z" />
          <path d="M5 21h14" />
        </svg>
      );

    case "approach":
      return (
        <svg {...sharedProps}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20v-2a6 6 0 0 1 12 0v2" />
          <path d="M16 5.5a3 3 0 0 1 0 5.8" />
          <path d="M18 14a5 5 0 0 1 3 4.5V20" />
        </svg>
      );

    case "alignment":
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
          <path d="M12 3v2M21 12h-2M12 21v-2M3 12h2" />
        </svg>
      );

    default:
      return null;
  }
};

const About = () => {
  return (
    <section
      id="about"
      className="scroll-mt-24 bg-[rgb(245,249,252)] px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#1BB7C4]">
            Who We Are
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#056699] sm:text-4xl">
            About FISDEV
          </h2>

          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#1BB7C4]" />
        </div>

        {/* Introduction */}
        <div className="mt-10 space-y-6 text-base leading-8 text-gray-600 sm:text-lg">
          <p>
            The Foundation for Inclusive and Sustainable Development (FISDEV)
            is a Malawian youth-led social enterprise registered under the
            company's incorporation Act. We are dedicated to challenging the
            social status quo, breaking vicious cycles of poverty, and building
            sustainable pathways for youth and other underserved communities
            in both urban and rural areas to achieve economic independence and
            successfully transition out of poverty.
          </p>

          <p>
            FISDEV integrates youth- and community-centric sustainable
            solutions to accelerate inclusive, equitable development across
            Malawi. Our work blends economic empowerment, social service
            access, and advocacy for vulnerable groups.
          </p>
        </div>

        {/* Vision, mission and organizational identity */}
        <div className="mt-12">
          <div className="mb-7 text-center">
            <h3 className="text-2xl font-bold text-[#056699] sm:text-3xl">
              Our Purpose and Direction
            </h3>
            <p className="mx-auto mt-3 max-w-2xl leading-7 text-gray-600">
              Discover the vision, mission and guiding approach behind our
              commitment to inclusive and sustainable development.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {organizationalCards.map((item) => (
              <article
                key={item.title}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#1BB7C4]/50 hover:shadow-lg sm:p-7"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#1BB7C4]/10 text-[#056699] transition duration-300 group-hover:bg-[#1BB7C4] group-hover:text-white">
                  <Icon name={item.icon} />
                </div>

                <h4 className="mt-5 text-xl font-bold text-[#056699]">
                  {item.title}
                </h4>

                <div className="mt-3 h-1 w-10 rounded-full bg-[#1BB7C4]" />

                <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Continental and national alignment */}
        <div className="mt-16">
          <div className="mb-7 text-center">
            <h3 className="text-2xl font-bold text-[#056699] sm:text-3xl">
              Our Strategic Alignment
            </h3>
            <p className="mx-auto mt-3 max-w-2xl leading-7 text-gray-600">
              Our work contributes to continental goals, global development
              priorities and Malawi's national development agenda.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1BB7C4]/10 text-[#056699]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
                </svg>
              </div>

              <h4 className="mt-4 text-xl font-bold text-[#056699]">
                Continental &amp; Global Alignment
              </h4>

              <p className="mt-3 leading-7 text-gray-600">
                African Union Agenda 2063 — Aspirations 1, 4 and 6: a
                prosperous Africa based on inclusive growth, transformed
                economies creating youth opportunities, and people-driven
                development.
              </p>
            </article>

            <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1BB7C4]/10 text-[#056699]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
                </svg>
              </div>

              <h4 className="mt-4 text-xl font-bold text-[#056699]">
                Sustainable Development Goals
              </h4>

              <p className="mt-3 leading-7 text-gray-600">
                Goal 1: No Poverty; Goal 5: Gender Equality; Goal 8: Decent
                Work; Goal 9: Industry and Innovation; Goal 10: Reduced
                Inequalities; Goal 12: Responsible Consumption; Goal 13:
                Climate Action; and Goal 17: Partnerships.
              </p>
            </article>

            <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:shadow-lg md:col-span-2 lg:col-span-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1BB7C4]/10 text-[#056699]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path d="M12 3 3 8l9 5 9-5-9-5Z" />
                  <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
                </svg>
              </div>

              <h4 className="mt-4 text-xl font-bold text-[#056699]">
                National Policy Alignment
              </h4>

              <p className="mt-3 leading-7 text-gray-600">
                Our work aligns with national youth and gender policies, the
                National Agriculture Policy, and the National Climate Change
                Management Policy.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;