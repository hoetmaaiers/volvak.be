const flow = require('./build-configuration.js');

const serve = require('metalsmith-serve'),
      watch = require('metalsmith-watch');

flow.build(function(err, files){
  if (err){ console.log(err); }
})
