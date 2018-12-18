import * as webpack from 'webpack';

import * as TerserPlugin from 'terser-webpack-plugin';

export default {
  mode: 'production',
  devtool: false,
  optimization: {
    minimizer: [new TerserPlugin({
      parallel: true
    })]
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
