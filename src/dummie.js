const _immutableDummy = function () {};
const _immutableHandler = {
  defineProperty: () => {},
  has: () => true,
  set: () => {},
  deleteProperty: () => {},
};
const _immutableProxy = new Proxy(_immutableDummy, _immutableHandler);
const _proxiedFunction = () => _immutableProxy;
const _proxiedGet = (_target, prop) => {
  if (prop === "toString") {
    return () => "$$dummie";
  }
  return _immutableProxy;
};
Object.setPrototypeOf(_proxiedFunction, _immutableProxy);
Object.setPrototypeOf(_proxiedGet, _immutableProxy);
_immutableHandler.setPrototypeOf = _proxiedFunction;
_immutableHandler.get = _proxiedGet;
_immutableHandler.apply = _proxiedFunction;
_immutableHandler.construct = _proxiedFunction;

/**
 * Provides the dummy object that silently consumes all function call
 * and get/set attempts and does nothing.
 * @return {Proxy} the dummy object
 */
function dummie() {
  return _immutableProxy;
}

module.exports = dummie;
