import './styles/theme.scss';
import Test from './lib/Example.js';

let x = { a: 1, b: 2 };
let y = { b: -2, c: 3 };

let z = { ...x, ...y };

let myTest = new Test(z);
myTest.printVal();
