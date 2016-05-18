var Raindrop = require('./raindrop').Raindrop;
var BlockChain = require('./blockChain').BlockChain;

var blockChain = new BlockChain();
var args = process.argv.slice(2);
var port = parseInt(args[1]);

var raindrop = new Raindrop(args[0], port, port + 1000, blockChain);

if (args.length >= 4) {
    var seed = {
        address: args[2],
        port: parseInt(args[3]),
        facePort: parseInt(args[3]) + 1000
    };
    
    raindrop.connect(seed);
}
