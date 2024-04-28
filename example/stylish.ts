import Exception from '../src';

// [--------------------------------- Stylish example ---------------------------------]
//
// - stylish.ts:4 error
//   (exception)/example/stylish.ts:4:11
//
// - stylish.ts:8 run
//   (exception)/example/stylish.ts:8:5
//
// - stylish.ts:12 Object.<anonymous>
//   (exception)/example/stylish.ts:12:5
//
// - index.ts:1618 Module.m._compile
//   (ts-node)/src/index.ts:1618:23
//
// - index.ts:1621 Object.require.extensions.<computed> [as .ts]
//   (ts-node)/src/index.ts:1621:12
//
// [----------------------------------------------------------------------- Exception -]
console.log(new Exception('Stylish example', ['black', 'bgRed']));
