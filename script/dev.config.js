//设置环境变量
process.env.NODE_ENV = 'development'
process.env.BABEL_ENV = 'development'

const path = require('path')
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasureWebpackPlugin();

const configChain = require('./base.config.js')
const constants = require('./constants.js')
const useConfig = require('./util/useConfig.js')
const { port,proxy ,isSmp,isHappypack} = constants

const config = {
  devServer: {
    contentBase:path.resolve(__dirname, '../', constants.outputName),
    open: true,
    port,
    proxy,
    hot: true,
    hotOnly: !isHappypack,
  },
  devtool:'eval-cheap-source-map',
  plugins: [{

  }]
}
configChain.merge(config)
//加载用户配置覆盖原有配置
useConfig(configChain,constants)

module.exports = isSmp ? smp.wrap(configChain.toConfig()) : configChain.toConfig()