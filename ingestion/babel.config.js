module.exports = {
  presets: [
    '@babel/preset-env',
  ],
  plugins: [
    // tree-shakes lodash
    'lodash',
    // transforms native promises to bluebird promises
    'transform-promise-to-bluebird',
    '@babel/plugin-transform-runtime',
  ],
};
