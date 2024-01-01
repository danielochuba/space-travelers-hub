import { configureStore } from '@reduxjs/toolkit';
import rocketReducer from './rockets/rocketSlices';
import dragonReducer from './dragons/dragonsSlice';
import missionReducer from './missions/missionsSlice';

const store = configureStore({
  reducer: {
    rocket: rocketReducer,
    dragon: dragonReducer,
    mission: missionReducer,
  },
});

export default store;
