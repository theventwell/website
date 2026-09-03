import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, User, Heart, Briefcase, Sparkles, Clock } from 'lucide-react';

const services = [
  {
    icon: User,
    title: "Individual Therapy",
    desc: "One-on-one sessions tailored to your unique goals, challenges, and history. We integrate CBT, ACT, psychodynamic, and mindfulness approaches.",
    details: ["Anxiety & panic", "Depression & burnout", "Trauma recovery", "Life transitions", "Self-worth & identity"],
    duration: "50 min sessions",
  },
  {
    icon: Heart,
    title: "Couples Therapy",
    desc: "Rebuild trust, improve communication, and deepen intimacy. We are trained in the Gottman Method and Emotionally Focused Therapy (EFT).",
    details: ["Communication breakdowns", "Conflict & repair", "Infidelity recovery", "Intimacy & desire", "Premarital preparation"],
    duration: "60–75 min sessions",
  },
  {
    icon: Users,
    title: "Family Therapy",
    desc: "Strengthen family bonds, navigate conflict, and create healthier dynamics for parents, teens, and blended families alike.",
    details: ["Parent-teen conflict", "Blended family challenges", "Grief in families", "Behavioral concerns"],
    duration: "60–90 min sessions",
  },
  {
    icon: Briefcase,
    title: "Executive & Professional Coaching",
    desc: "For high-achievers who want to address anxiety, imposter syndrome, leadership challenges, and sustainable high performance.",
    details: ["Burnout prevention", "Leadership presence", "Career pivots", "Work-life integration"],
    duration: "45 min sessions",
  },
  {
    icon: Sparkles,
    title: "EMDR & Trauma Therapy",
    desc: "Specialized, highly effective treatment for PTSD, complex trauma, and distressing life events using EMDR and parts work.",
    details: ["Single-incident trauma", "Complex / developmental trauma", "Anxiety rooted in past experiences"],
    duration: "60–90 min sessions",
  },
  {
    icon: Clock,
    title: "Intensives & Workshops",
    desc: "Half-day and multi-day intensives for couples and individuals seeking accelerated progress. Seasonal workshops on communication, boundaries, and resilience.",
    details: ["Couples weekend intensives", "Seasonal group workshops", "Corporate wellness talks"],
    duration: "Varies",
  },
];

const Services = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-brand-blue-900 text-white py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="uppercase tracking-[3px] text-sm mb-4 text-white/60">WHAT WE OFFER</div>
          <h1 className="text-6xl lg:text-7xl font-semibold tracking-[-2.4px] leading-none mb-6 text-accent-warm-500">
            Therapy designed<br />for real life.
          </h1>
          <p className="text-2xl text-white/75 max-w-md mx-auto">
            Compassionate, specialized care for the full spectrum of human experience.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section w-[94%] max-w-[1600px] mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="card flex flex-col group">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-11 h-11 flex items-center justify-center bg-brand-blue-700 text-white rounded-2xl flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-2xl tracking-tight text-brand-blue-900">{service.title}</h3>
                </div>

                <p className="text-slate-600 flex-1 leading-relaxed">{service.desc}</p>

                <ul className="mt-7 space-y-1 text-sm text-slate-600">
                  {service.details.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-accent-warm-500 mt-1">•</span> {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6 text-xs uppercase tracking-widest text-brand-blue-600 font-medium border-t border-slate-100 mt-7">
                  {service.duration}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-14">
          <p className="text-slate-500 mb-4 text-sm tracking-wider">NOT SURE WHERE TO START?</p>
          <Link to="/contact" className="btn btn-primary px-8">
            Schedule a Free 20-Minute Consultation <ArrowRight />
          </Link>
        </div>
      </section>

      {/* Insurance / Practical note */}
      <section className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center text-sm text-slate-600">
          We accept most major insurance plans and offer generous sliding-scale options. 
          All sessions are confidential. Telehealth available across Oregon and select states.
        </div>
      </section>
    </div>
  );
};

export default Services;
