module.exports = function runtimeErrorOverlay() {
  return {
    name: 'stub-runtime-error-overlay',
    apply: 'serve'
  };
};

module.exports.default = module.exports;
