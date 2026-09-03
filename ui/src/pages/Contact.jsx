import { useEffect, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const today = new Date().toISOString().slice(0, 10);

const Contact = () => {
  const { user, bookAppointment, openAuthModal } = useAuth();
  const [form, setForm] = useState({
    phone: "",
    countryCode: "+91",
    therapyName: "",
    dateOfAppointment: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.phoneNumber)
      setForm((value) => ({
        ...value,
        phone: value.phone || user.phoneNumber,
      }));
  }, [user]);
  const update = (field) => (event) =>
    setForm((value) => ({ ...value, [field]: event.target.value }));
  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (!user) {
      openAuthModal();
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
                  }));
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
                className="space-y-5 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8"
              >
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
                    <div className="relative">
                      
                      <input
                        type="date"
                        min={today}
                        value={form.dateOfAppointment}
                        onChange={update("dateOfAppointment")}
                        className="form-input pl-12"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-[100px_1fr]">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-600">
                      Code
                    </label>
                    <input
                      value={form.countryCode}
                      onChange={update("countryCode")}
                      className="form-input"
                      required
                    />
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
                  disabled={status === "loading"}
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
