const publicRoutes = require('./routes/publicRoutes');

module.exports = {
  migrate: false,
  publicRoutes,
  port: process.env.PORT || '5000 ',
  available_env: ['production', 'testing', 'development', 'staging'],
};
