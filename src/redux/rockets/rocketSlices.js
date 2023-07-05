import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getRockets = createAsyncThunk('rockets/getRockets', async () => {
  const response = await fetch('https://api.spacexdata.com/v4/rockets');
  const data = await response.json();
  return data;
});

const initialState = {
  rockets: [],
  loading: false,
  status: 'idle',
  error: null,
};

const rocketSlice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRockets.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getRockets.fulfilled, (state, action) => ({
        ...state,
        status: 'Data fetch succeeded',
        rockets: [
          ...state.rockets,
          ...action.payload.map((rocket) => ({
            id: rocket.id,
            name: rocket.name,
            description: rocket.description,
            flickr_images: rocket.flickr_images,
            reserved: false,
          })),
        ],
      }))
      .addCase(getRockets.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export const { reserveRocket } = rocketSlice.actions;
export default rocketSlice.reducer;
