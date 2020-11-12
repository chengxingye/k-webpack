Object.defineProperty(exports,"__esModule",{
  value: true
})


exports.default = imageRules

function __path__ (){
  const data = require('path')

  __path__ = function __path__ (){
    return data
  }

  return data
}

function imageRules (webpackChain , opts){
  const config = opts.config,
        env = opts.env,
        cwd = opts.cwd;

        webpackChain.module.rule('image').test([/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.webp$/])
        //启用图片缓存，减少再次图片构建时间
        // .use('cache-loader')
        //   .loader('cache-loader')
        //   .end()
        .use('url-loader').loader(require.resolve('url-loader'))
          .options({
            limit: 10000,
            name: config.filename.image + '/[name]-[contenthash:5].[ext]',
          }).end()
          //启用图片压缩 压缩比较耗时，可选择关闭
        .use('imageLoader').loader(require.resolve('image-webpack-loader')).end();

         // 项目外svg 直接拷贝过来
        webpackChain.module.rule('svg').test(/\.(svg)(\?.*)?$/).exclude.add(__path__().resolve(cwd,'./src')).end().use('url-loader').loader(require.resolve('url-loader'))
          .options({
            limit: 10000,
            fallback: {
              loader: 'file-loader',
              options: {
                name: config.filename.image +'/[name].[ext]',
              },
            },
        });
      // svg 直接inline
      webpackChain.module.rule('svg-inline').test(/\.(svg)(\?.*)?$/).include.add(__path__().resolve(cwd,'./src')).end().use('svg-inline-loader').loader(require.resolve('svg-inline-loader'))
        .options({
          classPrefix: true,
        });
}

