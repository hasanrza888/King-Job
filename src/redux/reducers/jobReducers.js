import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
  loading:true,
  currentJobInDetail:JSON.parse(localStorage.getItem('c_r_r_n_t')) || null,
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
        state.jobs = action.payload
    },
    updateCurrentJob: (state,action) => {
      state.currentJobInDetail = action.payload;
      localStorage.setItem('c_r_r_n_t',JSON.stringify(action.payload));
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