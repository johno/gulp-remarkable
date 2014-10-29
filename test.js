'use strict';

// Adapted from https://github.com/sindresorhus/gulp-markdown/blob/master/test.js
var assert = require('assert'),
    gutil  = require('gulp-util'),
    remark = require('./');

it('should convert md to html', function(cb) {
  var stream = remark();

  stream.once('data', function(file) {
    assert.equal(file.relative, 'test.html');
    assert.equal(file.contents.toString(), '<h1>Hello, world</h1>\n');
  });

  stream.on('end', cb);

  stream.write(new gutil.File({
    path: 'test.md',
    contents: new Buffer('# Hello, world')
  }));

  stream.end();
});
