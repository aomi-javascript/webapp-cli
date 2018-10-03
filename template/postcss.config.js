/**
 * @author Sean(sean.snow@live.com)
 * @date 2017/2/9
 */
module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        // React doesn't support IE8 anyway
        'not ie < 9'
      ]
    })
  ]
};
