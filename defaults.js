'use strict';

/**
 * imports.
 */

var uuid = require('uuid').v4;

/**
 * exports.
 */

module.exports = defaults;

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
