Object.defineProperty(exports,'__esModule',{ 
  value: true
});

exports.default = generate
const testMap = {
  css: /\.(css)$/,
  sass: /\.(scss)$/,
  less: /\.(less)$/,
};

const _interopRequireDefault = (obj) => obj && obj.__esModule ? obj : { default: obj }

const _minCss = _interopRequireDefault(require('mini-css-extract-plugin'))
class GenerateLoaders {
  constructor(rule,opts) {
    this.rule = rule;
    this.env = opts.env;
    this.isDev = opts.env.NODE_ENV === 'development'
    this.config = opts.config
  }
  addCssLoader() {
    this.rule = this.rule.use('css').loader(require.resolve('css-loader')).end()
    return this
  }
  addMiniCssLoader() {
    if(this.isDev){
      this.rule =  this.rule.use('style').loader(require.resolve('style-loader')).end()
    }else{
      this.rule = this.rule.use('style').loader(_minCss.default.loader).options({publicPath: '../'}).end()
    }   
    return this
  }
  addLessLoader() {
    this.rule = this.rule.use('less').loader(require.resolve('less-loader')).end()
    return this
  }
  addScssLoader() {
    this.rule = this.rule.use('sass').loader(require.resolve('sass-loader')).end()
    return this
  }
  addPostCSSLoader() {
    this.rule = this.rule.use('postCss').loader(require.resolve('postCss-loader')).end()
    return this
  }
}
function generate (type,webpackChain, opts) {
  const gen = new GenerateLoaders(webpackChain.module.rule(type).test(testMap[type]),opts)
  webpackChain.module.rule(type).test(testMap[type])
  switch (type) {
    case 'css':
      gen.addMiniCssLoader().addCssLoader().addPostCSSLoader()
      break;
    case 'less':
      gen.addMiniCssLoader().addCssLoader().addPostCSSLoader().addLessLoader()
      break;
    case 'scss':
      gen.addMiniCssLoader().addCssLoader().addPostCSSLoader().addScssLoader()
      break;
  }
}