Object.defineProperty(exports, "__esModule",{
  value: true
})
exports.default = fileRules
function fileRules(webpackConfig , opts){
  const config = opts.config,
        env = opts.env
        // 部分json文件只需要使用路径
  webpackConfig.module.rule('json').test(/\.(path\.json)$/).type('javascript/auto').use('fileLoader').loader(require.resolve('file-loader')).options({
    name: config.filename.file,
  })
  // 其它文件直接拷贝
  webpackConfig.module.rule('file').test(/\.(mp3|pdf|json)$/).use('fileLoader').loader(require.resolve('file-loader')).options({
      name: config.filename.file+'/[name]-[contenthash:5].[ext]',
    });     
}