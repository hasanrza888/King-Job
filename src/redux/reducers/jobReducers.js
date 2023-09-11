import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
  loading:true
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
    }
  },
});

export const { setJobs, updateJobs } = jobSlice.actions;

export default jobSlice.reducer;