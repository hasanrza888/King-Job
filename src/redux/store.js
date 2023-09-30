import { configureStore,getDefaultMiddleware } from "@reduxjs/toolkit";
import userauthReducer from './reducers/userauthReducers';
import socketReducer from "./reducers/socketReducers";
import jobReducer from "./reducers/jobReducers";
import companyProfileReducer from "./reducers/companyProfileReducers"
const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false,
    // Add other middleware options if needed
  });
export default configureStore({
    reducer:{
        user:userauthReducer,
        socket:socketReducer,
        job:jobReducer,
        companyProfile:companyProfileReducer
    },
    middleware:customizedMiddleware,
})