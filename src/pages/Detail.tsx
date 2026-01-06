import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store';

const Detail = () => {
  const navigate = useNavigate();
  const { selectedDog } = useSelector((state: RootState) => state.dog);

  if (!selectedDog) {
    return (
      <div className="container" style={{ textAlign: 'center' }}>
        <p>No hay un perro seleccionado para mostrar.</p>
        <button onClick={() => navigate('/')}>Volver al Inicio</button>
      </div>
    );
  }

  const { breed, subBreed, imageUrl } = selectedDog;

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      const fileName = subBreed ? `${breed}_${subBreed}.jpg` : `${breed}.jpg`;
      link.download = fileName;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Hubo un problema al descargar la imagen.");
    }
  };

  return (
    <div className="container">
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => navigate('/')} style={{ background: '#6c757d' }}>
          ← Regresar a la Galería
        </button>
      </div>

      <div className="dog-card" style={{ maxWidth: '600px', margin: '0 auto', cursor: 'default' }}>
        <img src={imageUrl} alt={breed} style={{ height: 'auto', maxHeight: '500px' }} />
        
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2 style={{ margin: '0', color: '#2c3e50' }}>
            Raza: {breed.charAt(0).toUpperCase() + breed.slice(1)}
          </h2>
          {subBreed && (
            <h4 style={{ margin: '10px 0', color: '#7f8c8d' }}>
              Subraza: {subBreed.charAt(0).toUpperCase() + subBreed.slice(1)}
            </h4>
          )}
          
          <button 
            onClick={handleDownload}
            style={{ 
              marginTop: '20px', 
              background: '#27ae60', 
              width: '100%',
              fontSize: '18px'
            }}
          >
            Descargar Imagen
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;