import {configureStore} from '@reduxjs/toolkit';
import allProductsReducer from '../features/allProducts/allProductsSlice';
import productCategoryReducer from '../features/productCategory/productCategorySlice';
import productByCategoryReducer from '../features/productByCategory/productByCategorySlice';
import addToCartReducer from '../features/addToCart/addToCartSlice';

const store = configureStore({
  reducer: {
    allProducts: allProductsReducer,
    addToCart: addToCartReducer,
    productCategory: productCategoryReducer,
    productByCategory: productByCategoryReducer,
  },
});

export default store;
