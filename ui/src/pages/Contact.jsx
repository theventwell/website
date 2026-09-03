import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
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

    // Simulate API call / form processing
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // In a real app this would POST to backend
      console.log('Form submitted:', formData);
    }, 850);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  return (
    <div className="pt-16 lg:pt-20">
      {/* Header */}
      <section className="bg-brand-blue-900 text-white py-14 lg:py-20">
        <div className="w-[94%] max-w-[1600px] mx-auto px-6 lg:px-8 text-center">
          <div className="uppercase tracking-[2.5px] text-xs mb-4 text-white/50">WE’RE HERE FOR YOU</div>
          <h1 className="text-5xl lg:text-6xl font-semibold tracking-[-2.2px] text-accent-warm-500">Let’s start a conversation.</h1>
          <p className="mt-4 max-w-lg mx-auto text-xl text-white/75">
            Fill out the form or reach out directly. We typically respond within one business day.
          </p>
        </div>
      </section>

      <section className="w-[94%] max-w-[1600px] mx-auto px-6 lg:px-8 py-14 lg:py-16 grid lg:grid-cols-5 gap-x-12 gap-y-12">
        {/* Contact Form */}
        <div className="lg:col-span-3">
          {!submitted ? (
            <>
              <h2 className="text-3xl tracking-tight font-semibold text-brand-blue-900 mb-2">Book an appointment with us</h2>
              <p className="text-slate-600 mb-8">Take a step towards being your best self. Tell us a little about what brings you in. All information is confidential.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Alex Rivera"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="(503) 555-0188"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1.5">Interested In</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="form-input"
                      required
                    >
                      <option value="">Select service...</option>
                      <option value="Individual Therapy">Individual Therapy</option>
                      <option value="Couples Therapy">Couples Therapy</option>
                      <option value="Family Therapy">Family Therapy</option>
                      <option value="EMDR / Trauma">EMDR / Trauma</option>
                      <option value="Executive Coaching">Executive Coaching</option>
                      <option value="Not sure yet">Not sure yet — just exploring</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">How can we support you?</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="form-input resize-y min-h-[120px]"
                    placeholder="I’ve been struggling with anxiety around work and would love to talk to someone who understands high-pressure careers..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full sm:w-auto px-10 py-3.5 text-base mt-2 disabled:opacity-70"
                >
                  {isSubmitting ? 'Booking your appointment...' : 'Book an appointment'}
                </button>
                <p className="text-xs text-slate-500">We respect your privacy. This information will only be seen by our intake team.</p>
              </form>
            </>
          ) : (
            <div className="card py-12 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-accent-warm-100 flex items-center justify-center mb-6">
                <div className="text-accent-warm-500 text-4xl">✓</div>
              </div>
              <h3 className="text-3xl tracking-tight font-semibold text-brand-blue-900">Thank you. We’ve received your message.</h3>
              <p className="mt-3 text-lg text-slate-600 max-w-sm mx-auto">
                A member of our team will reach out within 1 business day to schedule your free consultation.
              </p>
              <button onClick={resetForm} className="mt-8 btn btn-secondary">
                Send another message
              </button>
            </div>
          )}
        </div>

        {/* Contact Details Sidebar */}
        <div className="lg:col-span-2 pt-2">
          <div className="bg-white rounded-3xl border border-slate-100 p-8 lg:sticky lg:top-24">
            <div className="uppercase text-xs tracking-[2.5px] text-brand-blue-600 mb-6">DIRECT CONTACT</div>

            <div className="space-y-7 text-[15px]">
              <div className="flex gap-4">
                <Phone className="mt-0.5 flex-shrink-0 text-brand-blue-700 w-5 h-5" />
                <div>
                  <div className="font-medium text-brand-blue-900">Call or Text</div>
                  <a href="tel:+15035550142" className="text-brand-blue-700 hover:underline">(503) 555-0142</a>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="mt-0.5 flex-shrink-0 text-brand-blue-700 w-5 h-5" />
                <div>
                  <div className="font-medium text-brand-blue-900">Email Us</div>
                  <a href="mailto:hello@theventwell.com" className="text-brand-blue-700 hover:underline">hello@theventwell.com</a>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="mt-0.5 flex-shrink-0 text-brand-blue-700 w-5 h-5" />
                <div>
                  <div className="font-medium text-brand-blue-900">Our Space</div>
                  <div className="text-slate-600">1428 Maple Grove Ave<br />Portland, OR 97205</div>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-sm text-brand-blue-700 hover:underline">Get directions →</a>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock className="mt-0.5 flex-shrink-0 text-brand-blue-700 w-5 h-5" />
                <div>
                  <div className="font-medium text-brand-blue-900">Hours</div>
                  <div className="text-slate-600 text-[15px]">
                    Monday–Friday: 8:00am – 7:00pm<br />
                    Saturday: By appointment<br />
                    Sunday: Closed
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-9 pt-7 border-t border-slate-100 text-xs leading-relaxed text-slate-500">
              In crisis? Please call or text the 988 Suicide &amp; Crisis Lifeline (US) or visit your nearest emergency room. We also maintain a list of immediate resources on our site.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
