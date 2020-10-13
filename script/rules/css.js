const Config = require('webpack-chain');
const HappyPack = require('happypack');
const os = require('os');
const generateLoaders = require('./generate-loaders')
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
});
const testMap = {
  css: /\.(css)$/,
  sass: /\.(scss)$/,
  less: /\.(less)$/,
};
module.exports = (configChain = Config, context) => {
  const {
    isHappypack
  } = context;
  if (process.env.NODE_ENV !== 'production' && isHappypack) {
    //生成happypack，由于MiniCssExtractPlugin不能使用happyPack所以生产放弃happyPack
    const gen = type => configChain.module.rule(type)
    .test(testMap[type])
    .use('css')
      .loader('happypack/loader?id=css')
      .end();

    gen('css')
    gen('less').use('lessLoader').loader('less-loader')
    gen('sass').use('sassLoader').loader('sass-loader')

    configChain
      .plugin('happypackCSS')
      .use(HappyPack, [{
        id: 'css',
        threadPool: happyThreadPool,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      }])
    return
  }

  generateLoaders('css', configChain, context)
  generateLoaders('less', configChain, context)
  generateLoaders('scss', configChain, context)
}