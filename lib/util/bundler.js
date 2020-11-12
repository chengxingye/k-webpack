Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bundler = void 0;

function _webpack() {
  const data = _interopRequireDefault(require("webpack"));

  _webpack = function _webpack() {
    return data;
  };

  return data;
}
function _chalk () {
  const data = _interopRequireDefault(require('chalk'))

  _chalk = function _chalk () {
    return data
  }

  return data
}

function _webpackDevMiddleware() {
  const data = _interopRequireDefault(require("webpack-dev-middleware"));

  _webpackDevMiddleware = function _webpackDevMiddleware() {
    return data;
  };

  return data;
}
function _webpackHotMiddleware(){
  const data = _interopRequireDefault(require("webpack-hot-middleware"));

  _webpackHotMiddleware = function _webpackHotMiddleware() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) {  asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
class Bundler {
  constructor({
    cwd,
    config
  }) {
    this.cwd = cwd;
    this.config = config;
  }

  build({
    bundleConfigs,
    bundleImplementor = _webpack().default
  }) {
    const chalk = _chalk().default

    return _asyncToGenerator(function* () {
      return new Promise((resolve, reject) => {
        const compiler = bundleImplementor(bundleConfigs);
        compiler.run((err, stats) => {
          if (err || stats.hasErrors()) {
            try {
              console.log( chalk.red(stats.toString('errors-only')) );
            } catch (e) {}

            console.error(err);
            return reject(new Error('build failed'));
          } 
          resolve({ stats });
        });
      });
    })();
  }

  setupDevServerOpts({
    bundleConfigs,
     bundleImplementor = _webpack().default
  }) {
    const compiler = bundleImplementor(bundleConfigs);
    const devServer = this.config.devServer;  
    const compilerMiddleware = (0, _webpackDevMiddleware().default)(compiler, {
      publicPath:bundleConfigs.output.publicPath ,
      writeToDisk: devServer && (devServer === null || devServer === void 0 ? void 0 : devServer.writeToDisk),
    });
    const hotMiddleware = ( 0 , _webpackHotMiddleware().default )( compiler )
    
    return {
      compilerMiddleware,
      hotMiddleware
    }
  }

}

exports.Bundler = Bundler;
Bundler.id = 'webpack';
Bundler.version = 4;