import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../../../constants/Utils';

const initialState = {
  myCart: [],
};

const addToCartSlice = createSlice({
  name: 'addToCart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.myCart = [...state.myCart, action.payload];
    },
    removeProduct: (state, action) => {
      console.log('removeProduct : ', action.payload);
      // state.myCart = state.myCart.filter(
      //   product =>
      //     product.uid !== action.payload.uid &&
      //     product.orderId !== action.payload.orderId,
      // );
    },
  },
});

export default addToCartSlice.reducer;
export const {addProduct, removeProduct} = addToCartSlice.actions;
