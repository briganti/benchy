const fs = require('fs');
const path = require('path');
const AUDITS_FOLDER = require('../constants').AUDITS_FOLDER;

let instance = null;

class Audits {
  constructor() {
    this.state = {};

    if (!fs.existsSync(AUDITS_FOLDER)) {
      fs.mkdirSync(AUDITS_FOLDER, { recursive: true });
    } else {
      const audits = fs.readdirSync(AUDITS_FOLDER);

      audits.forEach(auditName => {
        this.state[auditName] = fs.readdirSync(path.join(AUDITS_FOLDER, auditName));
      });
    }
  }

  createAudit(auditName) {
    if (!fs.existsSync(path.join(AUDITS_FOLDER, auditName))) {
      fs.mkdirSync(path.join(AUDITS_FOLDER, auditName));
    }

    this.state[auditName] = [];
  }

  getAllAudits() {
    return Object.keys(this.state);
  }

  getAllReportForAudit(auditName) {
    return this.state[auditName];
  }

  addAuditReport(auditName, report) {
    if (!this.state[auditName]) {
      this.createAudit(auditName);
    }

    const fileIndex = this.state[auditName].length;
    const fileName = `${fileIndex}.json`;

    fs.writeFileSync(path.join(AUDITS_FOLDER, auditName, fileName), report);

    this.state[auditName].push(fileName);
  }

  isValidAudits(auditNames) {
    if (typeof auditNames === 'string') {
      return !!this.state[auditNames];
    }

    if (auditNames && auditNames.length) {
      return auditNames.every(name => !!this.state[name]);
    }

    return false;
  }
}

exports.getInstance = () => {
  if (!instance) {
    instance = new Audits();
  }

  return instance;
};
