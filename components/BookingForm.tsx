"use client";

import { useState } from "react";

type AvailabilityResult = {
  available: boolean;
  availableRooms: number;
  message: string;
};

type ReservationResult = {
  referenceNo: string;
  message: string;
};

export default function BookingForm() {
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState("2");
  const [rooms, setRooms] = useState("1");

  const [message, setMessage] = useState("");
  const [availabilityLoading, setAvailabilityLoading] =
    useState(false);
  const [availabilityResult, setAvailabilityResult] =
    useState<AvailabilityResult | null>(null);

  const [guestName, setGuestName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [reservationLoading, setReservationLoading] =
    useState(false);
  const [reservationResult, setReservationResult] =
    useState<ReservationResult | null>(null);

  const today = new Date().toLocaleDateString("en-CA");

  // Clear previous search and reservation feedback
  const clearResults = () => {
    setMessage("");
    setAvailabilityResult(null);
    setReservationResult(null);
  };

  // Check room availability
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    clearResults();

    if (!checkin || !checkout) {
      setMessage(
        "Please select your check-in and check-out dates."
      );
      return;
    }

    if (checkin < today) {
      setMessage("Check-in date cannot be in the past.");
      return;
    }

    if (checkout <= checkin) {
      setMessage(
        "Check-out must be at least one day after check-in."
      );
      return;
    }

    setAvailabilityLoading(true);

    try {
      const response = await fetch("/api/availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          checkin,
          checkout,
          rooms: Number(rooms),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Unable to check room availability."
        );
      }

      setAvailabilityResult({
        available: result.available,
        availableRooms: result.availableRooms,
        message: result.message,
      });
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "An error occurred while checking availability."
      );
    } finally {
      setAvailabilityLoading(false);
    }
  };

  // Submit guest details and create reservation
  const handleReservation = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setMessage("");
    setReservationResult(null);

    if (!availabilityResult?.available) {
      setMessage(
        "Please check room availability before booking."
      );
      return;
    }

    if (!guestName.trim() || !contactNo.trim()) {
      setMessage(
        "Please enter your name and contact number."
      );
      return;
    }

    setReservationLoading(true);

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: guestName.trim(),
          contactNo: contactNo.trim(),
          checkin,
          checkout,
          rooms: Number(rooms),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Unable to complete your reservation."
        );
      }

      setReservationResult({
        referenceNo: result.referenceNo,
        message: result.message,
      });

      // Refresh availability after booking
      setAvailabilityResult(null);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "An error occurred while saving your reservation."
      );
    } finally {
      setReservationLoading(false);
    }
  };

  return (
    <section
      id="booking"
      className="relative scroll-mt-24 bg-[#F8F7F4] px-6 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#B58E48]">
            Plan Your Stay
          </p>

          <h2 className="font-serif text-3xl font-medium text-[#172033] sm:text-4xl md:text-5xl">
            Book Your Stay
          </h2>

          <div className="mx-auto my-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#C9A45C]" />
            <span className="h-1 w-1 rounded-full bg-[#C9A45C]" />
            <span className="h-px w-10 bg-[#C9A45C]" />
          </div>

          <p className="mx-auto max-w-xl text-sm leading-relaxed text-gray-500 sm:text-base">
            Choose your dates and room preferences to plan
            your comfortable stay at Grand Velora Hotel.
          </p>
        </div>

        {/* Booking Form Card */}
        <div className="mx-auto max-w-5xl border border-[#E8E3D9] bg-white p-6 shadow-[0_15px_50px_rgba(23,32,51,0.06)] sm:p-8 lg:p-10">
          {/* Availability Search Form */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_1.2fr]"
          >
            {/* Check-in */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="checkin"
                className="text-xs font-semibold uppercase tracking-[0.12em] text-[#172033]"
              >
                Check-in
              </label>

              <input
                id="checkin"
                name="checkin"
                type="date"
                min={today}
                required
                value={checkin}
                onChange={(e) => {
                  const value = e.target.value;
                  setCheckin(value);
                  clearResults();

                  if (checkout && value >= checkout) {
                    setCheckout("");
                  }
                }}
                className="h-12 w-full border border-gray-200 bg-white px-3 text-sm text-gray-600 outline-none transition focus:border-[#C9A45C]"
              />
            </div>

            {/* Check-out */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="checkout"
                className="text-xs font-semibold uppercase tracking-[0.12em] text-[#172033]"
              >
                Check-out
              </label>

              <input
                id="checkout"
                name="checkout"
                type="date"
                min={checkin || today}
                required
                value={checkout}
                onChange={(e) => {
                  setCheckout(e.target.value);
                  clearResults();
                }}
                className="h-12 w-full border border-gray-200 bg-white px-3 text-sm text-gray-600 outline-none transition focus:border-[#C9A45C]"
              />
            </div>

            {/* Guests */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="guests"
                className="text-xs font-semibold uppercase tracking-[0.12em] text-[#172033]"
              >
                Guests
              </label>

              <select
                id="guests"
                name="guests"
                value={guests}
                onChange={(e) => {
                  setGuests(e.target.value);
                  clearResults();
                }}
                className="h-12 w-full border border-gray-200 bg-white px-3 text-sm text-gray-600 outline-none transition focus:border-[#C9A45C]"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5 Guests</option>
                <option value="6">6 Guests</option>
              </select>
            </div>

            {/* Rooms */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="rooms"
                className="text-xs font-semibold uppercase tracking-[0.12em] text-[#172033]"
              >
                Rooms
              </label>

              <select
                id="rooms"
                name="rooms"
                value={rooms}
                onChange={(e) => {
                  setRooms(e.target.value);
                  clearResults();
                }}
                className="h-12 w-full border border-gray-200 bg-white px-3 text-sm text-gray-600 outline-none transition focus:border-[#C9A45C]"
              >
                <option value="1">1 Room</option>
                <option value="2">2 Rooms</option>
                <option value="3">3 Rooms</option>
                <option value="4">4 Rooms</option>
              </select>
            </div>

            {/* Check Availability Button */}
            <div className="flex flex-col justify-end">
              <button
                type="submit"
                disabled={availabilityLoading}
                className="h-12 w-full whitespace-nowrap bg-[#C9A45C] px-2 text-[12px] font-semibold uppercase tracking-normal text-white transition duration-300 hover:bg-[#B58E48] focus:outline-none focus:ring-2 focus:ring-[#C9A45C] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {availabilityLoading
                  ? "Checking..."
                  : "Check Availability"}
              </button>
            </div>
          </form>

          {/* Availability Result */}
          {availabilityResult && (
            <div
              role="status"
              aria-live="polite"
              className={`mt-6 border px-4 py-4 text-sm leading-relaxed ${
                availabilityResult.available
                  ? "border-green-200 bg-green-50 text-green-800"
                  : "border-amber-200 bg-amber-50 text-amber-800"
              }`}
            >
              <p className="mb-1 font-semibold">
                {availabilityResult.available
                  ? "Rooms Available"
                  : "Rooms Unavailable"}
              </p>

              <p>{availabilityResult.message}</p>

              <p className="mt-2">
                Available rooms:{" "}
                {availabilityResult.availableRooms}
              </p>

              <p className="mt-1 text-xs">
                Your search: {guests} guest(s), {rooms} room(s).
              </p>
            </div>
          )}

          {/* Guest Details Form */}
          {availabilityResult?.available &&
            !reservationResult && (
              <form
                onSubmit={handleReservation}
                className="mt-6 border border-[#E8E3D9] bg-[#FAF8F3] p-5 sm:p-6"
              >
                <div className="mb-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B58E48]">
                    Complete Your Booking
                  </p>

                  <h3 className="mt-2 font-serif text-2xl text-[#172033]">
                    Guest Information
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Please enter your details to submit your
                    reservation.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Guest Name */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="guestName"
                      className="text-xs font-semibold uppercase tracking-[0.12em] text-[#172033]"
                    >
                      Full Name
                    </label>

                    <input
                      id="guestName"
                      name="guestName"
                      type="text"
                      autoComplete="name"
                      maxLength={200}
                      required
                      value={guestName}
                      onChange={(e) =>
                        setGuestName(e.target.value)
                      }
                      placeholder="Enter your full name"
                      className="h-12 w-full border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-[#C9A45C]"
                    />
                  </div>

                  {/* Contact Number */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contactNo"
                      className="text-xs font-semibold uppercase tracking-[0.12em] text-[#172033]"
                    >
                      Contact Number
                    </label>

                    <input
                      id="contactNo"
                      name="contactNo"
                      type="tel"
                      autoComplete="tel"
                      maxLength={20}
                      required
                      value={contactNo}
                      onChange={(e) =>
                        setContactNo(e.target.value)
                      }
                      placeholder="e.g. +62 812 3456 7890"
                      className="h-12 w-full border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-[#C9A45C]"
                    />
                  </div>
                </div>

                {/* Confirm Reservation */}
                <button
                  type="submit"
                  disabled={reservationLoading}
                  className="mt-6 h-12 w-full bg-[#172033] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#29364D] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-60"
                >
                  {reservationLoading
                    ? "Submitting..."
                    : "Confirm Reservation"}
                </button>
              </form>
            )}

          {/* Reservation Confirmation */}
          {reservationResult && (
            <div
              role="status"
              aria-live="polite"
              className="mt-6 border border-green-200 bg-green-50 p-5 text-green-800"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">✓</span>

                <h3 className="font-semibold">
                  Reservation Submitted Successfully
                </h3>
              </div>

              <p className="mt-2 text-sm">
                {reservationResult.message}
              </p>

              <div className="mt-4 border border-green-200 bg-white p-4">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Your Reference Number
                </p>

                <p className="mt-1 break-all text-lg font-bold tracking-wide text-[#172033]">
                  {reservationResult.referenceNo}
                </p>
              </div>

              <p className="mt-3 text-xs">
                Your reservation is pending confirmation by
                the hotel. Please keep your reference number.
              </p>
            </div>
          )}

          {/* Validation / API Error */}
          {message && (
            <div
              role="alert"
              aria-live="polite"
              className="mt-6 border border-[#E8D9B9] bg-[#FAF8F3] px-4 py-3 text-sm leading-relaxed text-[#172033]"
            >
              <span className="mr-2 text-[#B58E48]">✦</span>
              {message}
            </div>
          )}

          {/* Note */}
          <div className="mt-6 flex items-start gap-2 border-t border-gray-100 pt-5">
            <span className="mt-0.5 text-[#B58E48]">✦</span>

            <p className="text-xs leading-relaxed text-gray-500">
              Select your preferred dates and room details.
              Availability is checked against our current room
              records. A room is not reserved until your booking
              is completed and confirmed by the hotel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}