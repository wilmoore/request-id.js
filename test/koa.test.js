'use strict';

var requestId = require('..');
var koa = require('koa');
var request = require('supertest');
var fixture = '5d1c557d-a7e6-4169-8a77-3ce972743291';
var assert = require('chai').assert;
var idPattern = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

describe('Koa', function () {
  describe('X-Request-ID', function () {
    it('is a v4 UUID.', function (done) {
      var app = koa();

      app.use(requestId());

      request(app.listen())
        .get('/')
        .expect('X-Request-Id', idPattern, done);
    });

    it('defaults to UUID when non-configured custom request header is set.', function (done) {
      var app = koa();

      app.use(requestId());

      request(app.listen())
        .get('/' + fixture)
        .set('X-Client-ID', fixture)
        .end(function (err, res) {
          assert.isDefined(res.get('X-Request-Id'));
          assert.notEqual(res.get('X-Request-Id'), fixture);
          done();
        })
    });
  });

  describe('.requestId', function () {
    it('is a v4 UUID.', function (done) {
      var app = koa();

      app.use(requestId());

      app.use(function* (next) {
        this.body = this.requestId;
      });

      request(app.listen())
        .get('/')
        .expect(idPattern, done);
    });
  });

  describe('/?requestId', function () {
    it('sets X-Request-Id.', function (done) {
      var app = koa();

      app.use(requestId());

      request(app.listen())
        .get('/?requestId=' + fixture)
        .expect('X-Request-Id', fixture, done);
    });

    it('sets X-Request-Id when present on request', function (done) {
      var app = koa();
      app.use(function *requestId(next) {
        this.requestId = 'something';
        yield* next;
      });
      app.use(requestId());

      request(app.listen())
        .get('/')
        .expect('X-Request-Id', 'something', done);
    });
  });

  describe('requestId({})', function () {
    it('setting `.reqHeader` and making request with matching request header populates response header.', function (done) {
      var app = koa();

      app.use(requestId({
        reqHeader: 'X-Client-ID'
      }));

      request(app.listen())
        .get('/')
        .set('X-Client-ID', fixture)
        .expect('X-Request-Id', fixture, done);
    });

    it('setting .resHeader populates X-Custom-ID response header as a v4 UUID.', function (done) {
      var app = koa();

      app.use(requestId({
        resHeader: 'X-Custom-ID'
      }));

      request(app.listen())
        .get('/')
        .expect('X-Custom-ID', idPattern)
        .end(function (err, res) {
          assert.isUndefined(res.get('X-Request-Id'));
          done();
        })
    });

    it('setting .paramName populates query parameter.', function (done) {
      var app = koa();

      app.use(requestId({
        paramName: 'id'
      }));

      request(app.listen())
        .get('/?id=' + fixture)
        .expect('X-Request-Id', fixture, done);
    });

    it('setting .generator populates response header with custom id.', function (done) {
      var app = koa();
      var gen = function () { return 'ZZZZZ'; };

      app.use(requestId({
        generator: gen
      }));

      request(app.listen())
        .get('/')
        .expect('X-Request-Id', gen(), done);
    });

    it('header is populated in case of error', function (done) {
      var app = koa();

      // the default error handler removes all headers by design,
      // so we use a custom handler
      app.use(function *onerror(next) {
        try {
          yield* next;
        } catch(e) {
          // do nothing
        }
      }).use(requestId()).use(function *err() {
        this.throw();
      });

      request(app.listen())
        .get('/')
        .expect('X-Request-Id', idPattern, done);
    });
  });
});
