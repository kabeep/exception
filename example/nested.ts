import Exception from '../src/index.js';

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

// [--------------------------------- Nested example ---------------------------------]
//
// - nested.ts:4 Object.error [as init]
//   (exception)/example/nested.ts:4:11
//
// - nested.ts:13 run
//   (exception)/example/nested.ts:13:15
//
// - nested.ts:37 anonymous
//   (exception)/example/nested.ts:37:1
//
// [---------------------------------------------------------------------- Exception -]
run();
