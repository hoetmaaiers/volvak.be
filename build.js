var Metalsmith = require('metalsmith'),
    path = require('path'),
    templates = require('metalsmith-templates'),
    markdown = require('metalsmith-markdown'),
    sass = require('metalsmith-sass'),
    collections = require('metalsmith-collections'),
    images = require('metalsmith-project-images'),
    serve = require('metalsmith-serve'),
    watch = require('metalsmith-watch'),
    webpack = require('metalsmith-webpack');


var m = Metalsmith(__dirname)
    .clean(true)
    .use(
      collections({
        projects: {
          pattern: 'projects/*/*.md',
          sortBy: 'date:desc',
          resverse: false,
        }
      })
    )
    .use(images({
      pattern: 'projects/**/*.md'
    }))
    .use(markdown())
    .use(templates({
      engine: 'jade',
      }))
    .use(webpack({
      context: path.resolve(__dirname, './src/scripts/'),
      entry: './index.js',
      output: {
        path: path.resolve(__dirname, './build/scripts/'),
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
          },
        ],
        resolve: {
          extensions: ['', '.js', '.jsx']
        }
      }
    }))
    .destination('./build')
    .use(serve({}))
    .use(watch({
      paths: {
        "${source}/**/*": true,
        "templates/**/*": "**/*.md",
        "app/scripts/**/*.js": "**/*.js",
      },
      livereload: true,
    }))
    .build(function(err, files){
      if (err){ console.log(err); }
    })

module.exports = function() { return m }
