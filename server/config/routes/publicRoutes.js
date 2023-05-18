const publicRoutes = {
  'GET /tasks': 'TaskController.getTasks',
  'POST /create-task': 'TaskController.addTask',
  'POST /delete-task': 'TaskController.deleteTask',
  'POST /update-task': 'TaskController.changeStatus',
};

module.exports = publicRoutes;
