import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Dashboard() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [busca, setBusca] = useState('');
  const [buscaId, setBuscaId] = useState('');
  const [buscaTipo, setBuscaTipo] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    carregarEquipamentos();
  }, [filtroStatus]); // Recarrega do backend se o status mudar

  const carregarEquipamentos = async () => {
    try {
      const url = filtroStatus ? `?status=${filtroStatus}` : '';
      const response = await api.get(url);
      setEquipamentos(response.data);
    } catch (err) {
      alert('Erro ao carregar dados');
    }
  };

  const deletar = async (id) => {
    if (window.confirm('Deseja excluir este registro?')) {
      await api.delete(`/${id}`);
      carregarEquipamentos();
    }
  };

  // Filtro combinado no frontend (Nome, ID e Tipo)
  const equipamentosFiltrados = equipamentos.filter(e => {
    const matchNome = e.nome.toLowerCase().includes(busca.toLowerCase());
    const matchId = buscaId ? e.id.toString() === buscaId : true;
    const matchTipo = buscaTipo ? e.tipo === buscaTipo : true;
    
    return matchNome && matchId && matchTipo;
  });

  // Função para gerar o estilo dinâmico do Badge
  const estiloBadge = (status) => ({
    padding: '4px 10px',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '0.85em',
    fontWeight: 'bold',
    backgroundColor: status === 'Ativo' ? '#28a745' : '#dc3545' // Verde para Ativo, Vermelho para Manutenção
  });

  return (
    <div>
      <h2>Dashboard de Ativos</h2>
      
      {/* Área de Filtros */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input 
          placeholder="ID..." 
          value={buscaId} 
          onChange={(e) => setBuscaId(e.target.value)} 
          style={{ width: '80px' }}
        />
        <input 
          placeholder="Busca por nome..." 
          value={busca} 
          onChange={(e) => setBusca(e.target.value)} 
          style={{ flex: 1, minWidth: '200px' }}
        />
        <select value={buscaTipo} onChange={(e) => setBuscaTipo(e.target.value)}>
          <option value="">Todos os Tipos</option>
          <option value="Monitor">Monitor</option>
          <option value="CPU">CPU</option>
          <option value="Teclado">Teclado</option>
        </select>
        <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
          <option value="">Todos os Status</option>
          <option value="Ativo">Ativo</option>
          <option value="Manutenção">Manutenção</option>
        </select>
      </div>

      {/* Grid de Equipamentos */}
      <div style={{ display: 'grid', gap: '15px', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {equipamentosFiltrados.map(e => (
          <div key={e.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            
            {/* Cabeçalho do Card (ID e Badge) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontWeight: 'bold', color: '#666' }}>#{e.id}</span>
              <span style={estiloBadge(e.status)}>{e.status}</span>
            </div>

            {/* Informações do Equipamento */}
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2em' }}>{e.nome}</h3>
            <p style={{ margin: '5px 0', color: '#444' }}>Tipo: <strong>{e.tipo}</strong></p>
            <p style={{ margin: '5px 0', color: '#888', fontSize: '0.9em' }}>
              Aquisição: {new Date(e.data_de_aquisicao).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
            </p>
            
            {/* Botões de Ação */}
            <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
              <button onClick={() => navigate(`/editar/${e.id}`)} style={{ flex: 1 }}>Editar</button>
              <button onClick={() => deletar(e.id)} style={{ flex: 1, background: '#dc3545' }}>Excluir</button>
            </div>
          </div>
        ))}
        
        {/* Mensagem caso a busca não retorne nada */}
        {equipamentosFiltrados.length === 0 && (
          <p style={{ color: '#888' }}>Nenhum equipamento encontrado com esses filtros.</p>
        )}
      </div>
    </div>
  );
}