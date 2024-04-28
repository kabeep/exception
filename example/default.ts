import Exception from '../src';

// [--------------------------------- Default example ---------------------------------]
//
// - default.ts:21 Object.<anonymous>
//   (exception)/example/default.ts:21:13
//
// - index.ts:1618 Module.m._compile
//   (ts-node)/src/index.ts:1618:23
//
// - index.ts:1621 Object.require.extensions.<computed> [as .ts]
//   (ts-node)/src/index.ts:1621:12
//
// - bin.ts:649 phase4
//   (ts-node)/src/bin.ts:649:14
//
// - bin.ts:95 bootstrap
//   (ts-node)/src/bin.ts:95:10
//
// [----------------------------------------------------------------------- Exception -]
console.log(new Exception('Default example'));
