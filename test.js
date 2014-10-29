'use strict';

var assert = require('assert'),
    gutil  = require('gulp-util'),
    hljs   = require('highlight.js'),
    remark = require('./');

it('should convert md to html', function(cb) {
  var stream = remark({ highlightjs: true });

  var expectedOutput = '<h1>Hello, world!</h1>\n';
  var knownInput     = '# Hello, world! #';

  stream.once('data', function(file) {
    assert.equal(file.relative, 'test.html');
    assert.equal(file.contents.toString(), expectedOutput);
  });

  stream.on('end', cb);

  stream.write(new gutil.File({
    path: 'test.md',
    contents: new Buffer(knownInput)
  }));

  stream.end();
});


