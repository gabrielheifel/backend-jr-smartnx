const { DataTypes } = require('sequelize')
const sequelize = require('../database')

const Comment = sequelize.define(
  'Comment',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Posts',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
    underscored: true,
    tableName: 'comments',
  }
)

Comment.associate = (models) => {
  Comment.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' })
  Comment.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
}

module.exports = Comment
