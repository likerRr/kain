/**
 * Returns true if fn is callable
 * @param fn
 * @returns {boolean}
 */
module.exports.isFunction = function(fn) {
  return typeof fn === "function";
};

/**
 * Returns true if obj is instance of ctor
 * @param obj
 * @param ctor
 * @returns {boolean}
 */
module.exports.isInstance = function(obj, ctor) {
  return obj instanceof ctor;
};