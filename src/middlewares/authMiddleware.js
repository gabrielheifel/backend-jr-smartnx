const jwt = require('jsonwebtoken')
const jwtConfig = require('../config/jwt.js')

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' })
  }

  const [bearer, token] = authHeader.split(' ')

  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Formato de token inválido' })
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.secret)
    req.user = {
      id: decoded.id,
      username: decoded.username,
    }
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido ou expirado' })
  }
}

module.exports = authMiddleware
