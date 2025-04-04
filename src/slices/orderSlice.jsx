import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const AUTH_TOKEN = localStorage.getItem("token");
const Admin_TOKEN = localStorage.getItem("admin-token");
const Voltmx_TOKEN = localStorage.getItem("voltmx-token");
const STOREKEY = localStorage.getItem("STOREKEY");

// Fetch all orders with an optional query

export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAll',
  async (query = '', { rejectWithValue }) => {
    try {
      


      let url;
      let requestData;

      if (query === '') {
        // Default request when query is empty
        url = `${API_URL}/Customer/FetchOrderSpecificStatus`;
        requestData = { STOREKEY };
      } else {
        // Request when query has a value
        url = `${API_URL}/Customer/DealerOrder`;
        requestData = { STOREKEY, ORDERSTATUS: query };
      }

      const response = await axios.post(
        url,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${Admin_TOKEN}`,
            'X-Voltmx-Authorization': Voltmx_TOKEN,
          },
        }
      );

      return response.data.results;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message || 'Failed to fetch orders');
    }
  }
);


// Fetch a single order by ID

export const fetchSingleOrder = createAsyncThunk(
  'orders/fetchDetails',
  async (id, { rejectWithValue }) => {
    try {
      // Retrieve authentication tokens from localStorage
 


      const response = await axios.post(
        `${API_URL}/Customer/GetOrderAdminToken`,
        { orderId: id },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${Admin_TOKEN}`,
            'X-Voltmx-Authorization': Voltmx_TOKEN,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message || 'Failed to fetch order details');
    }
  }
);

// Update order status by ID and query
export const approveOrderStatus = createAsyncThunk(
  'orders/updateStatus',
  async ({ orderId, version }, { rejectWithValue }) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${AUTH_TOKEN}`);
      myHeaders.append("X-Voltmx-Authorization", Voltmx_TOKEN);


      const raw = JSON.stringify({
        orderid: orderId,
        version: version
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      const response = await fetch("https://m100003239002.demo-hclvoltmx.net/services/Customer/ApproveOrder", requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      return result;
      
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update order status');
    }
  }
);

// Function to update order status
export const updateOrderStatus = createAsyncThunk(
  'orders/updateStatus',
  async ({ orderId, version, orderState }, { rejectWithValue }) => {
    try {



      const response = await axios.post(
      `  ${API_URL}/Customer/UpdateOrderState`,
        {
          orderid: orderId,
          version,
          orderState,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${AUTH_TOKEN}`,
            'X-Voltmx-Authorization': Voltmx_TOKEN,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message || 'Failed to update order status');
    }
  }
);
const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    order: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all orders
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch single order
      .addCase(fetchSingleOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchSingleOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update order status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
