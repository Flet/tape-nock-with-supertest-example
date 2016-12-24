var path = require('path');
var tape = require('tape');
var tapeNock = require('tape-nock');

// call tapeNock with tape and an options object
var test = tapeNock(tape, {
  fixtures: path.join(__dirname, 'fixtures')
});

var opts = {
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
    test.nock.enableNetConnect('127.0.0.1');
  }
};

test.options = opts;

module.exports = test;
