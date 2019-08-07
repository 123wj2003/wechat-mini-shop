const path = require('path');
const merge = require('webpack-merge');
const MiniProgramPlugin = require('mini-program-webpack-loader').plugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const resolve = (file) => path.resolve(__dirname, '../', file);
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

global.context = resolve('src')

const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
  context: global.context,
  entry: resolve('src/app.json'),
  output: {
    path: resolve('dist')
  },
  plugins: [
    new MiniProgramPlugin({
      compilationFinish:(err, stat, appJson)=>{
        // 第一次编译才执行
        require('./copyImage.js').copyTo();
      }
    }),
    new CopyWebpackPlugin([
      {
        from: resolve('src/sitemap.json'),
        to: resolve('dist/sitemap.json')
      }
    ]),
    new MomentLocalesPlugin(),
  ],
});

