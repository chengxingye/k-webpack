const path = require('path');

module.exports = (configChain , context) => {
  const fileName = context.filename.image;
  configChain.module
    .rule('image')
    .test([/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.webp$/])
    //启用图片缓存，减少再次图片构建时间
    // .use('cache-loader')
    //   .loader('cache-loader')
    //   .end()
    .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 10000,
        name: fileName + '/[name]-[contenthash:5].[ext]',
      })
      .end()
      //启用图片压缩
    .use('imageLoader')
      .loader('image-webpack-loader')
    .end()

     // 项目外svg 直接拷贝过来
      configChain.module
      .rule('svg')
      .test(/\.(svg)(\?.*)?$/)
        .exclude.add(path.resolve(__dirname,'../../src'))
        .end()

      .use('url-loader')
        .loader('url-loader')
        .options({
          limit: 10000,
          fallback: {
            loader: 'file-loader',
            options: {
              name: fileName+'/[name].[ext]',
            },
          },
      });
      
  // svg 直接inline
      configChain.module
      .rule('svg-inline')
      .test(/\.(svg)(\?.*)?$/)
        .include.add(path.resolve(__dirname,'../../src'))
        .end()
      .use('svg-inline-loader')
        .loader('svg-inline-loader')
        .options({
          classPrefix: true,
        });
}