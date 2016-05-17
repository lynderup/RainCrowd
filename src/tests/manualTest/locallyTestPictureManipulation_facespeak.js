var FaceSpeak = require('./../../facespeak').FaceSpeak;


var fs = require('fs'),
    PNG = require('node-png').PNG;

fs.createReadStream('../test.png')
    .pipe(new PNG({
        filterType: 4
    }))
    .on('parsed', function () {
        var env = {
            height: this.height,
            width: this.width,
            data: this.data
        };

        var program = {
            expr: "for",
            indexvar: "y",
            loopvar: "heightloop",
            initialval: {expr: "array"},
            from: 0,
            to: env.height,
            body: {
                expr: "for",
                indexvar: "x",
                loopvar: "widthloop",
                initialval: "heightloop",
                from: 0,
                to: env.width,
                body: {
                    expr: "let",
                    varname: "idx",
                    varexpr: {
                        expr: "times",
                        left: 4,
                        right: {
                            expr: "plus",
                            left: "x",
                            right: {
                                expr: "times",
                                left: "y",
                                right: "width"
                            }
                        }
                    },
                    body: {
                        expr: "subscript",
                        body: {
                            expr: "subscript",
                            body: {
                                expr: "subscript",
                                body: {
                                    expr: "subscript",
                                    body: "widthloop",
                                    index: "idx",
                                    val: {
                                        expr: "minus",
                                        left: 255,
                                        right: {
                                            expr: "subscript",
                                            body: "data",
                                            index: "idx"
                                        }
                                    }
                                },
                                index: {
                                    expr: "plus",
                                    left: "idx",
                                    right: 1
                                },
                                val: {
                                    expr: "minus",
                                    left: 255,
                                    right: {
                                        expr: "subscript",
                                        body: "data",
                                        index: {
                                            expr: "plus",
                                            left: "idx",
                                            right: 1
                                        }
                                    }
                                }
                            },
                            index: {
                                expr: "plus",
                                left: "idx",
                                right: 2
                            },
                            val: {
                                expr: "minus",
                                left: 255,
                                right: {
                                    expr: "subscript",
                                    body: "data",
                                    index: {
                                        expr: "plus",
                                        left: "idx",
                                        right: 2
                                    }
                                }
                            }
                        },
                        index: {
                            expr: "plus",
                            left: "idx",
                            right: 3
                        },
                        val: {
                            expr: "subscript",
                            body: "data",
                            index: {
                                expr: "plus",
                                left: "idx",
                                right: 3
                            }
                        }
                    }
                }
            }
        };

        res = FaceSpeak.interpret(program, env);
        for (var i = 0; i < res.length; i++) {
            this.data[i] = res[i];
        }
        this.pack().pipe(fs.createWriteStream('out.png'));
    });
