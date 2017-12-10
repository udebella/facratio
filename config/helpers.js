const path = require("path");

// Helper functions
const PROJECT_ROOT = path.resolve(__dirname, "..");

const absolutePath = (relativePath) => PROJECT_ROOT + relativePath;

module.exports = {
	absolutePath
};
