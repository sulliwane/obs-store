'use strict';

var TransformStream = require('through2').obj;

module.exports = transformStore;

function transformStore(syncTransformFn) {
  return TransformStream(function (state, enc, cb) {
    try {
      var newState = syncTransformFn(state);
      cb(null, newState);
    } catch (err) {
      cb(err);
    }
  });
}