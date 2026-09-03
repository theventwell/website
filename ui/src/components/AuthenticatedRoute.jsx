import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthenticatedRoute = ({ children }) => {
  const { user, isInitializing } = useAuth();
  if (isInitializing) return <div className="min-h-[60vh] grid place-items-center text-slate-500">Loading your account…</div>;
  return user ? children : <Navigate to="/contact" replace />;
};

export default AuthenticatedRoute;
