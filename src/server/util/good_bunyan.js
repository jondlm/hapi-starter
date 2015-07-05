/*eslint no-underscore-dangle:0 */

var squeeze = require('good-squeeze').Squeeze;
var EVENTS = {
  REQUEST: 'request',
  RESPONSE: 'response',
  OPS: 'ops',
  ERROR: 'error',
  LOG: 'log'
};

/**
 * GoodBunyan
 *
 * See https://github.com/hapijs/good#reporter-interface for more details
 *
 * @param {object} events
 * @param {object} config
 * @param {Bunyan} config.bunyanInstance - an instance of a bunyan logger
 * @return {undefined}
 */
function GoodBunyan (events, config) {
    if (!(this instanceof GoodBunyan)) {
        return new GoodBunyan(events, config);
    }

    if (!config || !config.bunyanInstance) {
      throw new Error('Please specify a `bunyanInstance` option on the config object passed to good-bunyan.');
    }

    this._filter = squeeze(events);
    this._bunyan = config.bunyanInstance;
}

GoodBunyan.prototype.init = function (readstream, emitter, callback) {
  var that = this;
  var opts = {};

    if (!readstream._readableState.objectMode) {
        return callback(new Error('stream must be in object mode'));
    }

    readstream.pipe(that._filter).on('data', function (data) {
      if (data.tags) {
        opts.tags = data.tags;
      }

      if (data.event === EVENTS.RESPONSE) {
        // req_id is a defacto identifier for bunyan
        // https://github.com/trentm/node-bunyan#log-record-fields
        opts.req_id = stripId(data.id); // eslint-disable-line
        opts.method = data.method;
        opts.path = data.path;
        opts.msec = data.responseTime;

        return that._bunyan.info(opts, 'response', data.responseTime);
      }

      // TODO: more specific logging for each type of event
      if (
        data.event === EVENTS.REQUEST ||
        data.event === EVENTS.OPS ||
        data.event === EVENTS.LOG
      ) {
        opts.data = data;

        return that._bunyan.info(data, data.event);
      }

      if (data.event === EVENTS.ERROR) {
        return that._bunyan.error({ data: data }, data.event);
      }

    });

    callback();
};

/**
 * stripId
 *
 * The default hapi request id is verbose, this function strips it down to just
 * the last integer for readability.
 *
 * @param {string} reqId - Hapi request id, e.g. "1428518309225:jdelamotte.local:33729:i892x0zq:10000"
 * @return {number} - an integer request id
 */
function stripId (reqId) {
	reqId = reqId || '';
	return parseInt(reqId.split(':')[4], 10);
}

module.exports = GoodBunyan;
