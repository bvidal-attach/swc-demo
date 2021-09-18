// importing config creator
const { config } = require('@swc/core/spack');

// import path module
const path = require('path');
const time = new Date().getTime();
// const filename = `index${time}.js`;
const filename = `index.js`;

// export config
module.exports = config({
  // start file
  entry: {
    path: path.join(__dirname, 'src', 'index.js'),
  },
  // output file
  output: {
    path: path.join(__dirname, 'build'),
    name: `${filename}`,
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
      target: 'es2016', // 'es2016' // 'es2017' // 'es2018'
      loose: true,
    },
    minify: true,
  },
});

console.log('filename -> ', `index${time}`)