const { EOL } = require("os");

const paths = require("./paths");

class AccessPropFile {
  constructor({ fs, dir, file, dirDown }) {
    this.fs = fs;
    this.dir = dir;
    this.file = file;
    this.dirDown = dirDown;
    this.normalFile = paths().join(dir, file);
  }

  handlerPropFile = async () => {
    const d = await this.fs.stat(this.normalFile);
    console.log(`dd ${EOL}`, this.dirDown);
  };
}

module.exports = AccessPropFile;
