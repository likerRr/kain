const response = require('./response');
const menu = require('./menu');
const commander = require('./commander');

/**
 * Patches `search` hook
 * @param searchFn
 * @returns {function(*=, *=)}
 */
module.exports = (searchFn) => {
  "use strict";
  let cmd;

  return (query, res) => {
    response(res);
    menu.init(res);
    cmd = commander.parse(query);

    searchFn(cmd, res);
  }
};

module.exports.menu = menu;
module.exports.commander = commander;