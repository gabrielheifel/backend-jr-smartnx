const Post = require('../models/post.js')

async function isPostOwner(req, res, next) {
  const post = await Post.findByPk(req.params.id)
  if (!post) {
    return res.status(404).json({ message: 'Post não encontrado' })
  }
  if (post.userId !== req.user.id) {
    return res
      .status(403)
      .json({ message: 'Acesso negado: você não é o dono do post' })
  }
  req.post = post
  next()
}

module.exports = isPostOwner
