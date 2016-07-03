"use strict";

const _ = require('lodash');
const Menu = require('./menu');

let menus = [],
  res;

/**
 * Adds menu item
 * @param key
 * @param name
 * @param items
 * @returns {Menu}
 */
function addMenu(key, name, items/*, prefix*/) {
  let menu = new Menu(key, name/*, prefix*/);

  menus.push(menu);

  if (Array.isArray(items) && items.length > 0) {
    items.forEach(item => menu.addItem(item));
  }

  return menu;
}

/**
 * Returns menu item by key
 * @param key
 */
function getMenu(key) {
  return _.find(menus, {key: key});
}

/**
 * Removes menu
 * @param key
 */
function removeMenu(key) {
  _.remove(menus, {key: key});
}

function init(response) {
  res = response;

  menus.forEach(menu => menu.attachResponse(res));
}

/**
 * Returns menu item by execute id (menuId.itemId)
 * @param executeId
 * @returns {MenuItem|null}
 */
function getMenuItem(executeId) {
  let [menuId, itemId] = executeId.split('.'),
    menu;

  if (menuId && itemId) {
    menu = getMenu(menuId);

    if (menu) {
      return menu.getItem(itemId);
    }
  }

  return null;
}

module.exports = {addMenu, getMenu, init, getMenuItem};