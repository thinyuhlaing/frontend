// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { setCurrentEmployee, setEmployees } from "./employeeSlice";
// // import { employeeApi } from "@/store/services/employeeApi";

// interface AppSlice {
//   init: boolean;
//   isLoading: boolean;
//   error: string | null;
// }
// const initialState: AppSlice = {
//   init: false,
//   isLoading: false,
//   error: null,
// };

// export const fetchAppData = createAsyncThunk(
//   "app/fetchAppData",
//   async (_, thunkApi) => {
//     // Employee
//     const employee = localStorage.getItem("employee");
//     employee && thunkApi.dispatch(setCurrentEmployee(JSON.parse(employee)));

//     // Employees
//     const employees = (
//       await thunkApi.dispatch(employeeApi.endpoints.getEmployees.initiate())
//     ).data;

//     thunkApi.dispatch(setEmployees(employees ? employees : []));

//     thunkApi.dispatch(setInit(true));
//   },
// );
// export const baseSlice = createSlice({
//   name: "app",
//   initialState,
//   reducers: {
//     setInit: (state, action: PayloadAction<boolean>) => {
//       state.init = action.payload;
//     },
//   },
// });

// export const { setInit } = baseSlice.actions;
// export default baseSlice.reducer;
