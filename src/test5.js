var FaceSpeak = require('./FaceSpeak').FaceSpeak;
var assert = require('assert');

assert(FaceSpeak.interpret({
    expr: "plus",
    left: {
        expr: "times",
        left: 3,
        right: 3
    },
    right: 1
}) == 10);