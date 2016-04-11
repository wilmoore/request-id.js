'use strict';

/**
 * imports.
 */

var defaults = require('./defaults');

/**
 * Adds a response header of `X-Request-Id` with a unique value for log aggregation.
 *
 * @param {String} name
 * Header or query-string name.
 *
 * @param {Object} options
 * see `defaults` function for details.
 *
 * @return {Function}
 * Koa middleware.
 */

module.exports = function requestId(options) {
  var options = defaults(options);

  return function *requestId(next) {
    this[options.paramName] = this[options.paramName] || this.get(options.reqHeader) || this.query[options.paramName] || options.generator();
    this.set(options.resHeader, this[options.paramName]);
    yield* next;
  };
};
