//
// Settings
// -----------------------------------------------------------------------------
// This file helps with configuring your server. It also has some extra
// features to help changing your setting based on environment. The `nconf`
// library does most of the heavy lifting.

var n = require('nconf');

var defaults = {
  port: 8888,
  bunyan: {
    name: 'hs', // stands for hapi-starter
    level: 'debug',
  },
};

//
// Overrides
// -------------------------------------
// above. E.g if you have the environment variable `NODE_ENV=production` set
// when you run the server, the `port` will be 80 instead of 8080. This is
// useful for deploying to different environments.

var allOverrides = {
  production: {
    port: 80
  },
  test: {
    bunyan: {
      level: 'fatal' // hide all but fatal messages when testing
    }
  }
};

// If the machine has the env var `NODE_ENV` set then load its overrides
var overrides = {};
if (process.env.NODE_ENV) {
  overrides = allOverrides[process.env.NODE_ENV];
}

// Load configuration with environment variable overrides. This allows you to
// override specific settings with environment variables, e.g. `port=8899`. Use
// the bash friendly double underscore to denote object depth.
n.env({ separator: '__' })
 .add('overrides', { type: 'literal', store: overrides })
 .defaults(defaults);

//
// Export the nconf object
// -------------------------------------
// To get settings from `n` use `n.get('bunyan:name')` for example

module.exports = n;

