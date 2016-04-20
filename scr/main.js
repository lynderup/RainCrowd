var kad = require('kad');

var rpc = kad.transports.UDP(kad.contacts.AddressPortContact({
    address: '127.0.0.1',
    port: 5000
}));

var router = new kad.Router({
    transport: rpc,
    logger: new kad.Logger(3)
})

var dht = new kad.Node({
    transport: rpc,
    storage: kad.storage.FS('./test1/'),
    router: router,
    logger: new kad.Logger(3)
});

dht.on("join", () => {
    router.findNode("1234", (err, contacts) => {
	console.log(contacts);
    });
});
