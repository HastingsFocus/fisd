import Button from "../common/Button";

const CallToAction = () => {
  return (
    <section className="bg-[rgb(3,75,113)] px-5 py-16 text-center sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-[rgb(27,183,196)]">
          Get Involved
        </p>

        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          Ready to Make an Impact?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/85 sm:text-lg">
          Join us in building inclusive and sustainable pathways for all.
          Whether you want to partner, volunteer, or support our work, we'd
          love to hear from you.
        </p>

        <div className="mt-8 flex justify-center">
          <Button
            href="#contact"
            className="min-h-12 px-8 py-3 font-semibold"
          >
            Partner With Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;