var FaceSpeak = require('./../../facespeak').FaceSpeak;
require('./../../facespeak-syntax').static(global);
var invertImage = require('../../programs/invert-image').invertImage;
var eelScale = require('../../programs/eel-scale').eelScale;
var fs = require('fs'),
    PNG = require('node-png').PNG;
var Raindrop = require('./../../raindrop').Raindrop;
var BlockChain = require("./../../blockChain").BlockChain;

fs.createReadStream('../test.png')
    .pipe(new PNG({
        filterType: 4
    }))
    .on('parsed', function () {
        var env = {
            height: this.height,
            width: this.width,
            data: this.data
        };
        FaceSpeak.showProgress(true);

        var basePort = 5000;

        var blockChain = new BlockChain();
        var raindrop = new Raindrop("127.0.0.1", basePort+300, basePort +300 + 1000, blockChain);

        var seed = {address: "127.0.0.1", port: basePort, facePort: basePort + 1000};

        raindrop.connect(seed);

        var length = this.height * this.width;

        setTimeout(() => {
            var chunks = 10;
            var programs = [];
            for (var i = 0; i < chunks; ++i) {
                programs.push({
                    program: invertImage(length / chunks * i, length / chunks * (i + 1)),
                    env: env
                });
            }

            raindrop.runPrograms(programs, (err, data) => {
                console.log(data);

                if (err) {
                    // todo correct error messages
                    throw "up";
                }


                for (var c = 0; c < chunks; ++y) {
                    for (var y = length / chunks; y < length / chunks; ++y) {
                        this.data[y*(c+1)] = data[c][y];
                    }
                }
                this.pack().pipe(fs.createWriteStream('out.png'));
            });
        }, 3000);
    });