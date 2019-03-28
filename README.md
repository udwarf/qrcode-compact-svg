## About this fork
This is an optimized version of JavaScript library for qr-code generation as SVG image.
It will generate SVG image with minimum number of nodes (3 instead of hundreds) that will significant reduce resource usage by browser.
Taking into account the vector nature of SVG, the image is generated with a minimal size, and then you can resize it to the required dimensions without loss of quality.

Comparing the output of the libraries qrcode, qrcode to produce smaller output and qrcode-compact:

##### encoding string "hello!"
| library | file size | nodes number | 
| ------ | ------------- | ---------------- 
| qrcode |35200 bytes | 226 
| qrcode patched|9169 bytes | 229
| **qrcode-compact** |1177 bytes | 3 

##### encoding string "123123123123123"
| library | file size | nodes number | 
| ------ | ------------- | ---------------- 
| qrcode |51402 bytes | 330 | 
| qrcode patched|13330 bytes | 334
| *qrcode-compact* |1601 bytes | 3



## Introduction


This library has been written to generate a SVG image of QR Code in Node.js, goals:
* pure JavaScript
* no browser requirement
* no external dependencies
* generate SVG output

## Getting Started

Install the package:
```bash
npm install udwarf/qrcode-compact-svg
```
Or simply download https://raw.githubusercontent.com/udwarf/qrcode-compact-svg/master/dist/qrcode-compact.min.js

Inline example:
```javascript
var QRCode = require("qrcode-compact-svg");
var svg = new QRCode("Hello World!").svg();
```

More options:
```javascript
var qrcode = new QRCode({
  content: "http://xtag-int.com/",
  padding: 1,
  color: "#000000",
  background: "#ffffff",
  ecl: "M"
});
qrcode.save("sample.svg", function(error) {
  if (error) throw error;
  console.log("Done!");
});
```

## Options

**List of options:**
* **content** - QR Code content, required
* **padding** - white space padding, `1` module by default, `0` for no border
* **color** - color of modules, color name or hex string, e.g. `#000000`
* **background** - color of background, color name or hex string, e.g. `white`
* **ecl** - error correction level: `L`, `M`, `H`, `Q`

## Command Line

```
Usage:
  qrcode-compact-svg [options] <content>

Options:
  --help                 Print this message
  --padding [value]      Offset in number of modules
  --color [color]        Foreground color, hex or name
  --background [color]   Background color, hex or name
  --ecl [value]          Error correction level: L, M, H, Q
  -o [file]              Output file name
  -f                     Force overwrite
  -v                     Print version number

Examples:
  qrcode-compact-svg http://github.com
  qrcode-compact-svg -f -o hello.svg "Hello World"
  qrcode-compact-svg --padding 2 "Little fox..."
  qrcode-compact-svg --color blue --background #ececec "...jumps over"
```

## Usage Scenarios

### Convert to other formats

Using [html-pdf](https://www.npmjs.com/package/html-pdf) to convert SVG to PDF (or PNG or JPEG)
```javascript
var QRCode = require('qrcode-compact-svg');
var svg = new QRCode('hello').svg();
...
var pdf = require('html-pdf');
pdf.create(svg, { border: 0, type: 'pdf' }).toFile('output.pdf', function(err, res) {
  ...
});
```

### ASCII modules

QR Code in ASCII to output in a shell
```javascript
var QRCode = require('qrcode-compact-svg');

var hello = new QRCode("Hello World!");
var modules = hello.qrcode.modules;

var ascii = '';
var length = modules.length;
for (var y = 0; y < length; y++) {
  for (var x = 0; x < length; x++) {
    var module = modules[x][y];
    ascii += (module ? 'x' : ' ');
  }
  ascii += '\r\n';
}
console.log(ascii);
```

```


    xxxxxxx xx    x x xxxxxxx
    x     x  xxxx x x x     x
    x xxx x xx  xx  x x xxx x
    x xxx x       xx  x xxx x
    x xxx x  x   x  x x xxx x
    x     x  x  xx xx x     x
    xxxxxxx x x x x x xxxxxxx
            xx     xx        
    x x  xx    x x   xx   x x
       x x  xx x    xx x xx x
     x  x xx   x x x  xx   xx
     x xx  xxx xx x x  x  x x
     xx  xxxx       xxxx    x
    x x  x xx x xx xx x xx xx
    x    xx   xxxx    xxxx   
    xx xx   x  x  x x xx    x
       xxxx xxxx    xxxxxx  x
                    x   x x  
    xxxxxxx  x  xxx x x x   x
    x     x xxx  x xx   x  x 
    x xxx x        xxxxxxxxxx
    x xxx x  xxxxxxxxx  x xx 
    x xxx x xxx  xx  x    x x
    x     x    x    x     x  
    xxxxxxx xxx xxx   x   x x


```

### Web browser

Use on a HTML page with JavaScript
```html
<!DOCTYPE html>
<html>
<body>
<div id="container"></div>
<script src="dist/qrcode.min.js"></script>
<script>
var qrcode = new QRCode("Hello World!");
var svg = qrcode.svg();
document.getElementById("container").innerHTML = svg;
</script>
</body>
</html>
```

## Thanks

Thanks to [davidshimjs](https://github.com/davidshimjs/qrcodejs) for the base library.

Thanks to [Kazuhiko Arase](http://www.d-project.com/) for the original QR Code in JavaScript algorithm.

## Legal notice

```
Licensed under the MIT license:
http://www.opensource.org/licenses/mit-license.php

The word "QR Code" is registered trademark of DENSO WAVE INCORPORATED
http://www.denso-wave.com/qrcode/faqpatent-e.html
```
