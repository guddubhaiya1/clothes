const fs = require('fs');
const path = require('path');

// Create stub packages in node_modules for Render/external deployments
const baseDir = path.join(__dirname, '..', 'node_modules', '@replit');
fs.mkdirSync(baseDir, { recursive: true });

const stubs = [
  {
    name: 'vite-plugin-runtime-error-modal',
    version: '0.0.3',
    code: `module.exports = function runtimeErrorOverlay() {
  return { name: 'stub-runtime-error-overlay', apply: 'serve' };
};
module.exports.default = module.exports;`
  },
  {
    name: 'vite-plugin-cartographer',
    version: '0.4.4',
    code: `module.exports.cartographer = function cartographer() {
  return { name: 'stub-cartographer', apply: 'serve' };
};`
  },
  {
    name: 'vite-plugin-dev-banner',
    version: '0.1.1',
    code: `module.exports.devBanner = function devBanner() {
  return { name: 'stub-dev-banner', apply: 'serve' };
};`
  }
];

stubs.forEach(stub => {
  const pkgDir = path.join(baseDir, stub.name);
  fs.mkdirSync(pkgDir, { recursive: true });

  // Write package.json
  fs.writeFileSync(
    path.join(pkgDir, 'package.json'),
    JSON.stringify({
      name: `@replit/${stub.name}`,
      version: stub.version,
      main: 'index.js',
      type: 'commonjs'
    }, null, 2)
  );

  // Write index.js
  fs.writeFileSync(path.join(pkgDir, 'index.js'), stub.code);
});

console.log('✓ Replit stub packages created');
