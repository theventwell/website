import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Calendar, ChevronDown, LogIn, LogOut, BookOpen, LayoutDashboard } from 'lucide-react';
import logo from '../assets/main_logo.png';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { user, logout, isInitializing, openAuthModal } = useAuth();

  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close user dropdown on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsUserMenuOpen(false);
    };

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isUserMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogin = () => {
    openAuthModal();
    setIsUserMenuOpen(false);
    closeMobileMenu();
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    closeMobileMenu();
  };

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Services', to: '/services' },
    { label: 'Workshops & Events', to: '/workshops' },
    { label: 'Corporate & Institutional', to: '/corporate' },
    { label: 'About', to: '/about' },
  ];

  const activeClass = 'text-brand-blue-700 font-semibold';
  const inactiveClass = 'text-slate-700 hover:text-brand-blue-700';

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
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center group"
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
                Therapy &amp; Wellbeing
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
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

          {/* Desktop CTAs + Auth */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/contact"
              className="btn btn-warm text-base px-6 py-2.5 shadow-premium hover:shadow-float active:scale-[0.985] transition-all"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment
            </Link>

            {isInitializing ? (
              <div className="w-[108px] h-11 rounded-xl bg-slate-100 animate-pulse" aria-hidden="true" />
            ) : user ? (
              /* Logged-in: greeting + dropdown */
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  className="btn btn-blue flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl  transition-colors text-base font-medium"
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="true"
                >
                  <span>Hey {user.name}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isUserMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-50 overflow-hidden">
                    <Link
                      to={user.role === 'admin' ? '/dashboard' : '/bookings'}
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-blue-700 transition-colors"
                    >
                      {user.role === 'admin' ? <LayoutDashboard className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                      {user.role === 'admin' ? 'Dashboard' : 'My bookings'}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-blue-700 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Logged-out: Login button */
              <button
                onClick={handleLogin}
                className="btn btn-secondary text-base px-6 py-2.5 flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 -mr-2 text-slate-700 hover:text-brand-blue-700 transition-colors rounded-xl"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden fixed inset-0 z-[60] bg-slate-950/55 transition-opacity duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      <div
        className={`md:hidden fixed inset-y-0 right-0 z-[70] flex w-[min(88vw,380px)] flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ease-out will-change-transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="bg-brand-blue-900 px-6 pb-7 pt-6 text-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Navigation</span>
            <button
              onClick={closeMobileMenu}
              className="rounded-xl bg-white/10 p-2 text-white transition hover:bg-white/20"
              aria-label="Close menu"
            >
              <X size={21} />
            </button>
          </div>
          <p className="mt-6 text-xl font-semibold">{user ? `Hello, ${user.name.split(' ')[0]}` : 'Welcome to The Vent Well'}</p>
          <p className="mt-1 text-sm text-white/65">{user ? 'Your account and care, in one place.' : 'Compassionate care, whenever you are ready.'}</p>
        </div>

        <nav className="flex flex-col gap-1 px-4 py-5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeMobileMenu}
              className={({ isActive }) => `rounded-xl px-4 py-3.5 text-[16px] font-medium transition-colors ${isActive ? 'bg-brand-blue-50 text-brand-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mx-5 border-t border-slate-100" />
        <div className="px-5 py-5">
          {isInitializing ? (
            <div className="h-12 rounded-xl bg-slate-100 animate-pulse" aria-hidden="true" />
          ) : user ? (
            <div className="space-y-2">
              <Link
                to={user.role === 'admin' ? '/dashboard' : '/bookings'}
                onClick={closeMobileMenu}
                className="flex items-center gap-3 rounded-xl bg-brand-blue-50 px-4 py-3.5 text-[16px] font-semibold text-brand-blue-700"
              >
                {user.role === 'admin' ? <LayoutDashboard className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                {user.role === 'admin' ? 'Open dashboard' : 'My bookings'}
              </Link>
              <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[16px] font-medium text-slate-600 transition hover:bg-slate-50 hover:text-brand-blue-700">
                <LogOut className="w-5 h-5" /> Log out
              </button>
            </div>
          ) : (
            <button onClick={handleLogin} className="btn btn-secondary w-full rounded-xl py-3.5 text-base"><LogIn className="w-5 h-5" /> Log in or sign up</button>
          )}
        </div>

        <div className="mt-auto px-5 pb-6">
          <Link to="/contact" onClick={closeMobileMenu} className="btn btn-warm w-full rounded-xl py-3.5 text-base shadow-premium">
            <Calendar className="w-5 h-5" /> Book an appointment
          </Link>
        </div>
      </div>
      {/* Mobile drawer content above. */}
      <div className="hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <span className="text-sm font-medium tracking-wide text-slate-500 uppercase">
            Menu
          </span>
          <button
            onClick={closeMobileMenu}
            className="p-2 -mr-2 text-slate-600 hover:text-brand-blue-700 rounded-xl transition-colors"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-4 pt-4 pb-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `px-4 py-3.5 rounded-xl text-[17px] transition-colors ${
                  isActive
                    ? 'bg-brand-blue-50 text-brand-blue-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Auth section (mobile) */}
        <div className="px-6 pt-2 pb-6 border-t border-slate-100 mt-2">
          {isInitializing ? (
            <div className="h-12 rounded-xl bg-slate-100 animate-pulse mb-3" aria-hidden="true" />
          ) : user ? (
            <div className="space-y-1">
              <p className="px-1 py-2 text-sm font-medium text-slate-500">
                Hi {user.name}
              </p>
              <Link
                to={user.role === 'admin' ? '/dashboard' : '/bookings'}
                onClick={closeMobileMenu}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-[16px] text-slate-700 hover:bg-slate-50"
              >
                {user.role === 'admin' ? <LayoutDashboard className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                {user.role === 'admin' ? 'Dashboard' : 'My bookings'}
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-[16px] text-slate-700 hover:bg-slate-50"
              >
                <LogOut className="w-4 h-4" />
                Log out
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="btn btn-secondary w-full justify-center py-3.5 text-base mb-3"
            >
              <LogIn className="w-4 h-4" />
              Login
            </button>
          )}

          <Link
            to="/contact"
            onClick={closeMobileMenu}
            className="btn btn-warm w-full justify-center py-3.5 text-base shadow-premium mt-2"
          >
            <Calendar className="w-4 h-4" />
            Book Appointment
          </Link>
        </div>

        {/* Footer note */}
        <div className="absolute bottom-8 left-6 right-6 text-center">
          <p className="text-sm text-slate-400 tracking-wide">
            Compassionate care • Since 2018
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
