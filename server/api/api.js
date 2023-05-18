/**
 * third party libraries
 */
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const http = require('http');

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const mapRoutes = require('express-routes-mapper');
const bodyParser = require('body-parser');
const sequelize = require('../config/database');

/**
 * server configuration
 */
const config = require('../config');

/**
 * express application
 */
const api = express();

const server = http.Server(api);
const mappedRoutes = mapRoutes(config.publicRoutes, 'api/controllers/');

// allow cross origin requests
// configure to allow only requests from certain origins
api.use(cors());

// secure express app
api.use(
  helmet({
    dnsPrefetchControl: false,
    frameguard: false,
    ieNoOpen: false,
  })
);

// parsing the request bodys
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());

// public REST API
api.use('/api', mappedRoutes);

sequelize
  .sync()
  // .sync({ alter: true })
  .then(() => {
    server.listen(config.port, () => {
      if (!config.available_env.includes(process.env.NODE_ENV)) {
        console.error(
          `NODE_ENV is set to ${process.env.NODE_ENV}, but only production, development and testing are valid.`
        );
        process.exit(1);
      }
      console.log('Server running on Port:', config.port);
    });
  })
  .catch((err) => {
    console.error(err);
  });
