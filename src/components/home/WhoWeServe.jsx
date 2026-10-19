import React from "react";
import { Link } from "react-router-dom";
import {
  Users, Baby, Heart, GraduationCap, Accessibility, Sprout,
  ShieldCheck, HandHeart, BriefcaseBusiness, HeartPulse,
  ArrowRight, CheckCircle2, Globe2, Lightbulb,
} from "lucide-react";

const WhoWeServe = () => {
  const beneficiaries = [
    {
      icon: Baby,
      title: "Children",
      description:
        "We support children to access inclusive learning, early childhood development, safe recreational spaces, and opportunities that nurture their growth and potential.",
      focus: [
        "Early childhood development",
        "Access to quality learning opportunities",
        "Safe, inclusive and supportive environments",
      ],
    },
    {
      icon: Heart,
      title: "Women and Girls",
      description:
        "We promote the empowerment, participation, safety, and well-being of women and girls, helping them overcome barriers and participate meaningfully in social and economic development.",
      focus: [
        "Economic empowerment and entrepreneurship",
        "Gender equality and social inclusion",
        "Sexual and reproductive health awareness",
        "Gender-based violence awareness and support pathways",
      ],
    },
    {
      icon: GraduationCap,
      title: "Young People",
      description:
        "As a youth-led social enterprise, FISDEV works to equip young people with the skills, resources, networks, and opportunities needed to build sustainable livelihoods and contribute to their communities.",
      focus: [
        "Digital, technical and employability skills",
        "Entrepreneurship and business incubation",
        "Agribusiness and livelihood development",
        "Innovation, mentorship and access to markets",
      ],
    },
    {
      icon: Accessibility,
      title: "People with Disabilities",
      description:
        "We seek to promote inclusive participation and reduce barriers that prevent people with disabilities from accessing services, developing their abilities, and benefiting from economic and social opportunities.",
      focus: [
        "Inclusive access to opportunities and services",
        "Participation in community development",
        "Skills development and economic inclusion",
        "Respect, accessibility and equal dignity",
      ],
    },
    {
      icon: Users,
      title: "Underserved Communities",
      description:
        "We work with communities facing social and economic exclusion, particularly people with limited access to essential services, livelihood opportunities, and platforms for expressing their concerns.",
      focus: [
        "Community participation and amplified voices",
        "Access to essential social services",
        "Sustainable livelihoods and smart agriculture",
        "Community-led solutions and resilience",
      ],
    },
  ];

  const commitments = [
    {
      icon: HandHeart,
      title: "People-Centred Development",
      description:
        "We recognise people as active participants in development, supporting them to identify challenges, shape solutions, and strengthen their own capabilities.",
    },
    {
      icon: ShieldCheck,
      title: "Inclusion and Dignity",
      description:
        "We work towards fairer opportunities and meaningful participation, with attention to groups who face barriers to services and development.",
    },
    {
      icon: BriefcaseBusiness,
      title: "Economic Empowerment",
      description:
        "We promote skills, entrepreneurship, innovation, and sustainable livelihood opportunities that can strengthen economic independence.",
    },
    {
      icon: HeartPulse,
      title: "Well-being and Essential Services",
      description:
        "We support initiatives that contribute to health awareness, education, safety, and improved access to essential social services.",
    },
    {
      icon: Lightbulb,
      title: "Innovation and Resilience",
      description:
        "We encourage practical, locally relevant solutions that help people and communities adapt, grow, and become more self-reliant.",
    },
    {
      icon: Globe2,
      title: "Community Voices and Partnerships",
      description:
        "We value local knowledge, community participation, collaboration, and partnerships that help create sustainable and inclusive change.",
    },
  ];

  return (
    <div className="bg-[rgb(245,249,252)] text-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[rgb(3,75,113)] px-6 py-24 text-white md:py-32">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#1BB7C4]/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-sky-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">
            <Users size={17} />
            People at the Centre of Development
          </div>

          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">
            Who We <span className="text-[#1BB7C4]">Serve</span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-sky-100 md:text-xl">
            FISDEV works with children, women, young people, people with disabilities, and
            underserved communities to advance inclusion, strengthen livelihoods, improve access
            to essential services, and promote a life of dignity.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 rounded-lg bg-[#1BB7C4] px-6 py-3 font-bold text-white transition hover:bg-[#159da8]"
            >
              Explore Our Programs <ArrowRight size={18} />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-6 py-3 font-bold text-white transition hover:bg-white/10"
            >
              Work With Us
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-3 font-bold uppercase tracking-[0.2em] text-[#1BB7C4]">
              Our Commitment
            </p>

            <h2 className="text-3xl font-extrabold leading-tight text-[#056699] md:text-4xl">
              Inclusive Opportunities for People and Communities
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              FISDEV is committed to empowering young people and underserved communities through
              innovative, sustainable, and inclusive pathways for economic growth, access to
              essential services, and social justice.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              We recognise that individuals and communities experience different challenges. Our
              work therefore focuses on understanding local needs, building capabilities,
              connecting people to opportunities, and supporting solutions that promote long-term
              resilience and self-reliance.
            </p>

            <div className="mt-7 space-y-3">
              {[
                "Recognising the abilities and potential of every person",
                "Reducing barriers to participation and opportunity",
                "Supporting sustainable and community-led development",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={21} className="mt-1 shrink-0 text-[#1BB7C4]" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl bg-white p-7 shadow-xl md:p-10">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-[#056699]">
                <HandHeart size={34} />
              </div>

              <h3 className="text-2xl font-extrabold text-[#056699]">No One Left Behind</h3>

              <p className="mt-4 leading-8 text-gray-600">
                Our commitment is to contribute to a society where people can access opportunities,
                have their voices heard, participate in development, and pursue a dignified and
                sustainable future.
              </p>

              <div className="mt-7 rounded-xl border-l-4 border-[#1BB7C4] bg-[rgb(245,249,252)] p-5">
                <p className="font-semibold leading-7 text-[#056699]">
                  Empowering people. Strengthening communities. Advancing inclusive and
                  sustainable development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficiary Groups */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-3 font-bold uppercase tracking-[0.2em] text-[#1BB7C4]">
              Our Target Groups
            </p>

            <h2 className="text-3xl font-extrabold text-[#056699] md:text-4xl">
              Who Benefits from Our Work?
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              Our programs respond to the needs and potential of different groups, creating
              pathways to skills, services, livelihoods, participation, and improved well-being.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {beneficiaries.map((group) => {
              const Icon = group.icon;

              return (
                <article
                  key={group.title}
                  className="group rounded-2xl border border-gray-100 bg-[rgb(245,249,252)] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#1BB7C4]/50 hover:shadow-xl"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white text-[#056699] shadow-sm transition group-hover:bg-[#056699] group-hover:text-white">
                    <Icon size={29} />
                  </div>

                  <h3 className="text-xl font-extrabold text-[#056699]">{group.title}</h3>

                  <p className="mt-4 leading-7 text-gray-600">{group.description}</p>

                  <div className="my-6 h-px bg-gray-200" />

                  <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-800">
                    Areas of Focus
                  </h4>

                  <ul className="space-y-3">
                    {group.focus.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 size={17} className="mt-1 shrink-0 text-[#1BB7C4]" />
                        <span className="text-sm leading-6 text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* How We Support Communities */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 font-bold uppercase tracking-[0.2em] text-[#1BB7C4]">
              How We Make a Difference
            </p>

            <h2 className="text-3xl font-extrabold text-[#056699] md:text-4xl">
              Turning Needs into Opportunities
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              We connect our target groups with practical interventions that build skills, expand
              access, support enterprise, and strengthen community participation.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: GraduationCap,
                title: "Skills and Education",
                description:
                  "Supporting learning, digital inclusion, technical training, and employability.",
              },
              {
                icon: Sprout,
                title: "Sustainable Livelihoods",
                description:
                  "Promoting agribusiness, entrepreneurship, innovation, and economic resilience.",
              },
              {
                icon: HeartPulse,
                title: "Health and Well-being",
                description:
                  "Encouraging health awareness, mental well-being, and access to support services.",
              },
              {
                icon: Globe2,
                title: "Voices and Participation",
                description:
                  "Creating opportunities for people to express concerns and shape community solutions.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm transition hover:shadow-lg"
                >
                  <Icon size={30} className="mb-5 text-[#1BB7C4]" />

                  <h3 className="text-lg font-bold text-[#056699]">{item.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Commitments */}
      <section className="bg-[#056699] px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 font-bold uppercase tracking-[0.2em] text-[#7ee8ed]">Our Promise</p>

            <h2 className="text-3xl font-extrabold md:text-4xl">Principles That Guide Our Work</h2>

            <p className="mt-5 leading-8 text-sky-100">
              Every intervention is guided by our commitment to inclusion, innovation,
              accountability, partnership, and sustainable community development.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {commitments.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/15 bg-white/10 p-6 transition hover:bg-white/15"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1BB7C4] text-white">
                    <Icon size={25} />
                  </div>

                  <h3 className="text-lg font-bold">{item.title}</h3>

                  <p className="mt-3 leading-7 text-sky-100">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white px-7 py-12 text-center shadow-lg md:px-14 md:py-16">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-[#056699]">
            <Users size={34} />
          </div>

          <h2 className="text-3xl font-extrabold text-[#056699] md:text-4xl">
            Let's Build Inclusive Opportunities Together
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-600">
            Join FISDEV in supporting people and communities to develop their potential, access
            opportunities, and contribute to a more inclusive and sustainable future.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-[#1BB7C4] px-6 py-3 font-bold text-white transition hover:bg-[#159da8]"
            >
              Partner With Us <ArrowRight size={18} />
            </Link>

            <Link
              to="/programs"
              className="inline-flex items-center gap-2 rounded-lg border border-[#056699] px-6 py-3 font-bold text-[#056699] transition hover:bg-sky-50"
            >
              Discover Our Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhoWeServe;