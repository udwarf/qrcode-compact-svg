var fs = require('fs');
var minify = require('minify');
var pkg = require('./package.json');

var src = './lib/qrcode-compact.js';
var dst = './dist/qrcode-compact.min.js';

minify(src, function(error, data) {
  if (error) return console.error(error);
  var comment = "/*! " + pkg.name + " v" + pkg.version + " | " + pkg.homepage + " | MIT license */\n";
  var js = comment + data;
  fs.writeFileSync(dst, js);
  console.log("Done!");
});