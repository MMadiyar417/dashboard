import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStarships = createAsyncThunk('starships/fetchStarships', async () => {
  const response = await axios.get('https://swapi.dev/api/starships/');
  return response.data.results;
});

export const updateStarship = createAsyncThunk<Starship, Starship>(
  'starships/updateStarship',
  async (starship) => {
    return starship;
  }
);


interface Starship {
  id: number;
  name: string;
  model: string;
  manufacturer: string;
  length: string;
}

interface StarshipState {
  entities: Starship[];
  loading: boolean;
}

const initialState: StarshipState = {
  entities: [],
  loading: false,
};

const starshipSlice = createSlice({
  name: 'starships',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStarships.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStarships.fulfilled, (state, action) => {
        state.entities = action.payload.map((starship: Starship, index: number) => ({
          ...starship,
          id: index + 1,
        }));
        state.loading = false;
      })
      .addCase(fetchStarships.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateStarship.fulfilled, (state, action) => {
        const index = state.entities.findIndex(starship => starship.id === action.payload.id);
        if (index !== -1) {
          state.entities[index] = action.payload;
        }
      });
  },
});

export default starshipSlice.reducer;
