
Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

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

exports.default = ComputedSizePlugin;