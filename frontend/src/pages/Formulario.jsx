import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Formulario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: '', tipo: 'Monitor', data_de_aquisicao: '', status: 'Ativo' });

  useEffect(() => {
    if (id) {
      api.get('/').then(res => {
        const item = res.data.find(e => e.id === parseInt(id));
        if (item) setForm(item);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação manual simples 
    if (!form.nome || !form.data_de_aquisicao) {
      return alert('Preencha todos os campos obrigatórios!');
    }

    try {
      if (id) {
        await api.put(`/${id}`, form);
      } else {
        await api.post('/', form);
      }
      navigate('/');
    } catch (err) {
      alert('Erro ao salvar');
    }
  };

  return (
    <div>
      <h2>{id ? 'Editar' : 'Novo'} Equipamento</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <input 
          placeholder="Nome do Equipamento" 
          value={form.nome} 
          onChange={e => setForm({...form, nome: e.target.value})} 
          required 
        />
        
        <select value={form.tipo} onChange={e => setForm({...form, tipo: e.target.value})}>
          <option value="Monitor">Monitor</option>
          <option value="CPU">CPU</option>
          <option value="Teclado">Teclado</option>
        </select>

        <input 
          type="date" 
          value={form.data_de_aquisicao ? form.data_de_aquisicao.split('T')[0] : ''} 
          onChange={e => setForm({...form, data_de_aquisicao: e.target.value})} 
          required 
        />

        <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
          <option value="Ativo">Ativo</option>
          <option value="Manutenção">Manutenção</option>
        </select>

        <button type="submit">Salvar</button>
        <button type="button" onClick={() => navigate('/')} style={{ background: '#ccc' }}>Cancelar</button>
      </form>
    </div>
  );
}