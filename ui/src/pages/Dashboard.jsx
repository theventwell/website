import { useEffect, useState } from "react";
import { Activity, CalendarDays, Clock3, Search, Users } from "lucide-react";
import { apiFetch } from "../api/client";
import { Dot } from 'lucide-react';

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const Dashboard = () => {
  const [filters, setFilters] = useState({
    bookingNumber: "",
    bookingType: "",
    dateFrom: "",
    dateTo: "",
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);

  const [data, setData] = useState({
    stats: {
      pastMonth: 0,
      active: 0,
      total: 0,
    },
    bookings: [],
  });

  const [state, setState] = useState("loading");

  useEffect(() => {
    const loadDashboard = async () => {
      setState("loading");

      try {
        const query = new URLSearchParams(
          Object.entries(appliedFilters).filter(([, value]) => value.trim()),
        );

        const result = await apiFetch(
          `/api/admin/dashboard${query.size ? `?${query}` : ""}`,
        );

        setData(result.data);
        setState("ready");
      } catch {
        setState("error");
      }
    };

    loadDashboard();
  }, [appliedFilters]);

  const cards = [
    {
      label: "Bookings This Month",
      value: data.stats.pastMonth,
      icon: CalendarDays,
      color: "bg-brand-blue-50 text-brand-blue-700",
    },
    {
      label: "Active Bookings",
      value: data.stats.active,
      icon: Activity,
      color: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Lifetime Bookings",
      value: data.stats.total,
      icon: Users,
      color: "bg-amber-50 text-amber-700",
    },
  ];

  return (
    <div className="min-h-full bg-slate-50 py-10 sm:py-14">
      <div className="mx-auto w-[94%] max-w-7xl px-3 sm:px-6">
        {/* Header */}
        <div className="mb-9 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-blue-600">
              Administration
            </p>

            <h1 className="mt-2 text-4xl sm:text-5xl">Booking dashboard</h1>

            <p className="mt-3 text-slate-600">
              A clear view of appointments and client activity.
            </p>
          </div>

          <p className=" flex items-center rounded-full bg-white px-4 py-2 text-sm text-slate-500 shadow-sm">
            <span><Dot className="relative h-8 w-8 text-green-500" strokeWidth={8} /></span>Live booking overview
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          {cards.map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <div className={`mb-5 inline-flex rounded-2xl p-3 ${color}`}>
                <Icon size={21} />
              </div>

              <p className="text-3xl font-semibold text-brand-blue-900">
                {value}
              </p>

              <p className="mt-1 text-sm text-slate-500">{label}</p>
            </div>
          ))}
        </div>

        {/* Bookings */}
        <section className="mt-7 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
          {/* Filters */}
          <div className="border-b border-slate-100 p-5 sm:p-7">
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-2xl">Appointments</h2>

                <p className="mt-1 text-sm text-slate-500">
                  Search and review every booking in one place.
                </p>
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setAppliedFilters(filters);
                }}
                className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
              >
                {/* Booking ID */}
                <input
                  className="form-input !rounded-xl !px-4 !py-2.5 text-sm"
                  placeholder="Booking ID"
                  value={filters.bookingNumber}
                  onChange={(event) =>
                    setFilters((v) => ({
                      ...v,
                      bookingNumber: event.target.value,
                    }))
                  }
                />

                {/* Booking Type */}
                <select
                  className="form-input !rounded-xl !px-4 !py-2.5 text-sm"
                  value={filters.bookingType}
                  onChange={(event) =>
                    setFilters((v) => ({
                      ...v,
                      bookingType: event.target.value,
                    }))
                  }
                >
                  <option value="">All booking types</option>
                  <option value="Individual Therapy">Individual Therapy</option>
                  <option value="Couples Therapy">Couples Therapy</option>
                  <option value="Family Therapy">Family Therapy</option>
                  <option value="EMDR / Trauma">EMDR / Trauma</option>
                  <option value="Executive Coaching">Executive Coaching</option>
                </select>

                {/* Date From */}
                <input
                  type="date"
                  className="form-input !rounded-xl !px-4 !py-2.5 text-sm"
                  value={filters.dateFrom}
                  max={filters.dateTo || undefined}
                  onChange={(event) =>
                    setFilters((v) => ({
                      ...v,
                      dateFrom: event.target.value,
                    }))
                  }
                />

                {/* Date To */}
                <input
                  type="date"
                  className="form-input !rounded-xl !px-4 !py-2.5 text-sm"
                  value={filters.dateTo}
                  min={filters.dateFrom || undefined}
                  onChange={(event) =>
                    setFilters((v) => ({
                      ...v,
                      dateTo: event.target.value,
                    }))
                  }
                />

                {/* Search */}
                <button className="btn btn-primary !rounded-xl !px-4 !py-2.5 text-sm">
                  <Search size={16} />
                  Search
                </button>
              </form>
            </div>
          </div>

          {/* Table */}
          {state === "loading" ? (
            <div className="p-12 text-center text-slate-500">
              Loading bookings…
            </div>
          ) : state === "error" ? (
            <div className="p-12 text-center text-red-600">
              Dashboard data could not be loaded.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Booking ID</th>

                    <th className="px-6 py-4 font-semibold">Name</th>

                    <th className="px-6 py-4 font-semibold">Therapy Type</th>

                    <th className="px-6 py-4 font-semibold">Appointment</th>

                    <th className="px-6 py-4 font-semibold">Conduct Mode</th>

                    <th className="px-6 py-4 font-semibold">
                      Contact Information
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {data.bookings.length ? (
                    data.bookings.map((booking) => (
                      <tr key={booking._id} className="hover:bg-slate-50/70">
                        {/* Booking */}
                        <td className="px-6 py-5">
                          <p
                            className="font-mono text-sm font-semibold text-brand-blue-700"
                            title={booking._id}
                          >
                            {booking.bookingNumber}
                          </p>
                        </td>

                        {/* Client */}
                        <td className="px-6 py-5">
                          <p className="font-medium text-slate-800">
                            {booking.fullName}
                          </p>
                        </td>

                        {/* Booking Type */}
                        <td className="px-6 py-5">
                          <span className="inline-flex  px-3 py-1.5 text-base font-medium text-brand-blue-700">
                            {booking.therapyName}
                          </span>
                        </td>

                        {/* Appointment */}
                        <td className="px-6 py-5">
                          <div className="flex items-start gap-3">
                            <div className="rounded-xl bg-slate-100 p-2 text-slate-500">
                              <CalendarDays size={17} />
                            </div>

                            <div>
                              <p className="font-medium text-slate-800">
                                {formatDate(booking.dateOfAppointment)}
                              </p>

                              <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                                <Clock3 size={14} />

                                <span>
                                  {booking.startTime} - {booking.endTime}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Mode */}
                        <td className="px-6 py-5">
                          <span className="inline-flex text-base px-5 py-1.5 font-medium text-brand-blue-700">
                            {booking.mode && booking.mode === "offline"
                              ? "In Person"
                              : "Virtual"}
                          </span>
                        </td>

                        {/* Contact */}
                        <td className="px-6 py-5">
                          <p className="text-base font-medium text-slate-700">
                            {booking.countryCode} {booking.phone}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {booking.email}
                          </p>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-12 text-center text-slate-500"
                      >
                        No bookings match these filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
