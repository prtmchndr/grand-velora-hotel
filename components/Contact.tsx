import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  Send,
} from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    detail: "+62 21 5555 8888",
    href: "tel:+622155558888",
  },
  {
    icon: Mail,
    title: "Email",
    detail: "info@grandvelora.com",
    href: "mailto:info@grandvelora.com",
  },
  {
    icon: MapPin,
    title: "Address",
    detail: "Jakarta, Indonesia",
    href: "#location",
  },
  {
    icon: Clock,
    title: "Reception",
    detail: "Open 24 hours, every day",
    href: null,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-[#FAF9F6] px-5 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* SECTION HEADER */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-[#B58E48]">
            Get in Touch
          </p>

          <h2 className="font-serif text-4xl font-medium text-[#172033] sm:text-5xl">
            Contact Us
          </h2>

          <div className="my-5 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#C9A45C]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9A45C]" />
            <span className="h-px w-12 bg-[#C9A45C]" />
          </div>

          <p className="mx-auto max-w-2xl text-sm leading-7 text-[#687386] sm:text-base">
            We are delighted to assist you. Whether you have a
            question, need assistance, or wish to plan your stay,
            our team is here to help.
          </p>
        </div>

        {/* CONTACT CONTENT */}
        <div className="grid gap-8 lg:grid-cols-5">
          {/* LEFT: CONTACT DETAILS */}
          <div className="flex flex-col bg-[#172033] p-7 text-white sm:p-10 lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF6A]">
              Contact Information
            </p>

            <h3 className="mt-4 font-serif text-3xl leading-snug sm:text-4xl">
              We'd Love to Hear from You
            </h3>

            <p className="mt-4 text-sm leading-7 text-white/65">
              Get in touch with Grand Velora Hotel for reservations,
              inquiries, or any assistance during your stay.
            </p>

            <div className="mt-9 space-y-7">
              {contactInfo.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#C9A45C]/40 text-[#D4AF6A]">
                      <Icon size={20} strokeWidth={1.5} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF6A]">
                        {item.title}
                      </p>

                      {item.href ? (
                        <a
                          href={item.href}
                          className="mt-1 inline-block wrap-break-word text-sm leading-6 text-white/85 transition hover:text-[#D4AF6A]"
                        >
                          {item.detail}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm leading-6 text-white/85">
                          {item.detail}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-auto border-t border-white/15 pt-7">
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                Grand Velora Hotel
              </p>
              <p className="mt-2 font-serif text-xl text-[#D4AF6A]">
                A refined stay, made for you.
              </p>
            </div>
          </div>

          {/* RIGHT: CONTACT FORM */}
          <div className="border border-[#E8E3D9] bg-white p-7 shadow-sm sm:p-10 lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#B58E48]">
              Send Us a Message
            </p>

            <h3 className="mt-3 font-serif text-3xl text-[#172033]">
              How Can We Help?
            </h3>

            <p className="mt-3 text-sm leading-7 text-[#687386]">
              Fill out the form below and let us know how we can
              assist you.
            </p>

            <form
              className="mt-8 space-y-5"
              action="mailto:info@grandvelora.com"
              method="post"
              encType="text/plain"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#172033]"
                  >
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    name="Name"
                    type="text"
                    placeholder="Your full name"
                    required
                    className="w-full border border-[#E5E1D9] bg-[#FAF9F6] px-4 py-3.5 text-sm text-[#172033] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#B58E48] focus:ring-1 focus:ring-[#B58E48]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#172033]"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    name="Email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    className="w-full border border-[#E5E1D9] bg-[#FAF9F6] px-4 py-3.5 text-sm text-[#172033] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#B58E48] focus:ring-1 focus:ring-[#B58E48]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#172033]"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="Subject"
                  type="text"
                  placeholder="How can we help you?"
                  required
                  className="w-full border border-[#E5E1D9] bg-[#FAF9F6] px-4 py-3.5 text-sm text-[#172033] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#B58E48] focus:ring-1 focus:ring-[#B58E48]"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#172033]"
                >
                  Your Message
                </label>
                <textarea
                  id="contact-message"
                  name="Message"
                  rows={5}
                  placeholder="Write your message here..."
                  required
                  className="w-full resize-y border border-[#E5E1D9] bg-[#FAF9F6] px-4 py-3.5 text-sm text-[#172033] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#B58E48] focus:ring-1 focus:ring-[#B58E48]"
                />
              </div>

              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center gap-3 bg-[#172033] px-7 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition duration-300 hover:bg-[#B58E48]"
              >
                Send Message
                <Send size={16} strokeWidth={1.7} />
              </button>
            </form>
          </div>
        </div>

        {/* LOCATION SECTION */}
        <section
          id="location"
          className="bg-[#FAF9F6] px-5 py-20 sm:px-8 sm:py-24"
        >
          <div className="mx-auto max-w-7xl">
            {/* Section Heading */}
            <div className="mb-12 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-[#B58E48]">
                Find Your Way
              </p>

              <h2 className="font-serif text-4xl font-medium text-[#172033] sm:text-5xl">
                Visit Grand Velora
              </h2>

              <div className="mx-auto my-5 flex items-center justify-center gap-3">
                <span className="h-px w-12 bg-[#C9A45C]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#C9A45C]" />
                <span className="h-px w-12 bg-[#C9A45C]" />
              </div>

              <p className="mx-auto max-w-2xl text-sm leading-7 text-[#687386] sm:text-base">
                Discover our location and plan your visit to
                Grand Velora Hotel.
              </p>
            </div>

            {/* Location Card */}
            <div className="grid overflow-hidden border border-[#E8E3D9] bg-white shadow-[0_18px_60px_rgba(23,32,51,0.08)] lg:grid-cols-[1.35fr_0.85fr]">

              {/* Google Maps Replica */}
              <div className="relative flex min-h-60 items-center justify-center overflow-hidden bg-[#E9E4DA] sm:min-h-80">
                <img
                  src="/images/contact/MapsGV.png"
                  alt="Illustration of Grand Velora Hotel location"
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Location Details */}
              <div className="flex flex-col justify-center bg-white px-7 py-5 sm:px-8 sm:py-6 lg:px-10 lg:py-7">
                <div className="mb-6 flex h-14 w-14 items-center justify-center border border-[#E8D9B9] bg-[#FAF8F3] text-[#B58E48]">
                  <MapPin size={26} strokeWidth={1.5} />
                </div>

                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#B58E48]">
                  Our Location
                </p>

                <h3 className="font-serif text-3xl leading-snug text-[#172033] sm:text-4xl">
                  Grand Velora Hotel
                </h3>

                <div className="my-6 h-px w-16 bg-[#C9A45C]" />

                <div className="flex gap-4">
                  <MapPin
                    size={20}
                    className="mt-1 shrink-0 text-[#B58E48]"
                    strokeWidth={1.6}
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#172033]">
                      Address
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[#687386]">
                      Cengkareng, Jakarta Barat,
                      Indonesia
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex gap-4 border-t border-[#EDE9E1] pt-6">
                  <Clock
                    size={20}
                    className="mt-1 shrink-0 text-[#B58E48]"
                    strokeWidth={1.6}
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#172033]">
                      Reception
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[#687386]">
                      Open 24 hours, every day
                    </p>
                  </div>
                </div>

                <div className="mt-9 inline-flex min-h-12 w-fit items-center gap-3 bg-[#172033] px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  Grand Velora Hotel
                  <MapPin size={17} strokeWidth={1.8} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <div className="mt-10 flex flex-col items-center justify-between gap-5 bg-[#172033] px-6 py-8 text-center sm:flex-row sm:px-10 sm:text-left">
          <div>
            <p className="font-serif text-2xl text-white">
              Planning Your Next Stay?
            </p>
            <p className="mt-2 text-sm text-white/65">
              Let us make your Grand Velora experience memorable.
            </p>
          </div>

          <a
            href="#booking"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 bg-[#C9A45C] px-7 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#172033] transition duration-300 hover:bg-white"
          >
            Book Your Stay
            <ArrowUpRight size={17} strokeWidth={1.7} />
          </a>
        </div>
      </div>
    </section>
  );
}