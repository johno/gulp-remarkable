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
var gutil = require('gulp-util');
var gulpRemarkable = require('./lib/gulp-remarkable');

module.exports = function remarkable(options) {
  return through.obj(function(file, encoding, callback) {
    if (file.isNull()) {
      callback(null, file);
    }

    if (file.isStream()) {
      callback(new gutil.PluginError('gulp-remarkable', 'Streaming not supported'));
      return;
    }
    
    try {
      var md = gulpRemarkable(options)

      file.contents = new Buffer(md.render(file.contents.toString()));
      
      file.path = gutil.replaceExtension(file.path, '.html');
      this.push(file);
    } catch (err) {
      this.emit('error', new gutil.PluginError('gulp-remarkable', err, {fileName: file.path}));
    }

    callback();
  });
};
