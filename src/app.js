const express = require('express')
const authRoutes = require('./routes/authRoutes.js')
const postRoutes = require('./routes/postRoutes.js')
const commentRoutes = require('./routes/commentRoutes.js')

const app = express()

app.use(express.json())
app.use('/auth', authRoutes)
app.use('/posts', postRoutes)
app.use('/comments', commentRoutes)

// Rota de saúde
app.get('/health', (req, res) => {
  res.json({ status: 'API funcionando' })
})

module.exports = app
