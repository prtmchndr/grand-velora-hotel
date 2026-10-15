export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20.5"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero/backgroundgv.png')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Subtle Bottom Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black/40 to-transparent" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pt-4 text-center text-white">

        {/* Eyebrow */}
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.4em] text-[#D4AF6A] sm:text-sm">
          Welcome to
        </p>

        {/* Main Heading */}
        <h1 className="font-serif text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          Grand Velora Hotel
        </h1>

        {/* Gold Divider */}
        <div className="mx-auto my-7 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-[#D4AF6A]" />
          <span className="h-1 w-1 rounded-full bg-[#D4AF6A]" />
          <span className="h-px w-12 bg-[#D4AF6A]" />
        </div>

        {/* Tagline */}
        <p className="text-lg font-light tracking-wide text-white/95 sm:text-xl md:text-2xl">
          A refined stay, made for you.
        </p>

        {/* Description */}
        <div className="mt-5 flex w-full justify-center">
          <p className="max-w-2xl text-center text-sm font-light leading-relaxed text-white/75 sm:text-base">
          Experience comfort, elegance, and exceptional hospitality at Grand Velora Hotel.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">

          <a
            href="#rooms"
            className="inline-flex h-12 min-w-42.5 items-center justify-center bg-[#C9A45C] px-7 text-xs font-semibold tracking-[0.14em] text-white transition-all duration-300 hover:bg-[#B58E48]"
          >
            EXPLORE ROOMS
          </a>

          <a
            href="#booking"
            className="inline-flex h-12 min-w-42.5 items-center justify-center border border-white/70 bg-white/5 px-7 text-xs font-semibold tracking-[0.14em] text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-[#172033]"
          >
            BOOK NOW
          </a>

        </div>
      </div>

      {/* Scroll Indicator */}
        <a
         href="#booking"
         className="group absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center"
         aria-label="Scroll to booking section"
        >
         <span className="mb-3 text-[10px] font-medium uppercase tracking-[0.35em] text-white/90">
            Scroll
         </span>

         <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/60 p-1">
            <span className="h-2 w-1 rounded-full bg-[#D4AF6A] transition-transform duration-500 group-hover:translate-y-3" />
         </span>
        </a>
    </section>
  );
}