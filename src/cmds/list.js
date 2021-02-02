const audits = require("../libs/audits");

const auditsInstance = audits.getInstance();

exports.command = "list";
exports.desc = "List all reports";
exports.handler = async function () {
  auditsInstance.getAllAudits().forEach((item) => {
    console.log(item);
  });
};
