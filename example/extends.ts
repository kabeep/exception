import Exception from '../src/index.js';

class CustomException extends Exception {
    constructor(message: any) {
        super(message, ['black', 'bg:#e6a23c']);
    }

    toString() {
        return `${this.palette(['black', 'bg:#e6a23c'])(` ${this.name} `)} ${this.message}`;
    }
}

//  CustomException  Inherited example
console.log(new CustomException('Inherited example').toString());
