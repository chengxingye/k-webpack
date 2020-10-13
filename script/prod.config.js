//设置环境变量
process.env.NODE_ENV = 'production'
process.env.BABEL_ENV = 'production'

const webpack = require('webpack')
const path = require('path')
const useConfig = require('./util/useConfig.js')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')

const smp = new SpeedMeasureWebpackPlugin();
const configChain = require('./base.config.js')
const constants = require('./constants.js')
const { isSmp} = constants

//拆包
configChain.plugin('dll')
  .use(webpack.DllReferencePlugin,[{
    context: __dirname,
    manifest: path.resolve(process.cwd(), './comm/library/manifest.json')
  }])
  .end()
  //缓存优化第二次打包构建速度
  .plugin('hardSource')
  .use(HardSourceWebpackPlugin)

//加载用户配置覆盖原有配置
useConfig(configChain,constants)
module.exports = isSmp ? smp.wrap(configChain.toConfig()) : configChain.toConfig()