import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getRockets = createAsyncThunk('rockets/getRockets', async () => {
  const response = await fetch('https://api.spacexdata.com/v4/rockets');
  const data = await response.json();

  return data;
});

const initialState = {
  rockets: [],
  loading: false,
  reservedRockets: [],
  status: 'idle',
  error: null,
};

const rocketSlice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {
    reserveRocket: (state, action) => {
      const rocket = state.rockets.find(
        (rocket) => rocket.id === action.payload,
      );
      if (rocket) {
        rocket.reserved = !rocket.reserved;
      }
    },
    cancelReservation: (state, action) => {
      const rocket = state.rockets.find(
        (rocket) => rocket.id === action.payload,
      );
      if (rocket) {
        rocket.reserved = !rocket.reserved;
      }
    },
    filterRockets: (state) => {
      const rockets = state.rockets.filter(
        (rocket) => rocket.reserved === true,
      );
      if (rockets) {
        const newState = { ...state };
        newState.reservedRockets = rockets;
        return newState;
      }
      return state;
    },
  },
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

export const { reserveRocket, cancelReservation, filterRockets } = rocketSlice.actions;
export default rocketSlice.reducer;
