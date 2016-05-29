require('../facespeak-syntax').static(global);

function invertImage(from, to) {
    return _for("heightVar", _array(), "y", from, to,
        _let("idx",
            _times("y", 4),
            _subscript(
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
                ),
                _plus("idx", 3),
                _subscript("data", _plus("idx", 3))
            )
        )
    );
}

exports.invertImage = invertImage;