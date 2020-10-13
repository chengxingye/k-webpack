module.exports = (configChain , context) =>{
  const filename = context.filename.font;

    configChain.module
      .rule('font')
      .test(/\.(eot|otf|ttf|woff|woff2)(\?.*)?$/)
      .use('url-loader')

        .loader('url-loader')
        .options({
          limit: 10000,
          fallback: {
            loader: 'file-loader',
            options: {
              name: filename+'/[name]-[contenthash:5].[ext]',
            },
          },
        });
}