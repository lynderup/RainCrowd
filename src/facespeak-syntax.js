/**
 * Created by dklukjor on 4/25/16.
 */

var Syntax = {
    plus: function (left, right) {
        return {expr: "plus", left: left, right: right}
    },
    minus: function (left, right) {
        return {expr: "minus", left: left, right: right}
    },
    times: function (left, right) {
        return {expr: "times", left: left, right: right}
    },
    divide: function (left, right) {
        return {expr: "divide", left: left, right: right}
    },
    if: function (cond, body, el) {
        return {expr: "if", cond: cond, body: body, else: el}
    },
    let: function (varname, varexpr, body) {
        return {
            expr: "let",
            varname: varname,
            varexpr: varexpr,
            body: body
        }
    },
    for: function (loopvar, initialval, indexvar, from, to, body) {
        return {
            expr: "for",
            loopvar: loopvar,
            initialval: initialval,
            indexvar: indexvar,
            from: from,
            to: to,
            body: body
        }
    },
    subscript: function (body, index, val) {
        return {
            expr: "subscript",
            index: index,
            body: body,
            val: val
        }
    },
    array: function () {
        return { expr: "array" }
    }
};

exports.static = function (scope) {
    scope._plus = Syntax.plus;
    scope._minus = Syntax.minus;
    scope._times = Syntax.times;
    scope._divide = Syntax.divide;
    scope._if = Syntax.if;
    scope._let = Syntax.let;
    scope._for = Syntax.for;
    scope._subscript = Syntax.subscript;
    scope._array = Syntax.array;
};