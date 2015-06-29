//
// Routes
// -----------------------------------------------------------------------------
//
// This should contain all the routes for your application. Keeping them in one
// location helps on-board new developers and keeps things tidy. If your app
// grows to be huge, it sometimes makes sense to break the routes into their
// own files, but I wouldn't recommend it unless you have 100+ routes or so.

var r = require('__base');

//
// Controllers
// -------------------------------------
//
// Here we require in any controllers which export handlers that we can hook up
// to our routes.

var applicationController = require(r + 'src/server/controllers/application_controller');

// Export an array of routes
module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: applicationController.index // This is the "what" for a given route
  },
  {
    method: 'GET',
    path: '/sample',
    handler: applicationController.sampleData
  },
  {
    // Serve static files out of the `public` directory, in production this
    // should be done by nginx or a CDN
    method: 'GET',
    path: '/{path*}',
    handler: { directory: { path: r + 'public' } }
  }
];

