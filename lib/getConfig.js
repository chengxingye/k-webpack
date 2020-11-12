
Object.defineProperty(exports, "__esModule", { 
  value: true 
});

exports.default = getConfig

function __path__() {
  const data = require('path')
  
  __path__ = function __path__(){
    return data
  }

  return data
}

function _webpack(){
  const data = _interopRequireDefault(require('webpack') )

  _webpack = function _webpack(){
    return data
  }

  return data
}
function _smp(){
  const data = _interopRequireDefault(require('speed-measure-webpack-plugin'))

  _smp = function _smp(){
    return data
  }

  return data
}
function _webpackChain(){
  const data = _interopRequireDefault(require('webpack-chain'))

  _webpackChain = function _webpackChain(){
    return data
  }

  return data
}

const _interopRequireDefault = (obj) => obj && obj.__esModule ? obj : { default: obj };

const _css = _interopRequireDefault(require('./rules/css.js'));

const _image = _interopRequireDefault(require('./rules/image.js'));

const _file = _interopRequireDefault(require('./rules/file.js'));

const _font = _interopRequireDefault(require('./rules/font.js'));

const _js = _interopRequireDefault(require('./rules/js.js'));
const _optimization = _interopRequireDefault(require('./util/optimization.config'))

const _isFunction = (fn) => Object.prototype.toString.call(fn).includes('Function') && typeof fn === 'function' ;

function getConfig (opts){
  const cwd = opts.cwd,
        config = opts.config,
        entry = opts.entry,
        output = opts.output,
        hot = opts.hot,
        env = opts.env,
        bundleImplementor = _webpack().default

  let webpack = _webpack().default
  const isDev = env.NODE_ENV === 'development'
  const isProd = env.NODE_ENV === 'production'
  const absOutputPath = (0, __path__().join)(cwd, config.outputPath || 'dist');

  const webpackChain = new (_webpackChain().default)()
  webpackChain.mode(env.NODE_ENV)
  webpackChain.output.path(absOutputPath).filename(isProd ?'[name].[contenthash:5].js':'[name].[hash:5].js').end()


  webpackChain.resolve // 不能设为 false，因为 tnpm 是通过 link 处理依赖，设为 false tnpm 下会有大量的冗余模块
  .set('symlinks', true).modules.add('node_modules').add((0, __path__().join)(cwd, './node_modules')) // TODO: 处理 yarn 全局安装时的 resolve 问题
  .end().extensions.merge(['.web.js', '.wasm', '.mjs', '.js', '.web.jsx', '.jsx', '.web.ts', '.ts', '.web.tsx', '.tsx', '.json']); // resolve.alias

  //alias
  if(config.alias){
    Object.keys(config.alias).forEach(key =>{
      webpackChain.resolve.alias.set(key, config.alias[key]);
    })
  }
//optimization
( 0, _optimization.default)(webpackChain, opts)

  //entry入口
  if(entry){
    Object.keys(entry).forEach(key =>{
      const e = webpackChain.entry(key)
      e.add('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000')
      //添加打包
      e.add(entry[key])
    })
  }

  
//rules
({
  _css :  (_css.default)(webpackChain,opts),
  _image : (_image.default)(webpackChain,opts),
  _file : (_file.default)(webpackChain,opts),
  _font : (_font.default)(webpackChain,opts),
  _js : (_js.default)(webpackChain,opts)
})
//plugin
webpackChain.plugin('html').use(require.resolve('html-webpack-plugin'),[{
  template: __path__().resolve(cwd, 'src/index.html'),
  filename: 'index.html'}
])

//webpackChain.plugin('size').use(require.resolve('./plugins/ComputedSizePlugin.js'))
webpackChain.when(config.isComputedSize && isProd , webpackChain =>{
  const { CleanWebpackPlugin } =  require('clean-webpack-plugin')
  webpackChain.plugin('clearFile').use(CleanWebpackPlugin)
})



//prod
webpackChain.when(isProd, webpackChain =>{
  webpackChain.plugin('dll').use(webpack.DllReferencePlugin,[{
    context: __dirname,
    manifest: __path__().resolve(cwd, './comm/library/manifest.json')
  }]).end()

  //缓存优化第二次打包构建速度
  webpackChain.plugin('hardSource').use(require.resolve('hard-source-webpack-plugin'))

  webpackChain.plugin('MiniCssExtractPlugin').use(require.resolve('mini-css-extract-plugin'), [{
    filename: 'css/[name]-[contenthash:5].css',
  }]).end()

  webpackChain.plugin('optimizeCss').use(require.resolve('optimize-css-assets-webpack-plugin')).end()
})
webpackChain.when(isDev, webpackChain =>{
  if(hot){
    // if (hot) {
    //   webpackConfig.plugin('hmr').use(bundleImplementor.HotModuleReplacementPlugin);
    // }
    console.log('111',hot,)
    webpackChain.plugin('hmr').use(bundleImplementor.HotModuleReplacementPlugin);
    webpackChain.devServer.hot(true).open(true).port(config.port).proxy(config.proxy).hotOnly(!config.isHappypack).contentBase(absOutputPath)
  }
  webpackChain.devtool(config.devtool)
})


//用户自定义配置
const filePath = __path__().resolve(cwd, './vue.config.js')
const userConfig = require(filePath) //方便用户配置支持链式调用同时支持函数调用
_isFunction(userConfig) ? userConfig(webpackChain,opts) : webpackChain.merge(userConfig)

const smp = new (_smp().default)()
return config.isSmp && isProd ? smp.wrap(webpackChain.toConfig()) : webpackChain.toConfig()
}
