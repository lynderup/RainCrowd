var kad = require('kad');

var seed = {
    address: '127.0.0.1',
    port: 5000
};

var dht = new kad.Node({
    transport: kad.transports.UDP(kad.contacts.AddressPortContact({
        address: '127.0.0.1',
        port: 5001
    })),
    storage: kad.storage.FS('./test2/'),
    logger: new kad.Logger(3)
});

dht.connect(seed, (err) => {
});


dht.on("join", () => {
});
