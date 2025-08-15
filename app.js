import fs from 'fs';
import QRCode from './lib/qrcode-compact.js';
import pkg from './package.json' assert { type: 'json' };

// Default configuration
const config = {
  verbose: process.env.NODE_VERBOSE === 'true' || process.env.NODE_VERBOSE === '1',
};

// Command line interface
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  switch (args[i]) {
    case '--help':
      printHelp();
      process.exit(0);
    case '--padding':
      config.padding = parseFloat(args[++i]);
      break;
    case '--width':
      config.width = parseFloat(args[++i]);
      break;
    case '--height':
      config.height = parseFloat(args[++i]);
      break;
    case '--color':
      config.color = args[++i];
      break;
    case '--background':
      config.background = args[++i];
      break;
    case '--ecl':
      config.ecl = args[++i];
      break;
    case '-f':
      config.force = true;
      break;
    case '-o':
      config.outputFile = args[++i];
      break;
    case '-v':
      console.log(pkg.version);
      process.exit(0);
    default:
      if (i === args.length - 1) {
        config.content = args[i];
      } else {
        console.error(`Unknown command line argument: ${args[i]}`);
        process.exit(2);
      }
  }
}

function printHelp() {
  console.log(`Usage:
  qrcode-compact-svg [options] <content>

Options:
  --help                 Print this message
  --padding [value]      Offset in number of modules
  --width [px]           Image width in pixels
  --height [px]          Image height in pixels
  --color [color]        Foreground color, hex or name
  --background [color]   Background color, hex or name
  --ecl [value]          Error correction level: L, M, H, Q
  -o [file]              Output file name
  -f                     Force overwrite
  -v                     Print version number

Examples:
  qrcode-compact-svg http://github.com
  qrcode-compact-svg -f -o hello.svg "Hello World"
  qrcode-compact-svg --padding 2 --width 120 --height 120 "Little fox..."
  qrcode-compact-svg --color blue --background #ececec "...jumps over"
  `);
}

if (args.length === 0) {
  printHelp();
  process.exit(0);
}

if (typeof config.content !== 'string' || config.content.length === 0) {
  console.error('Content is missing!');
  process.exit(2);
}

const qrcode = new QRCode(config);
const svg = qrcode.svg();

if (typeof config.outputFile === 'string' && config.outputFile.length > 0) {
  if (!config.force && fs.existsSync(config.outputFile)) {
    console.error(`File already exists: ${config.outputFile}`);
    process.exit(2);
  }
  fs.writeFileSync(config.outputFile, svg);
  console.log('Done!');
} else {
  console.log(svg);
}
