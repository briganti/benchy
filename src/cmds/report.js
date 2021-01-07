const Table = require("../libs/table");
const { generateReports } = require("../libs/parser");

exports.command = "report <audits...>";
exports.builder = function (yargs) {
  yargs.positional("audits", {
    describe: "A space separated list of others audits to compare",
  });
  return yargs;
};
exports.desc = "Compare reports ";
exports.handler = async function ({ audits }) {
  const reports = await generateReports(audits);
  // displayReports(reports)
  const t = new Table(reports);
  t.addReport(["score"]);
  t.addSectionTitle("Document Stats");
  t.addReport(["resourceSize", "transfertSize", "DOMSize"]);
  t.addReport(["numRequests", "numScripts", "numStylesheets", "numFonts"]);
  t.addSectionTitle("Page Metrics");
  t.addReport([
    "serverResponseTime",
    "firstContentfulPaint",
    "largestContentfulPaint",
    "domContentLoaded",
    "load",
    "interactive",
  ]);
  t.addSectionTitle("Interactivity Metrics");
  t.addReport(["firstInputDelay"]);
  t.addSectionTitle("Layout Metrics");
  t.addReport(["cumulativeLayoutShift"]);
  t.addSectionTitle("Tasks");
  t.addReport([
    "totalBlockingTime",
    "numTasks",
    "numTasksOver10ms",
    "numTasksOver25ms",
    "numTasksOver50ms",
    "numTasksOver100ms",
    "numTasksOver500ms",
  ]);

  console.table(t.table.toString());
};
