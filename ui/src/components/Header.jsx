import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  BookOpen,
  Calendar,
  ChevronDown,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/main_logo.png";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Workshops & Events", to: "/workshops" },
  { label: "Corporate & Institutional", to: "/corporate" },
  { label: "About", to: "/about" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const { user, logout, isInitializing, openAuthModal } = useAuth();
  const accountPath = user?.role === "admin" ? "/dashboard" : "/bookings";
  const accountLabel = user?.role === "admin" ? "Dashboard" : "My bookings";
  const AccountIcon = user?.role === "admin" ? LayoutDashboard : BookOpen;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const onKeyDown = (event) =>
      event.key === "Escape" &&
      (setIsMobileMenuOpen(false), setIsUserMenuOpen(false));
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);
  useEffect(() => {
    const onPointerDown = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target))
        setIsUserMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const handleLogin = () => {
    closeMobileMenu();
    setIsUserMenuOpen(false);
    openAuthModal();
  };
  const handleLogout = () => {
    closeMobileMenu();
    setIsUserMenuOpen(false);
    logout();
  };
  const mobileMenu = createPortal(
    <>
      <button
        type="button"
        onClick={closeMobileMenu}
        aria-label="Close menu"
        className={`xl:hidden fixed inset-0 z-[200] bg-slate-950/60 transition-opacity duration-300 ${isMobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <aside
        aria-label="Mobile navigation"
        className={`xl:hidden fixed inset-y-0 right-0 z-[210] flex w-[min(88vw,380px)] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="bg-brand-blue-900 px-6 pb-7 pt-6 text-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[.18em] text-white/60">
              Navigation
            </span>
            <button
              onClick={closeMobileMenu}
              className="rounded-xl bg-white/10 p-2 transition hover:bg-white/20"
              aria-label="Close menu"
            >
              <X size={21} />
            </button>
          </div>
          <p className="mt-6 text-xl font-semibold">
            {user
              ? `Hello, ${user.name.split(" ")[0]}`
              : "Welcome to The Vent Well"}
          </p>
          <p className="mt-1 text-sm text-white/65">
            {user
              ? "Your account and care, in one place."
              : "Compassionate care, whenever you are ready."}
          </p>
        </div>
        <nav className="flex flex-col gap-1 px-4 py-5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3.5 text-[16px] font-medium transition-colors ${isActive ? "bg-brand-blue-50 text-brand-blue-700" : "text-slate-700 hover:bg-slate-50"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mx-5 border-t border-slate-100" />
        <div className="px-5 py-5">
          {isInitializing ? (
            <div className="h-12 animate-pulse rounded-xl bg-slate-100" />
          ) : user ? (
            <div className="space-y-2">
              <Link
                to={accountPath}
                onClick={closeMobileMenu}
                className="flex items-center gap-3 rounded-xl bg-brand-blue-50 px-4 py-3.5 text-[16px] font-semibold text-brand-blue-700"
              >
                <AccountIcon size={20} /> {accountLabel}
              </Link>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[16px] font-medium text-slate-600 hover:bg-slate-50"
              >
                <LogOut size={20} /> Log out
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="btn btn-blue btn-secondary w-full rounded-xl py-3.5"
            >
              <LogIn size={20} /> Log in or sign up
            </button>
          )}
        </div>
        <div className="px-5 pb-6">
          <Link
            to="/contact"
            onClick={closeMobileMenu}
            className="btn btn-warm w-full rounded-xl py-3.5"
          >
            <Calendar size={20} /> Book an appointment
          </Link>
        </div>
      </aside>
    </>,
    document.body,
  );

  return (
    <>
      <header
        className={`header fixed inset-x-0 top-0 z-[100] border-b bg-white/95 backdrop-blur-xl transition-all duration-300 ${isScrolled ? "scrolled border-slate-200" : "border-transparent"}`}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? "py-3" : "py-4 lg:py-5"}`}
          >
            <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
              <img
                src={logo}
                alt="The Vent Well"
                className="h-11 w-11 shrink-0 object-contain sm:h-12 sm:w-12 lg:h-16 lg:w-16"
              />
              <div className="min-w-0">
                <span className="block truncate text-xl font-semibold tracking-[-.8px] text-brand-blue-900 sm:text-2xl">
                  The Vent Well
                </span>
                <span className="block truncate text-[10px] uppercase tracking-[.18em] text-brand-blue-600 sm:text-xs">
                  Therapy &amp; Wellbeing
                </span>
              </div>
            </Link>
            <nav className="hidden xl:flex items-center gap-6 text-sm">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `nav-link pb-1 ${isActive ? "active text-brand-blue-700" : ""}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="hidden xl:flex items-center gap-3">
              <Link to="/contact" className="btn btn-warm px-5 py-2.5 text-sm">
                <Calendar size={16} /> Book appointment
              </Link>
              {isInitializing ? (
                <div className="h-10 w-24 animate-pulse rounded-xl bg-slate-100" />
              ) : user ? (
                <div ref={userMenuRef} className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen((value) => !value)}
                    className="btn btn-blue px-4 py-2.5 text-sm"
                  >
                    Hey {user.name}
                    <ChevronDown
                      size={16}
                      className={
                        isUserMenuOpen
                          ? "rotate-180 transition-transform"
                          : "transition-transform"
                      }
                    />
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl border border-slate-100 bg-white py-1.5 shadow-lg">
                      <Link
                        to={accountPath}
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        <AccountIcon size={16} /> {accountLabel}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        <LogOut size={16} /> Log out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="btn btn-blue btn-secondary px-5 py-2.5 text-sm"
                >
                  <LogIn size={16} /> Sign in
                </button>
              )}
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="rounded-xl p-2.5 text-slate-700 transition hover:bg-brand-blue-50 hover:text-brand-blue-700 xl:hidden"
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>
      {mobileMenu}
    </>
  );
};

export default Header;
