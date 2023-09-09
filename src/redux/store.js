import { configureStore } from "@reduxjs/toolkit";
import userauthReducer from './reducers/userauthReducers';
export default configureStore({
    reducer:{
        user:userauthReducer
    }
})