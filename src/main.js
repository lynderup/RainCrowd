var Kademlia = require('./kademlia').Kademlia;

var args = process.argv.slice(2);
var port = parseInt(args[0]);

var kad = new Kademlia("127.0.0.1", port);

if (args.length >= 3) {
    var seed = {
	address: args[1],
	port: parseInt(args[2])
    };
    
    kad.connect(seed);
}