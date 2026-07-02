import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

import instagramLogo from '../assets/instagram_logo.png';
import linkedinLogo from '../assets/linkedin_logo.png';
import mapsLogo from '../assets/maps_logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'About Us', to: '/about' },
    { label: 'Our Services', to: '/services' },
    { label: 'Meet the Team', to: '/about#team' },
    { label: 'Contact', to: '/contact' },
  ];

  const resources = [
    { label: 'Crisis Support', href: 'https://www.iasp.info/suicidalthoughts/' },
    { label: 'Blog & Insights', to: '/services' }, // placeholder
    { label: 'FAQs', to: '/contact' },
    { label: 'Privacy & Confidentiality', to: '/contact' },
  ];

  return (
    <footer className="bg-brand-blue-900 text-white/90">
      <div className="w-[94%] max-w-[1600px] mx-auto px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-14">
          {/* Brand + Mission */}
          <div className="lg:col-span-5">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-9 h-9 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
                <span className="text-white text-[21px] font-semibold tracking-[-1.5px]">V</span>
              </div>
              <span className="font-semibold text-2xl tracking-[-1px] text-white">
                The Vent Well
              </span>
            </Link>
            <p className="max-w-md text-[15px] leading-relaxed text-white/70 pr-4">
              A modern sanctuary for mental health and personal growth. 
              We offer compassionate, evidence-based therapy in a space designed for healing and honest connection.
            </p>

            <div className="flex gap-4 mt-8">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors" aria-label="Instagram">
                <img src={instagramLogo} alt="Instagram" className="w-[22px] h-[22px]" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors" aria-label="LinkedIn">
                <img src={linkedinLogo} alt="LinkedIn" className="w-[22px] h-[22px]" />
              </a>
              <a href="https://www.google.com/maps/search/?api=1&query=1428+Maple+Grove+Ave+Portland+OR+97205" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors" aria-label="Google Maps">
                <img src={mapsLogo} alt="Google Maps" className="w-[22px] h-[22px]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 md:col-span-1">
            <div className="font-semibold text-white tracking-wider text-sm mb-5">EXPLORE</div>
            <ul className="space-y-3 text-[15px]">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="hover:text-white transition-colors text-white/80">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2 md:col-span-1">
            <div className="font-semibold text-white tracking-wider text-sm mb-5">RESOURCES</div>
            <ul className="space-y-3 text-[15px]">
              {resources.map((item, idx) => (
                <li key={idx}>
                  {item.to ? (
                    <Link to={item.to} className="hover:text-white transition-colors text-white/80">
                      {item.label}
                    </Link>
                  ) : (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-white/80">
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 md:col-span-2">
            <div className="font-semibold text-white tracking-wider text-sm mb-5">GET IN TOUCH</div>
            <ul className="space-y-4 text-[15px]">
              <li className="flex gap-3 text-white/80">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-brand-blue-400" />
                <span>
                  1428 Maple Grove Ave<br />
                  Portland, OR 97205
                </span>
              </li>
              <li>
                <a href="tel:+15035550142" className="flex gap-3 items-center text-white/80 hover:text-white transition-colors">
                  <Phone className="w-5 h-5 flex-shrink-0 text-brand-blue-400" />
                  (503) 555-0142
                </a>
              </li>
              <li>
                <a href="mailto:hello@theventwell.com" className="flex gap-3 items-center text-white/80 hover:text-white transition-colors">
                  <Mail className="w-5 h-5 flex-shrink-0 text-brand-blue-400" />
                  hello@theventwell.com
                </a>
              </li>
            </ul>

            <div className="mt-8 text-xs uppercase tracking-widest text-white/40">
              Mon–Fri 8am–7pm • Sat by appt
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-y-3 text-sm text-white/50">
          <div>
            © {currentYear} The Vent Well. All rights reserved. A safe place to be heard.
          </div>
          <div className="flex gap-x-6">
            <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/70 transition-colors">Terms</a>
            <a href="#" className="hover:text-white/70 transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
