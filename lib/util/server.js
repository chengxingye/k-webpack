Object.defineProperty(exports,"__esModule",{
  value: true
})


function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function __express () {
  return  data = _interopRequireDefault(require('express'))
  
  __express = function __express(){
    return data
  }

  return data
}

class Server{
  constructor({ devServerOpts, headers },bundleImplementor){
    this.devServerOpts = devServerOpts
    this.headers = headers || {}
    this.app =  __express().default()
  }
  setupHeaders() {
    this.app.all('*', (req, res, next) => {
      res.set(this.headers);
      next();
    });
  }
  devServer(){
      if(Object.keys(this.headers).length){
          this.setupHeaders()
      }
    
      this.app.use(this.devServerOpts.compilerMiddleware)
      this.app.use(this.devServerOpts.hotMiddleware)
      return this.app;
  }
}

exports.default = Server

