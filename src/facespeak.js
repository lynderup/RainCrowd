/**
 * Created by dklukjor on 4/25/16.
 */
var assert = require('assert');

var FaceSpeak = {
    interpret: (program) => {
        if(typeof program == 'number') {
            return program;
        }

        assert(typeof program == 'object', 'Invalid program type');
        assert(typeof program.expr == 'string', 'Invalid expr');
        assert(program.left != undefined, 'Invalid left');
        assert(program.right != undefined, 'Invalid right');

        var left = FaceSpeak.interpret(program.left);
        var right = FaceSpeak.interpret(program.right);
        if(program.expr == "plus") {
            return left + right;
        }
        if (program.expr == "times") {
            return left * right;
        }
        if (program.expr == "minus") {
            return left - right;
        }
        if (program.expr == "divide") {
            return left / right;
        }
        throw "Invalid expression: " + program.expr;
    },

    generateRandom: (size) => {
        if(size <= 0) return randomInt(100);
        switch (randomInt(9)) {
            case 0:
                return randomInt(100);
            case 1:
            case 2:
                return {expr: "plus", left: FaceSpeak.generateRandom(size - 1), right: FaceSpeak.generateRandom(size - 1)};
            case 3:
            case 4:
                return {expr: "times", left: FaceSpeak.generateRandom(size - 1), right: FaceSpeak.generateRandom(size - 1)};
            case 5:
            case 6:
                return {expr: "minus", left: FaceSpeak.generateRandom(size - 1), right: FaceSpeak.generateRandom(size - 1)};
            case 7:
            case 8:
                return {expr: "divide", left: FaceSpeak.generateRandom(size - 1), right: FaceSpeak.generateRandom(size - 1)};
        }
    }
};

function randomInt(rightBound)
{
    return Math.floor(Math.random() * rightBound);
}

exports.FaceSpeak = FaceSpeak;