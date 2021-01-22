const Table = require('../libs/table');
const { generateReports } = require('../libs/parser');

module.exports = async function (
  name,
  {
    documentStats = true,
    pageMetrics = true,
    interactiveMetrics = true,
    layoutMetrics = true,
    tasks = true,
  }
) {
  const reports = await generateReports(name);

  const t = new Table(reports);
  t.addReport(['score']);
  if (documentStats) {
    t.addSectionTitle('Document Stats');
    t.addReport(['resourceSize', 'transfertSize', 'DOMSize']);
    t.addReport(['numRequests', 'numScripts', 'numStylesheets', 'numFonts']);
  }
  if (pageMetrics) {
    t.addSectionTitle('Page Metrics');
    t.addReport([
      'serverResponseTime',
      'firstContentfulPaint',
      'largestContentfulPaint',
      'domContentLoaded',
      'load',
      'interactive',
    ]);
  }
  if (interactiveMetrics) {
    t.addSectionTitle('Interactivity Metrics');
    t.addReport(['firstInputDelay']);
  }
  if (layoutMetrics) {
    t.addSectionTitle('Layout Metrics');
    t.addReport(['cumulativeLayoutShift']);
  }
  if (tasks) {
    t.addSectionTitle('Tasks');
    t.addReport([
      'totalBlockingTime',
      'numTasks',
      'numTasksOver10ms',
      'numTasksOver25ms',
      'numTasksOver50ms',
      'numTasksOver100ms',
      'numTasksOver500ms',
    ]);
  }

  console.table(t.table.toString());
};
