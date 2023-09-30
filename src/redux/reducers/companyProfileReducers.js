import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  numbers: {
        jobsCount:0,
        premJobsCount:0,
        numOfAllApply:0,
        numOfApproved:0,
        numOfRejected:0,
        allView:0
  },
};

const companyProfileSlice = createSlice({
  name: 'companyProfile',
  initialState,
  reducers: {
    setNumbers: (state, action) => {
      state.numbers = action.payload
    },
  },
});

export const { setNumbers } = companyProfileSlice.actions;

export default companyProfileSlice.reducer;