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
    computeCost: function (program) {
        return 3;
    }
};

exports.FaceSpeak = FaceSpeak;