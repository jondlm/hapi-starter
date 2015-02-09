var r = require('project-base');
var n = require('nconf');
var path = require('path');

var defaults = {
  port: 8080
};

//
// Overrides
// -------------------------------------
//
// Overrides allow you to use environment variables to supersede the defaults
// above. For example, if you have the environment variables `NODE_ENV=dev` set
// when you run the server, the `port` will be 8081 instead of 8080. This is
// useful for deploying to different environments.
//
// If you need to set nested object values, use the bash friendly double
// underscore separator to signify this.

var allOverrides = {
  dev: {
    port: 8081
  }
};

// If the machine has the env var `NODE_ENV` set then load its overrides
var overrides = {};
if (process.env.NODE_ENV) {
  overrides = allOverrides[process.env.NODE_ENV];
}

// Load configuration
n.env({ separator: '__' })
 .add('overrides', { type: 'literal', store: overrides })
 .defaults(defaults);

//
// Export the merged settings
// -------------------------------------
module.exports = n.get();

