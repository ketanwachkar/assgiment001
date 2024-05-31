import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./createSlice";
import productSlice from "./productSlice";
const store = configureStore({
    reducer:{
        cart: cartReducer,
        Product : productSlice,
    }
})
    
export default store;