import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store';

export const DogGrid = () => {
  const { images, status } = useSelector((state: RootState) => state.dog);
  const navigate = useNavigate();

  if (status === 'loading') return <p>Cargando imágenes...</p>;
  if (status === 'failed') return <p>Error al cargar imágenes.</p>;

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
      gap: '10px' 
    }}>
      {images.map((url, index) => (
        <div 
          key={index} 
          onClick={() => navigate('/detail', { state: { imageUrl: url } })}
          style={{ cursor: 'pointer', overflow: 'hidden', borderRadius: '8px', height: '150px' }}
        >
          <img 
            src={url} 
            alt="Perro" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
      ))}
    </div>
  );
};