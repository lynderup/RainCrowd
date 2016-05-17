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

assert.equal(FaceSpeak.interpret({
    expr: "for",
    loopvar: "foo",
    indexvar: "i",
    initialval: 2,
    from: 0,
    to: 3,
    body: {
        expr: "plus",
        left: 1,
        right: "foo"
    }
}), 5);

assert.equal(FaceSpeak.interpret("foo", {foo: 5}), 5);

assert.equal(FaceSpeak.interpret({
    expr: "subscript",
    body: "foo",
    index: 2
}, {foo: [1, 2, 3, 4]}), 3);

assert.deepEqual(FaceSpeak.interpret({
    expr: "subscript",
    body: "foo",
    index: 2,
    val: 42
}, {foo: [1, 2, 3, 4]}), [1, 2, 42, 4]);

assert.deepEqual(FaceSpeak.interpret({
    expr: "subscript",
    body: {expr: "array"},
    index: 0,
    val: 42
}), [42]);

assert.equal(FaceSpeak.interpret({
    expr: "subscript",
    body: {
        expr: "subscript",
        body: "foo",
        index: 1
    },
    index: 0
}, {foo: [[0, 1], [2, 3]]}), 2);