var kad = require('kad');

var dht = new kad.Node({
  transport: kad.transports.UDP(kad.contacts.AddressPortContact({
    address: '127.0.0.1',
    port: 5000
  })),
  storage: kad.storage.FS('./test1/')
});

dht.on("join", () => {
    console.log("Camilla er fuld");
});
