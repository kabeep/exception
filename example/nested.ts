import Exception from '../src';

function error() {
    throw new Exception('Nested example');
}

const raise = {
    init: error,
};

function run() {
    try {
        raise.init();
    } catch (err: any) {
        console.log(err);
    }
}

// [--------------------------------- Nested example ----------------------------------]
//
// - nested.ts:4 Object.error [as init]
//   (exception)/example/nested.ts:4:11
//
// - nested.ts:13 run
//   (exception)/example/nested.ts:13:15
//
// - nested.ts:19 Object.<anonymous>
//   (exception)/example/nested.ts:19:1
//
// - index.ts:1618 Module.m._compile
//   (ts-node)/src/index.ts:1618:23
//
// - index.ts:1621 Object.require.extensions.<computed> [as .ts]
//   (ts-node)/src/index.ts:1621:12
//
// [----------------------------------------------------------------------- Exception -]
run();
