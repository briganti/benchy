const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const Spinner = require("cli-spinner").Spinner;
const audits = require("../libs/audits");
const view = require("../libs/view");

exports.command = "audit [c] [d] [p] [i] [l] [t] <urls...>";
exports.desc = "Audit a list of <urls> with lighthouse [c] times";
exports.handler = async function (argv) {
  const urls = argv.urls;
  const count = argv.c || 1;

  const documentStats = argv.d || false;
  const pageMetrics = argv.p || false;
  const interactiveMetrics = argv.i || false;
  const layoutMetrics = argv.l || false;
  const tasks = argv.t || false;

  const auditNames = [];

  const auditsInstance = audits.getInstance();

  const spinner = new Spinner("%s launching chrome");
  spinner.setSpinnerString("⣾⣽⣻⢿⡿⣟⣯⣷");
  spinner.start();

  const chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless"],
  });

  const options = {
    output: "json",
    onlyCategories: ["performance"],
    port: chrome.port,
    throttlingMethod: "devtools",
  };

  for (const url of urls) {
    const name = `audit_${Date.now()}`;

    for (let i = 0; i < count; i++) {
      spinner.setSpinnerTitle(
        `%s running lighthouse audit ${i + 1 + auditNames.length * count}/${
          count * urls.length
        }`
      );
      const { report } = await lighthouse(url, options);
      auditsInstance.addAuditReport(name, report);
    }

    auditNames.push(name);
  }

  spinner.setSpinnerTitle("%s shuting down chrome");
  await chrome.kill();
  spinner.stop(true);

  const filters =
    documentStats || pageMetrics || interactiveMetrics || layoutMetrics || tasks
      ? { documentStats, pageMetrics, interactiveMetrics, layoutMetrics, tasks }
      : {};
  view(auditNames, filters);
};
