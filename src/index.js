const _ = require("lodash");
const fs = require("fs");
const moment = require("moment");
const Promises = require("bluebird");
const fsPromise = require("fs").promises;

const paths = require("./paths");
const AccessProp = require("./accessPropFile");

const EXPESSION_NAME = /^downloads_[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$/;

class PathManager {
  constructor({ dirs }) {
    this.dirs = dirs;
    this.dirrDown = undefined;
  }

  handleDir = async () => _.forEach(this.dirs, await this.accessDir);

  accessDir = async (route) => {
    await this.createDirrMoveFiles(route);

    const normalize = paths().normalPath(route);

    const dir = await fsPromise.readdir(normalize);

    const formatFile = _.map(dir, (f) => ({ dir: route, file: f }));

    _.forEach(formatFile, this.accessFile);
  };

  createDirrMoveFiles = (dir) => {
    const dirDown = paths().join(
      dir,
      `downloads_${moment().format("DD-MM-YYYY")}`
    );

    this.dirrDown = dirDown;

    return new Promises(async (resolve, reject) => {
      fsPromise
        .access(dirDown, fs.constants.R_OK | fs.constants.W_OK)
        .then(() => {
          resolve();
        })
        .catch(async () => {
          await fsPromise.mkdir(dirDown);
          resolve();
        });
    });
  };

  accessFile = ({ dir, file }) => {
    const evalR = EXPESSION_NAME.test(String(file));
    const obj = {
      true: () => {
        const instanceAccessProp = new AccessProp({
          fs: fsPromise,
          dir,
          file,
          dirDown: this.dirrDown,
        });
        instanceAccessProp.handlerPropFile();
      },
    };

    const r = obj[!evalR];

    typeof r === "function" && r();
  };
}

module.exports = PathManager;
