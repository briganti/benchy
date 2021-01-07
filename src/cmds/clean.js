const fs = require("fs");
const path = require("path");

const dir = "./tmp";

exports.command = "clean";
exports.desc = "Clean all reports";
exports.handler = async function (argv) {
  fs.readdir(dir, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(dir, file), (err) => {
        if (err) throw err;
      });
    }
  });
};
