const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const testMap = {
  css: /\.(css)$/,
  sass: /\.(scss)$/,
  less: /\.(less)$/,
};

class GenerateLoaders {
  constructor(rule,context) {
    this.rule = rule;
    this.context = context;
  }
  addCssLoader() {
    this.rule = this.rule.
    use('css')
      .loader('css-loader')
      .end()
    return this
  }
  addMiniCssLoader() {
    this.rule = process.env.NODE_ENV !== 'production' ? 
    this.rule.use('style').loader('style-loader').end(): 
    this.rule.use('style')
      .loader( MiniCssExtractPlugin.loader)
      .options({
        publicPath: '../',
      })
      .end()
    return this
  }
  addLessLoader() {
    this.rule = this.rule.
    use('less')
      .loader('less-loader')
      .end()
    return this
  }
  addScssLoader() {
    this.rule = this.rule.
    use('sass')
      .loader('sass-loader')
      .end()
    return this
  }
  addPostCSSLoader() {
    this.rule = this.rule.
    use('postCss')
      .loader('postcss-loader')
      .end()
    return this
  }
}
module.exports = (type, configChain, context) => {
  const gen = new GenerateLoaders(configChain.module.rule(type).test(testMap[type]),context)
  configChain.module.rule(type).test(testMap[type])
  switch (type) {
    case 'css':
      gen
        .addMiniCssLoader()
        .addCssLoader()
        .addPostCSSLoader()
      break;
    case 'less':
      gen.addMiniCssLoader()
        .addCssLoader()
        .addPostCSSLoader()
        .addLessLoader()
      break;
    case 'sass':
      gen.addMiniCssLoader()
        .addCssLoader()
        .addPostCSSLoader()
        .addScssLoader()
      break;
  }
  if (process.env.NODE_ENV === 'production') {
    configChain.plugin('MiniCssExtractPlugin')
      .use(MiniCssExtractPlugin, [{
        filename: 'css/[name]-[contenthash:5].css',
      }])
      .end()
    configChain.plugin('optimizeCss')
      .use(optimizeCss)
  }
}