Object.defineProperty(exports,'__esModule',{ 
  value: true
});


exports.default = fontRules;

function fontRules (webpackChain , opts){
  const config = opts.config;

  webpackChain.module.rule('font').test(/\.(eot|otf|ttf|woff|woff2)(\?.*)?$/).use('urlLoader').loader(require.resolve('url-loader'))
    .options({
      limit: 10000,
      fallback: {
        loader: require.resolve('file-loader'),
        options: {
          name: config.filename.font+'/[name]-[contenthash:5].[ext]',
        },
      },
    });
}
