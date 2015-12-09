const flow = require('./build-configuration.js');

const serve = require('metalsmith-serve'),
      watch = require('metalsmith-watch');

flow
  .use(serve({ host: '0.0.0.0' }))
  .use(watch({
    paths: {
      "${source}/**/*": true,
      "scripts/**/*.js": "scripts/**/*.js",
      "styles/**/*.scss": "styles/**/*.scss",
    },
    livereload: true,
  }))
  .build(function(err, files){
    if (err){ console.log(err); }
  })
