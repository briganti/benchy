const path = require("path");
const jq = require("node-jq");
const audits = require("./audits");
const { AUDITS_FOLDER, LIGHTHOUSE_DATA } = require("../constants");

function buildJqFilters() {
  return `{
    ${LIGHTHOUSE_DATA.map(({ name, query }) => `${name}: ${query}`)}
  }`;
}

function initReport() {
  const report = {};
  LIGHTHOUSE_DATA.forEach(({ name }) => (report[name] = []));
  return report;
}

exports.generateReports = async function (auditNames) {
  const reports = {};
  const auditsInstance = audits.getInstance();

  const filter = buildJqFilters();

  for (const auditName of auditNames) {
    reports[auditName] = initReport();
    const reportFiles = auditsInstance.getAllReportForAudit(auditName);

    for (const file of reportFiles) {
      const jsonPath = path.join(AUDITS_FOLDER, auditName, file);
      const output = await jq.run(filter, jsonPath, { output: "json" });

      Object.keys(output).forEach((name) => {
        reports[auditName][name].push(output[name]);
      });
    }
  }

  return reports;
};
