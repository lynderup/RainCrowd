var Kademlia = require('./kademlia').Kademlia;
var Speaker = require('./speaker').Speaker;

var basePort = 5000;

var kad = new Kademlia("127.0.0.1", basePort, basePort + 1000);

var seed = {address: "127.0.0.1", port: basePort, facePort: basePort + 1000};

for (var i = 1; i <= 3; ++i) {
    var tkad = new Kademlia("127.0.0.1", basePort + i, basePort + i + 1000);
    tkad.connect(seed);
}

setTimeout(() => {
    console.log("timeout");
    kad.getCrowd((err, val) => {
        console.log("getCrowd");
        for (var i = 0; i < val.length; ++i) {
            console.log("[" + i + "]" + val[i].facePort);
        }
        var clientFace = new Speaker(val, [{
            expr: "plus",
            left: {
                expr: "times",
                left: 3,
                right: 3
            },
            right: 1
        }, {
            expr: "plus",
            left: {
                expr: "times",
                left: 5,
                right: 3
            },
            right: 1
        }, {
            expr: "plus",
            left: {
                expr: "times",
                left: 5,
                right: 3
            },
            right: 2
        }, {
            expr: "plus",
            left: {
                expr: "times",
                left: 5,
                right: 3
            },
            right: 3
        }]);
    })
}, 3000);