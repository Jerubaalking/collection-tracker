
// function jumlisha(namba1, namba2) {

//     // console.log('checking namba 2:', parseInt(namba2).toString());
//     // return x + y;
//     let dater = new Intl.DateTimeFormat('UK');

//     return dater.format(new Date('2023/02/23'));
// }

class Calculator {
    constructor(namba1, namba2) {
        this.x = namba1;
        this.y = namba2;
        this.check();
    }
    check() {
        var x = 0;
        var y = 0;
        if (parseInt(this.x).toString() === 'NaN') {
            x = 0;
        } else {
            x = + parseInt(this.x);
        }
        if (parseInt(this.y).toString() === 'NaN') {
            y = + 0;
        } else {
            y = + parseInt(this.y);
        }
        this.x = x;
        this.y = y;
    }
    add() {
        return this.x + this.y;
    }
}
const fs = require('fs');
var reader = fs.readFileSync(__dirname + '/mfano.txt', 'utf-8');

var calculator = new Calculator('5', 'yreyryer');
console.log(calculator.y, reader);