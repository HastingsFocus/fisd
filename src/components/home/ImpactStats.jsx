
const stats = [
  { value: "2,450+", label: "Lives Impacted" },
  { value: "15", label: "Active Projects" },
  { value: "12", label: "Districts Reached" },
  { value: "70+", label: "Team & Volunteers" },
];

function ImpactStats() {
  return (
    <section className="bg-[#034b71] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <h2 className="text-3xl font-bold text-[#1BB7C4] sm:text-4xl lg:text-5xl">
              {stat.value}
            </h2>

            <p className="mt-3 text-sm font-medium text-white sm:text-base">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ImpactStats;
