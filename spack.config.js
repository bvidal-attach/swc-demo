// importing config creator
const { config } = require('@swc/core/spack');

// Create name index
const path = require('path');
const time = new Date().getTime();
const name = `index${time}.js`;

// export config
module.exports = config({
  // start file
  entry: {
    path: path.join(__dirname, 'src/js', 'index.js'),
  },
  // output file
  output: {
    path: path.join(__dirname, 'dist'),
    name: `${name}`,
  },
  module: {
    type: 'commonjs',
    strict: false,
    strictMode: true,
    lazy: false,
    noInterop: false,
  },
  options: {
    jsc: {
      target: 'es5', // 'es2016' // 'es2017'
      loose: true,
    },
    // minify: true,
  },
});
