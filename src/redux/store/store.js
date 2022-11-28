import { configureStore } from "@reduxjs/toolkit";
import { restaurantReducers } from "../reducers/restaurantReducers";
import { userReducers } from "../reducers/userReducers";

//*-------------------------------------------------------------------------------------------------------------------
const reducer = {
  userStore: userReducers,
  restaurant: restaurantReducers,
};
//*-------------------------------------------------------------------------------------------------------------------
const store = configureStore({
  reducer,
  devTool: process.env.NODE_ENV !== "production",
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
