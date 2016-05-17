var Raindrop = require('./../../raindrop').Raindrop;
var BlockChain = require("./../../blockChain").BlockChain;

var basePort = 5000;

var blockChain = new BlockChain();
var raindrop = new Raindrop("127.0.0.1", basePort, basePort + 1000, blockChain);

var seed = {address: "127.0.0.1", port: basePort, facePort: basePort + 1000};

for (var i = 1; i <= 3; ++i) {
    var tkad = new Raindrop("127.0.0.1", basePort + i, basePort + i + 1000, blockChain);
    tkad.connect(seed);
}

setTimeout(() => {
    console.log("timeout");
    raindrop.runPrograms([{
        program: {
            expr: "plus",
            left: {
                expr: "times",
                left: 3,
                right: 3
            },
            right: 1
        }
    }, {
        program: {
            expr: "plus",
            left: {
                expr: "times",
                left: 5,
                right: 3
            },
            right: 1
        }
    }, {
        program: {
            expr: "plus",
            left: {
                expr: "times",
                left: 5,
                right: 3
            },
            right: 2
        }
    }, {
        program: {
            expr: "plus",
            left: {
                expr: "times",
                left: 5,
                right: 3
            },
            right: 3
        }
    }, {
        program: "foo",
        env: {foo: 400000}
    }]);
}, 3000);