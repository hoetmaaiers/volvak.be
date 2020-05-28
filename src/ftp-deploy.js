var fs = require( 'vinyl-fs' ),
    ftp = require( 'vinyl-ftp' );

var conn = new ftp({
  host:     'users.telenet.be',
  user:     'w225685',
  password: 'Berber10',
  log:      console.log
});

var globs = ['./build/**/*'];

fs.src( globs )
  .pipe( conn.newerOrDifferentSize('.'))
  .pipe( conn.dest('.'));
