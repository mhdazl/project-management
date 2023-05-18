const { ValidationError } = require('sequelize');
const { Op } = require('sequelize');
const { Task } = require('../models');

const TaskController = () => {
  const getTasks = async (req, res) => {
    let whereCondition = {};
    console.log(req.query.search);
    if (req.query.search) {
      whereCondition = {
        [Op.or]: {
          title: { [Op.like]: `%${req.query.search}%` },
          description: { [Op.like]: `%${req.query.search}%` },
        },
      };
    }
    const tasks = await Task.findAll({
      where: whereCondition,
      order: [['updated_at', 'DESC']],
    });

    const groupedTasks = tasks.reduce((groups, task) => {
      const { status } = task;

      const updatedGroups = { ...groups };

      if (!updatedGroups[status]) {
        updatedGroups[status] = [];
      }

      updatedGroups[status].push(task);
      return updatedGroups;
    }, {});

    return res.status(200).send({
      tasks: groupedTasks,
      message: 'All tasks',
    });
  };

  const addTask = async (req, res) => {
    try {
      const task = await Task.create({
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority ? req.body.priority : 'Low',
      });

      return res.status(200).send({
        task,
        message: 'Task created',
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        const validationErrors = {};
        error.errors.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        return res.status(400).json({ errors: validationErrors });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  const changeStatus = async (req, res) => {
    try {
      const task = await Task.findByPk(req.body.id);

      if (req.body.status) {
        await task.update({
          status: req.body.status,
        });
      }
      return res.status(200).send({
        task,
        message: 'Task status updated',
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        const validationErrors = {};
        error.errors.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        return res.status(400).json({ errors: validationErrors });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  const deleteTask = async (req, res) => {
    const task = await Task.findByPk(req.query.id);
    task.destroy();

    return res.status(200).send({
      task,
      message: 'Task deleted',
    });
  };

  return {
    getTasks,
    addTask,
    deleteTask,
    changeStatus,
  };
};

module.exports = TaskController;
