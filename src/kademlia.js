var kad = require('kad');
var Face = require('./face').Face;
var FaceContact = require('./facecontact').FaceContact;

var Kademlia = function (host, port, facePort) {

    var rpc = kad.transports.UDP(FaceContact({
        address: host,
        port: port,
        facePort: facePort
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
    
    var face = new Face(facePort);

    dht.on("join", () => {
    });

    this.connect = (seed) => {
        dht.connect(seed, () => {
        });
    };

    this.getCrowd = (callback) => {
        router.findNode(kad.utils.createID("" + Math.random()), (err, value) => {
            callback(err, value);
        });
    }
};

exports.Kademlia = Kademlia;
