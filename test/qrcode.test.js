const QRCodeModule = require('../lib/qrcode-compact.js');
const QRCode = QRCodeModule.default || QRCodeModule;

const generateRandomString = (length) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0, n = charset.length; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * n));
  }
  return result;
};

describe('Test SVG output', () => {
  test('Expected object as the result!', () => {
    const qrcode = new QRCode('Hello World!');
    expect(typeof qrcode).toBe('object');
  });

  test("Missing 'svg' function!", () => {
    const qrcode = new QRCode('Hello World!');
    expect(typeof qrcode.svg).toBe('function');
  });

  test("Missing 'save' function!", () => {
    const qrcode = new QRCode('Hello World!');
    expect(typeof qrcode.save).toBe('function');
  });

  test('Expected string as the result!', () => {
    const qrcode = new QRCode('Hello World!');
    const svg = qrcode.svg();
    expect(typeof svg).toBe('string');
  });

  test("Missing 'svg' tags!", () => {
    const svg = new QRCode('Hello World!').svg();
    expect(/<svg[\s\S]+<\/svg>/.test(svg)).toBe(true);
  });

  test("Missing 'rect' tags!", () => {
    const svg = new QRCode('Hello World!').svg();
    expect(/<rect[\s\S]+/.test(svg)).toBe(true);
  });
});

describe('Test padding options', () => {
  test('Padding value should be supported!', () => {
    expect(() => new QRCode({ content: 'test', padding: 0 }).svg()).not.toThrow();
  });

  test('Padding value should be supported!', () => {
    expect(() => new QRCode({ content: 'test', padding: 4 }).svg()).not.toThrow();
  });

  test('Padding value must be non-negative!', () => {
    expect(() => new QRCode({ content: 'test', padding: -1 }).svg()).toThrow();
  });
});

describe('Test ECL options', () => {
  test('Error correction level L should be supported!', () => {
    expect(() => new QRCode({ content: 'test', ecl: 'L' })).not.toThrow();
  });

  test('Error correction level M should be supported!', () => {
    expect(() => new QRCode({ content: 'test', ecl: 'M' })).not.toThrow();
  });

  test('Error correction level Q should be supported!', () => {
    expect(() => new QRCode({ content: 'test', ecl: 'Q' })).not.toThrow();
  });

  test('Error correction level H should be supported!', () => {
    expect(() => new QRCode({ content: 'test', ecl: 'H' })).not.toThrow();
  });

  test('Error correction level should be case sensitive!', () => {
    expect(() => new QRCode({ content: 'test', ecl: 'm' })).toThrow();
  });

  test('Unknown error correction level!', () => {
    expect(() => new QRCode({ content: 'test', ecl: 'N' })).toThrow();
  });
});

describe('Test content length', () => {
  test('Missing string or options should throw an exception!', () => {
    expect(() => new QRCode()).toThrow();
  });

  test('Missing content should throw an exception!', () => {
    expect(() => new QRCode({})).toThrow();
  });

  test('Empty string should throw an exception!', () => {
    expect(() => new QRCode('')).toThrow();
  });

  test('1 char should be allowed!', () => {
    expect(() => new QRCode(generateRandomString(1))).not.toThrow();
  });

  test('Should allow 2953 as the max length of Version 40, L, binary!', () => {
    expect(() => new QRCode({ content: generateRandomString(2953 ), ecl: 'L' })).not.toThrow();
  });

  test('2953 is the capacity of Version 40, L, binary!', () => {
    expect(() => new QRCode({ content: generateRandomString(2953 + 1), ecl: 'L' })).toThrow();
  });

  test('Should allow 2331 as the max length of Version 40, M, binary!', () => {
    expect(() => new QRCode({ content: generateRandomString(2331 ), ecl: 'M' })).not.toThrow();
  });

  test('2331 is the capacity of Version 40, M, binary!', () => {
    expect(() => new QRCode({ content: generateRandomString(2331  + 1), ecl: 'M' })).toThrow();
  });

  test('Should allow 1663 as the max length of Version 40, Q, binary!', () => {
    expect(() => new QRCode({ content: generateRandomString(1663 ), ecl: 'Q' })).not.toThrow();
  });

  test('1663 is the capacity of Version 40, Q, binary!', () => {
    expect(() => new QRCode({ content: generateRandomString(1663  + 1), ecl: 'Q' })).toThrow();
  });

  test('Should allow 1273 as the max length of Version 40, H, binary!', () => {
    expect(() => new QRCode({ content: generateRandomString(1273 ), ecl: 'H' })).not.toThrow();
  });

  test('1273 is the capacity of Version 40, H, binary!', () => {
    expect(() => new QRCode({ content: generateRandomString(1273 + 1), ecl: 'H' })).toThrow();
  });
});
