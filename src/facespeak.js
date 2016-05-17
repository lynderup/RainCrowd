/**
 * Created by dklukjor on 4/25/16.
 */
var assert = require('assert');

var binOps = ["plus", "times", "minus", "divide"];
var branchOps = ["if"];
var letOps = ["let"];
var loopOps = ["for"];

function arrayContains(arr, elem) {
    return arr.indexOf(elem) > -1;
}

var interpreter = {
    visitBinOp: function (program, env) {
        assert(program.left != undefined, 'Invalid left');
        assert(program.right != undefined, 'Invalid right');

        var left = interpreter.visit(program.left, env);
        var right = interpreter.visit(program.right, env);
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
    visitBranchOp: function (program, env) {
        assert(program.cond != undefined, 'Invalid condition');
        assert(program.body != undefined, 'Invalid body');
        var cond = interpreter.visit(program.cond, env);
        if (program.expr == "if") {
            assert(program.else != undefined, 'Invalid else');
            if (cond) {
                return interpreter.visit(program.body, env);
            } else {
                return interpreter.visit(program.else, env);
            }
        }
    },
    visitLetOp: function (program, env) {
        assert(typeof program.varname == 'string', 'Invalid variable name');
        assert(typeof program.varexpr != 'undefined', 'Invalid value expression');
        assert(typeof program.body != 'undefined', 'Invalid body');

        var varexpr = interpreter.visit(program.varexpr, env);
        var newEnv = Object.create(env);
        newEnv[program.varname] = varexpr;
        return interpreter.visit(program.body, newEnv);
    },
    visitLoopOp: function (program, env) {
        assert(typeof program.loopvar == 'string', 'Invalid loop variable name');
        assert(typeof program.initialval != 'undefined', 'Invalid initial value expression');
        assert(typeof program.from == 'number', 'start bound was not a number');
        assert(typeof program.to == 'number', 'end bound was not a number');
        assert(typeof program.body != 'undefined', 'Invalid to body');

        var from = interpreter.visit(program.from, env);
        var to = interpreter.visit(program.to, env);
        var initial = interpreter.visit(program.initialval, env);
        var newEnv = interpreter.extend(env, program.loopvar, initial);
        for (var i = from; i < to; ++i) {
            newEnv[program.loopvar] = interpreter.visit(program.body, newEnv);
        }
        return newEnv[program.loopvar];
    },
    visit: function (program, env) {
        if (typeof program == "number") return program;
        if (typeof program == "boolean") return program;
        if (typeof program == "string") return interpreter.lookup(env, program);

        assert(typeof program == 'object', 'Invalid program type');
        assert(typeof program.expr == 'string', 'Invalid expr');
        if (arrayContains(binOps, program.expr)) return interpreter.visitBinOp(program, env);
        else if (arrayContains(branchOps, program.expr)) return interpreter.visitBranchOp(program, env);
        else if (arrayContains(letOps, program.expr)) return interpreter.visitLetOp(program, env);
        else if (arrayContains(loopOps, program.expr)) return interpreter.visitLoopOp(program, env);

        throw "Invalid expression: " + program.expr;
    },
    extend: function (env, variable, value) {
        var newEnv = Object.create(env);
        newEnv[variable] = value;
        return newEnv;
    },
    lookup: function (env, variable) {
        var lookupResult = env[variable];
        if (typeof lookupResult == 'undefined') {
            throw "Variable not defined: " + variable;
        }
        return lookupResult;
    }
};

var FaceSpeak = {
// TODO consistency
    interpret: (program, env) => {
        var _env = env;
        if (_env == null) {
            _env = {};
        }
        return interpreter.visit(program, _env);
    },
    computeCost: function (program) {
        if (typeof program == 'number') {
            return 0;
        }
        if (typeof program == 'string') {
            return 0;
        }
        if (arrayContains(binOps, program.expr)) {
            var costRight = FaceSpeak.computeCost(program.right);
            var costLeft = FaceSpeak.computeCost(program.left);
            return costLeft + costRight + 1;
        } else if (arrayContains(branchOps, program.expr)) {
            var costCond = FaceSpeak.computeCost(program.cond);
            var costBody = FaceSpeak.computeCost(program.body);
            var costElse = FaceSpeak.computeCost(program.else);
            return costCond + Math.max(costBody, costElse) + 1;
        } else if (arrayContains(letOps, program.expr)) {
            var costVar = FaceSpeak.computeCost(program.varexpr);
            var costBody = FaceSpeak.computeCost(program.body);
            return costVar + costBody + 1;
        } else if (arrayContains(loopOps, program.expr)) {
            var costInitial = FaceSpeak.computeCost(program.initialval);
            var costBody = FaceSpeak.computeCost(program.body);
            var loopCount = program.to - program.from;
            return costInitial + (costBody * loopCount) + 1;
        }
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