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
  storage: kad.storage.FS('./test2/')
});

dht.connect(seed, (err) => {
    
  // dht.get(key, callback);
  // dht.put(key, value, callback);
});


dht.on("join", () => {
    console.log("Hej Camilla");
    dht.put("1234", "test", (err) => {
 	console.log(err);
	console.log(res);
	dht.get("1234", (err, res) => {
	    console.log(err);
	    console.log(res);
	};
    });
});
