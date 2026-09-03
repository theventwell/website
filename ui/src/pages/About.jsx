import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, HeartHandshake, Shield, Users, Sparkles, ChevronDown } from 'lucide-react';

import instagramLogo from '../assets/instagram_logo.png';
import linkedinLogo from '../assets/linkedin_logo.png';
import mapsLogo from '../assets/maps_logo.png';

import visitingImage from '../assets/animation1.png';
import ownerImage from '../assets/owner.avif';

// VIDEO BOILERPLATE:
// Option A (preferred for large video files): Place your video in the `public/videos/` folder
//   e.g. public/videos/therapist-intro.mp4  →  then use src="/videos/therapist-intro.mp4"
// Option B: Add the file to src/assets/ (e.g. therapist-intro.mp4) and uncomment the import below
// import therapistVideo from '../assets/therapist-intro.mp4';

// FAQ data for the new accordion section
const faqs = [
  {
    q: "What can I expect in my first session?",
    a: "Your first visit is a relaxed, unhurried conversation. We’ll explore what brings you in, your history, and what you hope to gain. There’s no pressure to share everything at once — we move at your pace.",
  },
  {
    q: "Is everything I share confidential?",
    a: "Absolutely. What you share stays between you and your therapist, with very few legal exceptions (such as imminent risk of harm). We take confidentiality extremely seriously.",
  },
  {
    q: "How long does therapy usually take?",
    a: "It depends on your goals. Some people find meaningful progress in 8–12 sessions. Others benefit from longer-term support. We’ll regularly check in on progress and adjust together.",
  },
  {
    q: "Do you accept insurance?",
    a: "We accept many major plans and offer transparent self-pay rates as well as a limited number of reduced-fee slots. During your free consultation we can discuss options that work for you.",
  },
  {
    q: "Can I do sessions online or only in person?",
    a: "We offer both in-person sessions in our Portland space and secure, high-quality telehealth across Oregon and several other states. Many clients enjoy the flexibility of mixing both formats.",
  },
  {
    q: "What if I don’t feel a connection with my therapist?",
    a: "That happens sometimes, and it’s okay. We’ll help you find a better match within our team at no extra cost. Your comfort and trust are essential to the work.",
  },
];

const coreValues = [
  {
    icon: HeartHandshake,
    title: "Empathy Without Limits",
    description: "We meet you exactly where you are. No judgment. No agenda. Just deep, attuned listening and genuine care.",
  },
  {
    icon: Shield,
    title: "Clinical Excellence",
    description: "Our therapists are highly trained and stay current with the latest evidence-based methods. Care that actually works.",
  },
  {
    icon: Users,
    title: "Inclusive & Safe",
    description: "Everyone is welcome here. We actively practice cultural humility and create spaces where all identities feel respected.",
  },
  {
    icon: Sparkles,
    title: "Whole-Person Healing",
    description: "We see you as a whole person — mind, body, relationships, and purpose. Therapy that honors every part of your life.",
  },
];

const About = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToExpect = () => {
    const section = document.getElementById('what-to-expect');
    if (section) {
      const headerOffset = 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  // Update this path when your video file is ready.
  // Current default assumes public/videos/therapist-intro.mp4
  const therapistIntroVideo = '/videos/therapist-intro.mp4';

  return (
    <div className="overflow-hidden">
      {/* HERO — Mission + Visual Impact */}
      <section className="relative min-h-[92vh] flex items-center bg-brand-blue-900 text-white pt-8">
        <div className="w-[94%] max-w-[1600px] mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-x-10 items-center">
          <div className="lg:col-span-6 pt-12 pb-16 lg:pb-0">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-sm tracking-[1.5px] mb-6">
              EST. 2018 • PORTLAND, OREGON
            </div>

            <h1 className=" leading-[1.02] tracking-[-2.6px] text-6xl lg:text-[72px] mb-8 text-accent-warm-500">
              A place to<br />be truly heard.
            </h1>

            <p className="max-w-[42ch] text-2xl lg:text-3xl text-white/80 tracking-tight leading-tight mb-10">
              The Vent Well was founded on a simple belief: when you feel safe enough to speak freely, real healing begins.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={scrollToExpect}
                className="btn btn-warm text-base px-8 py-3.5 group"
              >
                What to Expect
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
              </button>
              <Link
                to="/contact"
                className="btn border border-white/40 text-white hover:bg-white/10 hover:border-white/60 px-8 py-3.5 text-base"
              >
                Start the Conversation
              </Link>
            </div>

            <div className="mt-10 text-white/50 text-sm flex items-center gap-3">
              <div className="h-px w-8 bg-white/30" /> Trusted by 1,200+ individuals and families
            </div>
          </div>

          {/* Hero Visual — Full video player (replaces previous image) */}
          <div className="lg:col-span-6 relative hidden lg:block">
            <div className="relative aspect-video lg:aspect-[16/10] rounded-[3rem] overflow-hidden shadow-[0_40px_120px_-15px_rgb(0,0,0,0.5)] ring-1 ring-white/10 bg-black">
              {/* 
                FULL FLEDGED NATIVE VIDEO PLAYER - BOILERPLATE
                - Place your video file in the PUBLIC folder for best performance with large files.
                  Example: public/videos/therapist-intro.mp4
                - Or add to src/assets/ and import it (see commented import at top of file).

                Update the src below to point to your video.
              */}
              <video
                className="absolute inset-0 w-full h-full object-cover"
                controls
                playsInline
                preload="metadata"
              >
                <source src={therapistIntroVideo} type="video/mp4" />
                Your browser does not support the video tag. 
                Update the therapistIntroVideo path (or import from assets) when ready.
              </video>
            </div>
          </div>
        </div>

        {/* Subtle scroll prompt */}
        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center text-white/40 text-xs tracking-[2px]">
          SCROLL TO BEGIN
          <div className="h-px w-6 bg-white/20 my-1.5" />
        </div>
      </section>

      {/* OUR STORY / PHILOSOPHY */}
      <section className="w-[94%] max-w-[1600px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid lg:grid-cols-12 gap-x-8 lg:gap-x-10 items-stretch">
          {/* Left: Image — 1/3 width, clean rectangular holder */}
          <div className="lg:col-span-4">
            <div className="relative h-full min-h-[380px] lg:min-h-[420px] rounded-3xl overflow-hidden shadow-premium ring-1 ring-slate-100">
              <img
                src={ownerImage}
                alt="Dr. Niharika Kapoor, Founder & Clinical Director"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Subtle elegant overlay at bottom for depth */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent" />
            </div>
          </div>

          {/* Right: All content in a single rectangle — 2/3 width */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-8 lg:p-10 shadow-premium border border-slate-100 flex flex-col">
            <div>
              <div className="uppercase tracking-[3px] text-sm text-brand-blue-600 mb-2.5">OUR STORY</div>
              <h2 className="h2 mb-5">Healing begins when you feel safe enough to be honest.</h2>
            </div>

            <div className="text-[17px] leading-relaxed text-slate-600 space-y-4 flex-1">
              <p>
                Dr. Niharika Kapoor started The Vent Well after years working in large clinical settings where the system often felt colder than the pain people carried in. She wanted something different — a practice where the environment itself felt like an embrace, and where clinical rigor never came at the expense of warmth.
              </p>
              <p>
                Today we are a small, close-knit team of licensed therapists who believe that therapy should feel like coming home to yourself. We combine the best of evidence-based approaches with deep attunement, cultural humility, and a genuine belief in every client’s capacity for growth.
              </p>
            </div>

            <div className="mt-auto pt-5 border-t border-slate-100">
              <div className="font-medium text-brand-blue-900">Dr. Niharika Kapoor, Founder &amp; Clinical Director</div>

              {/* Social media handles for the therapist */}
              <div className="mt-2.5 flex items-center gap-3 text-sm">
                <span className="text-xs uppercase tracking-[2px] text-slate-400 mr-1">Follow</span>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-brand-blue-600 hover:text-brand-blue-700 transition-colors"
                  aria-label="Instagram"
                >
                  <img src={instagramLogo} alt="Instagram" className="w-6 h-6" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-brand-blue-600 hover:text-brand-blue-700 transition-colors"
                  aria-label="LinkedIn"
                >
                  <img src={linkedinLogo} alt="LinkedIn" className="w-6 h-6" />
                </a>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=1428+Maple+Grove+Ave+Portland+OR+97205" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-brand-blue-600 hover:text-brand-blue-700 transition-colors"
                  aria-label="Google Maps"
                >
                  <img src={mapsLogo} alt="Google Maps" className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy highlight block — reduced spacing */}
        <div className="mt-8 lg:mt-10 bg-gradient-to-br from-brand-blue-50 to-white border border-brand-blue-100 rounded-3xl p-8 lg:p-10 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-accent-warm-500 mb-2">
              <HeartHandshake className="w-8 h-8 mx-auto" />
            </div>
            <blockquote className="text-2xl lg:text-[26px] leading-tight tracking-[-0.6px] font-medium text-brand-blue-900">
              “We don’t fix people. We create the conditions where people remember how to heal themselves.”
            </blockquote>
            <div className="mt-4 text-sm tracking-wider text-brand-blue-600">— Dr. Niharika Kapoor, FOUNDER</div>
          </div>
        </div>
      </section>

      {/* VISITING THE VENT WELL — WHAT TO EXPECT */}
      <section id="what-to-expect" className="section w-[94%] max-w-[1600px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-x-16 gap-y-10 items-center">
          {/* Left: Content */}
          <div>
            <div className="uppercase tracking-[3px] text-sm text-brand-blue-600 mb-3">YOUR FIRST STEPS WITH US</div>
            <h2 className="h2 mb-8">Visiting The Vent Well?<br />Here’s what to expect.</h2>

            <div className="space-y-8">
              <div>
                <div className="font-semibold text-xl tracking-tight text-brand-blue-900 mb-2">Detailed initial session (90 min)</div>
                <p className="text-slate-600 leading-relaxed">Your first appointment is intentionally unhurried. We take the time to understand your full story, current challenges, relationships, and what matters most to you, without rushing to solutions.</p>
              </div>

              <div>
                <div className="font-semibold text-xl tracking-tight text-brand-blue-900 mb-2">Accurate Diagnosis</div>
                <p className="text-slate-600 leading-relaxed">We look beyond surface symptoms. Through careful listening and thoughtful assessment, we develop a clear, accurate picture so any treatment we recommend is precise and effective.</p>
              </div>

              <div>
                <div className="font-semibold text-xl tracking-tight text-brand-blue-900 mb-2">Personalised Treatment Plan</div>
                <p className="text-slate-600 leading-relaxed">No two people are the same. Together we create a plan that respects your goals, pace, and life — blending proven therapeutic approaches with what feels authentic and sustainable for you.</p>
              </div>

              <div>
                <div className="font-semibold text-xl tracking-tight text-brand-blue-900 mb-2">Long-Term Support for Long-Term Relief</div>
                <p className="text-slate-600 leading-relaxed">Real, lasting change unfolds over time. We stay beside you through the process, celebrating progress, navigating setbacks, and adjusting support as you grow stronger and more resilient.</p>
              </div>
            </div>
          </div>

          {/* Right: Image from assets */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-premium ring-1 ring-slate-100">
              <img 
                src={visitingImage} 
                alt="Welcoming interior and calm space at The Vent Well therapy clinic" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION — Replacing previous Meet the Therapists section */}
      <section className="section section-alt">
        <div className="w-[94%] max-w-[1600px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="uppercase tracking-[3px] text-sm text-brand-blue-600 mb-3">COMMON QUESTIONS</div>
            <h2 className="h2">Frequently asked questions</h2>
            <p className="mt-3 text-slate-600">Everything you might want to know before reaching out.</p>
          </div>

          <div className="divide-y divide-slate-200 border-y border-slate-200 bg-white rounded-3xl overflow-hidden shadow-premium">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="group">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between px-8 py-6 text-left hover:bg-slate-50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-lg text-brand-blue-900 pr-8">{faq.q}</span>
                    <ChevronDown 
                      className={`w-5 h-5 text-brand-blue-600 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                    />
                  </button>

                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? 'max-h-56 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="px-8 pb-7 text-slate-600 leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center mt-8 text-sm text-slate-500">
            Still have questions? We’re happy to chat before you book.
          </p>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="section w-[94%] max-w-[1600px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="uppercase tracking-[3px] text-sm text-brand-blue-600 mb-3">WHAT GUIDES US</div>
          <h2 className="h2">Our core values</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((value, index) => {
            const Icon = value.icon;
            return (
              <div key={index} className="value-card group">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue-700/10 text-brand-blue-700 flex items-center justify-center mb-6 transition group-hover:bg-brand-blue-700 group-hover:text-white">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-xl tracking-tight text-brand-blue-900 mb-3">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-brand-blue-900 py-16 lg:py-20 text-white">
        <div className="w-[94%] max-w-[1100px] mx-auto px-6 text-center">
          <div className="uppercase tracking-[3px] text-xs mb-3 text-white/50">TAKE THE FIRST STEP</div>
          <h2 className="text-white text-4xl lg:text-5xl tracking-[-1.6px] font-semibold leading-tight">
            Ready to feel better?<br />Let’s talk.
          </h2>
          <p className="mt-5 text-xl text-white/75 max-w-md mx-auto">
            Every journey starts with a conversation. Schedule a free 20-minute consultation — no pressure, just clarity.
          </p>

          <div className="mt-9">
            <Link 
              to="/contact" 
              className="btn btn-warm text-lg px-10 py-4 inline-flex mx-auto"
            >
              Schedule Your Free Consultation
              <ArrowRight />
            </Link>
          </div>
          <p className="text-xs text-white/50 mt-4 tracking-wide">CONFIDENTIAL • NO COMMITMENT REQUIRED</p>
        </div>
      </section>
    </div>
  );
};

export default About;
