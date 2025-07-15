import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    categories : []
}

const categorySlice = createSlice({
    name:'categorySlice',
    initialState:initialState,
    reducers:{
        loadCategories:(state,action)=>{
            console.log(action?.payload)
            return {
                ...state,
                categories:action?.payload
            }
        }
    }
})

export const { loadCategories } = categorySlice?.actions;

export default categorySlice?.reducer;