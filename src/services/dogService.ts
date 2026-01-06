import axios from 'axios';
// Cambiamos ImageResponse por ImagesResponse
import type { BreedsResponse, ImagesResponse } from '../types/dog.ts'; 

const BASE_URL = 'https://dog.ceo/api';

export const dogService = {
  getAllBreeds: async () => {
    const response = await axios.get<BreedsResponse>(`${BASE_URL}/breeds/list/all`);
    return response.data;
  },

  getImagesByBreed: async (breed: string) => {
    // Usamos ImagesResponse aquí también
    const response = await axios.get<ImagesResponse>(`${BASE_URL}/breed/${breed}/images`);
    return response.data;
  },

  getImagesBySubBreed: async (breed: string, subBreed: string) => {
    // Y aquí también
    const response = await axios.get<ImagesResponse>(`${BASE_URL}/breed/${breed}/${subBreed}/images`);
    return response.data;
  }
};