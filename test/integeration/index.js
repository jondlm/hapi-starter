/*eslint quotes:0 */
var r    = require('__base');
var Code = require('code'); // assertion library
var Lab  = require('lab');
var lab  = exports.lab = Lab.script();

var describe   = lab.describe;
var it         = lab.it;
var expect     = Code.expect;

var server = require(r + 'index.js');

// Override console.log so console messages dont leak out
console.log = function(){};

describe('set of tests', function () {
  it('should succeed with a GET to /', function (done) {
    server.inject({ url: '/' }, function (res) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('should get test data back with a GET to /sample', function (done) {
    server.inject({ url: '/sample' }, function (res) {
      expect(res.payload).to.equal("[{\"name\":\"frank\",\"age\":42},{\"name\":\"sue\",\"age\":44},{\"name\":\"jim\",\"age\":25},{\"name\":\"joe\",\"age\":35}]");
      done();
    });
  });
});

