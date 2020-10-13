const webpack = require('webpack');
const path = require('path');


module.exports = {
  entry: {
    library: [
      'vue'
    ]
  },
  mode: 'production',
  output: {
    filename:'[name]/dll.js',
    path: path.resolve(__dirname, '../comm'),
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      name: '[name]_library',
      path: path.join(__dirname, '../comm', '[name]/manifest.json')
    })
  ]
}