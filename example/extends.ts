import Exception from '../src';

const styles = 'black.bg#e6a23c';

class CustomException extends Exception {
    constructor (message: any) {
        super(message, styles);
    }

    toString () {
        return this.info(styles);
    }
}

//  CustomException  Inherited example
console.log(new CustomException('Inherited example').toString());
