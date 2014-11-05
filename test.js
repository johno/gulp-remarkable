'use strict';

var assert = require('assert');
var gutil = require('gulp-util');
var hljs = require('highlight.js');
var remarkableStream = require('./index');

describe('gulp-remarkable should convert md to html', function() {
  it('with `preset:full`, `typographer:false`', function(done) {
    var mdStream = remarkableStream();
    var actual = '# Hello, copyright (c) world';
    var expect = '<h1>Hello, copyright (c) world</h1>\n'

    mdStream.once('data', function(file) {
      assert.equal(file.relative, 'default.html');
      assert.equal(file.contents.toString(), expect);
    });
    mdStream.on('end', done);

    mdStream.write(new gutil.File({
      path: 'default.md',
      contents: new Buffer(actual)
    }));

    mdStream.end();
  })

  it('with `preset:full`, `typographer:true` (copyright, plusminus, ellipsis)', function(done) {
    var mdStream = remarkableStream({
      typographer: {
        copyright:    true, // (c) (C) → ©
        plusminus:    true, // +- → ±
        ellipsis:     true, // ... → … (also ?.... → ?.., !.... → !..)
      },
      remarkableOptions: {
        typographer: true
      }
    });
    var actual = '# Hello, world!\nCopyright +- (c) year? ...';
    var expect = '<h1>Hello, world!</h1>\n<p>Copyright ± © year? …</p>\n'

    mdStream.once('data', function(file) {
      assert.equal(file.relative, 'typographer.html');
      assert.equal(file.contents.toString(), expect);
    });
    mdStream.on('end', done);

    mdStream.write(new gutil.File({
      path: 'typographer.md',
      contents: new Buffer(actual)
    }));

    mdStream.end();
  })
})
