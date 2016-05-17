var FaceSpeak = require('./../../facespeak').FaceSpeak;
require('./../../facespeak-syntax').static(global);
var assert = require('assert');

assert.equal(FaceSpeak.interpret(_plus(6, 4)), 10);

assert.equal(FaceSpeak.interpret(_if(1, 1, 2)), 1);

assert.equal(FaceSpeak.interpret(_if(0, 1, 2)), 2);

assert.equal(FaceSpeak.interpret(_if(true, 1, 2)), 1);

assert.equal(FaceSpeak.interpret(_if(false, 1, 2)), 2);

assert.equal(FaceSpeak.interpret(
    _let("bar", 5, _plus(1, "bar"))
), 6);


assert.equal(FaceSpeak.interpret(
    _let("foo", 5, _plus(1, _let("foo", 2, "foo")))
), 3);

assert.equal(FaceSpeak.interpret(
    _for("foo", 2, "i", 0, 3, _plus(1, "foo"))
), 5);

assert.equal(FaceSpeak.interpret("foo",
    {foo: 5}), 5);

assert.equal(FaceSpeak.interpret(
    _subscript("foo", 2),
    {foo: [1, 2, 3, 4]}), 3);

assert.equal(FaceSpeak.interpret(
    _subscript(_subscript("foo", 1), 0),
    {foo: [[0, 1], [2, 3]]}), 2);