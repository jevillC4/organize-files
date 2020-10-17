const path = require("path");

module.exports = () => ({
  join: path.join,
  basename: (f) => path.basename(f),
  normalPath: (p) => path.normalize(p),
});
