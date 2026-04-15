import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Formulario from './pages/Formulario';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/novo" element={<Formulario />} />
          <Route path="/editar/:id" element={<Formulario />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;