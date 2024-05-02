import Exception from '../src/index.js';

// [-------------------------------- Promise example ---------------------------------]
//
// - promise.ts:22 anonymous
//   (exception)/example/promise.ts:22:11
//
// - promise.ts:23 anonymous
//   (exception)/example/promise.ts:23:3
//
// [---------------------------------------------------------------------- Exception -]
(async () => {
    throw new Exception('Promise example');
})().catch(console.log);
