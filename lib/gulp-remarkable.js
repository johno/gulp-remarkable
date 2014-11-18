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
var hljs = require('highlight.js');
var Remarkable = require('remarkable');

module.exports = function gulpRemarkable(options) {
  options = options || {};
  options.disable = options.disable || [];
  options.remarkableOptions = options.remarkableOptions || {};
  options.remarkableOptions.highlight = options.remarkableOptions.highlight || highlight;

  var md = new Remarkable(options.preset || 'full', options.remarkableOptions);

  if (options.disable && options.disable.length) {
    md.core.ruler.disable(options.disable);
  }

  return md;
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
