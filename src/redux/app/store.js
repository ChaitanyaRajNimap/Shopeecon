import {configureStore} from '@reduxjs/toolkit';
import allProductsReducer from '../features/allProducts/allProductsSlice';
import productCategoryReducer from '../features/productCategory/productCategorySlice';
import productByCategoryReducer from '../features/productByCategory/productByCategorySlice';

const store = configureStore({
  reducer: {
    allProducts: allProductsReducer,
    productCategory: productCategoryReducer,
    productByCategory: productByCategoryReducer,
  },
});

export default store;
