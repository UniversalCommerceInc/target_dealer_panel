import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Helper function to get tokens from local storage
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  const dealerToken = localStorage.getItem('dealer-token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Dealer-Token': dealerToken,
    },
  };
};

// Thunks
export const UserDetails = createAsyncThunk('user/details', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/dealer/me`, getAuthHeaders());
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const fetchAllProducts = createAsyncThunk('products/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/dealer/products`, getAuthHeaders());
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const createProductItem = createAsyncThunk('products/createItem', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/dealer/products`, data.product, getAuthHeaders());

    const variantData = {
      name: response.data.createProduct.name,
      sku: data.variant.sku,
      price: +(data.variant.price * 100),
      stockOnHand: +(data.variant.stock),
    };

    await axios.post(
      `${API_URL}/api/v1/dealer/products/${response.data.createProduct.id}/variants`,
      variantData,
      getAuthHeaders()
    );

    return response.data.createProduct;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const uploadAssets = createAsyncThunk('asset/upload', async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/dealer/uploads`, formData, getAuthHeaders());
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const updateProductById = createAsyncThunk('update/product', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/api/v1/dealer/products/${data.id}`, data.product, getAuthHeaders());
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const deleteProductItem = createAsyncThunk('products/deleteItem', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/api/v1/dealer/products/${id}`, getAuthHeaders());
    return id; // Return the ID of the deleted product
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const getVariantsById = createAsyncThunk('variants/fetchById', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/dealer/products/variants/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const deleteVariantsById = createAsyncThunk('variants/deleteById', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/api/v1/dealer/products/variants/${id}`, getAuthHeaders());
    return id; // Return the ID of the deleted variant
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const updateVariantsById = createAsyncThunk(
  'variants/updateById',
  async (data, { rejectWithValue }) => {
    try {
      // Ensure that data.variant.price is a number
      if (data.variant && data.variant.price) {
        data.variant.price = Number(data.variant.price);
      }

      const response = await axios.put(
        `${API_URL}/api/v1/dealer/products/variants/${data.id}`,
        data.variant,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchSingleProduct = createAsyncThunk('products/fetchSingle', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/dealer/products/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    product: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetCreateItemState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Products
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Fetch Single Product
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Create Product
      .addCase(createProductItem.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(createProductItem.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products.push(action.payload); // Add the created product to the list
      })
      .addCase(createProductItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Delete Product
      .addCase(deleteProductItem.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(deleteProductItem.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // state.products = state.products.filter(product => product.id !== action.payload);
      })
      .addCase(deleteProductItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Get Variant by ID
      .addCase(getVariantsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVariantsById.fulfilled, (state, action) => {
        state.loading = false;
        // Handle fetched variant data
      })
      .addCase(getVariantsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Delete Variant by ID
      .addCase(deleteVariantsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteVariantsById.fulfilled, (state, action) => {
        state.loading = false;
        // Handle variant deletion if needed
      })
      .addCase(deleteVariantsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Update Variant by ID
      .addCase(updateVariantsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateVariantsById.fulfilled, (state, action) => {
        state.loading = false;
        // Handle variant update if needed
      })
      .addCase(updateVariantsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetCreateItemState } = productSlice.actions;
export default productSlice.reducer;
