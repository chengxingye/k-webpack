module.exports = (configChain , context) =>{
  const filename = context.filename.file;
  configChain.module
  // 部分json文件只需要使用路径
    .rule('json')
    .test(/\.(path\.json)$/)
    .type('javascript/auto')
    .use('file-loader')
      .loader('file-loader')
      .options({
        name: filename,
      });

  configChain.module
    // 其它文件直接拷贝
    .rule('file')
    .test(/\.(mp3|pdf|json)$/)
    .use('file-loader')
      .loader('file-loader')
      .options({
        name: filename+'/[name]-[contenthash:5].[ext]',
      });
}