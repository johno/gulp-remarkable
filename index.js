'use strict';

var through    = require('through2');
var gutil      = require('gulp-util');
var hljs       = require('highlight.js');
var Remarkable = require('remarkable');

module.exports = function(options) {
  return through.obj(function(file, encoding, callback) {
    if (file.isNull()) {
      callback(null, file);
    }

    if (file.isStream()) {
      callback(new gutil.PluginError('gulp-remarkable', 'Streaming not supported'));
      return;
    }
    

    try {
      options = options || {};
      options.typographer = options.typographer || {};
      options.remarkableOptions = options.remarkableOptions || {};
      options.remarkableOptions.highlight = options.remarkableOptions.highlight || highlight

      var md = new Remarkable(options.preset || 'commonmark', options.remarkableOptions)

      if (options.remarkableOptions.typographer) {
        md.typographer.set(options.typographer)
      }

      file.contents = new Buffer(md.render(file.contents.toString()));
      
      file.path = gutil.replaceExtension(file.path, '.html');
      this.push(file);
    } catch (err) {
      this.emit('error', new gutil.PluginError('gulp-remarkable', err, {fileName: file.path}));
    }

    callback();
  });
};

function highlight(str, lang) {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str).value;
    } catch (err) {}
  }

  try {
    return hljs.highlightAuto(str).value;
  } catch (err) {}

  return '';
}
