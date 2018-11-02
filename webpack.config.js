/**
 * Created by yeye on 2018-11-01.
 */

const path = require('path');
const pkg = require('./package.json');

const webpack = require('webpack');
const glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const os = require('os');

console.log('Building..., Please wait a moment.');

const getEntry = dir => {
  const foundScripts = glob.sync(`${dir}/*/index.js`, {});

  // 生成 entry 映射表
  const ret = {};
  foundScripts.forEach(scriptPath => {
    if (!/\.entry\.js$/.test(scriptPath)) {
      ret[scriptPath.replace(/^(.*)\.js$/, '$1')] = './' + scriptPath;
    }
  });
  return ret;
};

const getCopyConfig = () => {
  const foundScripts = glob.sync('example/*/', {});
  console.log(foundScripts)
  const ret = [];
  foundScripts.forEach(scriptPath => {
    if (!/(_mods|_public)/.test(scriptPath)) {
      ret.push({
        from: 'example/_public/index.html',
        to: scriptPath + 'index.html'
      });
    }
  });
  return ret;
};

const example = getEntry('example');
const entry = Object.assign(
  {
    index: './index.js'
  },
  example
);

const plugins = [
  new CleanWebpackPlugin(['dist'], {
    verbose: true
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    },
    global: '{}'
  }),
  new webpack.BannerPlugin({
    banner: '// { "framework": "Vue" }\n',
    raw: true
  }),
  new CopyWebpackPlugin(getCopyConfig(), { copyUnmodified: true })
];

const needClean = process.argv.indexOf('--watch') > -1;
needClean && plugins.shift();

const getBaseConfig = () => ({
  cache: true,
  devtool: '#source-map',
  entry,
  context: __dirname,
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  stats: {
    colors: true,
    modules: false,
    reasons: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue(\?[^?]+)?$/,
        use: []
      },
      {
        test: /\.css$/,
        use: 'postcss-loader'
      }
    ]
  },
  plugins,
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules']
  }
});

const webCfg = getBaseConfig();
webCfg.output.filename = '[name].web.js';
webCfg.module.rules[1].use.push({
  loader: 'vue-loader',
  options: {
    optimizeSSR: false,
    loaders: {
      js: 'babel-loader'
    },
    compilerModules: [
      {
        postTransformNode: el => {
          require('weex-vue-precompiler')()(el);
        }
      }
    ]
  }
});
webCfg.plugins = [new VueLoaderPlugin()].concat(webCfg.plugins)

const nativeCfg = getBaseConfig();
nativeCfg.output.filename = '[name].native.js';
nativeCfg.module.rules[1].use.push('weex-loader');

const exportConfig = [webCfg, nativeCfg];
console.log(exportConfig)
// const exportConfig = webCfg
module.exports = exportConfig;
