'use strict';

const express = require('express');
const request = require('superagent');

var app = express();

app.get('/hammer/version', function (req, res) {
  request
        .get('http://httpbin.org/get')
        .end(function (err, response) {
          res.status(200).json({
            version: '0.1.0',
            url: response.body.url
          });
        });
});

module.exports = app;
