const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  secret: process.env.JWT_SECRET || 'segredo_super_secreto',
  expiresIn: '1h',
}
