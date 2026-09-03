import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError } from '../store/authSlice';
import { createBooking, loginUser, logoutUser, restoreSession, signupUser } from '../store/authThunks';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, bookings, status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  const login = useCallback(
    (payload) => dispatch(loginUser(payload)).unwrap(),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(logoutUser()), [dispatch]);
  const signup = useCallback((payload) => dispatch(signupUser(payload)).unwrap(), [dispatch]);
  const bookAppointment = useCallback((payload) => dispatch(createBooking(payload)).unwrap(), [dispatch]);
  const clearError = useCallback(() => dispatch(clearAuthError()), [dispatch]);

  const value = useMemo(
    () => ({
      user,
      bookings,
      status,
      error,
      isAuthenticated: Boolean(user),
      isInitializing: status === 'initializing',
      isLoading: status === 'loading',
      login,
      signup,
      bookAppointment,
      logout,
      clearError,
      isAuthModalOpen,
      openAuthModal: () => setIsAuthModalOpen(true),
      closeAuthModal: () => setIsAuthModalOpen(false),
    }),
    [
      bookings,
      clearError,
      error,
      logout,
      status,
      user,
      login,
      signup,
      bookAppointment,
      isAuthModalOpen,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
