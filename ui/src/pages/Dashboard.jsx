import { useEffect, useState } from 'react';
import { Activity, CalendarDays, Search, Users } from 'lucide-react';
import { apiFetch } from '../api/client';

const formatDate = (value) => new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

const Dashboard = () => {
  const [filters, setFilters] = useState({ bookingId: '', bookingType: '' });
  const [appliedFilters, setAppliedFilters] = useState(filters);
  const [data, setData] = useState({ stats: { pastMonth: 0, active: 0, total: 0 }, bookings: [] });
  const [state, setState] = useState('loading');

  useEffect(() => {
    const loadDashboard = async () => {
      setState('loading');
      try {
        const query = new URLSearchParams(Object.entries(appliedFilters).filter(([, value]) => value.trim()));
        const result = await apiFetch(`/api/admin/dashboard${query.size ? `?${query}` : ''}`);
        setData(result.data); setState('ready');
      } catch { setState('error'); }
    };
    loadDashboard();
  }, [appliedFilters]);

  const cards = [
    { label: 'Bookings this month', value: data.stats.pastMonth, icon: CalendarDays, color: 'bg-brand-blue-50 text-brand-blue-700' },
    { label: 'Active bookings', value: data.stats.active, icon: Activity, color: 'bg-emerald-50 text-emerald-700' },
    { label: 'All bookings', value: data.stats.total, icon: Users, color: 'bg-amber-50 text-amber-700' },
  ];

  return <div className="bg-slate-50 min-h-full py-10 sm:py-14"><div className="mx-auto w-[94%] max-w-7xl px-3 sm:px-6">
    <div className="mb-9 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-blue-600">Administration</p><h1 className="mt-2 text-4xl sm:text-5xl">Booking dashboard</h1><p className="mt-3 text-slate-600">A clear view of appointments and client activity.</p></div><p className="rounded-full bg-white px-4 py-2 text-sm text-slate-500 shadow-sm">Live booking overview</p></div>
    <div className="grid gap-4 sm:grid-cols-3">{cards.map(({ label, value, icon: Icon, color }) => <div key={label} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"><div className={`mb-5 inline-flex rounded-2xl p-3 ${color}`}><Icon size={21} /></div><p className="text-3xl font-semibold text-brand-blue-900">{value}</p><p className="mt-1 text-sm text-slate-500">{label}</p></div>)}</div>
    <section className="mt-7 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm"><div className="border-b border-slate-100 p-5 sm:p-7"><div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><h2 className="text-2xl">Appointments</h2><p className="mt-1 text-sm text-slate-500">Search and review every booking in one place.</p></div><form onSubmit={(event) => { event.preventDefault(); setAppliedFilters(filters); }} className="grid gap-3 sm:grid-cols-3"><input className="form-input !rounded-xl !px-4 !py-2.5 text-sm" placeholder="Booking ID" value={filters.bookingId} onChange={(event) => setFilters((v) => ({ ...v, bookingId: event.target.value }))} /><input className="form-input !rounded-xl !px-4 !py-2.5 text-sm" placeholder="Booking type" value={filters.bookingType} onChange={(event) => setFilters((v) => ({ ...v, bookingType: event.target.value }))} /><button className="btn btn-primary !rounded-xl !px-4 !py-2.5 text-sm"><Search size={16} /> Search</button></form></div></div>
      {state === 'loading' ? <div className="p-12 text-center text-slate-500">Loading bookings…</div> : state === 'error' ? <div className="p-12 text-center text-red-600">Dashboard data could not be loaded.</div> : <div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-6 py-4 font-semibold">Booking</th><th className="px-6 py-4 font-semibold">Client</th><th className="px-6 py-4 font-semibold">Type</th><th className="px-6 py-4 font-semibold">Appointment</th><th className="px-6 py-4 font-semibold">Contact</th></tr></thead><tbody className="divide-y divide-slate-100">{data.bookings.length ? data.bookings.map((booking) => <tr key={booking._id} className="hover:bg-slate-50/70"><td className="px-6 py-4 font-mono text-xs text-slate-500" title={booking._id}>#{booking._id.slice(-8).toUpperCase()}</td><td className="px-6 py-4"><p className="font-medium text-slate-800">{booking.fullName}</p><p className="text-sm text-slate-500">{booking.email}</p></td><td className="px-6 py-4"><span className="rounded-full bg-brand-blue-50 px-3 py-1 text-sm font-medium text-brand-blue-700">{booking.therapyName}</span></td><td className="px-6 py-4 text-sm text-slate-700">{formatDate(booking.dateOfAppointment)}</td><td className="px-6 py-4 text-sm text-slate-600">{booking.countryCode} {booking.phone}</td></tr>) : <tr><td colSpan="5" className="px-6 py-12 text-center text-slate-500">No bookings match these filters.</td></tr>}</tbody></table></div>}</section>
  </div></div>;
};

export default Dashboard;
