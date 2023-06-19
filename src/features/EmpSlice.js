import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  empInfo: [],
};

export const empSlice = createSlice({
  name: "emp",
  initialState,
  reducers: {
    addEmp: (state, action) => {
      state.empInfo = [action.payload];
    },
  },
});

export const { addEmp } = empSlice.actions;

export const selectEmp = (state) => state.emp.empInfo;

export default empSlice.reducer;
