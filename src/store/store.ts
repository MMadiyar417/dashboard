import { configureStore } from '@reduxjs/toolkit';
import peopleReducer from '../features/peopleSlice';
import planetReducer from '../features/planetSlice';
import starshipReducer from '../features/starshipSlice';
import editReducer from '../features/editSlice';
import authReducer from '../features/auth/authSlice'; 
const store = configureStore({
  reducer: {
    people: peopleReducer,
    planets: planetReducer,
    starships: starshipReducer,
    edit: editReducer,
    auth: authReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
