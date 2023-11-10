import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
  loading:true,
  currentJobInDetail:null,
  favoritJobs:[],
  loadingFavJobs:true
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
      state.loading = false;
    },
    updateJobs: (state,action) => {
        state.jobs = action.payload;
        state.loading = false
    },
    updateCurrentJob: (state,action) => {
      state.currentJobInDetail = action.payload;
    },
    setFavJobs: (state,action) => {
      state.favoritJobs = action.payload;
      state.loadingFavJobs = false;
    },
    updateFavJobs: (state,action) => {
      state.favoritJobs = action.payload
    }
  },
});

export const { setJobs, updateJobs,updateCurrentJob,setFavJobs,updateFavJobs } = jobSlice.actions;

export default jobSlice.reducer;