import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface PortfolioState {
  projects: any[];
  skills: any[];
  experience: any[];
  certificates: any[];
  messages: any[];
  loading: boolean;
  error: string | null;
}

const initialState: PortfolioState = {
  projects: [],
  skills: [],
  experience: [],
  certificates: [],
  messages: [],
  loading: false,
  error: null,
};

export const fetchProjects = createAsyncThunk('portfolio/fetchProjects', async () => {
  const res = await fetch('/api/projects');
  return res.json();
});

export const fetchSkills = createAsyncThunk('portfolio/fetchSkills', async () => {
  const res = await fetch('/api/skills');
  return res.json();
});

export const fetchExperience = createAsyncThunk('portfolio/fetchExperience', async () => {
  const res = await fetch('/api/experience');
  return res.json();
});

export const fetchCertificates = createAsyncThunk('portfolio/fetchCertificates', async () => {
  const res = await fetch('/api/certificates');
  return res.json();
});

export const fetchMessages = createAsyncThunk('portfolio/fetchMessages', async () => {
  const res = await fetch('/api/messages');
  return res.json();
});

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Projects
    builder.addCase(fetchProjects.pending, (state) => { state.loading = true; });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.loading = false;
      state.projects = action.payload;
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch projects';
    });
    // Skills
    builder.addCase(fetchSkills.fulfilled, (state, action) => {
      state.skills = action.payload;
    });
    // Experience
    builder.addCase(fetchExperience.fulfilled, (state, action) => {
      state.experience = action.payload;
    });
    // Certificates
    builder.addCase(fetchCertificates.fulfilled, (state, action) => {
      state.certificates = action.payload;
    });
    // Messages
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
    });
  },
});

export const { clearError } = portfolioSlice.actions;
export default portfolioSlice.reducer;
