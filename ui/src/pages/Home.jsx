import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Star, ChevronLeft, ChevronRight, Shield, Heart, Video, BadgeCheck } from 'lucide-react';

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

  // Replace these with your actual therapy-space photos
  const spaceImages = [
    {
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      alt: "Calm therapy room with natural light",
    },
    {
      src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
      alt: "Soft, inviting counseling space",
    },
    {
      src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
      alt: "Modern, peaceful therapy environment",
    },
    {
      src: "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?auto=format&fit=crop&w=1200&q=80",
      alt: "Warm and grounded session room",
    },
  ];

  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % spaceImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + spaceImages.length) % spaceImages.length);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[78vh] lg:min-h-[82vh] flex items-center bg-gradient-to-b from-brand-blue-50 via-white to-white">
        <div className="w-[94%] max-w-[1600px] mx-auto px-6 lg:px-8 pt-8 pb-12 lg:pb-14">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-premium border border-brand-blue-100 text-sm text-brand-blue-700 tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-warm-500 animate-pulse" /> NOW ACCEPTING NEW CLIENTS
            </div>

            <h1 className="h1 mb-5 pr-4">
              Mental health care<br />that actually feels human.
            </h1>
            <p className="lead max-w-2xl text-slate-600">
              The Vent Well is a modern therapy practice in Portland offering compassionate, 
              highly skilled care for individuals, couples, and families.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/contact" className="btn btn-primary text-base px-9 py-3.5">
                Begin Your Journey <ArrowRight />
              </Link>
              <Link to="/about" className="btn btn-secondary text-base px-8 py-3.5">
                Learn About Us
              </Link>
            </div>
            <div className="mt-5 text-xs text-slate-500 flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-blue-600" /> 15-minute free consultations available
            </div>
          </div>
        </div>

        <div className="hidden xl:block absolute right-0 top-1/2 -translate-y-1/2 w-[42%] h-[68%] bg-gradient-to-l from-brand-blue-900/5 to-transparent rounded-l-[5rem]" />
      </section>

      {/* Brand Philosophy — tighter & more grounded */}
      <section className="py-14 lg:py-16 w-[94%] max-w-[1600px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Image Carousel */}
          <div className="relative order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-100 aspect-[4/3] shadow-premium border border-slate-100/80">
              {spaceImages.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                    index === currentImage ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

              <button
                onClick={prevImage}
                aria-label="Previous photo"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm shadow-md border border-slate-100 flex items-center justify-center text-slate-700 hover:bg-white hover:text-brand-blue-700 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                aria-label="Next photo"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm shadow-md border border-slate-100 flex items-center justify-center text-slate-700 hover:bg-white hover:text-brand-blue-700 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
                {spaceImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    aria-label={`Go to photo ${index + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      index === currentImage
                        ? "bg-white w-5"
                        : "bg-white/55 w-1.5 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="mt-3.5 text-sm text-slate-500 text-center tracking-wide">
              Our spaces — designed for calm, safety, and real conversation
            </p>
          </div>

          {/* Right: Brand Philosophy Text */}
          <div className="order-1 lg:order-2">
            <div className="text-brand-blue-600 tracking-[2.5px] uppercase text-sm mb-2.5">
              OUR PHILOSOPHY
            </div>
            <h2 className="h2 mb-5">
              Care that feels like a real conversation — not a clinical appointment.
            </h2>
            <div className="space-y-4 text-[16.5px] leading-relaxed text-slate-600">
              <p>
                At The Vent Well, we believe therapy works best when it feels human. 
                Our approach is grounded in evidence-based methods, yet never rigid or 
                distant. We create spaces — both physical and relational — where you 
                can show up exactly as you are.
              </p>
              <p>
                Every detail of our practice is intentional: the warmth of the rooms, 
                the way we listen, the pace we keep. We don’t rush insight or force 
                progress. Instead, we walk alongside you with skill, presence, and 
                deep respect for your story.
              </p>
              <p>
                Whether you’re navigating anxiety, relationship strain, burnout, or 
                simply wanting to understand yourself more fully, our work is the same: 
                thoughtful, collaborative, and genuinely caring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar — more substantial */}
      <div className="border-y border-slate-100 bg-slate-50/60 py-6">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center items-center gap-x-10 gap-y-4 text-sm text-slate-600">
          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-brand-blue-600" />
            <span className="tracking-wide">100% Confidential</span>
          </div>
          <div className="flex items-center gap-2.5">
            <BadgeCheck className="w-4 h-4 text-brand-blue-600" />
            <span className="tracking-wide">Licensed & Board-Certified</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Heart className="w-4 h-4 text-brand-blue-600" />
            <span className="tracking-wide">Insurance & Private Pay</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Video className="w-4 h-4 text-brand-blue-600" />
            <span className="tracking-wide">In-Person + Telehealth</span>
          </div>
        </div>
      </div>

      {/* Value props */}
      <section className="py-14 lg:py-16 w-[94%] max-w-[1600px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-9">
          <div className="text-brand-blue-600 tracking-[2.5px] uppercase text-sm mb-2.5">WHY PEOPLE CHOOSE US</div>
          <h2 className="h2">Therapy that meets you where you are.</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-3.5">
          {highlights.map((text, i) => (
            <div key={i} className="flex gap-4 bg-white border border-slate-100 p-6 rounded-2xl items-start hover:border-brand-blue-100 transition-colors">
              <div className="mt-0.5 text-accent-warm-500 shrink-0">
                <Check className="w-5 h-5" />
              </div>
              <p className="text-[16.5px] leading-snug text-slate-700">{text}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-9">
          <Link to="/services" className="btn btn-ghost text-base">
            Explore all our services <ArrowRight className="inline" />
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 lg:py-16 bg-slate-50/50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <div className="text-brand-blue-600 tracking-widest text-sm mb-1.5">REAL VOICES</div>
              <h2 className="h2">Stories from our community</h2>
            </div>
            <Link to="/about" className="hidden md:flex items-center text-brand-blue-700 text-sm font-medium hover:text-brand-blue-800">
              Read more stories <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, index) => (
              <div key={index} className="card flex flex-col bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <div className="flex gap-1 text-accent-warm-500 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                </div>
                <blockquote className="text-[15px] leading-snug text-slate-700 flex-1">
                  “{t.quote}”
                </blockquote>
                <div className="pt-5 mt-auto border-t border-slate-100">
                  <div className="font-medium text-[15px]">{t.name}</div>
                  <div className="text-sm text-slate-500 mt-0.5">{t.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — more compact & intentional */}
      <section className="w-[94%] max-w-[900px] mx-auto px-6 py-16 lg:py-20 text-center">
        <h2 className="h2">Your story deserves to be heard.</h2>
        <p className="mt-3.5 text-lg text-slate-600 max-w-md mx-auto leading-relaxed">
          Take the first step toward feeling better. We’re here when you’re ready.
        </p>
        
        <Link to="/contact" className="btn btn-primary mt-7 px-9 py-3.5 text-base inline-flex">
          Book Your Free Consultation
        </Link>
        <p className="text-xs mt-3.5 text-slate-500">No obligation. Just a conversation.</p>
      </section>
    </div>
  );
};

export default Home;
