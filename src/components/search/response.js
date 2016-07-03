const _ = require('lodash');

/**
 * Patches response objects and adds useful methods
 * @module Response
 * @param res
 * @returns {function}
 */
module.exports = (res) => {
  "use strict";

  if (res.isPatched === true) return res;

  let ids = [],
    resAdd = res.add,
    resRemove = res.remove,
    captureEnabled = true;

  /**
   * Patches hain's `add` method to watch for added responses
   * @param result
   */
  res.add = function(result) {
    if (!captureEnabled) return;

    if (Array.isArray(result)) {
      ids.push(..._.compact(_.uniq(_.map(result, 'id'))));
    } else {
      if (result.id) {
        ids.push(result.id);
      }
    }

    return resAdd.call(res, result);
  };

  /**
   * Non-blocking list drawing. Adds little delay to prevent program from freeze when it renders big response
   * @param list
   * @param cb
   */
  res.addList = function(list, cb) {
    let delay = 0;

    list.forEach((item, idx) => {
      setTimeout(() => {
        this.add(cb(item, idx));
      }, delay);

      delay += 20;
    });
  };

  /**
   * Adds loader response
   * @param title
   * @param desc
   */
  res.startLoader = function(title = 'Loading...', desc = '') {
    this.add({
      id: '__loader',
      title: title,
      description: desc,
      icon: '#fa fa-spinner fa-spin'
    });

    res.prevent();
  };

  /**
   * Removes loader response
   */
  res.stopLoader = function() {
    res.capture();
    this.remove('__loader');
  };

  /**
   * Shows error and prevents other responses from being added
   * @param msg
   * @param icon
   */
  res.error = function(msg, icon = 'fa-exclamation-circle') {
    res.capture();

    this.add({
      id: 'error',
      title: 'Error',
      desc: msg,
      icon: `#fa ${icon}`
    });

    res.prevent();
  };

  /**
   * Checks if response is drawn
   * @param id
   * @returns {boolean}
   */
  res.isExists = function(id) {
    return ids.indexOf(id) !== -1;
  };

  /**
   * Removes response
   * @param id
   */
  res.remove = function(id) {
    _.remove(ids, id);
    resRemove.call(resRemove, id);
  };

  /**
   * removes all responses
   */
  res.clear = function() {
    _.invokeMap(ids, res.remove);
  };

  /**
   * Returns drawn responses' ids
   * @returns {Array}
   */
  res.getIds = function() {
    return ids;
  };

  /**
   * Starts capture response objects. If it enables, responses could be drawn
   */
  res.capture = function() {
    captureEnabled = true;
  };

  /**
   * Prevents responses from being added
   */
  res.prevent = function() {
    captureEnabled = false;
  };

  /**
   * Returns true if response object is already patched (prevents manual patching)
   * @type {boolean}
   */
  res.isPatched = true;

  /**
   * Returns true if response is prevented
   * @type {boolean}
   */
  res.isPrevented = !captureEnabled;

  return res;
};