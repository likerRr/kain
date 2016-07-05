let _ = require('lodash'),
  MenuItem = require('./menu-item');

/**
 * Represents menu object
 */
class Menu {
  constructor(key, name = 'Menu'/*, prefix = '-'*/) {
    this.key = key;
    this.name = name;
    // this.prefix = prefix;
    this.items = [];

    this.response = null;
  }

  /**
   * Adds menu items to response
   * @param {boolean} exclude
   * @param onlyItems
   * @returns {Menu}
   */
  append(exclude, ...onlyItems) {
    let except = false;

    if (exclude === true) {
      except = exclude;
    } else {
      if (exclude) {
        onlyItems.push(exclude);
      }
    }

    getOnly(this.items, onlyItems, 'id', except).forEach(item => {
      if (item.single === true && this.response.isExists(`${this.key}.${item.id}`)) return;

      this.response.add({
        id: `${this.key}.${item.id}`,
        title: item.title,
        desc: item.desc,
        payload: item.payload,
        redirect: item.redirect,
        group: this.name,
        icon: item.icon
      });
    });

    return this;
  };

  /**
   * Remove all or `onlyItems` items from menu
   * @param onlyItems
   */
  remove(...onlyItems) {
    getOnly(this.items, onlyItems, 'id').forEach(item => this.response.remove(`${this.key}.${item.id}`));
  }

  /**
   * Adds item to menu
   * @param itemData
   * @returns {MenuItem}
   */
  addItem(itemData) {
    let item = new MenuItem(itemData);

    this.items.push(item);

    return item;
  }

  /**
   * Return menu item by id
   * @param id
   */
  getItem(id) {
    return _.find(this.items, {id: id});
  }

  /**
   * Returns all menu items
   * @returns {Array}
   */
  getItems() {
    return this.items;
  }

  attachResponse(response) {
    this.response = response;
  }
}

function getOnly(origin = null, onlyItems = [], key = null, except = false) {
  if (onlyItems.length === 0) return origin;

  if (except) {
    return _.reject(origin, item => onlyItems.indexOf(item[key]) !== -1);
  }

  return _.filter(origin, item => onlyItems.indexOf(item[key]) !== -1);
}

module.exports = Menu;