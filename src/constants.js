const path = require("path");
const xdg = require("@folder/xdg");

const dirs = xdg();

const APP_FOLDER = path.join(dirs.data, "benchy");
exports.APP_FOLDER = APP_FOLDER;
exports.AUDITS_FOLDER = path.join(APP_FOLDER, "audits");

const NONE = 0;
const HIGHER_IS_BETTER = 1;
const LOWER_IS_BETTER = 2;

const NO_UNIT = 0;
const UNIT_KB = 1;
const UNIT_MS = 2;
const UNIT_SCORE = 3;

exports.LIGHTHOUSE_DATA = [
  {
    name: "url",
    query: ".finalUrl",
    comparisonMode: NONE,
    unit: NO_UNIT,
  },
  {
    name: "serverResponseTime",
    query: '.audits."server-response-time".numericValue',
    comparisonMode: LOWER_IS_BETTER,
    unit: UNIT_MS,
  },
  {
    name: "domSize",
    query: '.audits."dom-size".numericValue',
    comparisonMode: LOWER_IS_BETTER,
    unit: UNIT_KB,
  },
  {
    name: "domContentLoaded",
    query: ".audits.metrics.details.items[0].observedDomContentLoaded",
    comparisonMode: LOWER_IS_BETTER,
    unit: UNIT_MS,
  },
  {
    name: "firstContentfulPaint",
    query: ".audits.metrics.details.items[0].firstContentfulPaint",
    comparisonMode: LOWER_IS_BETTER,
    impactScoring: true,
    unit: UNIT_MS,
  },
  {
    name: "largestContentfulPaint",
    query: ".audits.metrics.details.items[0].largestContentfulPaint",
    comparisonMode: LOWER_IS_BETTER,
    impactScoring: true,
    unit: UNIT_MS,
  },
  {
    name: "load",
    query: ".audits.metrics.details.items[0].observedLoad",
    comparisonMode: LOWER_IS_BETTER,
    unit: UNIT_MS,
  },
  {
    name: "interactive",
    query: ".audits.metrics.details.items[0].interactive",
    comparisonMode: LOWER_IS_BETTER,
    impactScoring: true,
    unit: UNIT_MS,
  },
  {
    name: "firstInputDelay",
    query: '.audits."max-potential-fid".numericValue',
    comparisonMode: LOWER_IS_BETTER,
    impactScoring: true,
    unit: UNIT_MS,
  },
  {
    name: "cumulativeLayoutShift",
    query: '.audits."cumulative-layout-shift".numericValue',
    comparisonMode: LOWER_IS_BETTER,
    impactScoring: true,
    unit: UNIT_SCORE,
  },
  {
    name: "score",
    query: ".categories.performance.score",
    comparisonMode: HIGHER_IS_BETTER,
    unit: UNIT_SCORE,
  },
  {
    name: "transfertSize",
    query:
      '(.finalUrl as $url | .audits."network-requests".details.items[] | select(.resourceType=="Document"  and .url==$url and .statusCode==200).transferSize)',
    comparisonMode: LOWER_IS_BETTER,
    unit: UNIT_KB,
  },
  {
    name: "resourceSize",
    query:
      '(.finalUrl as $url | .audits."network-requests".details.items[] | select(.resourceType=="Document"  and .url==$url and .statusCode==200)).resourceSize',
    comparisonMode: LOWER_IS_BETTER,
    unit: UNIT_KB,
  },
  {
    name: "DOMSize",
    query: '.audits."dom-size".numericValue',
    comparisonMode: NONE,
  },
  {
    name: "numRequests",
    query: ".audits.diagnostics.details.items[0].numRequests",
    comparisonMode: NONE,
  },
  {
    name: "numScripts",
    query: ".audits.diagnostics.details.items[0].numScripts",
    comparisonMode: NONE,
  },
  {
    name: "numStylesheets",
    query: ".audits.diagnostics.details.items[0].numStylesheets",
    comparisonMode: NONE,
  },
  {
    name: "numFonts",
    query: ".audits.diagnostics.details.items[0].numFonts",
    comparisonMode: NONE,
  },
  {
    name: "totalBlockingTime",
    query: ".audits.metrics.details.items[0].totalBlockingTime",
    comparisonMode: LOWER_IS_BETTER,
    impactScoring: true,
    unit: UNIT_MS,
  },
  {
    name: "numTasks",
    query: ".audits.diagnostics.details.items[0].numTasks",
    comparisonMode: NONE,
  },
  {
    name: "numTasksOver10ms",
    query: ".audits.diagnostics.details.items[0].numTasksOver10ms",
    comparisonMode: NONE,
  },
  {
    name: "numTasksOver25ms",
    query: ".audits.diagnostics.details.items[0].numTasksOver25ms",
    comparisonMode: NONE,
  },
  {
    name: "numTasksOver50ms",
    query: ".audits.diagnostics.details.items[0].numTasksOver50ms",
    comparisonMode: NONE,
  },
  {
    name: "numTasksOver100ms",
    query: ".audits.diagnostics.details.items[0].numTasksOver100ms",
    comparisonMode: NONE,
  },
  {
    name: "numTasksOver500ms",
    query: ".audits.diagnostics.details.items[0].numTasksOver500ms",
    comparisonMode: NONE,
  },
];
