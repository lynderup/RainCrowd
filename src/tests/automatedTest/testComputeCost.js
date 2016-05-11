/**
 * Created by Camilla on 11-05-2016.
 */

var FaceSpeak = require('./../../facespeak').FaceSpeak;
var assert = require('assert');

assert.equal(FaceSpeak.computeCost({
        expr: "times",
        left: 1,
        right: 2
    }), 1);

assert.equal(FaceSpeak.computeCost({
        expr: "if",
        cond: 0,
        body: 1,
        else: 2
    }), 1);

assert.equal(FaceSpeak.computeCost({
    "expr": "times",
    "left": {
        "expr": "times",
        "left": {
            "expr": "divide",
            "left": {
                "expr": "minus",
                "left": {
                    "expr": "minus",
                    "left": 19,
                    "right": 16
                },
                "right": {
                    "expr": "plus",
                    "left": 52,
                    "right": 13
                }
            },
            "right": {
                "expr": "minus",
                "left": {
                    "expr": "plus",
                    "left": 12,
                    "right": 45
                },
                "right": {
                    "expr": "times",
                    "left": 6,
                    "right": 28
                }
            }
        },
        "right": {
            "expr": "divide",
            "left": {
                "expr": "divide",
                "left": {
                    "expr": "plus",
                    "left": 74,
                    "right": 41
                },
                "right": {
                    "expr": "plus",
                    "left": 66,
                    "right": 59
                }
            },
            "right": {
                "expr": "minus",
                "left": {
                    "expr": "times",
                    "left": 92,
                    "right": 25
                },
                "right": {
                    "expr": "times",
                    "left": 35,
                    "right": 31
                }
            }
        }
    },
    "right": 40
}), 16);

assert.equal(FaceSpeak.computeCost({
        expr: "plus",
        left: 1,
        right: "foo"
    }), 1);


assert.equal(FaceSpeak.computeCost({
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