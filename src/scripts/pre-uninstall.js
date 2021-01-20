const fs = require("fs");

const APP_FOLDER = require("../constants").APP_FOLDER;

function deleteAudits() {
  try {
    fs.rmdirSync(APP_FOLDER, { recursive: true });
  } catch (err) {
    console.log('Failed to delete audit files');
    console.log(`Manually delete the following directory: ${APP_FOLDER}`);
  }
}

deleteAudits();