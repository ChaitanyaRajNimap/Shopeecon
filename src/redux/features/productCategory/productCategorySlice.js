import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../../../constants/Utils';

const initialState = {
  loading: false,
  category: [],
  error: '',
};

export const fetchProductCategories = createAsyncThunk(
  'productCategory/fetchProductCategories',
  () => {
    return axios
      .get(`${BASE_URL}/products/categories`)
      .then(res => res?.data)
      .catch(err => console.log('Error in fetching product categories ', err));
  },
);

const productCategorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProductCategories.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchProductCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
      state.error = '';
    });
    builder.addCase(fetchProductCategories.rejected, (state, action) => {
      state.loading = false;
      state.category = [];
      state.error = action.error;
    });
  },
});

export default productCategorySlice.reducer;
