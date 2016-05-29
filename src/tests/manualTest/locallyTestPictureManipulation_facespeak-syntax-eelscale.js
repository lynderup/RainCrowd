var FaceSpeak = require('./../../facespeak').FaceSpeak;
require('./../../facespeak-syntax').static(global);
var eelScale = require('./../../programs/eel-scale').eelScale;
var fs = require('fs'),
    PNG = require('node-png').PNG;

fs.createReadStream('./../test.png')
    .pipe(new PNG({
        filterType: 4
    }))
    .on('parsed', function () {
        var env = {
            height: this.height,
            width: this.width,
            data: this.data
        };
        var program = eelScale(0, this.height * this.width, this.height, this.width);
        FaceSpeak.showProgress(true);
        var startTime = new Date();
        var data = FaceSpeak.interpret(program, env);
        for (var y = 0; y < this.height; ++y) {
            for (var x = 0; x < this.width; ++x) {
                var idx = (this.width * y + x) << 2;
                this.data[idx] = data[idx];
            }
        }
        console.log("Computation time for " + this.width + "x" + this.height + " image was: " + (((new Date()) - startTime)/1000));
        this.pack().pipe(fs.createWriteStream('out.png'));
    });
