const searchComponent = require('./components/search');

/**
 * Bootstraps kain framework
 * @param {function} userPlugin - user-defined plugin function
 * @returns {function(*=)} - bootstrapped plugin function
 */
module.exports.bootstrap = (userPlugin) => {
  "use strict";

  return (pluginContext) => {
    pluginContext.menu = searchComponent.menu;
    pluginContext.commander = searchComponent.commander;

    let plugin = userPlugin(pluginContext);

    plugin.search = searchComponent(plugin.search);

    return plugin;
  }
};