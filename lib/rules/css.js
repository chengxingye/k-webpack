Object.defineProperty(exports, '__esModule',{
  value: true
});

exports.default = getCssRule


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
const _generate = _interopRequireDefault(require('./generate-loaders.js'))

function getCssRule(webpackChain , opts){

  const happypack = _happyPack().default;
  const _happyThreadPool = happypack.ThreadPool({
    size: __os__().cpus().length
  });
  const env = opts.env,
  config = opts.config,
  isDev = env.NODE_ENV === 'development'

if (isDev && config.isHappypack) {
  const testMap = {
    css: /\.(css)$/,
    sass: /\.(scss)$/,
    less: /\.(less)$/,
  };
    //生成happypack，由于MiniCssExtractPlugin不能使用happyPack所以生产放弃happyPack
    const gen = type => webpackChain.module.rule(type).test(testMap[type]).use('css').loader('happypack/loader?id=css').end();

    gen('css')
    gen('less').use('lessLoader').loader(require.resolve('less-loader'))
    gen('sass').use('sassLoader').loader(require.resolve('sass-loader'))

    webpackChain.plugin('happypackCSS').use(happypack, [{
      id: 'css',
      threadPool: _happyThreadPool,
      loaders: [
        require.resolve('style-loader'),
        require.resolve('css-loader'),
        require.resolve('postcss-loader')
      ]
    }])
    return
    }
    return {
      _css:( 0 , _generate.default)('css', webpackChain, opts),
      _less:( 0 , _generate.default)('less', webpackChain, opts),
      //_scss:( 0 , _generate.default)('scss', webpackChain, opts)
    }   
   
}
