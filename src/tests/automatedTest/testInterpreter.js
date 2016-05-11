var FaceSpeak = require('./../../facespeak').FaceSpeak;
var assert = require('assert');

assert.equal(FaceSpeak.interpret({
        expr: "plus",
        left: {
            expr: "times",
            left: 3,
            right: 3
        },
        right: 1
    }), 10);

assert.equal(FaceSpeak.interpret({
        expr: "if",
        cond: 1,
        body: 1,
        else: 2
    }), 1);

assert.equal(FaceSpeak.interpret({
        expr: "if",
        cond: 0,
        body: 1,
        else: 2
    }), 2);

assert.equal(FaceSpeak.interpret({
        expr: "if",
        cond: true,
        body: 1,
        else: 2
    }), 1);

assert.equal(FaceSpeak.interpret({
        expr: "if",
        cond: false,
        body: 1,
        else: 2
    }), 2);

assert.equal(FaceSpeak.interpret({
        expr: "let",
        varname: "bar",
        varexpr: 5,
        body: {
            expr: "plus",
            left: 1,
            right: "bar"
        }
    }), 6);


assert.equal(FaceSpeak.interpret({
        expr: "let",
        varname: "foo",
        varexpr: 5,
        body: {
            expr: "plus",
            left: 1,
            right: {
                expr: "let",
                varname: "foo",
                varexpr: 2,
                body: "foo"
            }
        }
    }), 3);