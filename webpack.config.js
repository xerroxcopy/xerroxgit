// npm i apply-loader autoprefixer @babel/core @babel/preset-env babel-loader copy-webpack-plugin css-loader extract-text-webpack-plugin globule node-sass postcss postcss-loader pug pug-loader sass-loader style-loader webpack webpack-dev-server cssnano
const webpack = require('webpack')
const path = require('path')
const globule = require('globule')
const CopyPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const opts = {
  sourceDirectory: path.join(__dirname, 'src'),
  destinationDirectory: path.join(__dirname, 'dist'),
}

const extensionsToConvert = {
  pug: 'html',
  sass: 'css',
  js: 'js',
}

// list files to transpile
// files starting with _ won't be exported: instead, they are treated as files that are imported from elsewhere
const files = {}
Object.keys(extensionsToConvert).forEach((from) => {
  const to = extensionsToConvert[from]
  globule
    .find([`**/*.${from}`, `!**/_*.${from}`], {cwd: opts.sourceDirectory})
    .forEach((filename) => {
      files[
        filename.replace(new RegExp(`.${from}$`, 'i'), `.${to}`)
      ] = path.join(opts.sourceDirectory, filename)
    })
  console.log(files)
})

const pugLoader = [
  'apply-loader',
  {loader: 'pug-loader', options: {pretty: true}},
]

const sassLoader = [
  {loader: 'css-loader'},
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: [
        require('cssnano')({preset: 'default'}),
        require('autoprefixer')(),
      ],
    },
  },
  {loader: 'sass-loader'},
]

const jsLoader = {
  loader: 'babel-loader',
  query: {
    presets: ['@babel/preset-env'],
  },
}

const config = {
  context: opts.sourceDirectory,
  entry: files,
  output: {
    filename: '[name]',
    path: opts.destinationDirectory,
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        exclude: path.resolve(__dirname, 'src/includes'),
        use: ExtractTextPlugin.extract(pugLoader),
      },
      {
        test: /\.pug$/,
        exclude: path.resolve(__dirname, 'src/pages'),
        use: {loader: 'pug-loader', options: {pretty: true}},
      },
      {
        test: /\.scss$/,
        oneOf: [
          {
            // pugから `require('./hoge.sass?inline')` のように呼ばれた時は、ExtractTextPluginをかけない
            resourceQuery: /inline/,
            use: sassLoader,
          },
          {
            // それ以外の時は、単純にファイルを生成する
            use: [MiniCssExtractPlugin.loader, ...sassLoader],
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules(?!\/wepack-dev-server)/,
        use: jsLoader,
      },
      {
        test: /\.(png|jpe?g|gif|woff|woff2)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000000,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('[name]'),
    new MiniCssExtractPlugin({filename: 'style.css'}),
    new CopyPlugin({
      // extensionsToConvertに含まれていないファイルは、単純にコピーする
      patterns: [
        {
          from: '**/*',
          globOptions: {
            dot: true,
            ignore: Object.keys(extensionsToConvert).map(
              (extension) => `*.${extension}`
            ),
          },
        },
      ],
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  devServer: {
    contentBase: opts.destinationDirectory,
    watchContentBase: true,
  },
}

if (process.env.NODE_ENV === 'production') {
  config.plugins = config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
  ])
}

module.exports = config
