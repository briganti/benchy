const view = require('../libs/view');

exports.command = 'report <audits...>';
exports.builder = function (yargs) {
  yargs.positional('audits', {
    describe: 'A space separated list of others audits to compare',
  });
  return yargs;
};
exports.desc = 'Compare reports ';
exports.handler = async function ({ audits }) {
  view(audits);
};
