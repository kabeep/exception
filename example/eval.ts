import Exception from '../src/index.js';

function error() {
    throw new Exception('Example of eval');
}

function run() {
    try {
        eval('error()');
    } catch (err: any) {
        console.log(err);
    }
}

// [--------------------------------- Example of eval ---------------------------------]
//
// - eval.ts:4 error
//   (exception)/example/eval.ts:4:11
//
// - eval.ts:9 eval
//   (exception)/example/eval.ts:9:9
//
// - eval.ts:9 run
//   (exception)/example/eval.ts:9:9
//
// - eval.ts:15 Object.<anonymous>
//   (exception)/example/eval.ts:15:1
//
// - index.ts:1618 Module.m._compile
//   (ts-node)/src/index.ts:1618:23
//
// - index.ts:1621 Object.require.extensions.<computed> [as .ts]
//   (ts-node)/src/index.ts:1621:12
//
// [----------------------------------------------------------------------- Exception -]
run();
