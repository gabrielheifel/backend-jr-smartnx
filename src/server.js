const app = require('./app.js')
const sequelize = require('./database.js')

// Sincroniza o banco de dados e inicia o servidor
async function startServer() {
  try {
    await sequelize.authenticate()
    console.log('✅ Banco de dados conectado!')

    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`)
    })
  } catch (error) {
    console.error('❌ Falha ao iniciar:', error)
    process.exit(1)
  }
}

startServer()
