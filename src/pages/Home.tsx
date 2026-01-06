import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../store';
import { fetchBreeds, setLoading, setError, setSelectedDog } from '../store/dogSlice';
import { dogService } from '../services/dogService';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const { breeds, allBreedsData, loading, error } = useSelector((state: RootState) => state.dog);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [selectedSubBreed, setSelectedSubBreed] = useState('');
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchBreeds());
  }, [dispatch]);

  const subBreeds = selectedBreed ? allBreedsData[selectedBreed] : [];

  const handleSearch = async () => {
    if (!selectedBreed) return;
    dispatch(setLoading(true));
    try {
      const response = selectedSubBreed 
        ? await dogService.getImagesBySubBreed(selectedBreed, selectedSubBreed)
        : await dogService.getImagesByBreed(selectedBreed);
      setImages(response.message);
    } catch (err) {
      dispatch(setError("Error al cargar imágenes"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoToDetail = (url: string) => {
    dispatch(setSelectedDog({ breed: selectedBreed, subBreed: selectedSubBreed || null, imageUrl: url }));
    navigate('/detail');
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Galería de Perros</h1>
        <p>Encuentra y descarga fotos de tus razas favoritas</p>
      </header>

      <section className="search-box">
        <select value={selectedBreed} onChange={(e) => { setSelectedBreed(e.target.value); setSelectedSubBreed(''); }}>
          <option value="">Selecciona Raza</option>
          {breeds.map(b => <option key={b} value={b}>{b}</option>)}
        </select>

        <select value={selectedSubBreed} onChange={(e) => setSelectedSubBreed(e.target.value)} disabled={subBreeds.length === 0}>
          <option value="">Subraza (opcional)</option>
          {subBreeds.map(sb => <option key={sb} value={sb}>{sb}</option>)}
        </select>

        <button onClick={handleSearch} disabled={!selectedBreed || loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </section>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <main className="dog-grid">
        {images.map((url, index) => (
          <div key={index} className="dog-card" onClick={() => handleGoToDetail(url)}>
            <img src={url} alt="dog" loading="lazy" />
          </div>
        ))}
      </main>
    </div>
  );
};

export default Home;