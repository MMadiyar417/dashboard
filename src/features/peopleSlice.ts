import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPeople = createAsyncThunk('people/fetchPeople', async () => {
  const response = await axios.get('https://swapi.dev/api/people/');
  return response.data.results;
});

interface Person {
  id: number;
  name: string;
  height: string;
  mass: string;
  gender: string;
  birth_year: string;
}

interface PeopleState {
  entities: Person[];
  loading: boolean;
}

const initialState: PeopleState = {
  entities: [],
  loading: false,
};

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeople.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPeople.fulfilled, (state, action) => {
        state.entities = action.payload.map((person: Person, index: number) => ({
          ...person,
          id: index + 1,
        }));
        state.loading = false;
      })
      .addCase(fetchPeople.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default peopleSlice.reducer;
