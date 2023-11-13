"use strict";

const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Simple eCommerce',
      version: '1.0.0',
      description: 'eCommerce, for CMS and frontend.',
    },
  },
  apis: ['./app.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {swaggerSpec};