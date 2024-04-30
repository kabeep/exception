import Exception from '../src/index.js';

function error() {
    throw new Exception('Timing example');
}

function run() {
    try {
        setTimeout(() => {
            error();
        });
    } catch (err: any) {
        console.log(err);
    }
}

// [--------------------------------- Timing example ----------------------------------]
//
// - timer.ts:4 error
//   (exception)/example/timer.ts:4:11
//
// - timer.ts:10 Timeout._onTimeout
//   (exception)/example/timer.ts:10:13
//
// [----------------------------------------------------------------------- Exception -]
run();
