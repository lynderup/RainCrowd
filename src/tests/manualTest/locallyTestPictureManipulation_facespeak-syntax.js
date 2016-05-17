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
                        _subscript(
                            _subscript(
                                _subscript(
                                    "heightVar",
                                    "idx",
                                    _minus(255, _subscript("data", "idx"))),
                                _plus("idx", 1),
                                _minus(255, _subscript("data", _plus("idx", 1)))
                            ),
                            _plus("idx", 2),
                            _minus(255, _subscript("data", _plus("idx", 2)))
                        )
                    )
                )
            );
        var data = FaceSpeak.interpret(program, env);
        for (var y = 0; y < this.height; ++y) {
            for (var x = 0; x < this.width; ++x) {
                var idx = (this.width * y + x) << 2;
                this.data[idx] = data[idx];
            }
        }
        this.pack().pipe(fs.createWriteStream('out.png'));
    });