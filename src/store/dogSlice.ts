import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { dogService } from '../services/dogService'; // Asegúrate de que este archivo exista
import type { SelectedDog } from '../types/dog.ts';

// ESTA ES LA PARTE QUE FALTABA: La función que descarga las razas
export const fetchBreeds = createAsyncThunk('dog/fetchBreeds', async () => {
  const data = await dogService.getAllBreeds();
  return data.message;
});

interface DogState {
  breeds: string[];
  allBreedsData: { [key: string]: string[] };
  selectedDog: SelectedDog | null;
  images: string[];
  loading: boolean;
  error: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: DogState = {
  breeds: [],
  allBreedsData: {},
  selectedDog: null,
  images: [],
  loading: false,
  status: 'idle',
  error: null,
};

export const dogSlice = createSlice({
  name: 'dog',
  initialState,
  reducers: {
    setSelectedDog: (state, action: PayloadAction<SelectedDog>) => {
      state.selectedDog = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      state.status = action.payload ? 'loading' : 'idle';
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.status = action.payload ? 'failed' : 'idle';
    },
    setImages: (state, action: PayloadAction<string[]>) => {
      state.images = action.payload;
      state.status = 'succeeded';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBreeds.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(fetchBreeds.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.allBreedsData = action.payload;
        state.breeds = Object.keys(action.payload);
      })
      .addCase(fetchBreeds.rejected, (state) => {
        state.loading = false;
        state.status = 'failed';
        state.error = "No se pudieron cargar las razas.";
      });
  },
});

export const { setSelectedDog, setLoading, setError } = dogSlice.actions;
export default dogSlice.reducer;