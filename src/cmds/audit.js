const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const Spinner = require('cli-spinner').Spinner;
const audits = require('../libs/audits');
const view = require('../libs/view');

exports.command = 'audit <url> [c] [n]';
exports.desc = 'Audit <url> with lighthouse [c] times and save results under [n] name';
exports.handler = async function (argv) {
  const url = argv.url;
  const name = argv.n;
  const count = argv.c;

  const auditsInstance = audits.getInstance();

  const spinner = new Spinner('%s launching chrome');
  spinner.setSpinnerString('⣾⣽⣻⢿⡿⣟⣯⣷');
  spinner.start();

  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless'],
  });

  const options = {
    output: 'json',
    onlyCategories: ['performance'],
    port: chrome.port,
    throttlingMethod: 'devtools',
  };

  for (let i = 0; i < count; i++) {
    spinner.setSpinnerTitle(`%s running lighthouse audit ${i + 1}/${count}`);
    const { report } = await lighthouse(url, options);
    auditsInstance.addAuditReport(name, report);
  }

  spinner.setSpinnerTitle('%s shuting down chrome');
  await chrome.kill();
  spinner.stop(true);

  view([name]);
};
