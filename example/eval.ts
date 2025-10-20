import Exception from '../src';

function error () {
    throw new Exception('Example of eval');
}

function run () {
    try {
        eval('error()');
    } catch (err: any) {
        console.log(err);
    }
}

// [-------------------------------- Example of eval ---------------------------------]
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
// - eval.ts:36 anonymous
//   (exception)/example/eval.ts:36:1
//
// [---------------------------------------------------------------------- Exception -]
run();
