// src/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Invoke Foundry Token Thunk
export const invokeFoundryToken = createAsyncThunk(
  'user/invokeFoundryToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/InvokeFoundryToken/FoundryLogin`, {}, {
        headers: {
          'X-Voltmx-app-key': '5470b3dce94beb6641a05dbe4dabaa2d',
          'X-Voltmx-app-secret': '1faea998d8e7f435878eb4820dbde24',
          Accept: 'application/json',
        },
      });

      if (!response || response.status !== 200) {
        throw new Error('Failed to retrieve Foundry token.');
      }

      const { claims_token } = response.data;
      localStorage.setItem('voltmx-token', claims_token.value);

      return claims_token.value;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch Foundry token.');
    }
  }
);

export const login = createAsyncThunk('user/login', async (credentials, { rejectWithValue }) => {
  try {
    // Step 1: Customer Login
    const customerResponse = await axios.post(`${API_URL}/customerLogin/CustomerLogin`, credentials, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (!customerResponse || customerResponse.status !== 200) {
      throw new Error('Customer login failed. Please check your credentials.');
    }

    // Step 2: Invoke Foundry Token
    const foundryResponse = await axios.post(`${API_URL}/InvokeFoundryToken/FoundryLogin`, {}, {
      headers: {
        'X-Voltmx-app-key': '5470b3dce94beb6641a05dbe4dabaa2d',
        'X-Voltmx-app-secret': '1faea998d8e7f435878eb4820dbde24',
        Accept: 'application/json',
      },
    });

    if (!foundryResponse || foundryResponse.status !== 200) {
      throw new Error('Failed to retrieve Foundry token.');
    }

    // Step 3: Admin Token
    const adminResponse = await axios.post(`${API_URL}/adminLogin/ObtainAdminToken`, {}, {
      headers: { Accept: 'application/json' },
    });

    if (!adminResponse || adminResponse.status !== 200) {
      throw new Error('Failed to obtain admin token.');
    }
console.log(adminResponse, "adminResponse")
console.log(foundryResponse.data.claims_token, "foundryResponse")
console.log(customerResponse, "customerResponse")
    // Step 4: Extract tokens
    const { access_token } = customerResponse.data;
    const { claims_token } = foundryResponse.data;
    const { access_token: admin_token } = adminResponse.data;

    // Save tokens to local storage
    localStorage.setItem('token', access_token);
    localStorage.setItem('voltmx-token', foundryResponse.data.claims_token.value);
    localStorage.setItem('admin-token',admin_token );

    // Step 5: Fetch Customer Info
    const customerInfoResponse = await axios.post(`${API_URL}/Customer/getcustomerInfo`, {}, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${access_token}`,
        'X-Voltmx-Authorization': foundryResponse.data.claims_token.value,
      },
    });

    if (!customerInfoResponse || customerInfoResponse.status !== 200) {
      throw new Error('Failed to retrieve customer information.');
    }

    const customerData = customerInfoResponse.data;
    localStorage.setItem('storeInfo',customerData );

    // Step 6: Check if user is a seller
    if (!customerData?.custom?.fields?.isSeller) {
      return rejectWithValue('You are not registered as a seller. Please contact support if this is an error.');
    }

    localStorage.setItem('STOREKEY', customerData.custom.fields.assignedStore);

    return customerData;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message || 'Something went wrong. Please try again.');
  }
});

export const signup = createAsyncThunk('user/signup', async (userInfo, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/dealer/signup`, userInfo);

    if (!response || response.status !== 200) {
      throw new Error('Signup failed. Please try again.');
    }

    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Signup error. Please try again.');
  }
});
export const fetchUserDetails = createAsyncThunk(
  'user/fetchUserDetails',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const access_token = localStorage.getItem('token');
      const voltmx_token = localStorage.getItem('voltmx-token');

      if (!access_token || !voltmx_token) {
        throw new Error('Missing authentication tokens.');
      }

      const customerInfoResponse = await axios.post(`${API_URL}/Customer/getcustomerInfo`, {}, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${access_token}`,
          'X-Voltmx-Authorization': voltmx_token,
        },
      });

      if (!customerInfoResponse || customerInfoResponse.status !== 200) {
        throw new Error('Failed to retrieve customer information.');
      }

      const customerData = customerInfoResponse.data;
      localStorage.setItem('storeInfo', JSON.stringify(customerData));

      // Check if user is a seller
      if (!customerData?.custom?.fields?.isSeller) {
        return rejectWithValue('You are not registered as a seller. Please contact support.');
      }

      localStorage.setItem('STOREKEY', customerData.custom.fields.assignedStore);

      return customerData;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || 'Failed to fetch user details.');
    }
  }
);
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('dealer-token');
      localStorage.removeItem('voltmx-token');
      localStorage.removeItem('admin-token');
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.success = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = action.payload.message;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = null;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
