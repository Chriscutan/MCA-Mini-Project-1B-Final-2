import { configureStore } from "@reduxjs/toolkit";
import empSlice from "../features/EmpSlice";
import basketSlice from "../features/basketSlice";
import AdminEmp from "../features/AdminEmp";

export const store = configureStore({
  reducer: {
    emp: empSlice,
    basket: basketSlice,
    adminEmp: AdminEmp,
  },
});
