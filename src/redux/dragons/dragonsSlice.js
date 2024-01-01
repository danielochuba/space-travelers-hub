import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getDragons = createAsyncThunk('dragons/getDragons', async () => {
  const response = await fetch('https://api.spacexdata.com/v4/dragons');
  const data = await response.json();
  return data;
});

const initialState = {
  dragons: [],
  loading: false,
  reservedDragons: [],
  status: 'idle',
  error: null,
};

const dragonSlice = createSlice({
  name: 'dragons',
  initialState,
  reducers: {
    reserveDragon: (state, action) => {
      const dragon = state.dragons.find((dragon) => dragon.id === action.payload);
      if (dragon) {
        dragon.reserved = !dragon.reserved;
      }
    },
    cancelReservation: (state, action) => {
      const dragon = state.dragons.find((dragon) => dragon.id === action.payload);
      if (dragon) {
        dragon.reserved = !dragon.reserved;
      }
    },
    filterDragons: (state) => {
      const dragons = state.dragons.filter((dragon) => dragon.reserved === true);
      if (dragons) {
        const newState = { ...state };
        newState.reservedDragons = dragons;
        return newState;
      }
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDragons.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getDragons.fulfilled, (state, action) => ({
        ...state,
        status: 'Data fetch succeeded',
        dragons: [
          ...state.dragons,
          ...action.payload.map((dragon) => ({
            id: dragon.id,
            name: dragon.name,
            description: dragon.description,
            flickr_images: dragon.flickr_images,
            reserved: false,
          })),
        ],
      }))
      .addCase(getDragons.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export const { reserveDragon, cancelReservation, filterDragons } = dragonSlice.actions;
export default dragonSlice.reducer;
