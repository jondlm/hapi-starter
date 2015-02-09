var r        = require('project-base');
var Joi      = require('joi');
var Hapi     = require('hapi');
var settings = require(r+'config/settings.js');

// Controllers
var applicationController = require(r+'app/controllers/application_controller.js');

// Export an array of routes
module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: applicationController.index
  },
  {
    method: 'GET',
    path: '/sample',
    handler: applicationController.sampleData
  },
  { // Static file serving out of the `public` directory, in production this
    // should be done by nginx or a CDN
    method: 'GET',
    path: '/{path*}',
    handler: { directory: { path: 'public' } }
  }
];

