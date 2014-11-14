# request-id

[![Build Status](http://img.shields.io/travis/wilmoore/request-id.js.svg)](https://travis-ci.org/wilmoore/request-id.js) [![NPM version](http://img.shields.io/npm/v/request-id.svg)](https://www.npmjs.org/package/request-id) [![NPM downloads](http://img.shields.io/npm/dm/request-id.svg)](https://www.npmjs.org/package/request-id) [![LICENSE](http://img.shields.io/npm/l/request-id.svg)](license)

> Allows you to identify client requests within non-sequential logs such as Syslog by adding a response header of `X-Request-Id`. Allows setting value via query parameter or request header. For Koa and Express.

    $ npm install request-id

## Usage

###### Quick Start (koa or express)

    # koa
    var requestId = require('request-id');
    var app = require('koa')();
    app.use(requestId());

    # express
    var requestId = require('request-id/express');
    var app = require('express')();
    app.use(requestId());

###### Random ID

    % curl example.com
    //=> X-Client-ID: a37cacc3-71d5-40f0-a329-a051a3949ced

###### Set ID via request header

    % curl -H 'X-Request-ID:a37cacc3-71d5-40f0-a329-a051a3949ced' example.com
    //=> X-Request-ID: a37cacc3-71d5-40f0-a329-a051a3949ced

###### Set ID via query param

    % curl example.com?requestId=a37cacc3-71d5-40f0-a329-a051a3949ced
    //=> X-Request-ID: a37cacc3-71d5-40f0-a329-a051a3949ced

## Options

###### Custom Response Header (default: `X-Request-Id`)

    app.use(requestId({
      resHeader: 'X-Client-ID'
    }));

    % curl example.com
    //=> X-Client-ID: a37cacc3-71d5-40f0-a329-a051a3949ced

###### Custom Request Header (default: `X-Request-Id`)

> Keep in mind that changing the request header does not have any effect on the default response header. If you want them to match, you'll need to set both `.resHeader` and `.reqHeader`.

    app.use(requestId({
      reqHeader: 'X-Client-ID'
    }));

    % curl -H 'X-Client-ID:a37cacc3-71d5-40f0-a329-a051a3949ced' example.com
    //=> X-Request-ID: a37cacc3-71d5-40f0-a329-a051a3949ced

###### Custom Query Parameter (default: `requestId`)

    app.use(requestId({
      paramName: 'requestId'
    }));

    % curl example.com?requestId=a37cacc3-71d5-40f0-a329-a051a3949ced
    //=> X-Request-ID: a37cacc3-71d5-40f0-a329-a051a3949ced

###### Custom Value Generator Function (default: [node-uuid.v4])

    app.use(requestId({
      generator: function () { return 'ABC'; }
    }));

    % curl example.com
    //=> X-Request-ID: ABC

## Alternatives

- [connect-rid]
- [connect-request-id]
- [connect-requestid]
- [express-request-id]
- [koa-request-id]
- [request-id-middleware]

## License

  [MIT](license)

[connect-rid]:            https://www.npmjs.org/package/connect-rid
[node-uuid.v4]:           https://github.com/broofa/node-uuid#uuidv4options--buffer--offset
[koa-request-id]:         https://www.npmjs.org/package/koa-request-id
[express-request-id]:     https://www.npmjs.org/package/express-request-id
[connect-request-id]:     https://www.npmjs.org/package/connect-request-id
[request-id-middleware]:  https://www.npmjs.org/package/request-id-middleware
[connect-requestid]:      https://www.npmjs.org/package/connect-requestid

