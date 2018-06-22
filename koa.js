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

  return async function requestId(ctx, next) {
    ctx[options.paramName] = ctx[options.paramName] || ctx.get(options.reqHeader) || ctx.query[options.paramName] || options.generator();
    ctx.set(options.resHeader, ctx[options.paramName]);
    return next();
  };
};
