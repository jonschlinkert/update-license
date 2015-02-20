/*!
 * update-license <https://github.com/jonschlinkert/update-license>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var fs = require('fs');
var assert = require('assert');
var license = require('./');
var orig = process.cwd();

function read(fp) {
  return fs.readFileSync(fp, 'utf8');
}

describe('update', function () {
  before(function () {
    process.chdir(__dirname + '/fixtures');
  });
  after(function () {
    process.chdir(orig);
  });

  it('should update a copyright statement:', function () {
    assert.equal(license('Copyright (c) 2014, Jon Schlinkert.'), 'Copyright (c) 2014-2015, Jon Schlinkert.');
    assert.equal(license('Copyright (c) 2015, Jon Schlinkert.'), 'Copyright (c) 2015, Jon Schlinkert.');
  });

  it('should add a copyright symbol if missing:', function () {
    assert.equal(license('Copyright 2014, Jon Schlinkert.'), 'Copyright (c) 2014-2015, Jon Schlinkert.');
    assert.equal(license('Copyright 2015, Jon Schlinkert.'), 'Copyright (c) 2015, Jon Schlinkert.');
  });

  it('should update a copyright statement in a license file:', function () {
    assert.equal(license(read('LICENSE-A')), read('LICENSE-A-expected'));
    assert.equal(license(read('LICENSE-B')), read('LICENSE-B-expected'));
    assert.equal(license(read('LICENSE-C')), read('LICENSE-C-expected'));
  });

  it('should fix the lead in a MIT license:', function () {
    assert.equal(license(read('LICENSE-D')), read('LICENSE-D-expected'));
  });
});