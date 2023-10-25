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
  companyJobsData:[],
  companyJobsApplys:[]
};

const companyProfileSlice = createSlice({
  name: 'companyProfile',
  initialState,
  reducers: {
    setNumbers: (state, action) => {
      state.numbers = action.payload
    },
    setCompanyJobsData : (state,action) => {
      state.companyJobsData = action.payload;
      // state.numbers.jobsCount = (action.payload)?.length
    },
    addNewJob : (state,action) => {
      state.companyJobsData = [...state.companyJobsData,action.payload];
      state.numbers.jobsCount +=1;
    },
    updateCompanyJob : (state,action) => {
      const updatedJob = action.payload;
      const index = state.companyJobsData.findIndex(job => job._id === updatedJob._id);
      if (index !== -1) {
        state.companyJobsData[index] = updatedJob;
      }
    },
    deleteCompanyJob : (state,action) => {
      const jobId = action.payload;
      const filteredData = [...state.companyJobsData].filter(job=>job._id!==jobId);
      state.companyJobsData = filteredData;
    },
    setCompanyJobsApplys : (state,action) => {
      state.companyJobsApplys = action.payload
    },
    updateUserApply : (state,action) => {
      const updatedApply = action.payload;
      const index = state.companyJobsApplys.findIndex(app => app._id === updatedApply._id);
      if (index !== -1) {
        state.companyJobsApplys[index] = updatedApply;
      }
    },
  },
});

export const { setNumbers,setCompanyJobsData,addNewJob,updateCompanyJob,deleteCompanyJob,setCompanyJobsApplys,updateUserApply } = companyProfileSlice.actions;

export default companyProfileSlice.reducer;