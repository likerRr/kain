const Cmd = require('./cmd').Cmd;
const CmdSignature = require('./cmd').CmdSignature;

let commands = [],
  activeCmd;

function parse(queryPath) {
  let result;

  queryPath = queryPath.trim();
  activeCmd = new Cmd('', queryPath);

  commands.some(cmdSig => {
    if (result = (new RegExp(`^${cmdSig.name}\\s*(.*)`)).exec(queryPath)) {
      activeCmd = new Cmd(cmdSig.name, result[1], cmdSig.options);

      return true;
    }
  });

  console.log(activeCmd);

  return activeCmd;
}

/**
 * Register a command
 * @param name
 * @param options
 */
function register(name, options = {}) {
  if (!findCmd(name)) {
    commands.push(new CmdSignature(name, options));
  }
}

function findCmd(cmd) {
  return commands.find(command => command.name === cmd);
}

module.exports = {parse, register};