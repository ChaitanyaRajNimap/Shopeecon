import {configureStore} from '@reduxjs/toolkit';
import allProductsReducer from '../features/allProducts/allProductsSlice';
import productCategoryReducer from '../features/productCategory/productCategorySlice';

const store = configureStore({
  reducer: {
    allProducts: allProductsReducer,
    productCategory: productCategoryReducer,
  },
});

export default store;
