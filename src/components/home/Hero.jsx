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
    description: "We empower young people and underserved communities through inclusive opportunities, innovation, and sustainable development.",
  },
  {
    image: image2,
    alt: "Young people learning and developing skills",
    title: "Empowering Youth. Transforming Lives.",
    description: "We support young people with the skills, opportunities, and resources they need to shape a brighter future.",
  },
  {
    image: image3,
    alt: "People working together for a sustainable future",
    title: "Creating a Sustainable Future",
    description: "Together, we build resilient communities and create pathways to economic empowerment and lasting social change.",
  },
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const previousSlide = () => {
    setActiveIndex((current) => (current === 0 ? slides.length - 1 : current - 1));
  };

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  const slide = slides[activeIndex];

  return (
    <section className="relative flex min-h-[440px] items-center overflow-hidden bg-[#034b71] sm:min-h-[480px] lg:min-h-[520px]">
      {/* Background image */}
      <img key={slide.image} src={slide.image} alt={slide.alt} className="hero-slide-fade absolute inset-0 z-0 h-full w-full object-cover" />
      {/* Blue overlay */}
      <div className="absolute inset-0 z-[1] bg-[#034b71]/80" />

      {/* Hero content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-14 py-14 sm:px-16 sm:py-16 lg:px-20 lg:py-20">
        <div key={slide.title} className="hero-slide-fade max-w-3xl text-white">
          <p className="mb-4 inline-block rounded-full border border-white/30 bg-black/20 px-4 py-2 text-xs font-semibold tracking-wide text-[#1BB7C4] backdrop-blur-sm sm:text-sm">
            Foundation for Inclusive and Sustainable Development
          </p>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl xl:text-6xl">{slide.title}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/90 sm:text-base sm:leading-7 lg:text-lg">{slide.description}</p>

          {/* Homepage actions */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link to="/about" className="inline-flex items-center justify-center rounded-lg bg-[#1BB7C4] px-6 py-3 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#159da8]">
              Discover Our Work
              <span className="ml-2" aria-hidden="true">→</span>
            </Link>
            <Link to="/get-involved" className="inline-flex items-center justify-center rounded-lg border border-white/80 bg-black/10 px-6 py-3 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#034b71]">
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
        className="absolute bottom-5 left-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-black/30 text-2xl text-white transition hover:bg-[#1BB7C4] sm:bottom-auto sm:left-5 sm:top-1/2 sm:h-11 sm:w-11 sm:-translate-y-1/2"
      >
        ‹
      </button>

      {/* Next slide */}
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute bottom-5 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-black/30 text-2xl text-white transition hover:bg-[#1BB7C4] sm:bottom-auto sm:right-5 sm:top-1/2 sm:h-11 sm:w-11 sm:-translate-y-1/2"
      >
        ›
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2.5">
        {slides.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={activeIndex === index ? "true" : undefined}
            className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === index ? "w-8 bg-[#1BB7C4]" : "w-2.5 bg-white/70 hover:bg-white"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;