import * as webpack from 'webpack';

import * as UglifyJSPlugin from 'uglifyjs-webpack-plugin';

export default {
  mode: 'production',
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
