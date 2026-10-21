import React from "react";
import { Link } from "react-router-dom";
import { Mic2, Laptop, Lightbulb, Sprout, Baby, HeartPulse, ArrowRight, CheckCircle2 } from "lucide-react";

const programs = [
  {
    number: "01",
    title: "Amplified Community Voices & Tourism Drive",
    tagline: "Echoing Voices from the Margins.",
    icon: Mic2,
    description: "This program empowers youth and communities to tell their own stories as tools for social change. Young people are trained in community research, persuasive writing, public storytelling, poetry, drama, and acting to document lived experiences, inspire action, and influence policy.",
    additional: "The program also creates creative platforms that showcase talent, amplify voices, and commercialize artistic skills for sustainable livelihoods. It promotes cultural heritage preservation through professional tour guide training, historical site conservation, development of model cultural villages, and sustainable tourism initiatives.",
    focus: [
      "Community storytelling and advocacy",
      "Creative arts and talent development",
      "Cultural heritage preservation",
      "Professional tour guide training",
      "Sustainable tourism initiatives",
    ],
  },
  {
    number: "02",
    title: "Ed-Tech Skills Development",
    icon: Laptop,
    description: "This program equips young people with practical digital, technical, and employability skills needed to participate effectively in the modern economy.",
    additional: "It delivers digital skills training, supports young innovators to develop and commercialize technology solutions, strengthens TEVET skills with a focus on agribusiness, and provides on-the-job training opportunities that help graduates transition into the workforce.",
    focus: [
      "Digital and technical skills development",
      "Technology innovation and commercialization",
      "TEVET skills development",
      "Agribusiness skills",
      "Workplace readiness and on-the-job training",
    ],
  },
  {
    number: "03",
    title: "Spark Incubation Program",
    icon: Lightbulb,
    description: "Spark Incubation supports start-ups and emerging enterprises to develop, grow and become investment-ready businesses.",
    additional: "The program provides access to finance, co-working spaces, enterprise development training, mentorship and coaching. Start-ups are connected to ecosystem players through networking opportunities, market expos and conferences.",
    focus: [
      "Business incubation and enterprise development",
      "Mentorship and coaching",
      "Access to finance",
      "Co-working spaces",
      "Market access and networking",
      "Investor and industry connections",
    ],
  },
  {
    number: "04",
    title: "Eco-Agri Commercial",
    icon: Sprout,
    description: "This program promotes sustainable agribusiness, agricultural commercialization and green entrepreneurship among young people and communities.",
    additional: "The program strengthens market access through outlet stores, supports value addition through agri-processing, promotes agricultural innovations to improve productivity, and provides practical agripreneurship training.",
    focus: [
      "Sustainable agriculture and agribusiness",
      "Agricultural commercialization",
      "Agri-processing and value addition",
      "Agricultural innovation",
      "Agripreneurship training",
      "Product branding and marketing",
      "Market access",
    ],
  },
  {
    number: "05",
    title: "Early Child Development",
    icon: Baby,
    description: "This program strengthens early learning, creativity and holistic development among young children while supporting the people and systems responsible for early childhood development.",
    additional: "It builds the capacity of nursery school teachers, supports curriculum development, establishes quality assurance mechanisms and facilitates exchange visits. The program also creates child-friendly innovation spaces such as the Dreamers' Corner and safe entertainment and play areas.",
    focus: [
      "Early learning and child development",
      "Nursery school teacher capacity building",
      "Curriculum development and support",
      "Quality assurance",
      "Exchange visits",
      "Child-friendly innovation spaces",
      "Safe entertainment and play areas",
    ],
  },
  {
    number: "06",
    title: "Youth Friendly Health Corner",
    icon: HeartPulse,
    description: "The Youth-Friendly Health Corner promotes the physical, mental and social well-being of young people by improving access to information, support and essential services.",
    additional: "The program provides mental health and wellness support through peer educators and trained youth workers, facilitates access to sexual and reproductive health and rights services, and addresses gender-based violence through awareness, survivor support and referral systems.",
    focus: [
      "Mental health and youth wellness",
      "Youth-friendly health services",
      "SRHR awareness and access",
      "GBV awareness and prevention",
      "Survivor support and referrals",
      "Sports and physical activities",
      "Youth talent identification and development",
    ],
  },
];

const Programs = () => {
  return (
    <main className="min-h-screen bg-[rgb(245,249,252)]">
      {/* Page Hero */}
      <section className="relative overflow-hidden bg-[rgb(3,75,113)] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#1BB7C4]/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#1BB7C4]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1BB7C4]">What We Do</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">Our Programs</h1>
          <div className="mt-5 h-1 w-20 rounded-full bg-[#1BB7C4]" />
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
            FISDEV delivers inclusive and sustainable programs that empower young people, strengthen communities, expand access to essential services and create pathways to economic independence.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1BB7C4]">Our Areas of Work</p>
          <h2 className="mt-3 text-3xl font-bold text-[#056699] sm:text-4xl">Creating Opportunities. Transforming Lives.</h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#1BB7C4]" />
          <p className="mt-6 text-base leading-8 text-gray-600 sm:text-lg">
            Our programs respond to the needs, challenges and potential of young people and underserved communities. Through skills development, enterprise support, sustainable agriculture, early childhood development, health and community empowerment, FISDEV works to create opportunities that can lead to lasting social and economic change.
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="px-5 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
            {programs.map((program) => {
              const Icon = program.icon;

              return (
                <article
                  key={program.number}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#1BB7C4]/50 hover:shadow-xl"
                >
                  {/* Top accent */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-[#056699] to-[#1BB7C4]" />

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    {/* Icon + Number */}
                    <div className="flex items-start justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#1BB7C4]/10 text-[#056699] transition duration-300 group-hover:bg-[#1BB7C4] group-hover:text-white">
                        <Icon size={30} strokeWidth={1.7} aria-hidden="true" />
                      </div>
                      <span className="text-3xl font-bold text-[#056699]/10">{program.number}</span>
                    </div>

                    {/* Title */}
                    <h2 className="mt-6 text-xl font-bold leading-snug text-[#056699] sm:text-2xl">{program.title}</h2>

                    {/* Tagline */}
                    {program.tagline && (
                      <p className="mt-2 text-sm font-semibold italic text-[#159da8]">{program.tagline}</p>
                    )}

                    {/* Description */}
                    <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">{program.description}</p>
                    <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">{program.additional}</p>

                    {/* Focus Areas */}
                    <div className="mt-6 border-t border-gray-100 pt-5">
                      <h3 className="text-sm font-bold uppercase tracking-wide text-[#056699]">Key Focus Areas</h3>
                      <ul className="mt-4 space-y-3">
                        {program.focus.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-sm leading-6 text-gray-600">
                            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#1BB7C4]" strokeWidth={2} aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Enquiry */}
                    <div className="mt-auto pt-7">
                      <Link to="/contact" className="inline-flex items-center gap-2 font-semibold text-[#056699] transition hover:text-[#159da8]">
                        Enquire about this program
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-5 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-[rgb(3,75,113)] px-7 py-10 text-white sm:px-10 lg:px-12 lg:py-12">
          <div className="flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1BB7C4]">Work With Us</p>
              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Support Inclusive and Sustainable Development</h2>
              <p className="mt-4 leading-7 text-white/85">
                Whether you are an organisation, institution, investor, community group or individual, there are opportunities to collaborate with FISDEV and contribute to meaningful change.
              </p>
            </div>

            <Link to="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#1BB7C4] px-6 py-3 font-semibold text-white transition hover:bg-[#159da8]">
              Contact Us
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Programs;