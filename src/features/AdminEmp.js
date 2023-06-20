import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  empInfo: [],
};

export const AdminEmp = createSlice({
  name: "emp",
  initialState,
  reducers: {
    addEmp: (state, action) => {
      state.empInfo = [action.payload];
    },
  },
});

export const { addEmp } = AdminEmp.actions;

export const selectEmp = (state) => state.emp.empInfo;

export default AdminEmp.reducer;
