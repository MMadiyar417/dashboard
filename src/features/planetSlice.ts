import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPlanets = createAsyncThunk('planets/fetchPlanets', async () => {
  const response = await axios.get('https://swapi.dev/api/planets/');
  return response.data.results;
});

export const updatePlanet = createAsyncThunk('planets/updatePlanet', async ({ id, data }: { id: number; data: Planet }) => {
  const response = await axios.put(`https://swapi.dev/api/planets/${id}/`, data);
  return response.data;
});

interface Planet {
  id: number;
  name: string;
  diameter: string;
  climate: string;
  terrain: string;
}

interface PlanetState {
  entities: Planet[];
  loading: boolean;
}

const initialState: PlanetState = {
  entities: [],
  loading: false,
};

const planetSlice = createSlice({
  name: 'planets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlanets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlanets.fulfilled, (state, action) => {
        state.entities = action.payload.map((planet: Planet, index: number) => ({
          ...planet,
          id: index + 1,
        }));
        state.loading = false;
      })
      .addCase(fetchPlanets.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updatePlanet.fulfilled, (state, action) => {
        const index = state.entities.findIndex(planet => planet.id === action.payload.id);
        if (index !== -1) {
          state.entities[index] = action.payload; 
        }
      });
  },
});

export default planetSlice.reducer;
