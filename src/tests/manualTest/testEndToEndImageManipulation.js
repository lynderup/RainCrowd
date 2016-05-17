var FaceSpeak = require('./../../facespeak').FaceSpeak;
require('./../../facespeak-syntax').static(global);
var invertImage = require('../../programs/invert-image').invertImage;
var eelScale = require('../../programs/eel-scale').eelScale;
var fs = require('fs'),
    PNG = require('node-png').PNG;
var Raindrop = require('./../../raindrop').Raindrop;
var BlockChain = require("./../../blockChain").BlockChain;

fs.createReadStream('../bigtest.png')
    .pipe(new PNG({
        filterType: 4
    }))
    .on('parsed', function () {
        var dataArray = [];

        for (var i = 0; i < this.data.length; i++) {
            dataArray.push(this.data[i]);
        }

        var env = {
            height: this.height,
            width: this.width,
            data: dataArray
        };
        FaceSpeak.showProgress(true);

        var basePort = 5000;

        var blockChain = new BlockChain();
        var raindrop = new Raindrop("127.0.0.1", basePort+300, basePort +300 + 1000, blockChain);

        var seed = {address: "127.0.0.1", port: basePort, facePort: basePort + 1000};

        raindrop.connect(seed);

        var length = this.height * this.width;
        var chunks = 10;
        var chunkLength = Math.floor(length / chunks);
        setTimeout(() => {
            var programs = [];
            for (var i = 0; i < chunks; ++i) {
                programs.push({
                    program: invertImage(chunkLength * i, chunkLength * (i + 1)),
                    env: env
                });
            }

            raindrop.runPrograms(programs, (err, data) => {
                //console.log(data);

                if (err) {
                    // todo correct error messages
                    throw "up";
                }

                for (var c = 0; c < chunks; ++c) {
                    for (var y = chunkLength * c * 4; y < data[c].length; ++y) {
                        this.data[y] = data[c][y];
                    }
                }

                this.pack().pipe(fs.createWriteStream('out.png'));
            });
        }, 3000);
    });