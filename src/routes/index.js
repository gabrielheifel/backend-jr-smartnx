const authRoutes = require('./authRoutes.js')

function registerRoutes(app) {
  app.use('/auth', authRoutes)
}

module.exports = registerRoutes
