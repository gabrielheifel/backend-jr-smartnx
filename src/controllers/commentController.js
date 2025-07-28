const Comment = require('../models/comment.js')
const Post = require('../models/post.js')

const addComment = async (req, res) => {
  try {
    const { postId } = req.params
    const { content } = req.body

    if (!content) {
      return res.status(400).json({ error: 'Conteúdo obrigatório' })
    }

    const post = await Post.findByPk(postId)
    if (!post)
      return res.status(404).json({ error: 'Post não encontrado' })

    // Criação correta do comentário
    const comment = await Comment.create({
      content,
      postId: postId,
      userId: req.user.id,
    })

    return res.status(201).json(comment)
  } catch (error) {
    console.error('Erro ao criar comentário:', error)
    return res.status(500).json({
      error: 'Erro ao criar comentário',
      details:
        process.env.NODE_ENV === 'development' ? error.message : null,
    })
  }
}

const getPostComments = async (req, res) => {
  try {
    const { postId } = req.params

    // Verifica se o post existe
    const postExists = await Post.findByPk(postId)
    if (!postExists) {
      return res.status(404).json({ error: 'Post não encontrado' })
    }

    // Usando findAll com where clause
    const comments = await Comment.findAll({
      where: { postId },
    })

    const post = await Post.findByPk(postId)
    return res.json({ post, comments })
  } catch (error) {
    console.error('Erro ao buscar comentários:', error)
    return res.status(500).json({
      error: 'Erro ao buscar comentários',
      details: error.message,
    })
  }
}

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params

    // Verifica se o comentário existe
    const comment = await Comment.findByPk(commentId)
    if (!comment) {
      return res.status(404).json({ error: 'Comentário não encontrado' })
    }

    if (comment.userId !== req.user.id) {
      return res.status(403).json({
        error: 'Você não tem permissão para excluir este comentário',
      })
    }

    // Usando destroy do Sequelize
    await Comment.destroy({
      where: { id: commentId },
    })

    return res.status(204).send()
  } catch (error) {
    console.error('Erro ao excluir comentário:', error)
    return res.status(500).json({
      error: 'Erro ao excluir comentário',
      details: error.message,
    })
  }
}

module.exports = {
  addComment,
  getPostComments,
  deleteComment,
}
