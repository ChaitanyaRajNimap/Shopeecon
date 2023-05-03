import {createSlice} from '@reduxjs/toolkit';

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
      state.myCart = state.myCart.filter(product => {
        if (
          product.uid === action.payload.uid &&
          product.orderId !== action.payload.orderId
        ) {
          return product;
        }
      });
    },
  },
});

export default addToCartSlice.reducer;
export const {addProduct, removeProduct} = addToCartSlice.actions;
