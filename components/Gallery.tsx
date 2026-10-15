
import { ArrowUpRight, Images } from "lucide-react";


const galleryImages = [
  {
    src: "/images/gallery/BuildingGV.png",
    alt: "Grand Velora Hotel exterior",
    title: "Hotel Exterior",
    category: "Architecture",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/images/gallery/LobbyGV.png",
    alt: "Elegant hotel lobby",
    title: "Elegant Lobby",
    category: "Interior",
    className: "",
  },
  {
    src: "/images/gallery/ParkingAreaGV.png",
    alt: "Parking Area",
    title: "Parking Area",
    category: "Accommodation",
    className: "",
  },
  {
    src: "/images/gallery/RestaurantGV.png",
    alt: "Hotel restaurant and dining area",
    title: "Restaurant & Dining",
    category: "Dining",
    className: "",
  },
  {
    src: "/images/gallery/SwimmingPoolGV.png",
    alt: "Hotel swimming pool",
    title: "Swimming Pool",
    category: "Leisure",
    className: "",
  },
  {
    src: "/images/gallery/GymCenterGV.png",
    alt: "Grand Velora Hotel fitness center",
    title: "Fitness Center",
    category: "Wellness",
    className: "lg:col-span-2",
  },
  {
    src: "/images/gallery/MeetingRoomGV.png",
    alt: "Grand Velora Hotel meeting room",
    title: "Meeting Room",
    category: "Business & Events",
    className: "lg:col-span-2",
  },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="scroll-mt-24 bg-white px-5 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* SECTION HEADER */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-[#B58E48]">
              Visual Journey
            </p>

            <h2 className="font-serif text-4xl font-medium text-[#172033] sm:text-5xl">
              Discover Our Gallery
            </h2>

            <div className="my-5 flex items-center gap-3">
              <span className="h-px w-12 bg-[#C9A45C]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A45C]" />
              <span className="h-px w-12 bg-[#C9A45C]" />
            </div>

            <p className="max-w-xl text-sm leading-7 text-[#687386] sm:text-base">
              Explore the elegance, comfort, and inviting spaces
              of Grand Velora Hotel through our visual collection.
            </p>
          </div>

          <div className="flex items-center gap-3 text-[#B58E48]">
            <Images size={22} strokeWidth={1.5} />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">
              A Glimpse of Grand Velora
            </span>
          </div>
        </div>

        {/* GALLERY GRID */}
        <div className="grid auto-rows-55 gap-4 sm:grid-cols-2 sm:auto-rows-62.5 lg:grid-cols-4 lg:auto-rows-57.5">
          {galleryImages.map((image, index) => (
            <div
              key={image.src}
              className={`group relative overflow-hidden bg-[#E9E4DA] ${image.className}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* IMAGE OVERLAY */}
              <div className="absolute inset-0 bg-linear-to-t from-[#172033]/85 via-[#172033]/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

              {/* IMAGE NUMBER */}
              <span className="absolute right-5 top-5 text-xs font-medium tracking-[0.2em] text-white/80">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* IMAGE DETAILS */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-6">
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D4AF6A]">
                    {image.category}
                  </p>

                  <h3 className="font-serif text-xl text-white sm:text-2xl">
                    {image.title}
                  </h3>
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/50 text-white transition-all duration-300 group-hover:border-[#C9A45C] group-hover:bg-[#C9A45C]">
                  <ArrowUpRight size={19} strokeWidth={1.5} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM BRAND MESSAGE */}
        <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-[#E8E3D9] pt-8 text-center sm:flex-row sm:text-left">
          <div>
            <p className="font-serif text-xl text-[#172033] sm:text-2xl">
              Every corner tells a story.
            </p>
            <p className="mt-2 text-sm text-[#687386]">
              Experience the refined atmosphere of Grand Velora Hotel.
            </p>
          </div>

          <a
            href="#booking"
            className="inline-flex min-h-12 items-center justify-center gap-3 bg-[#172033] px-7 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition duration-300 hover:bg-[#B58E48]"
          >
            Book Your Stay
            <ArrowUpRight size={17} strokeWidth={1.7} />
          </a>
        </div>
      </div>
    </section>
  );
}