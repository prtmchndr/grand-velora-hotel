
import {
  BedDouble,
  Snowflake,
  Bath,
  Wifi,
  Sofa,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const rooms = [
  {
    name: "Deluxe Room",
    category: "COMFORT & ELEGANCE",
    description:
      "A welcoming space designed for relaxation, featuring elegant interiors and thoughtful comforts.",
    image: "/images/rooms/deluxe-room.jpg",
    features: [
      { label: "King / Twin Bed", icon: BedDouble },
      { label: "Air Conditioning", icon: Snowflake },
      { label: "Private Bathroom", icon: Bath },
      { label: "Complimentary Wi-Fi", icon: Wifi },
    ],
  },
  {
    name: "Suite Room",
    category: "SPACE & SOPHISTICATION",
    description:
      "Enjoy extra space and refined details in a stylish suite created for a more elevated stay.",
    image: "/images/rooms/suite-room.jpg",
    features: [
      { label: "Spacious Living Area", icon: Sofa },
      { label: "King Bed", icon: BedDouble },
      { label: "Premium Amenities", icon: Sparkles },
      { label: "Complimentary Wi-Fi", icon: Wifi },
    ],
  },
  {
    name: "Presidential Suite",
    category: "THE ULTIMATE RETREAT",
    description:
      "Experience an exceptional stay with generous space, elegant furnishings, and added comfort.",
    image: "/images/rooms/presidential-room.jpg",
    features: [
      { label: "Separate Living Room", icon: Sofa },
      { label: "King Bed", icon: BedDouble },
      { label: "Luxury Bathroom", icon: Bath },
      { label: "Complimentary Wi-Fi", icon: Wifi },
    ],
  },
];

export default function Rooms() {
  return (
    <section
      id="rooms"
      className="scroll-mt-24 bg-[#FAF9F6] px-5 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-12 text-center sm:mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-[#B58E48] sm:text-sm">
            Accommodation
          </p>

          <h2 className="font-serif text-4xl font-medium tracking-tight text-[#172033] sm:text-5xl md:text-6xl">
            Our Rooms
          </h2>

          <div className="mx-auto my-5 flex items-center justify-center gap-3">
            <span className="h-px w-14 bg-[#C9A45C]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9A45C]" />
            <span className="h-px w-14 bg-[#C9A45C]" />
          </div>

          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#687386] sm:text-base">
            Discover thoughtfully designed rooms and suites,
            where comfort meets timeless elegance.
          </p>
        </div>

        {/* Room Cards */}
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 lg:gap-3">
          {rooms.map((room) => (
            <article
              key={room.name}
              className="group flex h-full flex-col overflow-hidden border border-[#E8E3D9] bg-white transition duration-500 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(23,32,51,0.10)]"
            >
              {/* Room Image */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#E9E4DA]">
                <img
                  src={room.image}
                  alt={`${room.name} at Grand Velora Hotel`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />

                {/* Room Category */}
                <div className="absolute bottom-5 left-6 right-4">
                  <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white sm:text-xs">
                    {room.category}
                  </p>
                  <div className="mt-3 h-px w-3/4 bg-[#D4AF6A]" />
                </div>
              </div>

              {/* Room Information */}
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="font-serif text-3xl font-medium text-[#172033]">
                  {room.name}
                </h3>

                <p className="mt-3 min-h-19 text-sm leading-relaxed text-[#687386]">
                  {room.description}
                </p>

                {/* Gold Divider */}
                <div className="my-5 h-px bg-[#C9A45C]" />

                {/* Facilities */}
                <ul className="mb-7 space-y-3.5">
                  {room.features.map((feature) => {
                    const Icon = feature.icon;

                    return (
                      <li
                        key={feature.label}
                        className="flex items-center gap-4 text-sm text-[#606773]"
                      >
                        <Icon
                          size={21}
                          strokeWidth={1.6}
                          className="shrink-0 text-[#B58E48]"
                          aria-hidden="true"
                        />
                        <span>{feature.label}</span>
                      </li>
                    );
                  })}
                </ul>

                {/* Booking Button */}
                <a
                  href="#booking"
                  className="mt-auto inline-flex min-h-14 w-full items-center justify-center gap-3 bg-[#C9A45C] px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-[#B58E48]"
                >
                  <span>Book This Room</span>
                  <ArrowRight
                    size={19}
                    strokeWidth={1.8}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Reservation Link */}
        <div className="mt-12 text-center sm:mt-16">
          <p className="text-sm text-[#687386]">
            Looking for your perfect stay?
          </p>

          <a
            href="#booking"
            className="mt-3 inline-flex items-center gap-2 border-b border-[#C9A45C] pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#B58E48] transition-colors hover:text-[#172033]"
          >
            Make a Reservation
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}