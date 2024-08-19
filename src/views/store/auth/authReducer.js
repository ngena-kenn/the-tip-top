import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';



const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
  token: localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    logoutSuccess: (state) => {
      localStorage.removeItem('token');
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const selectIsAdmin = (state) => {
  const token = state.auth.token;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken && decodedToken.roles && decodedToken.roles.includes('ROLE_ADMIN');
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
  return false; // If no token is available or it doesn't have the role
};


export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
