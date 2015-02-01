/*!
 * update-license <https://github.com/jonschlinkert/update-license>
 *
 * Copyright (c) 2015 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var update = require('update-copyright');

module.exports = function (str, options) {
  var parsed = update.parse(str, options);
  var match = parsed.matches[0];
  str = str.replace(match.statement, parsed.updated);
  if (str.slice(-1) === '.') {
    return str.slice(0, str.length - 1);
  }
  return str;
};
