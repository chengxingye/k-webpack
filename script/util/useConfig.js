const path = require('path');
const fs = require('fs');

module.exports = (configChain,context) =>{
  function isFunction(fn){
    return typeof fn === 'function'
  }
  if(process.env.CONSTANTS){
    const filePath = path.resolve(process.cwd(), './vue.config.js')
    const userConfig = require(filePath)
    isFunction(userConfig) ? userConfig(configChain,context) : configChain.merge(userConfig)
  }
}