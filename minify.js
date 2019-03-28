var fs = require('fs');
var minify = require('minify');
var pkg = require('./package.json');

var src = './lib/qrcode-compact.js';
var dst = './dist/qrcode-compact.min.js';
minify(src).then(function(data) {
  var comment = "/*! " + pkg.name + " v" + pkg.version + " | " + pkg.homepage + " | MIT license */\n";
  var js = comment + data;
  fs.writeFileSync(dst, js);
  console.log("Done!");
}).catch(function(error){
	console.error(error);
})


