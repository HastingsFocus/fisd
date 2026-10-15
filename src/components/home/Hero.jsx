import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const previousSlide = () => {
    setActiveIndex((current) =>
      current === 0 ? slides.length - 1 : current - 1
    );
  };

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  const slide = slides[activeIndex];

  return (
    <section className="relative flex min-h-[560px] items-center overflow-hidden bg-[#034b71] sm:min-h-[620px] lg:min-h-[680px]">
      {/* Background image */}
      <img
        key={slide.image}
        src={slide.image}
        alt={slide.alt}
        className="hero-slide-fade absolute inset-0 z-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 z-[1] bg-[#034b71]/90" />

      {/* Hero content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-12">
        <div key={slide.title} className="hero-slide-fade max-w-3xl text-white">
          <p className="mb-5 inline-block rounded-full border border-white/30 bg-black/20 px-4 py-2 text-sm font-semibold tracking-wide text-[#1BB7C4] backdrop-blur-sm">
            Foundation for Inclusive and Sustainable Development
          </p>

          <h1 className="text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
            {slide.title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white sm:text-lg">
            {slide.description}
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/about"
              className="inline-flex items-center justify-center rounded-lg bg-[#1BB7C4] px-7 py-3.5 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#159da8]"
            >
              Discover Our Work
              <span className="ml-2" aria-hidden="true">→</span>
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-white/80 bg-black/10 px-7 py-3.5 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#034b71]"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </div>

      {/* Previous slide */}
      <button
        type="button"
        onClick={previousSlide}
        aria-label="Previous slide"
        className="absolute top-1/2 left-3 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-black/20 text-2xl text-white transition hover:bg-[#1BB7C4] sm:left-6 sm:h-12 sm:w-12"
      >
        ‹
      </button>

      {/* Next slide */}
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute top-1/2 right-3 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-black/20 text-2xl text-white transition hover:bg-[#1BB7C4] sm:right-6 sm:h-12 sm:w-12"
      >
        ›
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={activeIndex === index ? "true" : undefined}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "w-9 bg-[#1BB7C4]"
                : "w-2.5 bg-white/70 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;