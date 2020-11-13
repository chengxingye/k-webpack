module.exports = {
  //是否开启打包检测
  isSmp: true, 
  //输出目录
  outputName:'dist',
  //是否开启happypack
  isHappypack: false,
  //是否开启计算文件大小
  isComputedSize:true,
  devtool:'eval-cheap-source-map',
  //hot 端口
  port:3001,
  //代理
  proxy:{
    '/api': 'http://localhost:3040'
  },
  filename:{
    image:'static/image',
    file:'static/file',
    font:'static/font',
  }
}
