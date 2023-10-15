import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  numbers: {
        jobsCount:0,
        premJobsCount:0,
        numOfAllApply:0,
        numOfApproved:0,
        numOfRejected:0,
        allView:0,
        percentageChangeNumOfAllApply:0,
        percentageChangeCreatedVacancy:0,
  },
  companyJobsData:[]
};

const companyProfileSlice = createSlice({
  name: 'companyProfile',
  initialState,
  reducers: {
    setNumbers: (state, action) => {
      state.numbers = action.payload
    },
    setCompanyJobsData : (state,action) => {
      state.companyJobsData = action.payload
    },
    addNewJob : (state,action) => {
      state.companyJobsData = [...state.companyJobsData,action.payload]
    }
  },
});

export const { setNumbers,setCompanyJobsData,addNewJob } = companyProfileSlice.actions;

export default companyProfileSlice.reducer;