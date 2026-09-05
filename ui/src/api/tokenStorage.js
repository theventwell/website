const TOKEN_STORAGE_KEY = 'theventwell.authToken';

export const getAuthToken = () => localStorage.getItem(TOKEN_STORAGE_KEY);

export const setAuthToken = (token) => {
  if (token) localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export const clearAuthToken = () => localStorage.removeItem(TOKEN_STORAGE_KEY);
