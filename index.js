
//
// Dependencies
// -------------------------------------
var r        = require('__base'); // easier local `require`
var Hapi     = require('hapi');
var Lout     = require('lout');
var routes   = require(r + 'src/server/config/routes');
var settings = require(r + 'src/server/config/settings');

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
          events: { log: '*', response: '*', error: '*', request: '*' }
        }
      ]
    }
  }
];

server.register(packs, function(err) {
  if (err) { console.log(err); }

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

