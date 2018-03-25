/**
 * gulp-remarkable <https://github.com/johnotander/gulp-remarkable>
 *
 * Copyright (c) 2014 John Otander, contributors.
 * Released under the MIT license.
 */

'use strict';

/**
 * Module dependencies.
 */
var through = require('through2');
var PluginError = require('plugin-error');
var replaceExtension = require('replace-ext');
var gulpRemarkable = require('./lib/gulp-remarkable');

module.exports = function remarkable(options, fnConfigureMd) {
  return through.obj(function(file, encoding, callback) {
    if (file.isNull()) {
      callback(null, file);
    }

    if (file.isStream()) {
      callback(new PluginError('gulp-remarkable', 'Streaming not supported'));
      return;
    }
    
    try {
      var md = gulpRemarkable(options)

      if (fnConfigureMd) {
        fnConfigureMd(md)
      }

      file.contents = new Buffer(md.render(file.contents.toString()));
      
      file.path = replaceExtension(file.path, '.html');
      this.push(file);
    } catch (err) {
      this.emit('error', new PluginError('gulp-remarkable', err, {fileName: file.path}));
    }

    callback();
  });
};
