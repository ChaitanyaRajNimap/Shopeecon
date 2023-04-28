import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../../../constants/Utils';

const initialState = {
  loading: false,
  productByCategory: [],
  error: '',
};

export const fetchProductByCategory = createAsyncThunk(
  'productByCategory/fetchProductByCategory',
  category => {
    console.log('CATTT ', category);
    return axios
      .get(`${BASE_URL}/products/category/${category}?limit=100`)
      .then(res => res?.data?.products)
      .catch(err => console.log('Error in fetching product by category ', err));
  },
);

const productByCategorySlice = createSlice({
  name: 'productByCategory',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProductByCategory.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchProductByCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.productByCategory = action.payload;
      state.error = '';
    });
    builder.addCase(fetchProductByCategory.rejected, (state, action) => {
      state.loading = false;
      state.productByCategory = [];
      state.error = action.error;
    });
  },
});

export default productByCategorySlice.reducer;
