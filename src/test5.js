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

assert(FaceSpeak.interpret({
    expr: "if",
    cond: 1,
    body: 1,
    else: 2
}) == 1);

assert(FaceSpeak.interpret({
    expr: "if",
    cond: 0,
    body: 1,
    else: 2
}) == 2);

assert(FaceSpeak.interpret({
    expr: "if",
    cond: true,
    body: 1,
    else: 2
}) == 1);

assert(FaceSpeak.interpret({
    expr: "if",
    cond: false,
    body: 1,
    else: 2
}) == 2);