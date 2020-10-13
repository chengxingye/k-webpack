const path = require('path');
const HappyPack = require('happypack');
const os = require('os');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
});

module.exports = (configChain , context) =>{
  const { isHappypack } = context;
  configChain.module
    .rule('js')
    .test(/\.(js|jsx)$/)
      .include // 热重载插件需要被编译
      .add(path.resolve(__dirname,'../../src'))
      .end()
    .use('js')
      .loader(isHappypack ? 'happypack/loader?id=js' : 'babel-loader')
      .end()

    configChain.module
      .rule('vue')
      .test(/\.vue$/)
        .include // 热重载插件需要被编译
        .add(path.resolve(__dirname,'../../src'))
        .end()
      .use('vue')
        .loader('vue-loader')
        .end()

  if(isHappypack){
    configChain
    .plugin('happypackJS')
    .use(HappyPack, [{
      id: 'js',
      threadPool: happyThreadPool,
      verbose: true,
      loaders: [
        'babel-loader'
      ]
    }])
  }
  configChain
  .plugin('VueLoaderPlugin')
  .use(VueLoaderPlugin)
}