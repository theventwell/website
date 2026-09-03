import { createSlice } from '@reduxjs/toolkit';
import { createBooking, loginUser, logoutUser, restoreSession, signupUser } from './authThunks';

const initialState = {
  user: null,
  bookings: [],
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(restoreSession.pending, (state) => {
        state.status = 'initializing';
        state.error = null;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.bookings = action.payload.bookings || [];
        state.error = null;
      })
      .addCase(restoreSession.rejected, (state) => {
        state.status = 'idle';
        state.user = null;
        state.bookings = [];
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.bookings = action.payload.bookings || [];
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unable to log in';
      })
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.bookings = [];
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unable to create your account';
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.bookings.unshift(action.payload);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.bookings = [];
        state.status = 'idle';
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.user = null;
        state.bookings = [];
        state.status = 'idle';
        state.error = null;
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
