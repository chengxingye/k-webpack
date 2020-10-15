const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Config = require('webpack-chain');
const configChain = new Config();
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const ComputedSizePlugin = require("./plugins/computed-size-plugin")

const constants = require('./constants.js')
const optimizations = require('./util/optimization.config.js')
const cssRules = require('./rules/css.js');
const imageRules = require('./rules/image.js')
const fileRules = require('./rules/file.js')
const fontRules = require('./rules/font.js')
const jsRules = require('./rules/js.js')
//查看用户配置是否存在
process.env.CONSTANTS = fs.existsSync(path.resolve(process.cwd(), 'vue.config.js'))

const { NODE_ENV } = process.env
configChain
  .output
  .path(path.resolve(process.cwd(), constants.outputName))
  //hash:5, chunckhash:5, contenthash:5
  .filename(NODE_ENV == 'production' ?'[name].[contenthash:5].js':'[name].[hash:5].js')
  .end()
const config = {
  entry: {
    index: path.resolve(process.cwd(), 'src/index.js'),
    // test: path.resolve(__dirname, '../src/c.js'),
  },
  mode: NODE_ENV,
  optimizations:{

  },
  plugin: {
    htmlWebpack: {
      plugin: HtmlWebpackPlugin,
      args: [{
        template: path.resolve(process.cwd(), 'src/index.html'),
        filename: 'index.html'
      }]
    },
    size:{
      plugin:ComputedSizePlugin
    },
    clear: {
      plugin:CleanWebpackPlugin
    }
  }
}
//optimization配置
optimizations(configChain, constants)
//rule相关配置
cssRules(configChain, constants)
imageRules(configChain, constants)
fileRules(configChain, constants)
fontRules(configChain, constants)
jsRules(configChain, constants)

configChain.merge(config)
// console.log('111',configChain.toConfig().plugins)
// configChain.toConfig().module.rules.forEach(v=>{
//   console.log('12',v.use)
// })
module.exports = configChain