import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiFetch } from '../api/client';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const result = await apiFetch('/api/users/login', {
        method: 'POST',
        body: { email, password },
      });
      return result.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Unable to log in');
    }
  }
);

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({ name, email, phoneNumber, password }, { rejectWithValue }) => {
    try {
      const result = await apiFetch('/api/users/signup', { method: 'POST', body: { name, email, phoneNumber, password } });
      return result.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Unable to create your account');
    }
  }
);

export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (_, { rejectWithValue }) => {
    try {
      const result = await apiFetch('/api/users/me', { method: 'GET' });
      return result.data;
    } catch (error) {
      return rejectWithValue(error.status === 401 ? null : error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await apiFetch('/api/users/logout', { method: 'POST' });
      return true;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to log out');
    }
  }
);
