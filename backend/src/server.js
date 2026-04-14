const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());


app.post('/equipamentos', async (req, res) => {
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
});

app.get('/equipamentos', async (req, res) => {
  try {
    const { tipo, status } = req.query;

    let query = 'SELECT * FROM equipamentos WHERE 1=1';

    const valores = [];
    let contador = 1;

    if (tipo) { query += ` AND tipo = $${contador}`; valores.push(tipo); contador++; }
    if (status) { query += ` AND status = $${contador}`; valores.push(status); }

    query += ' ORDER BY created_at DESC';
    const resultado = await db.query(query, valores);

    res.status(200).json(resultado.rows);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar' });
  }
});

app.delete('/equipamentos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await db.query('DELETE FROM equipamentos WHERE id = $1', [id]);

    res.status(204).send();
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao deletar' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});