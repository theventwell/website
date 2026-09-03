import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, isInitializing } = useAuth();
  if (isInitializing) return <div className="min-h-[60vh] grid place-items-center text-slate-500">Loading your account…</div>;
  return user?.role === 'admin' ? children : <Navigate to="/" replace />;
};

export default AdminRoute;
