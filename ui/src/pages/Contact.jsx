import { useEffect, useState } from "react";
import { CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const today = new Date().toISOString().slice(0, 10);

const TIME_SLOTS = {
  morning: [
    {
      startTime: "09:00",
      endTime: "10:00",
      label: "9:00 AM - 10:00 AM",
    },
    {
      startTime: "10:00",
      endTime: "11:00",
      label: "10:00 AM - 11:00 AM",
    },
    {
      startTime: "11:00",
      endTime: "12:00",
      label: "11:00 AM - 12:00 PM",
    },
  ],

  afternoon: [
    {
      startTime: "12:00",
      endTime: "13:00",
      label: "12:00 PM - 1:00 PM",
    },
    {
      startTime: "13:00",
      endTime: "14:00",
      label: "1:00 PM - 2:00 PM",
    },
    {
      startTime: "14:00",
      endTime: "15:00",
      label: "2:00 PM - 3:00 PM",
    },
  ],

  evening: [
    {
      startTime: "15:00",
      endTime: "16:00",
      label: "3:00 PM - 4:00 PM",
    },
    {
      startTime: "16:00",
      endTime: "17:00",
      label: "4:00 PM - 5:00 PM",
    },
    {
      startTime: "17:00",
      endTime: "18:00",
      label: "5:00 PM - 6:00 PM",
    },
  ],
};

const Contact = () => {
  const { user, bookAppointment, openAuthModal } = useAuth();
  const API_BASE = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({
    phone: "",
    countryCode: "+91",
    therapyName: "",
    dateOfAppointment: "",
    startTime: "",
    endTime: "",
    mode: "",
  });

  const [selectedPeriod, setSelectedPeriod] = useState("morning");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.phoneNumber) {
      setForm((value) => ({
        ...value,
        phone: value.phone || user.phoneNumber,
      }));
    }
  }, [user]);

  // Fetch booked slots whenever date changes
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!form.dateOfAppointment) {
        setBookedSlots([]);
        return;
      }

      setLoadingSlots(true);
      setError("");

      // Clear previously selected slot
      setForm((value) => ({
        ...value,
        startTime: "",
        endTime: "",
      }));

      try {
        const response = await axios.get(
          `${API_BASE}/api/users/bookings/booked-slots?date=${form.dateOfAppointment}`,
        );

        if (response.status !== 200) {
          throw new Error("Unable to fetch slots");
        }

        setBookedSlots(response.data.data || []);
      } catch (requestError) {
        console.error(requestError);
        setBookedSlots([]);
        setError("Unable to load available time slots");
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchBookedSlots();
  }, [form.dateOfAppointment]);

  const update = (field) => (event) =>
    setForm((value) => ({
      ...value,
      [field]: event.target.value,
    }));

  const isSlotBooked = (slot) => {
    return bookedSlots.some(
      (bookedSlot) =>
        bookedSlot.startTime === slot.startTime &&
        bookedSlot.endTime === slot.endTime,
    );
  };

  const selectSlot = (slot) => {
    if (isSlotBooked(slot)) return;

    setForm((value) => ({
      ...value,
      startTime: slot.startTime,
      endTime: slot.endTime,
    }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");

    if (!user) {
      openAuthModal();
      return;
    }

    if (!form.startTime || !form.endTime) {
      setError("Please select an appointment time");
      return;
    }

    if (!form.mode) {
      setError("Please select appointment mode");
      return;
    }

    setStatus("loading");

    try {
      await bookAppointment(form);
      setStatus("success");
    } catch (requestError) {
      setError(requestError || "Unable to book your appointment");
      setStatus("idle");
    }
  };

  return (
    <div>
      <section className="bg-brand-blue-900 py-14 text-white lg:py-20">
        <div className="mx-auto w-[94%] max-w-7xl px-6 text-center">
          <p className="mb-4 text-xs uppercase tracking-[2.5px] text-white/50">
            We’re here for you
          </p>

          <h1 className="text-accent-warm-500">Start a conversation.</h1>

          <p className="mx-auto mt-4 max-w-xl text-lg text-white/75">
            Choose a date that suits you and take the first step towards feeling
            better.
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-[94%] max-w-7xl gap-12 px-6 py-14 lg:grid-cols-5 lg:py-16">
        <div className="lg:col-span-3">
          {status === "success" ? (
            <div className="card py-14 text-center">
              <CheckCircle2 className="mx-auto text-emerald-500" size={56} />

              <h2 className="mt-6 text-3xl">Your appointment is booked.</h2>

              <p className="mx-auto mt-3 max-w-md text-slate-600">
                We’ve saved your request. You can review the appointment at any
                time from My bookings.
              </p>

              <button
                onClick={() => {
                  setStatus("idle");

                  setForm((v) => ({
                    ...v,
                    therapyName: "",
                    dateOfAppointment: "",
                    startTime: "",
                    endTime: "",
                    mode: "",
                  }));

                  setBookedSlots([]);
                }}
                className="btn btn-secondary mt-8"
              >
                Book another appointment
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-blue-600">
                Appointment request
              </p>

              <h2 className="mt-2 text-3xl">Book a time that works for you</h2>

              <p className="mb-8 mt-3 text-slate-600">
                {user
                  ? `Hello ${user.name}, let's take the first step towards feeling better.`
                  : "Sign in or create an account to complete your booking."}
              </p>

              <form
                onSubmit={submit}
                className="space-y-7 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8"
              >
                {/* Therapy + Date */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-600">
                      Booking type
                    </label>

                    <select
                      value={form.therapyName}
                      onChange={update("therapyName")}
                      className="form-input"
                      required
                    >
                      <option value="">Select a service</option>
                      <option>Individual Therapy</option>
                      <option>Couples Therapy</option>
                      <option>Family Therapy</option>
                      <option>EMDR / Trauma</option>
                      <option>Executive Coaching</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-600">
                      Preferred date
                    </label>

                    <input
                      type="date"
                      min={today}
                      value={form.dateOfAppointment}
                      onChange={update("dateOfAppointment")}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                {/* Time period */}
                {form.dateOfAppointment && (
                  <div>
                    <label className="mb-3 block text-sm font-medium text-slate-600">
                      Select time
                    </label>

                    <div className="mb-4 grid grid-cols-3 gap-2 rounded-xl bg-slate-100 p-1">
                      {Object.keys(TIME_SLOTS).map((period) => (
                        <button
                          key={period}
                          type="button"
                          onClick={() => setSelectedPeriod(period)}
                          className={`rounded-lg px-3 py-2 text-sm font-medium capitalize transition ${
                            selectedPeriod === period
                              ? "bg-white text-brand-blue-700 shadow-sm"
                              : "text-slate-500 hover:text-slate-700"
                          }`}
                        >
                          {period}
                        </button>
                      ))}
                    </div>

                    {loadingSlots ? (
                      <p className="py-4 text-center text-sm text-slate-500">
                        Loading available slots...
                      </p>
                    ) : (
                      <div className="grid gap-3 sm:grid-cols-3">
                        {TIME_SLOTS[selectedPeriod].map((slot) => {
                          const booked = isSlotBooked(slot);

                          const selected =
                            form.startTime === slot.startTime &&
                            form.endTime === slot.endTime;

                          return (
                            <button
                              key={`${slot.startTime}-${slot.endTime}`}
                              type="button"
                              disabled={booked}
                              onClick={() => selectSlot(slot)}
                              className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                                booked
                                  ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                                  : selected
                                    ? "border-brand-blue-600 bg-brand-blue-600 text-white"
                                    : "border-slate-200 bg-white text-slate-700 hover:border-brand-blue-400 hover:bg-brand-blue-50"
                              }`}
                            >
                              {slot.label}

                              {booked && (
                                <span className="mt-1 block text-xs">
                                  Already booked
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Mode */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-slate-600">
                    Appointment mode
                  </label>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() =>
                        setForm((value) => ({
                          ...value,
                          mode: "offline",
                        }))
                      }
                      className={`rounded-xl border px-5 py-4 text-left transition ${
                        form.mode === "offline"
                          ? "border-brand-blue-600 bg-brand-blue-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <span className="block font-semibold text-slate-800">
                        Offline
                      </span>
                      <span className="mt-1 block text-sm text-slate-500">
                        Visit us at our space
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setForm((value) => ({
                          ...value,
                          mode: "virtual",
                        }))
                      }
                      className={`rounded-xl border px-5 py-4 text-left transition ${
                        form.mode === "virtual"
                          ? "border-brand-blue-600 bg-brand-blue-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <span className="block font-semibold text-slate-800">
                        Online
                      </span>
                      <span className="mt-1 block text-sm text-slate-500">
                        Attend virtually
                      </span>
                    </button>
                  </div>
                </div>

                {/* Phone */}
                <div className="grid grid-cols-[90px_1fr] gap-3 sm:grid-cols-[100px_1fr] sm:gap-5">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-600">
                      Code
                    </label>

                    <div className="relative">
                      <input
                        value="+91"
                        className="form-input pl-10"
                        disabled
                        aria-label="Country code"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-600">
                      Phone number
                    </label>

                    <input
                      type="tel"
                      value={form.phone}
                      onChange={update("phone")}
                      className="form-input"
                      placeholder="Your contact number"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading" || loadingSlots}
                  className="btn btn-primary w-full sm:w-auto disabled:opacity-70"
                >
                  {status === "loading"
                    ? "Booking…"
                    : user
                      ? "Book appointment"
                      : "Sign in to book"}
                </button>
              </form>
            </>
          )}
        </div>

        <aside className="lg:col-span-2">
          <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm lg:sticky lg:top-28">
            <p className="mb-6 text-xs uppercase tracking-[2.5px] text-brand-blue-600">
              Direct contact
            </p>

            <div className="space-y-7 text-[15px]">
              <div className="flex gap-4">
                <Phone className="text-brand-blue-700" />
                <div>
                  <b>Call or Text</b>
                  <p className="text-slate-600">(503) 555-0142</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="text-brand-blue-700" />
                <div>
                  <b>Email us</b>
                  <p className="text-slate-600">hello@theventwell.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="text-brand-blue-700" />
                <div>
                  <b>Our space</b>
                  <p className="text-slate-600">
                    1428 Maple Grove Ave
                    <br />
                    Portland, OR 97205
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock className="text-brand-blue-700" />
                <div>
                  <b>Hours</b>
                  <p className="text-slate-600">Monday–Friday: 8am–7pm</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default Contact;
