
//
// Dependencies
// -------------------------------------
var r        = require('project-base'); // easier local `require`
var Hapi     = require('hapi');
var Lout     = require('lout');
var routes   = require(r+'config/routes.js');
var settings = require(r+'config/settings.js');
var env      = process.env.NODE_ENV;

var server = new Hapi.Server();
server.connection({ port: settings.port });

//
// Register packs
// -------------------------------------
// Packs are basically plugins for Hapi

var packs = [
  Lout,
  {
    register: require('good'), // logging
    options: {
      reporters: [ // ability to send logs to multiple recipients
        {
          reporter: require('good-console'),
          args: [{ log: '*', response: '*', error: '*', request: '*' }]
        }
      ]
    }
  }
];

server.register(packs, function(err) {

  //
  // Register routes
  // -------------------------------------
  server.route(routes);

  //
  // Start server
  // -------------------------------------
  server.start(function() {
    server.log('init', 'Server started at ' + server.info.uri);
  });
});


// Export the server for testing
module.exports = server;

