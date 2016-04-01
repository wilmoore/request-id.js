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
 * Express middleware.
 */

module.exports = function requestId(options) {
  var options = defaults(options);

  return function requestId(req, res, next) {
    req[options.paramName] = req[options.paramName] || req.get(options.reqHeader) || req.query[options.paramName] || options.generator();
    res.setHeader(options.resHeader, req[options.paramName]);
    next();
  };
};
