var kad = require('kad');
var Face = require('./face').Face;
var FaceContact = require('./facecontact').FaceContact;
var Speaker = require('./speaker').Speaker;

var Kademlia = function (host, port, facePort, blockChain) {

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
    
    var face = new Face(facePort, blockChain);

    dht.on("join", () => {
    });

    this.connect = function (seed) {
        dht.connect(seed, () => {
        });
    };

    var getCrowd = function (callback) {
        router.findNode(kad.utils.createID("" + Math.random()), (err, value) => {
            callback(err, value);
        });
    };

    this.runPrograms = function (programs) {
        getCrowd((err, val) => {
            console.log("getCrowd");
            for (var i = 0; i < val.length; ++i) {
                console.log("[" + i + "]" + val[i].facePort);
            }
            var speaker = new Speaker(val, programs, blockChain);
        });
    };
};

exports.Kademlia = Kademlia;