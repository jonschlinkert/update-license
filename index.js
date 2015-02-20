/*!
 * update-license <https://github.com/jonschlinkert/update-license>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var fs = require('fs');
var update = require('update-copyright');
var _ = require('lodash');
var tmpl = fs.readFileSync(__dirname + '/templates/MIT.txt', 'utf8');

module.exports = function updateLicense(str, options) {
  var parsed = update.parse(str, options);
  if (parsed && typeof parsed.updated === 'string') {
    var res = parsed.updated;
    res = res.split(', contributors').join('');
    return _.template(tmpl)({copyright: res});
  }
  return str;
};