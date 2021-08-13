import { configureStore } from "@reduxjs/toolkit"


import employeeReducer from "./employeeReducer"


const store = configureStore({
  reducer: employeeReducer.reducer,
});


export default store;
