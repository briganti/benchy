const audits = require("../libs/audits");

const auditsInstance = audits.getInstance();

exports.command = "list";
exports.desc = "List all reports";
exports.handler = async function () {
  auditsInstance.getAllAudits().map((item) => {
    console.log(item);
  });
};
