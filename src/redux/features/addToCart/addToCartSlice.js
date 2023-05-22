import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import database from '@react-native-firebase/database';

const initialState = {
  loading: false,
  myCart: [],
  error: '',
};

export const fetchMyCart = createAsyncThunk('myCart/fetchMyCart', async uid => {
  console.log('fetchMyCart REACHED!');
  try {
    const res = await database().ref(`mycart/${uid}`).once('value');
    if (res.val()) {
      return res.val();
    }
  } catch (err) {
    console.log('Error in fetching my cart ', err);
  }
});

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
  extraReducers: builder => {
    builder.addCase(fetchMyCart.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchMyCart.fulfilled, (state, action) => {
      state.loading = false;
      state.myCart = action.payload;
      state.error = '';
    });
    builder.addCase(fetchMyCart.rejected, (state, action) => {
      state.loading = false;
      state.myCart = [];
      state.error = action.payload;
    });
  },
});

export default addToCartSlice.reducer;
export const {addProduct, removeProduct} = addToCartSlice.actions;
