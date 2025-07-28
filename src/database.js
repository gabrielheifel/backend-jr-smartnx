const { Sequelize } = require('sequelize')
require('dotenv').config()

// Conexão direta com o banco
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
  }
)

// Teste de conexão automático (opcional)
;(async () => {
  try {
    await sequelize.authenticate()
    console.log('Banco de dados conectado!')
  } catch (error) {
    console.error('Erro ao conectar:', error)
  }
})()

module.exports = sequelize // Exporta a instância PRONTA
