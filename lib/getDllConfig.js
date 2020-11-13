
Object.defineProperty(exports, "__esModule", { 
  value: true 
});

exports.default = getDLLConfig


const _interopRequireDefault = (obj) => obj && obj.__esModule ? obj : { default: obj };

function __path__() {
  const data = require('path')
  
  __path__ = function __path__(){
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

function _webpack(){
  const data = _interopRequireDefault(require('webpack') )

  _webpack = function _webpack(){
    return data
  }

  return data
}

function getDLLConfig(opts){
  const cwd = opts.cwd

  let webpack = _webpack().default
  const webpackChain = new (_webpackChain().default)()


  webpackChain.mode('production')
  webpackChain.entry('library').add('vue','vue-route')

  webpackChain.plugin('dll').use(webpack.DllPlugin,[{
    context: cwd,
    name: '[name]_library',
    path: __path__().join(cwd, 'comm/[name]/manifest.json')
  }]).end()
  
  
  webpackChain.output.filename('[name]/dll.js').path(__path__().resolve(cwd, 'comm')).library('[name]_library').end()

  return webpackChain.toConfig()
}