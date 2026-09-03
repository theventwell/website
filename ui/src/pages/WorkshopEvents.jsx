import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  Lightbulb,
  Heart,
  Building,
  Briefcase,
  ArrowRight,
  Star,
  Quote,
  Check,
  Clock,
  ClipboardList,
  PenTool,
  Presentation,
  Sparkles,
  Lock,
} from 'lucide-react';

// Shared subtle animation — one quiet rise reused everywhere for cohesion
const rise = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

const WorkshopEvents = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    organization: '',
    role: '',
    workshopType: '',
    numberOfAttendees: '',
    preferredDate: '',
    format: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      console.log('Workshop/Event inquiry submitted:', formData);
    }, 900);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      organization: '',
      role: '',
      workshopType: '',
      numberOfAttendees: '',
      preferredDate: '',
      format: '',
      message: '',
    });
  };

  const workshopTypes = [
    'Stress Management & Resilience',
    'Leadership Wellbeing',
    'Team Communication & Psychological Safety',
    'Burnout Prevention',
    'Mindfulness & Mental Fitness',
    'Custom Workshop / Event',
  ];

  const formats = ['Virtual', 'In-person', 'Hybrid'];

  const attendeeSizes = ['Up to 15', '16–30', '31–50', '51–100', '100+'];

  const reviews = [
    {
      quote:
        'The workshop was transformative. Our team left with practical tools and a renewed sense of connection.',
      name: 'Sarah Patel',
      role: 'Head of HR, TechNova',
      event: '2-day Leadership Resilience Workshop',
    },
    {
      quote:
        'Excellent facilitation and relevant content. Attendance was high and feedback was the best we’ve seen.',
      name: 'Michael Torres',
      role: 'People Director, GreenPath',
      event: 'Mindfulness for High-Performance Teams',
    },
    {
      quote:
        'The event felt personal yet professional. Participants still reference the strategies months later.',
      name: 'Elena Voss',
      role: 'Wellbeing Lead, Horizon Health',
      event: 'Burnout Prevention Masterclass',
    },
  ];

  const audiences = [
    { icon: Users, title: 'Teams & Departments', desc: 'Groups looking to strengthen communication, trust, and collective resilience.' },
    { icon: Briefcase, title: 'Leadership Teams', desc: 'Executives and managers who want to model healthy practices and lead with empathy.' },
    { icon: Building, title: 'Organizations & Institutions', desc: 'Companies, nonprofits, and institutions investing in long-term employee wellbeing.' },
    { icon: Heart, title: 'HR & People Leaders', desc: 'Professionals designing programs that actually move the needle on mental health.' },
  ];

  const outcomes = [
    'Practical, immediately applicable tools and frameworks',
    'Increased emotional awareness and psychological safety',
    'Reduced burnout risk and improved team dynamics',
    'Clearer language around mental health and boundaries',
    'Sustainable habits that support both performance and wellbeing',
    'Measurable shifts in how your people show up for each other',
  ];

  // A genuine sequence — order carries meaning, so numbered markers are earned here
  const process = [
    {
      icon: ClipboardList,
      title: 'You enquire',
      desc: 'Share your goals, your group, and the challenges you want the session to address.',
    },
    {
      icon: PenTool,
      title: 'We design',
      desc: 'We shape a session around your people — the right focus, format, and depth.',
    },
    {
      icon: Presentation,
      title: 'We facilitate',
      desc: 'A licensed facilitator leads an engaging, practical experience your team can use.',
    },
    {
      icon: Sparkles,
      title: 'It lasts',
      desc: 'Follow-up resources and check-ins keep the momentum going long after the day.',
    },
  ];

  // What to expect after submitting — turns the form into a transparent process
  const formAssurances = [
    { icon: Clock, title: 'A reply within 48 hours', desc: 'We review your enquiry and reach out to talk through the details.' },
    { icon: PenTool, title: 'A session built around you', desc: 'Every workshop is tailored to your team, never off the shelf.' },
    { icon: Lock, title: 'No obligation', desc: 'A proposal to consider — no pressure, and your details stay private.' },
  ];

  return (
    <div>
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative overflow-hidden bg-brand-blue-900 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{ background: 'radial-gradient(60% 80% at 70% 0%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 60%)' }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#fff_0.5px,transparent_1px)] bg-[length:22px_22px] opacity-[0.06]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-blue-900 to-transparent" />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 py-24 lg:py-32 text-center">
          <motion.div {...rise} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[3px] text-white/70 backdrop-blur-sm">
              <Lightbulb className="w-3.5 h-3.5" />
              For Teams & Organizations
            </div>
          </motion.div>

          <motion.h1
            {...rise}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-6 text-5xl lg:text-7xl font-semibold tracking-[-2.4px] leading-[0.95] text-accent-warm-500"
          >
            Workshops &amp; events that
            <br />
            <span className="text-accent-warm-500">people actually remember</span>
          </motion.h1>

          <motion.p
            {...rise}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mt-6 max-w-2xl mx-auto text-xl lg:text-2xl text-white/80 leading-snug"
          >
            Thoughtfully designed sessions that help teams build resilience, communicate with care,
            and perform at their best.
          </motion.p>

          <motion.div
            {...rise}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-9 flex flex-col sm:flex-row justify-center gap-3"
          >
            <a href="#workshop-form" className="btn btn-warm text-base px-8 py-3.5 group">
              Enquire About a Workshop
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href="#how-it-works" className="btn border border-white/30 text-white hover:bg-white/10 px-7 py-3.5 text-base">
              See How It Works
            </a>
          </motion.div>

          {/* Honest trust strip */}
          <motion.div
            {...rise}
            transition={{ duration: 0.55, delay: 0.34 }}
            className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 text-left"
          >
            {[
              { k: 'Licensed facilitators', v: 'Every session led by a credentialed professional' },
              { k: 'Virtual, in-person or hybrid', v: 'Delivered in the format that fits your team' },
              { k: 'Tailored, never templated', v: 'Built around your goals and your group' },
            ].map((t, i) => (
              <div key={i} className="bg-white/[0.04] px-5 py-5">
                <div className="text-sm font-semibold text-white">{t.k}</div>
                <div className="mt-1 text-sm text-white/60 leading-snug">{t.v}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ──────────────────── Who Is It For ──────────────────── */}
      <section className="section section-alt">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div {...rise} transition={{ duration: 0.5 }} className="text-center mb-12">
            <div className="uppercase tracking-[3px] text-sm text-brand-blue-600 mb-3">For the Right Audience</div>
            <h2 className="h2">Who is it for?</h2>
            <p className="mt-3 text-lg text-slate-600 max-w-xl mx-auto">
              Our sessions are built for the people responsible for how a team feels and performs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {audiences.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  {...rise}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="card group p-7 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue-100 text-brand-blue-700 transition-colors group-hover:bg-brand-blue-900 group-hover:text-white">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-xl tracking-tight mb-3 text-brand-blue-900">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────── How It Works (signature) ──────────────────── */}
      <section id="how-it-works" className="section max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div {...rise} transition={{ duration: 0.5 }} className="text-center mb-14">
          <div className="uppercase tracking-[3px] text-sm text-brand-blue-600 mb-3">From Enquiry to Impact</div>
          <h2 className="h2">How it works</h2>
          <p className="mt-3 text-lg text-slate-600 max-w-xl mx-auto">
            Four steps from your first message to a session your team carries with them.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line behind the steps (desktop only) */}
          <div className="pointer-events-none absolute left-0 right-0 top-6 hidden lg:block">
            <div className="mx-auto h-px w-[80%] bg-gradient-to-r from-transparent via-brand-blue-100 to-transparent" />
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  {...rise}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative text-center"
                >
                  <div className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue-900 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 text-xs font-semibold uppercase tracking-[3px] text-accent-warm-500">
                    Step {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="mt-1 text-lg font-semibold tracking-tight text-brand-blue-900">{step.title}</h3>
                  <p className="mx-auto mt-2 max-w-[15rem] text-[15px] leading-snug text-slate-600">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────── Workshop Outcomes ──────────────────── */}
      <section className="section section-alt">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-start">
            <motion.div {...rise} transition={{ duration: 0.5 }} className="lg:col-span-4 lg:sticky lg:top-28">
              <div className="uppercase tracking-[3px] text-sm text-brand-blue-600 mb-3">What Participants Take Away</div>
              <h2 className="h2">Workshop outcomes</h2>
              <p className="mt-3 text-lg text-slate-600">
                Every session is designed with clear, lasting results in mind — not just a good day out
                of the office.
              </p>
            </motion.div>

            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
              {outcomes.map((outcome, index) => (
                <motion.div
                  key={index}
                  {...rise}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="flex items-start gap-4 rounded-3xl border border-slate-100 bg-white p-6"
                >
                  <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent-warm-100 text-accent-warm-500">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-[17px] leading-snug text-slate-700">{outcome}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────── Reviews (social proof before the ask) ──────────────────── */}
      <section className="section max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div {...rise} transition={{ duration: 0.5 }} className="text-center mb-12">
          <div className="uppercase tracking-[3px] text-sm text-brand-blue-600 mb-3">Real Feedback</div>
          <h2 className="h2">What teams say afterwards</h2>
          <p className="mt-3 text-lg text-slate-600 max-w-xl mx-auto">
            Hear from the organizations and teams who have experienced our workshops and events.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              {...rise}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="card relative flex flex-col overflow-hidden p-8"
            >
              <Quote className="absolute right-6 top-6 h-10 w-10 text-brand-blue-100" />
              <div className="relative flex gap-0.5 text-accent-warm-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="relative mt-5 flex-1 text-lg leading-relaxed text-slate-700">“{review.quote}”</p>
              <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-6">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand-blue-100 font-semibold text-brand-blue-700">
                  {review.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium text-brand-blue-900">{review.name}</div>
                  <div className="text-sm text-slate-500">{review.role}</div>
                </div>
              </div>
              <div className="mt-3 text-xs text-brand-blue-600">{review.event}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ──────────────────── Enquiry Form ──────────────────── */}
      <section id="workshop-form" className="section section-alt">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...rise} transition={{ duration: 0.5 }} className="text-center mb-12">
            <div className="uppercase tracking-[3px] text-sm text-brand-blue-600 mb-3">Let’s Create Something Together</div>
            <h2 className="h2">Interested in hosting a workshop?</h2>
            <p className="mt-3 text-lg text-slate-600 max-w-xl mx-auto">
              Tell us about the session you have in mind. We’ll craft a proposal that fits your team and goals.
            </p>
          </motion.div>

          {!submitted ? (
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Reassurance column */}
              <motion.div {...rise} transition={{ duration: 0.5 }} className="lg:col-span-4 lg:sticky lg:top-28">
                <h3 className="text-xl font-semibold tracking-tight text-brand-blue-900 mb-6">What to expect</h3>
                <div className="space-y-6">
                  {formAssurances.map((step, i) => {
                    const Icon = step.icon;
                    return (
                      <div key={i} className="flex gap-4">
                        <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-blue-100 text-brand-blue-700">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-brand-blue-900">{step.title}</div>
                          <p className="mt-1 text-[15px] leading-snug text-slate-600">{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* The form */}
              <motion.div {...rise} transition={{ duration: 0.5, delay: 0.1 }} className="lg:col-span-8">
                <div className="card p-8 lg:p-10">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1.5">
                          Full Name <span className="text-accent-warm-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="form-input"
                          placeholder="Alex Rivera"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1.5">
                          Email Address <span className="text-accent-warm-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="form-input"
                          placeholder="alex@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1.5">Organization</label>
                        <input
                          type="text"
                          name="organization"
                          value={formData.organization}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="Your company or team"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1.5">Your Role</label>
                        <input
                          type="text"
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="People Lead / Manager"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1.5">
                          Workshop / Event Type <span className="text-accent-warm-500">*</span>
                        </label>
                        <select
                          name="workshopType"
                          value={formData.workshopType}
                          onChange={handleChange}
                          required
                          className="form-input"
                        >
                          <option value="">Select a focus area...</option>
                          {workshopTypes.map((type, i) => (
                            <option key={i} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1.5">
                          Approximate Number of Attendees <span className="text-accent-warm-500">*</span>
                        </label>
                        <select
                          name="numberOfAttendees"
                          value={formData.numberOfAttendees}
                          onChange={handleChange}
                          required
                          className="form-input"
                        >
                          <option value="">Select size...</option>
                          {attendeeSizes.map((size, i) => (
                            <option key={i} value={size}>{size}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1.5">Preferred Date or Timeframe</label>
                        <input
                          type="text"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="March 2026 or Q2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1.5">
                          Format <span className="text-accent-warm-500">*</span>
                        </label>
                        <select
                          name="format"
                          value={formData.format}
                          onChange={handleChange}
                          required
                          className="form-input"
                        >
                          <option value="">Select format...</option>
                          {formats.map((f, i) => (
                            <option key={i} value={f}>{f}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1.5">
                        Tell us more about what you’re looking for <span className="text-accent-warm-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="form-input resize-y min-h-[120px]"
                        placeholder="Goals for the session, specific challenges your team is facing, duration preference, or any other details..."
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-warm w-full sm:w-auto px-10 py-3.5 text-base disabled:opacity-70 group"
                      >
                        {isSubmitting ? (
                          'Sending your enquiry…'
                        ) : (
                          <>
                            Submit Workshop Enquiry
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                          </>
                        )}
                      </button>
                      <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                        <Lock className="w-3.5 h-3.5" />
                        For workshop and event enquiries only. We aim to respond within 48 hours.
                      </p>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="card p-10 lg:p-14 text-center max-w-2xl mx-auto"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent-warm-100">
                <Check className="h-8 w-8 text-accent-warm-500" />
              </div>
              <h3 className="text-3xl tracking-tight font-semibold text-brand-blue-900 mb-3">
                Thank you — we’ve received your request.
              </h3>
              <p className="text-lg text-slate-600 max-w-md mx-auto">
                Our workshops team will get back to you shortly to explore dates, format, and how we can best
                support your group.
              </p>
              <button onClick={resetForm} className="mt-8 btn btn-secondary">
                Submit Another Enquiry
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ──────────────────── Bottom CTA ──────────────────── */}
      <section className="relative overflow-hidden bg-brand-blue-900 py-20 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{ background: 'radial-gradient(50% 80% at 50% 0%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 60%)' }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#fff_0.5px,transparent_1px)] bg-[length:22px_22px] opacity-[0.06]" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl tracking-tight font-semibold mb-4 text-accent-warm-500">
            Ready to bring a workshop to your team?
          </h2>
          <p className="text-white/75 text-lg mb-8 max-w-lg mx-auto">
            We design every session with care, clarity, and real impact.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="#workshop-form" className="btn btn-warm px-8 py-3 text-base">
              Enquire Now
            </a>
            <Link to="/contact" className="btn border border-white/40 text-white hover:bg-white/10 px-8 py-3 text-base">
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkshopEvents;
