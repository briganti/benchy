const fs = require('fs');

const AUDITS_FOLDER = require('../constants').AUDITS_FOLDER;

exports.command = 'clean';
exports.desc = 'Clean all reports';
exports.handler = function () {
  fs.rmdirSync(AUDITS_FOLDER, { recursive: true });
};
