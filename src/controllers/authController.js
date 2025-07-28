const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const jwtConfig = require('../config/jwt.js')
const User = require('../models/user.js')

const register = async (req, res) => {
  try {
    const { name, username, password } = req.body

    console.log('Dados recebidos:', { name, username, password }) // Log de depuração

    if (!name || !username || !password) {
      return res
        .status(400)
        .json({ error: 'Nome, username e senha são obrigatórios' })
    }

    const existingUser = await User.findOne({ where: { username } }) // Modificado para usar findOne
    if (existingUser) {
      return res.status(400).json({ error: 'Username já está em uso' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      username,
      password: hashedPassword,
    })

    const userWithoutPassword = user.toJSON() // Usando o método toJSON que você definiu

    const token = jwt.sign(
      { id: user.id, username: user.username },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    )

    return res.status(201).json({
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    console.error('Erro detalhado:', error) // Log do erro completo
    return res.status(500).json({
      error: 'Erro no cadastro',
      details: error.message, // Retorna a mensagem de erro específica
    })
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body

    // Validações básicas
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: 'Username e senha são obrigatórios' })
    }

    // Busca usuário
    const user = await User.findByUsername(username)
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' })
    }

    // Verifica senha
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas' })
    }

    // Gera token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    )

    // Remove a senha antes de retornar
    const { password: _, ...userWithoutPassword } = user

    return res.json({
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    console.error('Erro detalhado:', error) // Log do erro completo
    return res.status(500).json({
      error: 'Erro no cadastro',
      details: error.message, // Retorna a mensagem de erro específica
    })
  }
}

const getProfile = (req, res) => {
  res.json({ user: req.user })
}

module.exports = {
  register,
  login,
  getProfile,
}
