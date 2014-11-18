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
var assert = require('assert');
var gutil = require('gulp-util');
var remarkableStream = require('../index');

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

  it('with `preset:full`, `typographer:true` disable:["replacements"]', function(done) {
    var mdStream = remarkableStream({
      disable: [
        'replacements'
      ],
      remarkableOptions: {
        typographer: true
      }
    });
    var actual = '# Hello, world!\nCopyright +- (c) year? ...';
    var expect = '<h1>Hello, world!</h1>\n<p>Copyright +- (c) year? ...</p>\n'

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

  it('with `preset:full`, `typographer:true` disable:[]', function(done) {
    var mdStream = remarkableStream({
      disable: [],
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
