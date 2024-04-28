import Exception from '../src';

// [--------------------------------- Promise example ---------------------------------]
//
// - promise.ts:5 <anonymous>
//   (exception)/example/promise.ts:5:15
//
// - promise.ts:4 run
//   (exception)/example/promise.ts:4:5
//
// - promise.ts:9 Object.<anonymous>
//   (exception)/example/promise.ts:9:1
//
// - index.ts:1618 Module.m._compile
//   (ts-node)/src/index.ts:1618:23
//
// - index.ts:1621 Object.require.extensions.<computed> [as .ts]
//   (ts-node)/src/index.ts:1621:12
//
// [----------------------------------------------------------------------- Exception -]
(async () => {
    throw new Exception('Promise example');
})().catch(console.log);
