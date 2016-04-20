var kad = require('kad');

var Kademlia = function (host, port) {

    var rpc = kad.transports.UDP(kad.contacts.AddressPortContact({
        address: host,
        port: port
    }));

    var router = new kad.Router({
        transport: rpc,
        logger: new kad.Logger(3)
    });

    var dht = new kad.Node({
        transport: rpc,
        storage: kad.storage.FS('./test1/'),
        router: router,
        logger: new kad.Logger(3)
    });

    dht.on("join", () => {
    });

    this.connect = (seed) => {
        dht.connect(seed, () => {
        });
    }
};

exports.Kademlia = Kademlia;
