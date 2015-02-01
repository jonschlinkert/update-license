/*!
 * update-license <https://github.com/jonschlinkert/update-license>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
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

  it('should update a copyright statement in a license file:', function () {
    console.log(license(read('LICENSE-A')))
    assert.equal(license(read('LICENSE-A')), read('LICENSE-A-expected'));
  });

  it('should add a copyright symbol if missing:', function () {
    assert.equal(license('Copyright 2014, Jon Schlinkert.'), 'Copyright (c) 2014-2015, Jon Schlinkert.');
    assert.equal(license('Copyright 2015, Jon Schlinkert.'), 'Copyright (c) 2015, Jon Schlinkert.');
  });
});