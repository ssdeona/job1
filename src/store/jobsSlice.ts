import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import type { Job, JobsResponse } from '../types/job';
import type { RootState } from './store';

const API_URL = 'https://kata-jobs.onrender.com/api/jobs';

interface FetchJobsParams {
  search: string;
  city: string;
  skills: string[];
  page: number;
}

interface JobsState {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  totalPages: number;
}

const initialState: JobsState = {
  jobs: [],
  loading: false,
  error: null,
  totalPages: 1,
};


export const fetchJobs = createAsyncThunk<
  JobsResponse,
  FetchJobsParams,
  { rejectValue: string }
>(
  'jobs/fetchJobs',
  async ({ search, city, skills, page }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();

      if (search) params.set('search', search);
      if (city) params.set('city', city);
      if (skills.length > 0) params.set('skills', skills.join(','));
      params.set('page', String(page));

      const response = await fetch(
        `${API_URL}?${params.toString()}`,
      );

      if (!response.ok) {
        return rejectWithValue('Не удалось загрузить вакансии');
      }

      const data: JobsResponse = await response.json();
      return data;
    } catch {
      return rejectWithValue(
        'Произошла ошибка при загрузке вакансий',
      );
    }
  },
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    clearJobs: (state) => {
      state.jobs = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.jobs;
        state.totalPages = action.payload.pagination.totalPages;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Не удалось загрузить вакансии';
        state.jobs = [];
      });
  },
});

export const { clearJobs } = jobsSlice.actions;


export const selectJobs = (state: RootState) => state.jobs.jobs;
export const selectJobsLoading = (state: RootState) => state.jobs.loading;
export const selectJobsError = (state: RootState) => state.jobs.error;
export const selectTotalPages = (state: RootState) => state.jobs.totalPages;


export const selectRemoteJobs = createSelector(
  [selectJobs],
  (jobs) => jobs.filter((job) => job.space === 'remote')
);

export const selectUniqueCities = createSelector(
  [selectJobs],
  (jobs) => [...new Set(jobs.map((job) => job.city))]
);

export const selectJobsCount = createSelector(
  [selectJobs],
  (jobs) => jobs.length
);

export default jobsSlice.reducer;