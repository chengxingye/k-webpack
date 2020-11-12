Object.defineProperty(exports,'__esModule',{
  value: true
})

exports.default = jsRules

function __path__ (){
  const data = require('path')

  __path__ = function __path__ (){
      return data
  }

  return data
}

function __os__ (){
  const data = require('os')

  __os__ = function __os__(){
    return data
  }

  return data
}
function _happyPack (){
  const data = _interopRequireDefault(require('happypack'))

  _happyPack = function _happyPack(){
    return data
  }

  return data
}
const _interopRequireDefault = (obj) => obj && obj.__esModule ? obj : { default: obj }

function jsRules (webpackChain , opts){
  const happypack = _happyPack().default;

  const happyThreadPool = happypack.ThreadPool({
    size: __os__().cpus().length
  });
  const config = opts.config,
        env = opts.env,
        cwd = opts.cwd
  // 热重载插件需要被编译
  webpackChain.module.rule('js').test(/\.(js)$/).include .add(__path__().resolve(cwd,'./src')).end().use('js').loader(config.isHappypack ? 'happypack/loader?id=js' :require.resolve( 'babel-loader')).end()


  //默认添加vue hot
  webpackChain.module.rule('vue').test(/\.vue$/).include.add(__path__().resolve(cwd,'./src')).end().use('vue').loader(require.resolve('vue-loader')).end()


  //js 需要的plugin
  webpackChain.plugin('VueLoaderPlugin').use(require.resolve('vue-loader/lib/plugin'))

  webpackChain.when(config.isHappypack,webpackChain=>{
    
    webpackChain.plugin('happypackJS').use(happypack, [{
      id: 'js',
      threadPool: happyThreadPool,
      verbose: true,
      loaders: [
        require.resolve('babel-loader')
      ]
    }])
  })

}