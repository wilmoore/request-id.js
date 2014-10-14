'use strict';

/**
 * imports.
 */

var uuid = require('node-uuid').v4;

/**
 * Initialize Default Options.
 *
 * @param {Object} options
 * Optional configuraiton.
 *
 * @param {String} [options.reqHeader='X-Request-Id']
 * Request Header Name.
 *
 * @param {String} [options.resHeader='X-Request-Id']
 * Response Header Name.
 *
 * @param {String} [options.paramName='requestId']
 * Query Parameter.
 *
 * @param {Function} [options.generator=uuid]
 * Generator Function.
 *
 * @return {Object}
 * Optional configuration.
 */

function defaults(options) {
  options = options || {};

  return {
    reqHeader: options.reqHeader || 'X-Request-Id',
    resHeader: options.resHeader || 'X-Request-Id',
    paramName: options.paramName || 'requestId',
    generator: options.generator || uuid
  };
}

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

exports.koa = function koa(options) {
  var options = defaults(options);

  return function *requstId(next) {
    this[options.paramName] = this.get(options.reqHeader) || this.query[options.paramName] || options.generator();
    yield next;
    this.set(options.resHeader, this[options.paramName]);
  };
};

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
 * Express middleware.
 */

exports.express = function express(options) {
  var options = defaults(options);

  return function expressRequestId(req, res, next) {
    req[options.paramName] = req.get(options.reqHeader) || req.query[options.paramName] || options.generator();
    res.setHeader(options.resHeader, req[options.paramName]);
    next();
  };
};
