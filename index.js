//
// Index
// -----------------------------------------------------------------------------
// This is the entry point file for the server

//
// Dependencies
// -------------------------------------
var r        = require('__base'); // easier local `require`
var Hapi     = require('hapi');
var Lout     = require('lout');
var routes   = require(r + 'src/server/config/routes');
var settings = require(r + 'src/server/config/settings');
var log      = require(r + 'src/server/util/log');

var server = new Hapi.Server();
server.connection({
  port: settings.get('port')
});

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
          reporter: require('good-bunyan'),
          events: { log: '*', response: '*', error: '*', request: '*' },
          config: {
            logger: log,
            levels: { response: 'info' }
          }
        }
      ]
    }
  }
];

server.register(packs, function(err) {
  if (err) { log.fatal(err); }

  //
  // Register routes
  // -------------------------------------
  server.route(routes);

  //
  // Start server
  // -------------------------------------
  server.start(function() {
    log.info('Server started at ' + server.info.uri);
  });
});


// Export the server for testing
module.exports = server;

