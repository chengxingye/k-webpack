Object.defineProperty(exports, "__esModule", { 
  value: true 
});

exports.default = optimization

function optimization (configChain){
  configChain.optimization.splitChunks({
    chunks: 'all',
    minSize: 30000, // 提高缓存利用率，这需要在http2/spdy
    maxSize: 0,
    minChunks: 3,
    maxAsyncRequests: 6,
    maxInitialRequests: 6,
    automaticNameDelimiter: '~',
    // 避免由于添加页面造成不必要的缓存失效
    name: process.env.NODE_ENV !== 'production',
    cacheGroups: {
      polyfill: {
        test: /[\\/]node_modules[\\/](core-js|@babel|regenerator-runtime)/,
        name: 'polyfill',
        priority: 70,
        minChunks: 1,
        reuseExistingChunk: true,
      },
      vendor: {
        test: ({ resource }) => {
          if (resource) {
            const include = [/[\\/]node_modules[\\/]/].every(reg => {
              return reg.test(resource);
            });
            const exclude = [/[\\/]node_modules[\\/](react|redux|antd|@ant-design)/].some(reg => {
              return reg.test(resource);
            });
            return include && !exclude;
          }
          return false;
        },
        name: 'vendor',
        priority: 50,
        minChunks: 2,
        reuseExistingChunk: true,
      },
      react: {
        test({ resource }) {
          return /[\\/]node_modules[\\/](react|redux)/.test(resource);
        },
        name: 'react',
        priority: 20,
        minChunks: 1,
        reuseExistingChunk: true,
      },
      // vue: {
      //   test({ resource }) {
      //     return /[\\/]node_modules[\\/](vue|vue-router|vue-store)/.test(resource);
      //   },
      //   name: 'vue',
      //   priority: 20,
      //   minChunks: 1,
      //   reuseExistingChunk: true,
      // },
      lodash:{
        test: /[\\/]node_modules[\\/](lodash)/,
        name: 'lodash',
        priority: 15,
        minChunks: 1,
        reuseExistingChunk: true,
      },
      antd: {
        test: /[\\/]node_modules[\\/](antd|@ant-design)/,
        name: 'antd',
        priority: 15,
        minChunks: 1,
        reuseExistingChunk: true,
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true
      }
    }
  });

  configChain.optimization
    .minimizer('js')
    .use(require.resolve('uglifyjs-webpack-plugin'),[{
      test: /\.js(\?.*)?$/i,
      parallel: false,
      uglifyOptions: {
        warnings: false,
        parse: {},
        compress: {},
        mangle: true, 
        output: null,
        toplevel: false,
        nameCache: null,
        ie8: false,
        keep_fnames: false,
      }
    }])

}