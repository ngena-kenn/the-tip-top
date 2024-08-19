import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const fetchUserProfile = createAsyncThunk('profile/fetchUserProfile', async (_, thunkAPI) => {
  try {
    const userId = localStorage.getItem('inputValue');
    const response = await axios.get(`${process.env.REACT_APP_API}/api/customer/participate/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    userProfile: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.userProfile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
