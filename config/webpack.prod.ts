const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  devtool: false,
  optimization: {
    minimizer: [new UglifyJSPlugin()]
  },
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin({
      minSizeReduce: 1.5,
      moveToParents: true
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 300
    })
  ]
};
