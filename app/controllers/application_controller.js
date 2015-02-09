var r = require('project-base');

// Models can be `required` in to your controllers to retrieve data from your
// back end stores

module.exports.index = function (request, reply) {
  return reply.file(r+'app/views/index.html');
};

module.exports.sampleData = function (request, reply) {
  return reply([
    {name: 'frank' , age: 42},
    {name: 'sue'   , age: 44},
    {name: 'jim'   , age: 25},
    {name: 'joe'   , age: 35},
  ]);
};

