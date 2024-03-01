import { merge } from 'webpack-merge';
import common from "./webpack.common.js"

const config = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    liveReload: true,
    hot: true,
    open: true,
    static: ['./'],
  },
});

export default config;
