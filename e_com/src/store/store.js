import {combineReducers,configureStore } from '@reduxjs/toolkit'

import productReducer from './features/product'
import categoryReducer from './features/category'
import commonReducer from './features/common'

const rootReducer = combineReducers({
    productState: productReducer,
    categoryState: categoryReducer,
    commonState:commonReducer

})

const store = configureStore({
    reducer : rootReducer
})

export default store;