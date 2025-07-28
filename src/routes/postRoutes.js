const Router = require('express')
const {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
} = require('../controllers/postController.js')
const authMiddleware = require('../middlewares/authMiddleware.js')

const router = Router()

// Todas as rotas exigem autenticação
router.use(authMiddleware)

// CRUD de Posts
router.post('/', createPost)
router.get('/', getAllPosts)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)

module.exports = router
