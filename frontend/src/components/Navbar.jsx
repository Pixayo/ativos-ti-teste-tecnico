import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ display: 'flex', gap: '20px', padding: '10px', background: '#eee' }}>
      <Link to="/">Dashboard (Lista)</Link>
      <Link to="/novo">Cadastrar Equipamento</Link>
    </nav>
  );
}