'use strict';

var through    = require('through2'),
    gutil      = require('gulp-util'),
    hljs       = require('highlight.js'),
    remarkable = require('remarkable');

module.exports = function(options) {
  return through.obj(function(file, encoding, callback) {
    if (!file.isBuffer()) {
      callback();
    }

    options = options || {};
    options.highlight = options.highlight || highlight;

    var md = new remarkable('full', options);
    var src = file.contents.toString();
    var html = md.render(src);

    file.contents = new Buffer(html);
    file.path = gutil.replaceExtension(file.path, '.html');
    this.push(file);
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
