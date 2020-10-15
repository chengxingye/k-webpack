module.exports = {
  //是否开启打包检测
  isSmp: true, 
  //输出目录
  outputName:'dist',
  //是否开启happypack
  isHappypack: true,
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
