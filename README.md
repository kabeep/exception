# expection

<div align="center">

<img src="docs/images/logo-dark.png" alt="logo-dark">

Exception is a custom error library for Node.js that provides a more flexible and customizable way of handling errors.

---

![nodejs](https://img.shields.io/badge/NodeJS-≥14.x-lightseagreen?logo=powershell)
![Version](https://img.shields.io/badge/Version-1.0.0-cornflowerblue)
[![License](https://img.shields.io/badge/License-MIT-slateblue)](LICENSE)

English | [简体中文](README.zh-CN.md)

</div>

## 📖 Introduction

> Inspired by the work of [sindresorhus](https://github.com/sindresorhus), I decided to open source the most repetitive
> encapsulation work I do in CLI development.


I do not like disorder. Often, unexpected situations arise due to our insufficient consideration. Therefore, I encourage
those around me to engage in more comprehensive error collection work.

The goal of Exception is to transform unexpected occurrences into anticipated outcomes as much as possible.

It allows Error objects to throw exception and stack information in a more aesthetically pleasing and intuitive manner,
and can also serve as Notify to output critical information in workflows.

<div align="center">

<img src="docs/images/class-inheritance.png" alt="inheritance-tree" width="200">

class-inheritance

</div>

## ⚙️ Installation

```bash
npm install @kabeep/exception --save
```

```bash
yarn add @kabeep/exception
```

```bash
pnpm add @kabeep/exception
```

## 🚀 Usage

### Plain text or Error object

[example](example/default.ts)

```javascript
import Exception from '@kabeep/exception';

// Plain text
throw new Exception('Argument example');

// or Error object
throw new Exception(new Error('Argument example'));
```

### Using in Asynchronous Contexts

[example](example/promise.ts)

```javascript
import Exception from '@kabeep/exception';

(
    async () => {
        throw new Exception('Promise example');
    }
)().catch(console.log);
```

### Custom Styles

[example](example/stylish.ts)

```javascript
import Exception from '@kabeep/exception';

// Use custom style with chalk color, hex and rgb
const stylish = ['51,51,51', 'bg:#f56c6c']

console.log(
    new Exception('Stylish example', stylish)
);
```

### Custom Exceptions

[example](example/extends.ts)

```javascript
import Exception from '@kabeep/exception';

// > Warning
class Warning extends Exception {
    constructor (message: any) {
        super(message, [' 51,51,51 ', 'bg:#e6a23c']);
    }
}

const warn = new Warning('Inherited example');
// Warning: Inherited example [Without style]
console.log(`${warn}`);
```

### Print Key Information

[example](example/extends.ts)

```javascript
import Exception from '@kabeep/exception';

// > Info
class Info extends Exception {
    constructor (message: any) {
        super(message, ['51,51,51', 'bg:#409eff']);
    }

    toString () {
        return ` ${this.palette(['51,51,51', 'bg:#409eff'])(this.name)} ${this.message}`;
    }
}

const tip = new Info('Inherited example');
// Without stack
console.log(`${tip}`);

// > Success
class Success extends Exception {
    constructor (message: any) {
        super(message, ['51,51,51', 'bg:#67c23a']);
    }

    toString () {
        return ` ${this.palette(['51,51,51', 'bg:#67c23a'])(this.name)} ${this.message}`;
    }
}

const pass = new Success('Inherited example');
// Without stack
console.log(pass.toString());
```

## 🤝 Contribution

Contributions via Pull Requests or [Issues](https://github.com/kabeep/exception/issues) are welcome.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.