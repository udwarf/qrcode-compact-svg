var QRCode = require('../lib/qrcode-compact.js');

//Sample 1
var qrcode = new QRCode("Hello World!");
qrcode.save("sample-1.svg");

//Sample 2
var qrcode = new QRCode({
  content: "http://github.com/",
  padding: 4,
  color: "#000000",
  background: "#ffffff",
  ecl: "M"
});

qrcode.save("sample-2.svg", function(error) {
  if (error) return console.error(error.message);
});

//Sample 3
var qrcode = new QRCode({
  content: "http://github.com/",
  color: "blue",
  background: "beige",
  ecl: "H"
});

var svg = qrcode.svg();
console.log(svg);

qrcode.save("sample-3.svg", function(error) {
  if (error) return console.error(error.message);
  console.log("QR Code saved!");
});
