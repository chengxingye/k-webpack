//默认配置

//@test 
const path = require('path');

function resolveSrc(_path) {
  return path.join(__dirname, _path);
}
module.exports = {
  resolve: {
    alias: {
      assets: resolveSrc('./src')
    }
  },
}