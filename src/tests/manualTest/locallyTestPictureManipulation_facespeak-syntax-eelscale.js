var FaceSpeak = require('./../../facespeak').FaceSpeak;
require('./../../facespeak-syntax').static(global);
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
        var program =
            _for("heightVar", _array(), "y", 0, this.height,
                _for("widthVar", "heightVar", "x", 0, this.width,
                    _let("idx",
                        _times(
                            _plus(
                                _times(this.width, "y"),
                                "x"),
                            4),
                        _let("totals",
                            _for("ihV", _array(), "i", 0, this.height,
                                _for("iwV", "ihV", "j", 0, this.width,
                                    _subscript(
                                        _subscript(
                                            _subscript(
                                                "iwV",
                                                0,
                                                _modulo(_pow(_subscript("iwV", 0), 2), 255)
                                            ),
                                            1,
                                            _modulo(_pow(_subscript("iwV", 1), 2), 255)
                                        ),
                                        2,
                                        _modulo(_pow(_subscript("iwV", 2), 2), 255)
                                    )
                                )
                            ),
                            _let("totalRed", _subscript("totals", 0),
                            _let("totalGreen", _subscript("totals", 1),
                            _let("totalBlue", _subscript("totals", 2),
                            _let("height", _minus(this.height, "y"),
                            _let("width", _minus(this.width, "x"),
                            _let("r", _subscript("data", "idx"),
                            _let("g", _subscript("data", _plus("idx", 1)),
                            _let("b", _subscript("data", _plus("idx", 2)),
                            _subscript(
                                _subscript(
                                    _subscript(
                                        "widthVar",
                                        "idx",
                                        _if(_and(_lt("r", "g"), _lt("r", "b")),
                                        _divide("totalRed", _times(this.height, this.width)),
                                        "r")
                                    ),
                                    _plus("idx", 1),
                                    _if(_and(_lt("g", "r"), _lt("g", "b")),
                                        _divide("totalGreen", _times(this.height, this.width)),
                                        "g")
                                ),
                                _plus("idx", 2),
                                _if(_and(_lt("b", "g"), _lt("b", "r")),
                                    _divide("totalBlue", _times(this.height, this.width)),
                                    "b")
                            )))))))))
                        )
                    )
                )
            );
        FaceSpeak.showProgress(true);
        var data = FaceSpeak.interpret(program, env);
        for (var y = 0; y < this.height; ++y) {
            for (var x = 0; x < this.width; ++x) {
                var idx = (this.width * y + x) << 2;
                this.data[idx] = data[idx];
            }
        }
        this.pack().pipe(fs.createWriteStream('out.png'));
    });