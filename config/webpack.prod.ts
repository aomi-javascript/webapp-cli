import * as webpack from 'webpack';

import * as TerserPlugin from 'terser-webpack-plugin';
import * as CssMinimizerPlugin from 'css-minimizer-webpack-plugin';


export default {
  mode: 'production',
  devtool: false,
  optimization: {
    chunkIds: 'named',
    splitChunks: {
      chunks: 'all'
    },
    minimize: true,
    minimizer: [new TerserPlugin({
      parallel: true
    }), new CssMinimizerPlugin()]
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
