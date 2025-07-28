const Router = require('express')
const {
  addComment,
  getPostComments,
  deleteComment,
} = require('../controllers/commentController.js')
const authMiddleware = require('../middlewares/authMiddleware.js')

const router = Router()

router.use(authMiddleware)

router.post('/:postId', addComment)
router.get('/:postId', getPostComments)
router.delete('/:commentId', deleteComment)

module.exports = router
