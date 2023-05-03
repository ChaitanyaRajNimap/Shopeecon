import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import database from '@react-native-firebase/database';

const initialState = {
  loading: false,
  myOrders: [],
  error: '',
};

export const fetchMyOrders = createAsyncThunk(
  'myOrder/fetchMyOrders',
  async uid => {
    try {
      const res = await database().ref(`orders/${uid}`).once('value');
      if (res.val()) {
        return res.val();
      }
    } catch (err) {
      console.log('Error in fetching my orders ', err);
    }
  },
);

const myOrdersSlice = createSlice({
  name: 'myOrdersSlice',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.myOrders = [...state.myOrders, action.payload];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchMyOrders.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchMyOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.myOrders = action.payload;
      state.error = '';
    });
    builder.addCase(fetchMyOrders.rejected, (state, action) => {
      state.loading = false;
      state.myOrders = [];
      state.error = action.payload;
    });
  },
});

export default myOrdersSlice.reducer;
export const {addOrder} = myOrdersSlice.actions;
