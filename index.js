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
  str = fixLead(str, 'MIT');
  return str;
};

function fixLead(str, type) {
  str = str.replace(/\r/g, '');
  var lines = str.split('\n');
  var regex = testLead(type);
  var first = lines[0];

  if (regex.test(first)) {
    lines[0] = expectedLead(type);
    str = lines.join('\n');
  } else {
    str = expectedLead(type) + '\n\n' + str;
  }

  return str;
}

/**
 * TODO: add more types
 */

function testLead(type) {
  var regex = '';

  switch(type) {
    case 'MIT':
      regex = /The[ \t]MIT[ \t]License[ \t]\(MIT\)/i;
      break;
  }

  return regex;
}

function expectedLead(type) {
  var lead = '';

  switch(type) {
    case 'MIT':
      lead = 'The MIT License (MIT)';
      break;
  }

  return lead;
}
