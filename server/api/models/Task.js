const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const Task = sequelize.define(
  'tasks',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: 'to_do',
    },
    title: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title cannot be empty',
        },
        notNull: {
          msg: 'Invalid Title',
        },
      },
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Description cannot be empty',
        },
        notNull: {
          msg: 'Invalid description',
        },
      },
    },
    priority: {
      type: Sequelize.STRING,
      defaultValue: 'Low',
    },
    order: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
    user_id: {
      type: Sequelize.STRING,
      defaultValue: 1,
    },
  },
  { timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' }
);

module.exports = { Task };
