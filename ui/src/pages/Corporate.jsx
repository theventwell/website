import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Users,
  TrendingUp,
  Shield,
  ArrowRight,
  Briefcase,
  HeartPulse,
  LifeBuoy,
  Building2,
  Clock,
  Lock,
  BarChart3,
} from 'lucide-react';

import office1 from '../assets/office_1.avif';
import office2 from '../assets/office_2.avif';

// Shared, restrained motion — a single quiet rise used everywhere for cohesion
const rise = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

const Corporate = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    title: '',
    email: '',
    phone: '',
    orgSize: '',
    programType: '',
    timeline: '',
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

    // Simulate form processing (dedicated corporate inquiry)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // In production, this would POST to a dedicated corporate endpoint
      console.log('Corporate inquiry submitted:', formData);
    }, 900);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      companyName: '',
      contactName: '',
      title: '',
      email: '',
      phone: '',
      orgSize: '',
      programType: '',
      timeline: '',
      message: '',
    });
  };

  const programOptions = [
    'Employee Assistance Program (EAP)',
    'Wellness Workshops & Training',
    'Leadership Resilience Program',
    'Mental Health First Aid Certification',
    'Team Wellbeing & Burnout Prevention',
    'Custom Institutional Partnership',
  ];

  const orgSizes = [
    '10–50 employees',
    '51–200 employees',
    '201–500 employees',
    '501–1,000 employees',
    '1,000+ employees',
    'Other / Institutional',
  ];

  // The business case, reframed as a signature stat band rather than a bullet list
  const stats = [
    { value: '1 in 5', label: 'employees face a mental health challenge each year' },
    { value: '$500B', label: 'lost annually by U.S. employers to untreated mental health issues' },
    { value: '4×', label: 'higher revenue growth at companies with strong wellbeing cultures' },
    { value: '70%', label: 'of employees say their wellbeing directly shapes their performance' },
  ];

  const programs = [
    {
      icon: LifeBuoy,
      title: 'Employee Assistance Programs',
      desc: 'Confidential counseling for employees and their families, with engagement analytics and HR-ready reporting.',
    },
    {
      icon: HeartPulse,
      title: 'Wellness Workshops & Training',
      desc: 'Interactive sessions on stress, burnout prevention, and building genuine psychological safety across teams.',
    },
    {
      icon: Users,
      title: 'Leadership Development',
      desc: 'Practical programs that equip managers to lead with compassion and support their teams’ mental health.',
    },
    {
      icon: Shield,
      title: 'Mental Health First Aid',
      desc: 'Certification training so staff can recognize early signs and respond with confidence and care.',
    },
    {
      icon: TrendingUp,
      title: 'Team & Organizational Wellness',
      desc: 'Custom programs for team dynamics, post-crisis support, and sustainable high performance.',
    },
    {
      icon: Building2,
      title: 'Custom Institutional Solutions',
      desc: 'Bespoke, multi-year partnerships for universities, healthcare systems, nonprofits, and enterprises.',
    },
  ];

  const differentiators = [
    {
      icon: Shield,
      title: 'Clinical Expertise + Business Acumen',
      desc: 'Our clinicians understand both therapy and workplace dynamics, so programs stay practical and effective.',
    },
    {
      icon: Users,
      title: 'Fully Customized & Scalable',
      desc: 'Every partnership is tailored to your culture, size, and industry — from a focused pilot to enterprise-wide rollout.',
    },
    {
      icon: TrendingUp,
      title: 'Measurable Outcomes',
      desc: 'Clear reporting on engagement, satisfaction, and wellbeing improvements, so you can demonstrate real impact.',
    },
    {
      icon: CheckCircle,
      title: 'Confidential & Trusted',
      desc: 'The highest standards of privacy and professionalism — building trust with employees and leadership alike.',
    },
  ];

  // What happens after they submit — turns a form into a transparent process
  const nextSteps = [
    {
      icon: Clock,
      title: 'A reply within 48 hours',
      desc: 'Our partnerships team reviews your inquiry and reaches out to schedule an initial conversation.',
    },
    {
      icon: BarChart3,
      title: 'A tailored proposal',
      desc: 'We map your goals, audience, and constraints into a costed program with clear success measures.',
    },
    {
      icon: Lock,
      title: 'Confidential throughout',
      desc: 'Every discussion is private. No obligation, no pressure — just a clear path forward if it fits.',
    },
  ];

  return (
    <div>
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative overflow-hidden bg-brand-blue-900 text-white">
        {/* Layered depth: soft glow + fine dot texture + bottom fade */}
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              'radial-gradient(60% 80% at 70% 0%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 60%)',
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#fff_0.5px,transparent_1px)] bg-[length:22px_22px] opacity-[0.06]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-blue-900 to-transparent" />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 py-24 lg:py-32 text-center">
          <motion.div {...rise} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[3px] text-white/70 backdrop-blur-sm">
              <Briefcase className="w-3.5 h-3.5" />
              For Organizations
            </div>
          </motion.div>

          <motion.h1
            {...rise}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-6 text-5xl lg:text-7xl font-semibold tracking-[-2.4px] leading-[0.95] text-accent-warm-500"
          >
            Wellbeing, built into
            <br />
            <span className="text-accent-warm-500">how your people work</span>
          </motion.h1>

          <motion.p
            {...rise}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mx-auto mt-7 max-w-2xl text-xl lg:text-2xl text-white/80 leading-snug"
          >
            Evidence-based mental health programs for the teams, leaders, and institutions
            that treat wellbeing as a strategic advantage — not an afterthought.
          </motion.p>

          <motion.div
            {...rise}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <a href="#corporate-form" className="btn btn-warm text-base px-8 py-3.5 group">
              Request a Partnership Proposal
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#programs"
              className="btn border border-white/30 text-white hover:bg-white/10 px-7 py-3.5 text-base"
            >
              Explore Programs
            </a>
          </motion.div>

          {/* Trust strip — honest attributes, not invented logos */}
          <motion.div
            {...rise}
            transition={{ duration: 0.55, delay: 0.34 }}
            className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left"
          >
            {[
              { k: 'Licensed clinicians', v: 'Every program led by credentialed professionals' },
              { k: 'Measurable ROI', v: 'Reporting on engagement and wellbeing outcomes' },
              { k: 'Strictly confidential', v: 'Privacy-first by design, at every level' },
            ].map((t, i) => (
              <div key={i} className="bg-white/[0.03] px-5 py-5">
                <div className="text-sm font-semibold text-white">{t.k}</div>
                <div className="mt-1 text-sm text-white/60 leading-snug">{t.v}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ──────────────────── The Business Case ──────────────────── */}
      <section className="section max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-x-16 gap-y-10 items-center">
          <motion.div {...rise} transition={{ duration: 0.5 }}>
            <div className="uppercase tracking-[3px] text-sm text-brand-blue-600 mb-3">The Business Case</div>
            <h2 className="h2 mb-6">Mental health is a business decision</h2>
            <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
              <p>
                Wellbeing is no longer a personal matter handled quietly off the clock. It shows up in
                focus, retention, and culture — and the organizations that invest in it see the returns
                in their numbers.
              </p>
              <p>
                The case isn’t soft. It’s measurable, and it’s already shaping how the best employers
                compete for talent.
              </p>
            </div>
          </motion.div>

          {/* Banner-style image with overlay using office_1 */}
          <motion.div
            {...rise}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative rounded-3xl overflow-hidden shadow-premium"
          >
            <img
              src={office1}
              alt="Modern corporate office environment"
              className="w-full aspect-[16/10] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-900/70 via-brand-blue-900/40 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(#fff_0.5px,transparent_1px)] bg-[length:3px_3px] opacity-10" />
          </motion.div>
        </div>

        {/* Signature stat band — the page's memorable, data-true moment */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-3xl border border-slate-200 bg-slate-200">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              {...rise}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white px-6 py-8 lg:px-8 lg:py-10"
            >
              <div className="text-4xl lg:text-5xl font-semibold tracking-[-1.5px] text-brand-blue-900">
                {s.value}
              </div>
              <div className="mt-3 text-[15px] leading-snug text-slate-600">{s.label}</div>
            </motion.div>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-400">
          Figures reflect widely cited industry research on workplace mental health.
        </p>
      </section>

      {/* ──────────────────── What Ventwell Offers ──────────────────── */}
      <section id="programs" className="section section-alt">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...rise} transition={{ duration: 0.5 }} className="text-center mb-12">
            <div className="uppercase tracking-[3px] text-sm text-brand-blue-600 mb-3">Our Corporate Programs</div>
            <h2 className="h2">A program for every stage of your culture</h2>
            <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
              Scalable, evidence-based offerings designed specifically for the modern workplace.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  className="card group relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  {/* Accent edge revealed on hover */}
                  <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent-warm-500 transition-transform duration-300 group-hover:scale-x-100" />
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue-100 text-brand-blue-700 transition-colors group-hover:bg-brand-blue-900 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-xl tracking-tight text-brand-blue-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────── The Ventwell Difference ──────────────────── */}
      <section className="section max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-12 items-center">
          <motion.div {...rise} transition={{ duration: 0.5 }} className="lg:col-span-5">
            <div className="uppercase tracking-[3px] text-sm text-brand-blue-600 mb-3">The Ventwell Difference</div>
            <h2 className="h2 mb-6">Programs designed to actually work</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              We bring clinical excellence and organizational insight together — building programs your
              people will use, and that leadership can stand behind.
            </p>
          </motion.div>

          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-6">
              {differentiators.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    {...rise}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                    className="flex gap-4"
                  >
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-11 h-11 rounded-2xl bg-brand-blue-100 text-brand-blue-700 flex items-center justify-center ring-1 ring-brand-blue-100">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg tracking-tight text-brand-blue-900 mb-1">{item.title}</h3>
                      <p className="text-slate-600 leading-relaxed text-[15px]">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Banner-style image with overlay using office_2 */}
        <motion.div
          {...rise}
          transition={{ duration: 0.5 }}
          className="mt-12 relative rounded-3xl overflow-hidden shadow-premium"
        >
          <img
            src={office2}
            alt="Professional corporate office interior"
            className="w-full aspect-[16/9] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-900/70 via-brand-blue-900/30 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(#fff_0.5px,transparent_1px)] bg-[length:3px_3px] opacity-10" />
          <div className="absolute bottom-0 left-0 p-8 lg:p-10 max-w-lg">
            <p className="text-white text-xl lg:text-2xl font-medium tracking-tight leading-snug">
              “The strongest cultures don’t leave wellbeing to chance. They design for it.”
            </p>
          </div>
        </motion.div>
      </section>

      {/* ──────────────────── Dedicated Corporate Form ──────────────────── */}
      <section id="corporate-form" className="section section-alt">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...rise} transition={{ duration: 0.5 }} className="text-center mb-12">
            <div className="uppercase tracking-[3px] text-sm text-brand-blue-600 mb-3">Partnership Inquiry</div>
            <h2 className="h2">Request a corporate program</h2>
            <p className="mt-3 text-lg text-slate-600 max-w-xl mx-auto">
              Tell us about your organization and we’ll build a proposal around it.
            </p>
          </motion.div>

          {!submitted ? (
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Reassurance column — what happens next */}
              <motion.div {...rise} transition={{ duration: 0.5 }} className="lg:col-span-4 lg:sticky lg:top-28">
                <h3 className="text-xl font-semibold tracking-tight text-brand-blue-900 mb-6">
                  What happens next
                </h3>
                <div className="space-y-6">
                  {nextSteps.map((step, i) => {
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
                          Company / Institution Name <span className="text-accent-warm-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          required
                          className="form-input"
                          placeholder="Acme Corporation"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1.5">
                          Contact Person Name <span className="text-accent-warm-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="contactName"
                          value={formData.contactName}
                          onChange={handleChange}
                          required
                          className="form-input"
                          placeholder="Jordan Lee"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1.5">
                          Job Title <span className="text-accent-warm-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          required
                          className="form-input"
                          placeholder="Head of People & Culture"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1.5">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1.5">
                        Work Email <span className="text-accent-warm-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="jordan.lee@acmecorp.com"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1.5">
                          Organization Size <span className="text-accent-warm-500">*</span>
                        </label>
                        <select
                          name="orgSize"
                          value={formData.orgSize}
                          onChange={handleChange}
                          required
                          className="form-input"
                        >
                          <option value="">Select size...</option>
                          {orgSizes.map((size, i) => (
                            <option key={i} value={size}>{size}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1.5">
                          Primary Program Interest <span className="text-accent-warm-500">*</span>
                        </label>
                        <select
                          name="programType"
                          value={formData.programType}
                          onChange={handleChange}
                          required
                          className="form-input"
                        >
                          <option value="">Select program...</option>
                          {programOptions.map((opt, i) => (
                            <option key={i} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1.5">Preferred Timeline</label>
                      <input
                        type="text"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Q2 2026 or specific dates"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1.5">
                        Additional Details or Requirements
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="form-input resize-y min-h-[120px]"
                        placeholder="Tell us about your goals, number of participants, preferred format (in-person / virtual), or any specific needs..."
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-warm w-full sm:w-auto px-10 py-3.5 text-base disabled:opacity-70 group"
                      >
                        {isSubmitting ? (
                          'Sending your inquiry…'
                        ) : (
                          <>
                            Submit Corporate Inquiry
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                          </>
                        )}
                      </button>
                      <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                        <Lock className="w-3.5 h-3.5" />
                        For corporate and institutional inquiries only. We typically respond within 48 hours.
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
                <CheckCircle className="h-8 w-8 text-accent-warm-500" />
              </div>
              <h3 className="text-3xl tracking-tight font-semibold text-brand-blue-900 mb-3">
                Thank you — your inquiry is in.
              </h3>
              <p className="text-lg text-slate-600 max-w-md mx-auto">
                A member of our Corporate Partnerships team will contact you within two business days to
                discuss your requirements and next steps.
              </p>
              <button onClick={resetForm} className="mt-8 btn btn-secondary">
                Submit Another Inquiry
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ──────────────────── Bottom CTA ──────────────────── */}
      <section className="relative overflow-hidden bg-brand-blue-900 py-20 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              'radial-gradient(50% 80% at 50% 0%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 60%)',
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#fff_0.5px,transparent_1px)] bg-[length:22px_22px] opacity-[0.06]" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl tracking-tight font-semibold mb-4">
            Ready to invest in your team’s wellbeing?
          </h2>
          <p className="text-white/75 text-lg mb-8 max-w-lg mx-auto">
            Let’s design a program that delivers lasting value for your people and your organization.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="#corporate-form" className="btn btn-warm px-8 py-3 text-base">
              Request a Proposal
            </a>
            <Link
              to="/contact"
              className="btn border border-white/40 text-white hover:bg-white/10 px-8 py-3 text-base"
            >
              Speak with Our Team
            </Link>
          </div>
          <p className="text-xs text-white/50 mt-7 tracking-wide">
            CONFIDENTIAL • TAILORED PROPOSALS • NO OBLIGATION
          </p>
        </div>
      </section>
    </div>
  );
};

export default Corporate;
