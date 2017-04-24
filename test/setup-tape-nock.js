'use strict';

var tape = require('tape');
const tapeNock = require('tape-nock');
const nock = tapeNock.nock;

const opts = {
  // after recording the fixtures, remove any scopes that hit 127.0.0.1
  // this is not necessary with our before function below, but it makes it a bit cleaner.
  afterRecord: function (scopes) {
    var localhost = /http:\/\/127\.0\.0\.1.*/;
    scopes = scopes.filter(function (s) {
      return !localhost.test(s.scope);
    });

    return scopes;
  },
  before: function () {
    // allow connections to 127.0.0.1 even when NOCK_BACK_MODE=lockdown
    nock.enableNetConnect('127.0.0.1');
  }
};

// call tapeNock with tape and an options object
module.exports = tapeNock(tape, { defaultTestOptions: opts });
