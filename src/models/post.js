const { DataTypes } = require('sequelize')
const sequelize = require('../database')

const Post = sequelize.define(
  'Post',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Assumindo que você tem uma tabela Users
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
    underscored: true,
    tableName: 'posts',
  }
)

Post.associate = (models) => {
  Post.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
  Post.hasMany(models.Comment, { foreignKey: 'postId', as: 'comments' })
}

module.exports = Post
