const { DataTypes } = require('sequelize')
const sequelize = require('../database.js')

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100],
      },
    },
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-zA-Z0-9_]+$/,
        len: [3, 30],
      },
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    tableName: 'users',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        unique: true,
        fields: ['username'],
      },
    ],
  }
)

User.associate = (models) => {
  User.hasMany(models.Post, {
    foreignKey: 'userId',
    as: 'posts',
  })
}

User.findByUsername = async function (username) {
  return this.findOne({ where: { username } })
}

module.exports = User
