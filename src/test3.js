var Kademlia = require('./kademlia').Kademlia;

var basePort = 5000;

var kad = new Kademlia("127.0.0.1", basePort);

var seed = {address: "127.0.0.1", port: basePort};

for (var i = 1; i <= 50; ++i) {
    var tkad = new Kademlia("127.0.0.1", basePort + i);
    tkad.connect(seed);
}

setTimeout(() => {
    console.log("timeout");
    kad.getCrowd((err, val) => {
        console.log("getCrowd");
        for (var i = 0; i < val.length; ++i) {
            
        }
    })
}, 3000);