import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Calendar } from 'lucide-react';
import logo from '../assets/main_logo.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change (simple approach)
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Services', to: '/services' },
    { label: 'Workshops & Events', to: '/workshops' },
    { label: 'Corporate & Institutional', to: '/corporate' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  const activeClass = "text-brand-blue-700 font-semibold";
  const inactiveClass = "text-slate-700 hover:text-brand-blue-700";

  return (
    <header
      className={`header fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-transparent transition-all duration-300 ${
        isScrolled ? 'scrolled' : ''
      }`}
    >
      <div className="w-[94%] max-w-[1600px] mx-auto px-6 lg:px-8">
        <div
          className={`header-inner flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'py-3.5' : 'py-5'
          }`}
        >
          {/* Logo - main logo, large and without background */}
          <Link
            to="/"
            className="flex items-center  group"
            onClick={closeMobileMenu}
          >
            <img 
              src={logo} 
              alt="The Vent Well" 
              className="w-12 h-12 lg:w-20 lg:h-20 object-contain transition-transform group-hover:scale-[1.03]" 
            />
            <div className="flex flex-col leading-none -mt-0.5">
              <span className="font-semibold text-2xl lg:text-3xl tracking-[-1.2px] text-brand-blue-900">
                The Vent Well
              </span>
              <span className="text-xs lg:text-sm uppercase tracking-[2.5px] text-brand-blue-600">
                Therapy &amp; Wellbeing • Est. 2018
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - significantly larger on big screens */}
          <nav className="hidden md:flex items-center gap-8 text-base lg:text-lg">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `nav-link pb-1 ${isActive ? activeClass : inactiveClass}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA - heavily emphasized as primary goal */}
          <div className="hidden md:block">
            <Link
              to="/contact"
              className="btn btn-warm text-base px-7 py-3 shadow-premium hover:shadow-float active:scale-[0.985] transition-all"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 -mr-2 text-slate-700 hover:text-brand-blue-700 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-nav md:hidden">
          <nav className="flex flex-col gap-1 text-lg">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `px-5 py-4 rounded-2xl transition-colors ${
                    isActive
                      ? 'bg-brand-blue-50 text-brand-blue-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="pt-4 mt-4 border-t border-slate-200">
              <Link
                to="/contact"
                onClick={closeMobileMenu}
                className="btn btn-warm w-full justify-center py-4 text-base"
              >
                <Calendar className="w-4 h-4" />
                Book Appointment
              </Link>
            </div>
          </nav>

          <div className="absolute bottom-10 left-6 right-6 text-center text-sm text-slate-500">
            Compassionate care • Since 2018
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
