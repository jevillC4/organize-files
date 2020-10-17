const { EOL } = require("os");

const Start = require("./src");
const config = require("./src/config");

const instanceStart = new Start({ dirs: config.dirs });

async function name() {
  console.log(`start ${EOL}`, await instanceStart.handleDir());
}

name();
