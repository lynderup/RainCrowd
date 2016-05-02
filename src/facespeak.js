/**
 * Created by dklukjor on 4/25/16.
 */
var assert = require('assert');

var binOps = ["plus", "times", "minus", "divide"];
var branchOps = ["while", "if"];

function arrayContains(arr, elem) {
    return arr.indexOf(elem) > -1;
}

var interpreter = {
    visitBinOp: function (program) {
        assert(program.left != undefined, 'Invalid left');
        assert(program.right != undefined, 'Invalid right');

        var left = interpreter.visit(program.left);
        var right = interpreter.visit(program.right);
        if (program.expr == "plus") {
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
    },
    visitBranchOp: function (program) {
        assert(program.cond != undefined, 'Invalid condition');
        assert(program.body != undefined, 'Invalid body');
        var cond = interpreter.visit(program.cond);
        if (program.expr == "if") {
            assert(program.else != undefined, 'Invalid else');
            if (cond) {
                return interpreter.visit(program.body);
            } else {
                return interpreter.visit(program.else);
            }
        }
    },
    visit: function (program) {
        if (typeof program == "number") return program;
        if (typeof program == "boolean") return program;
        
        assert(typeof program == 'object', 'Invalid program type');
        assert(typeof program.expr == 'string', 'Invalid expr');
        if (arrayContains(binOps, program.expr)) return interpreter.visitBinOp(program);
        else if (arrayContains(branchOps, program.expr)) return interpreter.visitBranchOp(program);

        throw "Invalid expression: " + program.expr;
    }
};

var FaceSpeak = {

    interpret: (program) => {
        return interpreter.visit(program);
    },
    computeCost: function (program) {
        return 3;
    },
    generateRandom: (size) => {
        if (size <= 0) return randomInt(100);
        switch (randomInt(9)) {
            case 0:
                return randomInt(100);
            case 1:
            case 2:
                return {
                    expr: "plus",
                    left: FaceSpeak.generateRandom(size - 1),
                    right: FaceSpeak.generateRandom(size - 1)
                };
            case 3:
            case 4:
                return {
                    expr: "times",
                    left: FaceSpeak.generateRandom(size - 1),
                    right: FaceSpeak.generateRandom(size - 1)
                };
            case 5:
            case 6:
                return {
                    expr: "minus",
                    left: FaceSpeak.generateRandom(size - 1),
                    right: FaceSpeak.generateRandom(size - 1)
                };
            case 7:
            case 8:
                return {
                    expr: "divide",
                    left: FaceSpeak.generateRandom(size - 1),
                    right: FaceSpeak.generateRandom(size - 1)
                };
        }
    }
};

function randomInt(rightBound) {
    return Math.floor(Math.random() * rightBound);
}

exports.FaceSpeak = FaceSpeak;