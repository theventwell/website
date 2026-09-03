import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginModal = ({ isOpen, onClose }) => {
  const { login, signup, status, error, clearError, isAuthenticated } = useAuth();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', phoneNumber: '', email: '', password: '' });
  const isLoading = status === 'loading';
  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  useEffect(() => { if (isAuthenticated) onClose(); }, [isAuthenticated, onClose]);
  useEffect(() => {
    if (!isOpen) { setForm({ name: '', phoneNumber: '', email: '', password: '' }); setMode('login'); clearError(); }
  }, [isOpen, clearError]);
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.style.overflow = ''; };
  }, [isOpen, onClose]);
  if (!isOpen) return null;

  const handleSubmit = async (event) => {
    event.preventDefault(); clearError();
    try {
      if (mode === 'login') await login({ email: form.email.trim(), password: form.password });
      else await signup({ ...form, name: form.name.trim(), email: form.email.trim(), phoneNumber: form.phoneNumber.trim() });
    } catch { /* The API error is shown below. */ }
  };
  const switchMode = () => { setMode((value) => value === 'login' ? 'signup' : 'login'); clearError(); };

  return createPortal(
    <div className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto p-4" role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <button type="button" className="absolute inset-0 cursor-default bg-slate-900/45 backdrop-blur-sm" aria-label="Close authentication" onClick={onClose} />
      <div className="relative z-10 my-auto w-full max-w-md rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl sm:p-8">
        <button type="button" onClick={onClose} className="absolute right-4 top-4 rounded-xl p-2 text-slate-500 hover:text-brand-blue-700" aria-label="Close"><X size={20} /></button>
        <h2 id="auth-title" className="pr-8 text-2xl font-semibold tracking-tight text-brand-blue-900">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
        <p className="mt-2 text-sm text-slate-600">{mode === 'login' ? 'Log in with your email address and password.' : 'Join The Vent Well to manage your appointments.'}</p>
        {error && <p className="mt-4 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {mode === 'signup' && <><div><label htmlFor="signup-name" className="mb-1.5 block text-sm font-medium text-slate-600">Full name</label><input id="signup-name" value={form.name} onChange={update('name')} className="form-input" autoComplete="name" required autoFocus /></div><div><label htmlFor="signup-phone" className="mb-1.5 block text-sm font-medium text-slate-600">Phone number</label><input id="signup-phone" type="tel" value={form.phoneNumber} onChange={update('phoneNumber')} className="form-input" autoComplete="tel" required /></div></>}
          <div><label htmlFor="auth-email" className="mb-1.5 block text-sm font-medium text-slate-600">Email address</label><input id="auth-email" type="email" value={form.email} onChange={update('email')} className="form-input" autoComplete="email" placeholder="you@example.com" required autoFocus={mode === 'login'} /></div>
          <div><label htmlFor="auth-password" className="mb-1.5 block text-sm font-medium text-slate-600">Password</label><input id="auth-password" type="password" value={form.password} onChange={update('password')} className="form-input" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} minLength={mode === 'signup' ? 8 : undefined} required /></div>
          <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>{isLoading ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Create account'}</button>
        </form>
        <p className="mt-5 text-center text-sm text-slate-600">{mode === 'login' ? 'New to The Vent Well?' : 'Already have an account?'} <button type="button" onClick={switchMode} className="font-semibold text-brand-blue-700 hover:text-brand-blue-900">{mode === 'login' ? 'Sign up' : 'Log in'}</button></p>
      </div>
    </div>, document.body
  );
};

export default LoginModal;
