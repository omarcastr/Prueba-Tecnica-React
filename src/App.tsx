import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail.tsx';
import './App.css'; // Aquí es donde pondremos los estilos que te pasé antes

function App() {
  return (
    <div className="main-wrapper">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;