
export interface BreedsResponse {
  message: { [key: string]: string[] };
  status: string;
}

export interface ImagesResponse {
  message: string[];
  status: string;
}

export interface SelectedDog {
  breed: string;
  subBreed: string | null;
  imageUrl: string;
}