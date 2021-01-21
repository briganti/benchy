const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const Spinner = require('cli-spinner').Spinner;
const audits = require('../libs/audits');
const view = require('../libs/view');

exports.command = 'audit [c] <urls...>';
exports.desc = 'Audit a list of <urls> with lighthouse [c] times';
exports.handler = async function (argv) {
  const urls = argv.urls;
  // const name = argv.n || 'tmp';
  const count = argv.c || 1;
  const audit_names = [];

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

  for (let url of urls) {
    const name = `tmp_${Date.now()}`;

    for (let i = 0; i < count; i++) {
      spinner.setSpinnerTitle(
        `%s running lighthouse audit ${i + 1 + audit_names.length * count}/${
          count * urls.length
        }`
      );
      const { report } = await lighthouse(url, options);
      auditsInstance.addAuditReport(name, report);
    }

    audit_names.push(name);
  }

  spinner.setSpinnerTitle('%s shuting down chrome');
  await chrome.kill();
  spinner.stop(true);

  view(audit_names);
};
