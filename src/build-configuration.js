const Metalsmith  = require('metalsmith'),
      path        = require('path'),
      templates   = require('metalsmith-templates'),
      markdown    = require('metalsmith-markdown'),
      sass        = require('metalsmith-sass'),
      drafts      = require('metalsmith-drafts'),
      collections = require('metalsmith-collections'),
      images      = require('metalsmith-project-images'),
      metadata    = require('metalsmith-metadata'),
      webpack     = require('metalsmith-webpack');


console.log(__dirname);

const m = Metalsmith(__dirname)
  .source('../content')
  .destination('../build')
  .clean(true)

  .use(metadata({
    settings: 'settings/general.yaml'
  }))

  .use(drafts())

  .use(
    collections({
      projects: {
        pattern: 'projects/*/*.md',
        sortBy: 'title',
        reverse: false
      }
    })
  )

  .use(images({ pattern: 'projects/**/*.md' }))

  .use(markdown())

  .use(templates({
    source: '../src/templates',
    engine: 'jade'
  }))

  .use(webpack({
    context: path.resolve(__dirname, 'scripts'),
    entry: './index.js',
    output: {
      path: path.resolve(__dirname, '../build/scripts'),
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel'
        },
        {
          test: /\.js?$/,
          exclude: /(node_modules|bower_components)/,
          loader: "imports?$=jquery"
        }
      ],
      resolve: {
        extensions: ['', '.js', '.jsx']
      }
    },
    devtool: 'source-map'
  }));

module.exports = m;
