//
// Application Controller
// -----------------------------------------------------------------------------
//
// This is the main controller for our application. Typically it will serve
// up the index page for our single page app to take over from.

var r = require('__base');

// Models can be `required` in to your controllers to retrieve data from your
// back end stores

module.exports.index = function (request, reply) {
  return reply.file(r + 'src/server/views/index.html');
};

module.exports.err = function (request, reply) {
  return reply.test.test.nope();
};

module.exports.sampleData = function (request, reply) {
  return reply([
    {name: 'frank', age: 42},
    {name: 'sue', age: 44},
    {name: 'jim', age: 25},
    {name: 'joe', age: 35},
  ]);
};

