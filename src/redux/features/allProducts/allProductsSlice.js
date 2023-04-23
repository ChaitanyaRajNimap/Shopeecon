import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../../../constants/Utils';

const initialState = {
  loading: false,
  allProducts: [],
  error: '',
};

export const fetchAllProducts = createAsyncThunk(
  'allProducts/fetchAllProducts',
  () => {
    return axios
      .get(`${BASE_URL}/products?limit=100`)
      .then(res => res?.data)
      .catch(err => console.log('Error in fetching product categories ', err));
  },
);

const allProductsSlice = createSlice({
  name: 'allProducts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAllProducts.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.allProducts = action.payload;
      state.error = '';
    });
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.allProducts = [];
      state.error = action.error;
    });
  },
});

export default allProductsSlice.reducer;
