class ComputedSizePlugin {
  constructor() {
  }
  apply(compiler) {
    compiler.hooks.emit.tap('text', compilation => {
      const assets = compilation.assets
      compilation.assets['size.txt'] = {
        source: function () {
          return Object.keys(assets).map(key =>{
           return `fileName:${key} ****** size: ${assets[key].size()}`
          }).join('\n')
        },
        size:function () {
          return 20
        }
      }
    })
  }
}

module.exports = ComputedSizePlugin;