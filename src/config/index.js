const dotenv = require("dotenv");

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

module.exports = Object.freeze({
  dirs: [process.env.MAIN_DIR],
});
