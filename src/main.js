var Raindrop = require('./raindrop').Raindrop;
var BlockChain = require('./blockChain').BlockChain;

var blockChain = new BlockChain();
var args = process.argv.slice(2);
var port = parseInt(args[0]);

var raindrop = new Raindrop("127.0.0.1", port, port + 1000, blockChain);

if (args.length >= 3) {
    var seed = {
        address: args[1],
        port: parseInt(args[2])
    };
    
    raindrop.connect(seed);
}
