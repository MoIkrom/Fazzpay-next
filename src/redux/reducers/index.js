import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth";
// import productReducer from "./product";
import registerReducer from "./register";
// import profileReducer from "./profile";
// import categoriesReducer from "./categories";
// import brandsReducer from "./brands";

export default combineReducers({
    auth: authReducer,
    register: registerReducer,
    //   data_profile: profileReducer.getProfileReducer,
    //   products: productReducer,
    //   categories: categoriesReducer,
    //   brands: brandsReducer,
});