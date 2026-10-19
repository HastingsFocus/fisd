import React from "react";
import { Link } from "react-router-dom";
import {
  Handshake, HeartHandshake, Users, HandHeart, BriefcaseBusiness, Lightbulb,
  Sprout, GraduationCap, Megaphone, Landmark, Globe2, ArrowRight, CheckCircle2,
  Mail, Target, HeartPulse,
} from "lucide-react";

const opportunities = [
  {
    icon: Handshake,
    title: "Strategic Partnerships",
    description:
      "Partner with FISDEV to design and implement inclusive, sustainable initiatives that respond to the needs of young people and underserved communities.",
    points: [
      "Collaborate on development programs",
      "Share expertise, networks, and resources",
      "Support community-led solutions",
    ],
  },
  {
    icon: HandHeart,
    title: "Volunteer With Us",
    description:
      "Contribute your time, knowledge, and energy to initiatives that promote skills development, community participation, well-being, and sustainable livelihoods.",
    points: [
      "Support community activities",
      "Mentor young people and emerging entrepreneurs",
      "Contribute professional or technical skills",
    ],
  },
  {
    icon: BriefcaseBusiness,
    title: "Resource Mobilisation",
    description:
      "Help mobilise financial, technical, material, and institutional resources to support FISDEV's mission and strategic programs.",
    points: [
      "Explore funding and grant opportunities",
      "Contribute relevant equipment or expertise",
      "Connect FISDEV with potential supporters",
    ],
  },
  {
    icon: Lightbulb,
    title: "Innovation and Enterprise",
    description:
      "Work with FISDEV to nurture ideas, strengthen entrepreneurship, encourage technology adoption, and create pathways for sustainable business growth.",
    points: [
      "Share innovative ideas and solutions",
      "Support enterprise development and mentorship",
      "Connect innovators to networks and markets",
    ],
  },
  {
    icon: GraduationCap,
    title: "Skills and Knowledge Sharing",
    description:
      "Help expand access to practical knowledge and skills that strengthen employability, digital inclusion, education, and community resilience.",
    points: [
      "Deliver or support training activities",
      "Provide career guidance and mentorship",
      "Share digital, technical, or business expertise",
    ],
  },
  {
    icon: Megaphone,
    title: "Community Voice and Advocacy",
    description:
      "Support initiatives that amplify the experiences and perspectives of vulnerable groups and encourage participation in addressing social injustice.",
    points: [
      "Support community dialogue and storytelling",
      "Promote inclusive participation",
      "Help raise awareness of community priorities",
    ],
  },
];

const impactAreas = [
  {
    icon: Sprout,
    number: "01",
    title: "Economic Empowerment",
    description:
      "Help strengthen livelihoods through entrepreneurship, smart agriculture, agribusiness, digital skills, and access to economic opportunities.",
  },
  {
    icon: HeartPulse,
    number: "02",
    title: "Essential Social Services",
    description:
      "Support initiatives that contribute to education, early childhood development, health awareness, well-being, and inclusive access to services.",
  },
  {
    icon: Users,
    number: "03",
    title: "Amplifying Community Voices",
    description:
      "Help children, women, young people, people with disabilities, and underserved communities participate meaningfully in development and social justice initiatives.",
  },
];

const principles = [
  "Inclusion and equal opportunity",
  "Integrity and accountability",
  "Innovation and practical solutions",
  "Partnership and collaboration",
  "Sustainability and community resilience",
];

const GetInvolved = () => {
  return (
    <main className="bg-[rgb(245,249,252)] text-gray-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[rgb(3,75,113)] px-6 py-24 text-white md:py-32">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#1BB7C4]/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-16 h-72 w-72 rounded-full bg-sky-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">
            <HeartHandshake size={18} />
            Be Part of the Change
          </div>

          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">
            Get <span className="text-[#1BB7C4]">Involved</span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-sky-100 md:text-xl">
            Join FISDEV in empowering young people and underserved communities through inclusive
            opportunities, sustainable solutions, access to essential services, and stronger
            community voices.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#opportunities"
              className="inline-flex items-center gap-2 rounded-lg bg-[#1BB7C4] px-6 py-3 font-bold text-white transition hover:bg-[#159da8]"
            >
              Explore Opportunities <ArrowRight size={18} />
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-6 py-3 font-bold text-white transition hover:bg-white/10"
            >
              Contact FISDEV
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-3 font-bold uppercase tracking-[0.2em] text-[#1BB7C4]">
              Make a Difference
            </p>

            <h2 className="text-3xl font-extrabold leading-tight text-[#056699] md:text-4xl">
              Lasting Change Takes All of Us
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              Sustainable development is a shared responsibility. FISDEV welcomes collaboration
              with individuals, institutions, development organisations, businesses, educators,
              innovators, and community stakeholders who share a commitment to inclusive and
              sustainable progress.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              Whether you bring professional expertise, practical skills, resources, ideas,
              networks, or time, your contribution can help create opportunities and strengthen
              community-led development.
            </p>

            <div className="mt-7 space-y-3">
              {principles.map((principle) => (
                <div key={principle} className="flex items-start gap-3">
                  <CheckCircle2 size={21} className="mt-1 shrink-0 text-[#1BB7C4]" />
                  <p className="text-gray-700">{principle}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-lg md:p-10">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-[#056699]">
              <Target size={34} />
            </div>

            <h3 className="text-2xl font-extrabold text-[#056699]">
              Where Your Contribution Can Help
            </h3>

            <p className="mt-4 leading-8 text-gray-600">
              Our work focuses on improving economic opportunities, unlocking access to essential
              social services, and amplifying the voices of vulnerable groups facing exclusion and
              social injustice.
            </p>

            <div className="mt-7 rounded-xl border-l-4 border-[#1BB7C4] bg-[rgb(245,249,252)] p-5">
              <p className="font-semibold leading-7 text-[#056699]">
                Together, we can turn shared commitment into practical, sustainable community
                impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities */}
      <section id="opportunities" className="scroll-mt-24 bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-3 font-bold uppercase tracking-[0.2em] text-[#1BB7C4]">
              Ways to Participate
            </p>

            <h2 className="text-3xl font-extrabold text-[#056699] md:text-4xl">
              Find Your Way to Get Involved
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              There are different ways to contribute to our mission. Explore the opportunities
              below and identify where your interests, experience, or resources align with FISDEV's
              work.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {opportunities.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group rounded-2xl border border-gray-100 bg-[rgb(245,249,252)] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#1BB7C4]/50 hover:shadow-xl"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white text-[#056699] shadow-sm transition group-hover:bg-[#056699] group-hover:text-white">
                    <Icon size={29} />
                  </div>

                  <h3 className="text-xl font-extrabold text-[#056699]">{item.title}</h3>

                  <p className="mt-4 leading-7 text-gray-600">{item.description}</p>

                  <ul className="mt-6 space-y-3">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <CheckCircle2 size={17} className="mt-1 shrink-0 text-[#1BB7C4]" />
                        <span className="text-sm leading-6 text-gray-600">{point}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className="mt-7 inline-flex items-center gap-2 font-bold text-[#056699] transition hover:text-[#1BB7C4]"
                  >
                    Express Your Interest <ArrowRight size={17} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Strategic Pillars */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 font-bold uppercase tracking-[0.2em] text-[#1BB7C4]">
              Aligned With Our Mission
            </p>

            <h2 className="text-3xl font-extrabold text-[#056699] md:text-4xl">
              Three Areas Where We Drive Change
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              Contributions and collaborations can support FISDEV's three strategic pillars and
              help create more inclusive, resilient communities.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-3">
            {impactAreas.map((area) => {
              const Icon = area.icon;

              return (
                <article
                  key={area.number}
                  className="rounded-2xl border border-sky-100 bg-white p-7 shadow-sm transition hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-extrabold text-[#1BB7C4]/50">
                      {area.number}
                    </span>
                    <Icon size={30} className="text-[#056699]" />
                  </div>

                  <h3 className="mt-5 text-xl font-extrabold text-[#056699]">{area.title}</h3>

                  <p className="mt-4 leading-7 text-gray-600">{area.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who can collaborate */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="mb-3 font-bold uppercase tracking-[0.2em] text-[#1BB7C4]">
                Stronger Together
              </p>

              <h2 className="text-3xl font-extrabold leading-tight text-[#056699] md:text-4xl">
                Collaboration Across Communities and Sectors
              </h2>

              <p className="mt-5 leading-8 text-gray-600">
                We recognise the importance of partnerships in mobilising resources, sharing
                knowledge, developing practical solutions, and extending the reach of sustainable
                development initiatives.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users, title: "Community Groups" },
                { icon: Landmark, title: "Institutions" },
                { icon: BriefcaseBusiness, title: "Businesses" },
                { icon: Globe2, title: "Development Partners" },
              ].map((partner) => {
                const Icon = partner.icon;

                return (
                  <div
                    key={partner.title}
                    className="rounded-xl border border-sky-100 bg-[rgb(245,249,252)] p-5 text-center"
                  >
                    <Icon size={29} className="mx-auto mb-3 text-[#1BB7C4]" />
                    <h3 className="font-bold text-[#056699]">{partner.title}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-[#056699] px-7 py-12 text-center text-white md:px-14 md:py-16">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-[#7ee8ed]">
            <HeartHandshake size={36} />
          </div>

          <h2 className="text-3xl font-extrabold md:text-4xl">Ready to Make a Difference?</h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-sky-100">
            Tell us how you would like to contribute, collaborate, or support FISDEV's mission.
            Let's explore opportunities to work together.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-[#1BB7C4] px-6 py-3 font-bold text-white transition hover:bg-[#159da8]"
            >
              <Mail size={18} />
              Get in Touch
            </Link>

            <Link
              to="/programs"
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-6 py-3 font-bold text-white transition hover:bg-white/10"
            >
              Explore Our Programs <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GetInvolved;