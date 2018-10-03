import * as webpack from 'webpack';

import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

export default {
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
