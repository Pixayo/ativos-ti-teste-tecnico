const db = require('./db');

const criarEquipamento = async (req, res) => {
  try {
    const { nome, tipo, data_de_aquisicao, status } = req.body;

    const query = `
      INSERT INTO equipamentos (nome, tipo, data_de_aquisicao, status) 
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    
    const valores = [nome, tipo, data_de_aquisicao, status];
    const resultado = await db.query(query, valores);

    res.status(201).json(resultado.rows[0]);
  } catch (erro) {
    console.error("Erro no banco de dados:", erro);
    res.status(500).json({ erro: 'Erro ao cadastrar' });
  }
};

const listarEquipamentos = async (req, res) => {
  try {
    const { tipo, status } = req.query;

    let query = 'SELECT * FROM equipamentos WHERE 1=1';
    const valores = [];
    let contador = 1;

    if (tipo) { 
      query += ` AND tipo = $${contador}`; 
      valores.push(tipo); 
      contador++; 
    }
    
    if (status) { 
      query += ` AND status = $${contador}`; 
      valores.push(status); 
    }

    query += ' ORDER BY created_at DESC';
    const resultado = await db.query(query, valores);

    res.status(200).json(resultado.rows);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar' });
  }
};

const atualizarEquipamento = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, tipo, data_de_aquisicao, status } = req.body;

    const query = `
      UPDATE equipamentos 
      SET nome = $1, tipo = $2, data_de_aquisicao = $3, status = $4
      WHERE id = $5 RETURNING *;
    `;
    
    const valores = [nome, tipo, data_de_aquisicao, status, id];
    const resultado = await db.query(query, valores);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: 'Equipamento não encontrado' });
    }

    res.status(200).json(resultado.rows[0]);
  } catch (erro) {
    console.error("Erro ao atualizar:", erro);
    res.status(500).json({ erro: 'Erro ao atualizar' });
  }
};

const deletarEquipamento = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query('DELETE FROM equipamentos WHERE id = $1', [id]);

    res.status(204).send();
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao deletar' });
  }
};

module.exports = {
  criarEquipamento,
  listarEquipamentos,
  atualizarEquipamento,
  deletarEquipamento
};