/* 自定义配置 */
'use strict';

const fs = require('fs');
const path = require('path');
const paths = require('./paths');
const lessToJs = require('less-vars-to-js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getExtra = (nodeEnv) => {
  // 多页应用入口文件数组
  const pages = ['index', 'index-charon', 'index-venus'];
  // 获取antd自定义主题设置
  const antdThemer = lessToJs(fs.readFileSync(path.join(__dirname, '../src/themes/antd-theme/index.less'), 'utf8'));
  // 入口文件
  const entry = {};
  // htmlWebpackPlugins
  const htmlWebpackPlugins = [];
  pages.forEach(i => {
    if (nodeEnv === '"development"') {
      entry[i] = [
        require.resolve('./polyfills'),
        require.resolve('react-dev-utils/webpackHotDevClient'),
        i === 'index' ? paths.appIndexJs : paths.appSrc + `/${i}.tsx`
      ];

      htmlWebpackPlugins.push(new HtmlWebpackPlugin({
        inject: true,
        template: paths.appHtml,
        chunks: [i],
        filename: `${i}.html`
      }));
    } else {
      entry[i] = [
        require.resolve('./polyfills'),
        i === 'index' ? paths.appIndexJs : paths.appSrc + `/${i}.tsx`
      ];

      htmlWebpackPlugins.push(new HtmlWebpackPlugin({
        inject: true,
        template: paths.appHtml,
        chunks: [i],
        filename: `${i}.html`,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        }
      }));
    }
  });

  // less loader
  const lessLoaders = (() => {
    const arr = ['less-module', 'customize-antd-theme'];
    const resArr = [];
    arr.forEach(i => {
      const opts = {
        test: /\.less$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          {
            loader: require.resolve('less-loader'),
            options: {
              javascriptEnabled: true
            }
          }
        ],
      };
      if (i === 'less-module') {
        opts.include = /\.module\.less/; // 需开启的less-module以.module结尾
        opts.exclude = /node_modules/;
        opts.use[1].options.modules = true;
        opts.use[1].options.localIdentName = '[local]__[hash:base64:5]';
      } else if (i === 'customize-antd-theme') {
        opts.exclude = /\.module\.less/;
        opts.use[3].options.modifyVars = antdThemer;
      }
      resArr.push(opts);
    })
    return resArr;
  })();

  return { entry, htmlWebpackPlugins, lessLoaders };
}


module.exports = { getExtra };
