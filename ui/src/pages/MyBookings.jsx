import { useState } from "react";
import { CalendarDays, Clock, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const MyBookings = () => {
  const { bookings } = useAuth();
  const [selected, setSelected] = useState(null);
  return (
    <div className="min-h-full bg-slate-50 py-12">
      <div className="mx-auto w-[94%] max-w-6xl px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[.16em] text-brand-blue-600">
          Your care
        </p>
        <h1 className="mt-2">My bookings</h1>
        <p className="mt-3 text-slate-600">
          Select an appointment to see its full details.
        </p>
        {bookings.length ? (
          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {bookings.map((booking) => (
              <button
                key={booking.bookingNumber}
                onClick={() => setSelected(booking)}
                className="rounded-3xl border border-slate-100 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <span className="rounded-full bg-brand-blue-50 px-3 py-1 text-sm font-medium text-brand-blue-700">
                    {booking.therapyName}
                  </span>
                  <CalendarDays className="text-brand-blue-600" size={20} />
                </div>
                <p className="mt-7 text-xl font-semibold text-brand-blue-900">
                  {formatDate(booking.dateOfAppointment)}
                </p>
                <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <Clock size={15} /> View appointment details
                </p>
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-9 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">
            You don’t have any bookings yet.
          </div>
        )}
      </div>
      {selected && (
        <div className="fixed inset-0 z-[100] grid place-items-center p-4">
          <button
            aria-label="Close booking details"
            onClick={() => setSelected(null)}
            className="absolute inset-0 bg-slate-900/45 backdrop-blur-sm"
          />

          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-brand-blue-700"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <p className="text-sm font-semibold uppercase tracking-[.16em] text-brand-blue-600">
              Appointment details
            </p>

            <h2 className="mt-3 text-3xl">{selected.therapyName}</h2>

            <dl className="mt-7 space-y-5 text-sm">
              {/* Date & Time */}
              <div>
                <dt className="text-slate-500">Appointment</dt>

                <dd className="mt-2 rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-slate-800">
                        {formatDate(selected.dateOfAppointment)}
                      </p>
                    </div>

                    <p className="mt-1 text-slate-800 font-medium">
                      {selected.startTime} – {selected.endTime}
                    </p>
                  </div>
                </dd>
              </div>

              {/* Mode */}
              <div>
                <dt className="text-slate-500">Mode</dt>

                <dd className="mt-2">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium ${
                      selected.mode === "offline"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-violet-50 text-violet-700"
                    }`}
                  >
                    {selected.mode === "offline" ? "In Person" : "Virtual"}
                  </span>
                </dd>
              </div>

              {/* Booking ID */}
              <div>
                <dt className="text-slate-500">Booking ID</dt>

                <dd className="mt-1 font-mono text-sm font-medium text-slate-700">
                  #{selected.bookingNumber}
                </dd>
              </div>

              {/* Contact Number */}
              <div>
                <dt className="text-slate-500">Contact number</dt>

                <dd className="mt-1 font-medium text-slate-800">
                  {selected.countryCode} {selected.phone}
                </dd>
              </div>

              {/* Email */}
              <div>
                <dt className="text-slate-500">Email</dt>

                <dd className="mt-1 break-all font-medium text-slate-800">
                  {selected.email}
                </dd>
              </div>
            </dl>

            <button
              onClick={() => setSelected(null)}
              className="btn btn-primary mt-8 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
