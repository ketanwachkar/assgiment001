"use client";
import {createSlice} from "@reduxjs/toolkit"
const productSlice = createSlice({
    name:"Product",
    initialState:[],
    reducers:{
        addProduct(state,action){
         return state = action.payload
        }
    }
})

export const {addProduct} = productSlice.actions;
export default productSlice.reducer;