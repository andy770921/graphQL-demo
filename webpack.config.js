const path = require('path');

module.exports = {
  entry: './client/src/index.jsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './client/dist')
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        resolve: { extensions: ['.js', '.jsx'] }
      }
    ]
  },
  devServer: {
    contentBase: './client/dist'
  }
};
