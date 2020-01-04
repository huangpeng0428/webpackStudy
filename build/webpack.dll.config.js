//webpack.dll.config.js
const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: {
    vendor: ["vue", "element-ui"]
  },
  output: {
    path: path.resolve(__dirname, "static/js"), //打包后文件输出的位置
    filename: "[name].dll.js",
    library: "[name]_library"
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, "[name]-mainfest.json"),
      name: "[name]_library",
      context: __dirname
    })
  ]
};