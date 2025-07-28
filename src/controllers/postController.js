const Post = require('../models/post')
const User = require('../models/user')

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body

    if (!title || !content) {
      return res
        .status(400)
        .json({ error: 'Título e conteúdo são obrigatórios' })
    }

    const post = await Post.create({
      title,
      content,
      userId: req.user.id,
    })

    return res.status(201).json(post)
  } catch (error) {
    console.error('Erro detalhado:', error) // Log do erro completo
    return res.status(500).json({
      error: 'Erro ao criar post',
      details: error.message, // Retorna a mensagem de erro específica
    })
  }
}

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll()
    return res.json(posts)
  } catch (error) {
    console.error('Erro detalhado:', error) // Log do erro completo
    return res.status(500).json({
      error: 'Erro ao buscar post',
      details: error.message, // Retorna a mensagem de erro específica
    })
  }
}

const updatePost = async (req, res) => {
  try {
    const { id } = req.params
    const { title, content } = req.body
    const userId = req.user.id

    const [updated] = await Post.update(
      { title, content },
      {
        where: { id, userId },
      }
    )

    if (!updated) {
      return res
        .status(404)
        .json({ error: 'Post não encontrado ou sem permissão' })
    }

    const updatedPost = await Post.findByPk(id)
    return res.json(updatedPost)
  } catch (error) {
    console.error('Erro:', error)
    return res.status(500).json({ error: 'Erro ao atualizar post' })
  }
}

const deletePost = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    const deleted = await Post.destroy({
      where: {
        id,
        userId,
      },
    })

    if (!deleted) {
      return res.status(404).json({
        error: 'Post não encontrado ou sem permissão',
      })
    }

    return res.status(204).send()
  } catch (error) {
    console.error('Erro:', error)
    return res.status(500).json({
      error: 'Erro ao excluir post',
      details:
        process.env.NODE_ENV === 'development' ? error.message : null,
    })
  }
}

module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
}
