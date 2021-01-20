const CliTable = require('cli-table3');
const colors = require('colors/safe');
const { LIGHTHOUSE_DATA } = require('../constants');
const math = require('./math');

function toScore(value) {
  return `${Math.floor(value * 100)}`;
}

function toMs(value) {
  return `${Math.floor(value)}ms`;
}

function toKb(value) {
  return `${Math.floor(value / 1000)}kb`;
}

function toPercentage(value) {
  return `${Math.floor(value * 1000) / 10}%`;
}
function toNumber(value) {
  return `${Math.floor(value)}`;
}

function format(unit, value) {
  switch (unit) {
    case 1:
      return toKb(value);
    case 2:
      return toMs(value);
    case 3:
      return toScore(value);
    default:
      return toNumber(value);
  }
}

function colorHeat(type, a) {
  const comparisonMode = LIGHTHOUSE_DATA.find(({ name }) => name === type).comparisonMode;

  const intA = parseInt(a);
  if (intA < -25) {
    return comparisonMode === 2 ? colors.green(a) : colors.red(a);
  }

  if (intA < 25) {
    return colors.dim(a);
  }

  return comparisonMode === 2 ? colors.red(a) : colors.green(a);
}

class Table {
  constructor(reports) {
    this.reports = reports;
    this.table = new CliTable({
      head: ['', ...this.getReportKeys().map(k => ({ colSpan: 2, content: k }))],
      style: {
        head: ['cyan'],
        border: [],
      },
    });
  }

  getReportKeys() {
    return Object.keys(this.reports);
  }

  addSectionTitle(title) {
    this.table.push([
      {
        colSpan: 1 + this.getReportKeys().length * 2,
        content: colors.bold(title),
        hAlign: 'center',
      },
    ]);
  }

  addReport(types) {
    for (let type of types) {
      const values = [];
      const variation = [];
      let reference_average;
      const info = LIGHTHOUSE_DATA.find(({ name }) => name === type);
      const compact = info.comparisonMode === 0;

      for (const key in this.reports) {
        const average = math.average(this.reports[key][type]);
        const rsd = math.relativeStandardDerivation(this.reports[key][type]);

        if (!reference_average) {
          reference_average = math.average(this.reports[this.getReportKeys()[0]][type]);
        }

        values.push({
          colSpan: 2,
          content: `${format(info.unit, average)}`,
          vAlign: 'center',
        });

        if (!compact) {
          variation.push(colors.gray(toPercentage(rsd)));

          if (key !== this.getReportKeys()[0]) {
            variation.push(
              colorHeat(
                type,
                toPercentage((average - reference_average) / reference_average)
              )
            );
          } else {
            variation.push(colors.gray('-'));
          }
        }
      }

      this.table.push([
        {
          rowSpan: compact ? 1 : 2,
          content: info.impactScoring ? colors.bold(type) : type,
        },
        ...values,
      ]);
      if (!compact) {
        this.table.push(variation);
      }
    }
  }
}

module.exports = Table;
