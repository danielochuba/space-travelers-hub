import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getMissions = createAsyncThunk('missions/getMission', async () => {
  const response = await fetch('https://api.spacexdata.com/v3/missions');
  const data = await response.json();
  return data;
});

const initialState = {
  missions: [],
  loading: false,
  reservedMissions: [],
  status: 'idle',
  error: null,
};

const missionSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    joinMission: (state, action) => {
      const mission = state.missions.find((mission) => mission.id === action.payload);
      if (mission) {
        mission.reserved = !mission.reserved;
      }
    },
    leaveMission: (state, action) => {
      const mission = state.missions.find((mission) => mission.id === action.payload);
      if (mission) {
        mission.reserved = !mission.reserved;
      }
    },
    filterMissions: (state) => {
      const missions = state.missions.filter((mission) => mission.reserved === true);
      if (missions) {
        const newState = { ...state };
        newState.reservedMissions = missions;
        return newState;
      }
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMissions.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getMissions.fulfilled, (state, action) => ({
        ...state,
        status: 'Data fetch succeeded',
        missions: [
          ...state.missions,
          ...action.payload.map((mission) => ({
            id: mission.mission_id,
            name: mission.mission_name,
            description: mission.description,
            reserved: false,
          })),
        ],
      }))
      .addCase(getMissions.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export const { joinMission, leaveMission, filterMissions } = missionSlice.actions;
export default missionSlice.reducer;
