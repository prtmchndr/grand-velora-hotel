import {
  ArrowRight,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  History,
  Eye,
  Target,
} from "lucide-react";

const highlights = [
  {
    icon: HeartHandshake,
    title: "Warm Hospitality",
    description:
      "Thoughtful service and genuine hospitality for every guest.",
  },
  {
    icon: Sparkles,
    title: "Elegant Comfort",
    description:
      "Refined interiors and welcoming spaces for a relaxing stay.",
  },
  {
    icon: ShieldCheck,
    title: "Guest Experience",
    description:
      "A comfortable and memorable experience for business and leisure travelers.",
  },
];

const missions = [
  "Provide warm, attentive, and professional hospitality to every guest.",
  "Maintain comfortable, elegant, and well-organized accommodation.",
  "Continuously improve service quality and guest satisfaction.",
  "Create a welcoming environment for business and leisure travelers.",
  "Develop responsible and sustainable hotel operations.",
];

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 overflow-hidden bg-white"
    >
      {/* ABOUT INTRO */}
      <div className="px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Hotel Image */}
          <div className="relative mx-auto w-full max-w-xl lg:mx-0">
            <div className="absolute -right-3 -top-3 h-full w-full border border-[#C9A45C] sm:-right-5 sm:-top-5" />

            <div className="relative aspect-4/5 overflow-hidden bg-[#E9E4DA]">
              <img
                src="/images/about/BuildingGV.png"
                alt="Grand Velora Hotel exterior"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-t from-[#172033]/45 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-5 left-4 bg-[#172033] px-6 py-4 text-white shadow-xl sm:-bottom-6 sm:left-7 sm:px-8 sm:py-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#D4AF6A]">
                Grand Velora
              </p>
              <p className="mt-1 font-serif text-xl sm:text-2xl">
                A Place to Unwind
              </p>
            </div>
          </div>

          {/* Promotional Copy */}
          <div className="pt-5 lg:pt-0">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-[#B58E48] sm:text-sm">
              Discover Us
            </p>

            <h2 className="font-serif text-4xl font-medium leading-tight tracking-tight text-[#172033] sm:text-5xl md:text-6xl">
              About{" "}
              <span className="text-[#B58E48]">
                Grand Velora
              </span>
            </h2>

            <div className="my-6 flex items-center gap-3">
              <span className="h-px w-14 bg-[#C9A45C]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A45C]" />
              <span className="h-px w-14 bg-[#C9A45C]" />
            </div>

            <p className="text-base leading-relaxed text-[#606B7A]">
              Welcome to Grand Velora Hotel, where comfort,
              elegance, and thoughtful hospitality come together
              to create a memorable stay.
            </p>

            <p className="mt-4 text-sm leading-7 text-[#687386] sm:text-base">
              Whether you are visiting for business or leisure,
              Grand Velora offers a welcoming atmosphere and
              carefully considered spaces for you to relax,
              recharge, and enjoy every moment of your journey.
              Discover a refined hospitality experience where
              every detail is designed with your comfort in mind.
            </p>

            {/* Brand Highlights */}
            <div className="mt-8 space-y-5">
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#E8D9B9] bg-[#FAF8F3] text-[#B58E48]">
                      <Icon size={21} strokeWidth={1.6} />
                    </div>

                    <div>
                      <h3 className="font-serif text-lg font-medium text-[#172033]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#687386]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <a
              href="#rooms"
              className="mt-9 inline-flex min-h-12 items-center justify-center gap-3 bg-[#C9A45C] px-7 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition duration-300 hover:bg-[#B58E48]"
            >
              Explore Our Rooms
              <ArrowRight size={18} strokeWidth={1.8} />
            </a>
          </div>
        </div>
      </div>

      {/* HOTEL HISTORY */}
      <div className="bg-[#FAF9F6] px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center border border-[#E8D9B9] bg-white text-[#B58E48]">
              <History size={26} strokeWidth={1.5} />
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-[#B58E48]">
              Our Story
            </p>

            <h2 className="font-serif text-4xl font-medium text-[#172033] sm:text-5xl">
              The Story of Grand Velora
            </h2>

            <div className="mx-auto my-5 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-[#C9A45C]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A45C]" />
              <span className="h-px w-12 bg-[#C9A45C]" />
            </div>
          </div>

          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="relative overflow-hidden">
            <div className="absolute -right-2 -top-2 h-full w-full border border-[#C9A45C]" />
            <img
              src="/images/about/LobbyGV.png"
              alt="Lobby Grand Velora Hotel"
              className="relative aspect-4/3 w-full object-cover"
            />
          </div>

          {/* Hotel Story */}
          <div className="space-y-5 text-sm leading-8 text-[#687386] sm:text-base">
            <p>
              Grand Velora Hotel is envisioned as a hospitality
              destination that brings together modern elegance,
              comfort, and personalized service. Inspired by the
              desire to create a welcoming place for travelers,
              the hotel embraces a refined atmosphere with
              thoughtful attention to detail.
            </p>

            <p>
              Located in Cengkareng, West Jakarta, Grand Velora
              is designed to serve guests traveling for business
              as well as those seeking a relaxing getaway. Its
              concept combines contemporary accommodation,
              inviting spaces, and convenient services in one
              hospitality experience.
            </p>

            <p>
              With a commitment to continuous improvement,
              Grand Velora aims to grow as a hotel brand that
              values guest comfort, genuine hospitality, and
              memorable experiences.
            </p>
          </div>
        </div>

          <div className="mt-10 border-l-2 border-[#C9A45C] bg-white px-6 py-5 shadow-sm sm:px-8">
            <p className="font-serif text-xl italic leading-relaxed text-[#172033] sm:text-2xl">
              “A refined stay, made for you.”
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#B58E48]">
              The Grand Velora Experience
            </p>
          </div>
        </div>
      </div>

      {/* VISION & MISSION */}
      <div className="bg-white px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-[#B58E48]">
              Our Direction
            </p>

            <h2 className="font-serif text-4xl font-medium text-[#172033] sm:text-5xl">
              Vision & Mission
            </h2>

            <div className="mx-auto my-5 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-[#C9A45C]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A45C]" />
              <span className="h-px w-12 bg-[#C9A45C]" />
            </div>

            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#687386] sm:text-base">
              Our guiding principles shape the hospitality
              experience we aspire to provide.
            </p>
          </div>
          <div className="mb-8 overflow-hidden">
            <img
              src="/images/about/Visi-MissionGV.png"
              alt="Elegant interior representing the Grand Velora Hotel vision"
              className="h-64 w-full object-cover sm:h-80"
            />
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Vision */}
            <div className="relative overflow-hidden bg-[#172033] p-8 text-white sm:p-10">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/10" />
              <div className="absolute -right-5 -top-5 h-28 w-28 rounded-full border border-[#C9A45C]/30" />

              <div className="relative">
                <div className="mb-6 flex h-14 w-14 items-center justify-center border border-[#C9A45C]/50 text-[#D4AF6A]">
                  <Eye size={27} strokeWidth={1.5} />
                </div>

                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#D4AF6A]">
                  Our Vision
                </p>

                <h3 className="font-serif text-3xl leading-snug sm:text-4xl">
                  To Be a Preferred Destination for Refined Hospitality
                </h3>

                <p className="mt-5 text-sm leading-7 text-white/70 sm:text-base">
                  To become a trusted hotel destination known
                  for elegant comfort, genuine hospitality,
                  consistent service, and memorable guest
                  experiences in Jakarta.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="border border-[#E8E3D9] bg-[#FAF9F6] p-8 sm:p-10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center border border-[#E8D9B9] bg-white text-[#B58E48]">
                <Target size={27} strokeWidth={1.5} />
              </div>

              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#B58E48]">
                Our Mission
              </p>

              <h3 className="font-serif text-3xl text-[#172033] sm:text-4xl">
                What We Strive For
              </h3>

              <ul className="mt-6 space-y-4">
                {missions.map((mission, index) => (
                  <li key={mission} className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border border-[#DCC79F] text-[10px] font-semibold text-[#B58E48]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-6 text-[#687386]">
                      {mission}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}