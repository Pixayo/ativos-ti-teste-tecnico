const db = require('./db');

const newTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS equipamentos (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      tipo VARCHAR(50) NOT NULL,
      data_de_aquisicao DATE NOT NULL,
      status VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await db.query(sql);
    console.log("Tabela 'equipamentos' pronta!");
  } catch (err) {
    console.error("Erro: init-db: ", err);
  }
  process.exit();
};

newTable();