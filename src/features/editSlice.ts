import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export type Person = {
  id: number;
  name: string;
  height: number;
  mass: number;
  gender: string;
  birth_year: string;
};

export type Planet = {
  id: number;
  name: string;
  climate: string;
  diameter: number;
};

export type Starship = {
  starship_class(arg0: string, starship_class: any): unknown;
  id: number;
  name: string;
  model: string;
  length: number;
};

type Entity = Person | Planet | Starship;

interface EditState {
  entities: Entity[];
  entity: Entity | null;
}

const initialState: EditState = {
  entity: null,
  entities: [],
};

export const updatePeople = createAsyncThunk<Person, { id: number; data: Partial<Person> }>(
  'people/updatePeople',
  async ({ id, data }) => {
    const response = await axios.put(`https://your-api-endpoint/people/${id}`, data);
    return response.data;
  }
);

export const updatePlanets = createAsyncThunk<Planet, { id: number; data: Partial<Planet> }>(
  'planets/updatePlanets',
  async ({ id, data }) => {
    const response = await axios.put(`https://your-api-endpoint/planets/${id}`, data);
    return response.data;
  }
);


export const fetchEntity = createAsyncThunk<Entity, { endpoint: string; id: string }>(
  'edit/fetchEntity',
  async ({ endpoint, id }) => {
    const response = await fetch(`https://swapi.dev/api/${endpoint}/${id}`);
    if (!response.ok) {
      throw new Error('Ошибка загрузки данных');
    }
    return await response.json(); 
  }
);

export const updateEntity = createAsyncThunk(
  'entities/updateEntity',
  async ({ id, data }: { id: number; data: Partial<Entity> }) => { 
    const response = await axios.put(`https://your-api-endpoint/${id}`, data);
    return response.data;
  }
);

const editSlice = createSlice({
  name: 'edit',
  initialState,
  reducers: {
    setEntity(state, action) {
      state.entity = action.payload;
    },
    clearEntity(state) {
      state.entity = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEntity.fulfilled, (state, action) => {
        state.entities.push(action.payload);
        state.entity = action.payload;
      })
      .addCase(updateEntity.fulfilled, (state, action) => {
        const index = state.entities.findIndex(entity => entity.id === action.payload.id);
        if (index !== -1) {
          state.entities[index] = action.payload; 
          state.entity = action.payload; 
        }
      });
  },
});

export const { setEntity, clearEntity } = editSlice.actions;

export default editSlice.reducer;
