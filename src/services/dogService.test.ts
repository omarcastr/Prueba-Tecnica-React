/**
 * @vitest-environment node
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { dogService } from './dogService';

vi.mock('axios');
const mockedAxios = axios as any;

describe('dogService', () => {
  
  beforeEach(() => {
    vi.clearAllMocks(); 
  });

  describe('getAllBreeds', () => {
    it('debe obtener todas las razas correctamente', async () => {
      const mockData = {
        data: {
          message: { labrador: [], retriever: ['golden'] },
          status: 'success'
        }
      };
      mockedAxios.get.mockResolvedValueOnce(mockData);

      const result = await dogService.getAllBreeds();

      expect(mockedAxios.get).toHaveBeenCalledWith('https://dog.ceo/api/breeds/list/all');
      expect(result).toEqual(mockData.data);
    });
  });

  describe('getImagesByBreed', () => {
    it('debe obtener imágenes de una raza específica', async () => {
      const breed = 'beagle';
      const mockData = {
        data: {
          message: ['url1.jpg', 'url2.jpg'],
          status: 'success'
        }
      };
      mockedAxios.get.mockResolvedValueOnce(mockData);

      const result = await dogService.getImagesByBreed(breed);

      expect(mockedAxios.get).toHaveBeenCalledWith(`https://dog.ceo/api/breed/${breed}/images`);
      expect(result).toEqual(mockData.data);
    });
  });

  describe('getImagesBySubBreed', () => {
    it('debe construir la URL correctamente para una sub-raza', async () => {
      const breed = 'hound';
      const subBreed = 'afghan';
      const mockData = { data: { message: ['img.jpg'], status: 'success' } };
      
      mockedAxios.get.mockResolvedValueOnce(mockData);

      const result = await dogService.getImagesBySubBreed(breed, subBreed);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `https://dog.ceo/api/breed/${breed}/${subBreed}/images`
      );
      expect(result).toEqual(mockData.data);
    });
  });

  describe('Manejo de errores', () => {
    it('debe lanzar un error si la petición falla', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

      await expect(dogService.getAllBreeds()).rejects.toThrow('Network Error');
    });
  });
});