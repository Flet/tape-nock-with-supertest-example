'use strict';

const request = require('supertest');
const app = require('../app.js');

const test = require('./setup-tape-nock');

// note that we're passing in test.options here
// which has our special "afterRecord" and "before" functions
test('hit version url', function (t) {
  request(app)
    .get('/hammer/version')
    .expect(200, {
      url: 'http://httpbin.org/get',
      version: '0.1.0'
    })
    .end(function (err, res) {
      t.error(err, 'no error');
      t.equals(res.body.url, 'http://httpbin.org/get', 'url is correct');
      t.end();
    });
});
