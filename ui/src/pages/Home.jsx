import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Star } from 'lucide-react';

const Home = () => {
  const highlights = [
    "Evidence-based therapy tailored to you",
    "Warm, modern spaces designed for safety and comfort",
    "Therapists who truly listen — and know what works",
    "Flexible in-person and secure telehealth options",
  ];

  const testimonials = [
    {
      quote: "The Vent Well gave me the first space where I didn’t have to perform or explain myself. I finally feel like myself again.",
      name: "Alex Rivera",
      detail: "Therapy client, 11 months",
    },
    {
      quote: "My partner and I were on the brink. Lena helped us find our way back to each other with so much care and skill.",
      name: "Priya & Marcus Chen",
      detail: "Couples therapy",
    },
    {
      quote: "After years of burnout and anxiety, working with Dr. Patel changed how I relate to myself and my work. I’m sleeping again.",
      name: "Jordan Ellis",
      detail: "Individual therapy",
    },
  ];

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center bg-gradient-to-b from-brand-blue-50 via-white to-white">
        <div className="w-[94%] max-w-[1600px] mx-auto px-6 lg:px-8 pt-10 pb-16">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white shadow-premium border border-brand-blue-100 text-sm text-brand-blue-700 tracking-wider mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-warm-500 animate-pulse" /> NOW ACCEPTING NEW CLIENTS
            </div>

            <h1 className="h1 mb-6 pr-4">
              Mental health care<br />that actually feels human.
            </h1>
            <p className="lead max-w-2xl text-slate-600">
              The Vent Well is a modern therapy practice in Portland offering compassionate, 
              highly skilled care for individuals, couples, and families.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/contact" className="btn btn-primary text-base px-9 py-3.5">
                Begin Your Journey <ArrowRight />
              </Link>
              <Link to="/about" className="btn btn-secondary text-base px-8 py-3.5">
                Learn About Us
              </Link>
            </div>
            <div className="mt-6 text-xs text-slate-500 flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-blue-600" /> 15-minute free consultations available
            </div>
          </div>
        </div>

        {/* Right decorative element / visual accent */}
        <div className="hidden xl:block absolute right-0 top-1/2 -translate-y-1/2 w-[42%] h-[72%] bg-gradient-to-l from-brand-blue-900/5 to-transparent rounded-l-[6rem]" />
      </section>

      {/* Trust bar */}
      <div className="border-y border-slate-100 bg-white py-5">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center items-center gap-x-12 gap-y-3 text-sm text-slate-500 tracking-wider">
          <div>100% CONFIDENTIAL</div>
          <div>LICENSED &amp; BOARD-CERTIFIED</div>
          <div>INSURANCE &amp; PRIVATE PAY</div>
          <div>IN-PERSON + TELEHEALTH</div>
        </div>
      </div>

      {/* Value props / Quick intro */}
      <section className="section w-[94%] max-w-[1600px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-brand-blue-600 tracking-[3px] uppercase text-sm mb-3">WHY PEOPLE CHOOSE US</div>
          <h2 className="h2">Therapy that meets you where you are.</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {highlights.map((text, i) => (
            <div key={i} className="flex gap-4 bg-white border border-slate-100 p-7 rounded-3xl items-start">
              <div className="mt-1 text-accent-warm-500">
                <Check className="w-6 h-6" />
              </div>
              <p className="text-[17px] leading-snug text-slate-700">{text}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/services" className="btn btn-ghost text-base">
            Explore all our services <ArrowRight className="inline" />
          </Link>
        </div>
      </section>

      {/* Testimonials - premium feel */}
      <section className="section section-alt">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-end mb-9">
            <div>
              <div className="text-brand-blue-600 tracking-widest text-sm mb-2">REAL VOICES</div>
              <h2 className="h2">Stories from our community</h2>
            </div>
            <Link to="/about" className="hidden md:flex items-center text-brand-blue-700 text-sm font-medium">Read more stories <ArrowRight className="ml-1" /></Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, index) => (
              <div key={index} className="card flex flex-col">
                <div className="flex gap-1 text-accent-warm-500 mb-5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <blockquote className="text-[15.5px] leading-snug text-slate-700 flex-1">
                  “{t.quote}”
                </blockquote>
                <div className="pt-6 mt-auto border-t border-slate-100">
                  <div className="font-medium">{t.name}</div>
                  <div className="text-sm text-slate-500">{t.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-[94%] max-w-[1100px] mx-auto px-6 py-20 text-center">
        <h2 className="h2">Your story deserves to be heard.</h2>
        <p className="mt-4 text-xl text-slate-600 max-w-md mx-auto">Take the first step toward feeling better. We’re here when you’re ready.</p>
        
        <Link to="/contact" className="btn btn-primary mt-8 px-9 py-3.5 text-base inline-flex">
          Book Your Free Consultation
        </Link>
        <p className="text-xs mt-4 text-slate-500">No obligation. Just a conversation.</p>
      </section>
    </div>
  );
};

export default Home;
