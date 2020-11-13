Object.defineProperty(exports,"__esModule",{
  value: true
})

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) {  asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _webpack(){
  const data = _interopRequireDefault(require('webpack') )

  _webpack = function _webpack(){
    return data
  }

  return data
}

function _getConfig(){
  const data = _interopRequireDefault(require("./getConfig"))

  _getConfig = function _getConfig(){
    return data
  }
  
  return data
}

function _getDllConfig(){
  const data = _interopRequireDefault(require("./getDllConfig"))

  _getDllConfig = function _getDllConfig(){
    return data
  }
  
  return data
}

function __yargsParser__() {
  const data = _interopRequireDefault(require("yargs-parser"));

  __yargsParser__ = function __yargsParser__() {
    return data;
  };

  return data;
}

function __path__ () {
  const data = require("path")

  __path__ = function __path__(){
    return data
  }

  return data
}

function __fs__ () {
  const data = require("fs")

  __fs__ = function __fs__ () {
    return data
  }

  return data
}

function __ora__ () {
  const data = _interopRequireDefault(require('ora'))

  __ora__ = function __ora__ () {
    return data
  }

  return data
}

function __chalk__ () {
  const data = _interopRequireDefault(require('chalk'))

  __chalk__ = function __chalk__ () {
    return data
  }

  return data
}

function __portfinder__ () {
  const data = _interopRequireDefault(require('portfinder'))

  __portfinder__ = function __portfinder__ () {
    return data
  }
  
  return data
}
const _dev = require('./util/bundler')
const __server = require('./util/server')
const _DevCompileDonePlugin = _interopRequireDefault(require("./plugins/DevCompileDonePlugin"))

const args = (0, __yargsParser__ () .default)(process.argv.slice(2), {
  alias: { 
    version: ['v'],
    help: ['h']
  },
  boolean: ['version']
});
const command = args._[0]
const cwd = (0, __path__().join)(process.cwd(), args.cwd || '')

const env = args.env || {};
env.NODE_ENV = (command === 'dev' ? 'development' : 'production')

const config =  require('./config.js')

let entry = args.entry
if(entry){
  entry = (0,__path__().join)(cwd,entry)
}else{
  entry = {index:(0,__path__().join)(cwd,'./src/index.js')}
}

let output = args.output;
if(output){
  output = (0,__path__().join)(cwd,output)
}else{
  output = (0,__path__().join)(cwd,'./dist')
}

let hot = args.hot || (env.NODE_ENV === 'development' ? true : false)
if (args.version && !command) {
  args._[0] = 'version';
  console.log(`bundler-webpack@${require('../package.json').version}`);
  process.exit(0);
}
_asyncToGenerator(function *(){
  const __config = ( 0 , _getConfig().default)({
    entry,
    output,
    env,
    config,
    cwd,
    hot
  })
  
  const __dllConfig = ( 0 , _getDllConfig().default )({cwd})

  const bundler = new _dev.Bundler({
    cwd,
    config
  })
  
  if(command === 'build' || command === 'build:dll'){
    const spinner = ( 0, __ora__ ().default)('building for production...')

    const isBuild = command === 'build'

    spinner.start()
    const webpack$$build = yield bundler.build({
      bundleConfigs: isBuild ? __config : __dllConfig
    }),
    stats = webpack$$build.stats

    process.stdout.write(stats.toString({colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    spinner.stop()

  }else if(command === 'dev'){
    const port = yield __portfinder__().default.getPortPromise({
      port: 8000
    }); 
    __config.plugins.push(new _DevCompileDonePlugin.default({
      port
    }))

    const devServerOpts = bundler.setupDevServerOpts({
      bundleConfigs: __config
    });
    const server = new __server.default({devServerOpts,
      headers:{
        'access-control-allow-origin': '*'
      }
    },).devServer()
    yield server.listen({
      port,
      hostname: '127.0.0.1'
    });
  }
})()



