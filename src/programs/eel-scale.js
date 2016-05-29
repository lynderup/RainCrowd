function eelScale(from, to, width, height) {
    return _for("heightVar", _array(), "y", from, to,
        _let("idx",
            _times("y", 4),
            _let("totals",
                _for("totalsVal",
                    _subscript(_subscript(_subscript(_array(), 0, 0), 1, 0), 2, 0),
                    "i", 0, width * height,
                    _let("idx2",
                        _times("i", 4),
                        _subscript(
                            _subscript(
                                _subscript(
                                    "totalsVal",
                                    0,
                                    _plus(_subscript("totalsVal", 0), _modulo(_pow(_subscript("data", "idx2"), 2), 255))
                                ),
                                1,
                                _plus(_subscript("totalsVal", 1), _modulo(_pow(_subscript("data", _plus("idx2", 1)), 2), 255))
                            ),
                            2,
                            _plus(_subscript("totalsVal", 2), _modulo(_pow(_subscript("data", _plus("idx2", 2)), 2), 255))
                        )
                    )
                ),
                _let("totalRed", _subscript("totals", 0),
                _let("totalGreen", _subscript("totals", 1),
                _let("totalBlue", _subscript("totals", 2),
                _let("r", _subscript("data", "idx"),
                _let("g", _subscript("data", _plus("idx", 1)),
                _let("b", _subscript("data", _plus("idx", 2)),
                    _subscript(
                        _subscript(
                            _subscript(
                                _subscript(
                                    "heightVar",
                                    "idx",
                                    _if(_and(_lt("r", "g"), _lt("r", "b")),
                                        _divide("totalRed", to),
                                        "r")
                                ),
                                _plus("idx", 1),
                                _if(_and(_lt("g", "r"), _lt("g", "b")),
                                    _divide("totalGreen", to),
                                    "g")
                            ),
                            _plus("idx", 2),
                            _if(_and(_lt("b", "g"), _lt("b", "r")),
                                _divide("totalBlue", to),
                                "b")
                        ),
                        _plus("idx", 3),
                        _subscript("data", _plus("idx", 3))
                    )
                ))))))
            )
        )
    );
}

exports.eelScale = eelScale;
