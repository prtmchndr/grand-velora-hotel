
import {
  BedDouble,
  Utensils,
  Waves,
  Dumbbell,
  BriefcaseBusiness,
  CarFront,
  Wifi,
  Coffee,
  ArrowRight,
} from "lucide-react";

const facilities = [
  {
    icon: BedDouble,
    title: "Elegant Rooms & Suites",
    description:
      "Comfortable accommodation with refined interiors and thoughtful details.",
  },
  {
    icon: Utensils,
    title: "Restaurant & Dining",
    description:
      "A welcoming dining concept for guests to enjoy meals and refreshments.",
  },
  {
    icon: Waves,
    title: "Swimming Pool",
    description:
      "A relaxing space to unwind and enjoy leisure time.",
  },
  {
    icon: Dumbbell,
    title: "Fitness Center",
    description:
      "A dedicated space for guests to maintain their exercise routines.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Meeting & Event Rooms",
    description:
      "Flexible spaces for business meetings, gatherings, and special occasions.",
  },
  {
    icon: CarFront,
    title: "Parking Area",
    description:
      "Convenient vehicle parking for guests during their stay.",
  },
  {
    icon: Wifi,
    title: "Complimentary Wi-Fi",
    description:
      "Internet access to help guests stay connected.",
  },
  {
    icon: Coffee,
    title: "Lounge & Refreshments",
    description:
      "A comfortable setting to relax, meet, or enjoy a quiet moment.",
  },
];

export default function Facilities() {
  return (
    <section
      id="facilities"
      className="scroll-mt-24 overflow-hidden bg-[#FAF9F6] px-5 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* SECTION HEADER */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-[#B58E48]">
            Experience More
          </p>

          <h2 className="font-serif text-4xl font-medium text-[#172033] sm:text-5xl">
            Hotel Facilities
          </h2>

          <div className="mx-auto my-5 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#C9A45C]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9A45C]" />
            <span className="h-px w-12 bg-[#C9A45C]" />
          </div>

          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#687386] sm:text-base">
            Discover thoughtfully designed facilities that bring
            comfort, convenience, and memorable moments to your stay
            at Grand Velora Hotel.
          </p>
        </div>

        {/* FACILITIES GRID */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {facilities.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group relative flex min-h-64 flex-col border border-[#E8E3D9] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A45C] hover:shadow-xl sm:p-7"
              >
                {/* CARD NUMBER */}
                <span className="absolute right-6 top-6 font-serif text-sm text-[#C9A45C]/70">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* ICON */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center border border-[#E8D9B9] bg-[#FAF8F3] text-[#B58E48] transition-colors duration-300 group-hover:bg-[#172033] group-hover:text-[#D4AF6A]">
                  <Icon size={26} strokeWidth={1.5} />
                </div>

                {/* TITLE */}
                <h3 className="font-serif text-xl font-medium leading-snug text-[#172033]">
                  {item.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="mt-3 flex-1 text-sm leading-7 text-[#687386]">
                  {item.description}
                </p>

                {/* DECORATIVE FOOTER */}
                <div className="mt-6 flex items-center justify-between border-t border-[#E8E3D9] pt-4">
                  <span className="h-px w-10 bg-[#C9A45C] transition-all duration-300 group-hover:w-16" />
                  <ArrowRight
                    size={17}
                    strokeWidth={1.5}
                    className="text-[#B58E48] transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM NOTE */}
        <div className="mt-12 border-l-2 border-[#C9A45C] bg-white px-6 py-5 shadow-sm sm:px-8">
          <p className="font-serif text-lg italic leading-relaxed text-[#172033] sm:text-xl">
            “Every detail is thoughtfully considered to make your
            stay comfortable and memorable.”
          </p>
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-[#B58E48]">
            The Grand Velora Experience
          </p>
        </div>
      </div>
    </section>
  );
}