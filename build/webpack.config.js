const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); 
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const vueLoaderPlugin = require("vue-loader/lib/plugin");
const Webpack = require("webpack");
let indexLess = new ExtractTextWebpackPlugin('index.less')

module.exports = {
  mode: "development", //开发模式
  // entry: ["@babel/polyfill", path.resolve(__dirname, "../src/main.js")], //单入口文件

  devServer: {
    port: 3000,
    hot: true,
    contentBase: "../dist"
  },

  entry: {
    main: path.resolve(__dirname, "../src/main.js") //多入口文件
    // header: path.resolve(__dirname, "../src/header.js")
  },

  output: {
    filename: "[name].[hash:8].js", //打包后文件的名称
    path: path.resolve(__dirname, "../dist") //打包后的目录
  },

  resolve:{
      alias:{
        'vue$':'vue/dist/vue.runtime.esm.js',
        ' @':path.resolve(__dirname,'../src')
      },
      extensions:['*','.js','.json','.vue']
    },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ["vue-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"] // 从右向左解析原则
      },
      {
        test: /\.less$/,
        use: [
          "vue-style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")]
            }
          },
          "less-loader"
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/i, //图片文件
        use: [
          {
            test: /\.(jpe?g|png|gif)$/i, //图片文件
            use: [
              {
                loader: "url-loader",
                options: {
                  limit: 10240,
                  fallback: {
                    loader: "file-loader",
                    options: {
                      name: "img/[name].[hash:8].[ext]"
                    }
                  }
                }
              }
            ]
          },
          {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
            use: [
              {
                loader: "url-loader",
                options: {
                  limit: 10240,
                  fallback: {
                    loader: "file-loader",
                    options: {
                      name: "media/[name].[hash:8].[ext]"
                    }
                  }
                }
              }
            ]
          },
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
            use: [
              {
                loader: "url-loader",
                options: {
                  limit: 10240,
                  fallback: {
                    loader: "file-loader",
                    options: {
                      name: "fonts/[name].[hash:8].[ext]"
                    }
                  }
                }
              }
            ]
          }
        ]
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        },
        exclude: /node_modules/
      }
    ]
  },

  //   plugins: [                                                     //单入口模板
  //       new HtmlWebpackPlugin({
  //           template: path.resolve(__dirname, '../public/index.html')
  //       })
  //   ]

  plugins: [
    // new HtmlWebpackPlugin({
    //   //多入口文件
    //   template: path.resolve(__dirname, "../public/index.html"),
    //   filename: "index.html",
    //   chunks: ["main"] //与入口文件对应的模块名
    // }),

    // new HtmlWebpackPlugin({
    //   //多入口文件
    //   template: path.resolve(__dirname, "../public/header.html"),
    //   filename: "header.html",
    //   chunks: ["header"] //与入口文件对应的模块名
    // }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      filename: "index.html"
    }),

    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].css"
    }),

    new Webpack.HotModuleReplacementPlugin(),

    new vueLoaderPlugin(),
    indexLess
  ]
};