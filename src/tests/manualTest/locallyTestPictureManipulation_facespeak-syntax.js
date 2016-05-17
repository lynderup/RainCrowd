var FaceSpeak = require('./../../facespeak').FaceSpeak;
require('./../../facespeak-syntax').static(global);
var invertImage = require('../../programs/invert-image').invertImage;
var eelScale = require('../../programs/eel-scale').eelScale;
var fs = require('fs'),
    PNG = require('node-png').PNG;

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

        var start = (this.height * this.width) / 4;
        var stop = (this.height * this.width) / 2;

        var invertProgram = invertImage(start, stop);
        var data = FaceSpeak.interpret(invertProgram, env);
        for (var y = start*4; y < stop*4; ++y) {
            env.data[y] = data[y];
        }

        start = (this.height * this.width) / 2;
        stop = (this.height * this.width) / 2 + (this.width * 10);

        var eelScaleProgram = eelScale(start, stop);

        data = FaceSpeak.interpret(eelScaleProgram, env);
        for (y = start*4; y < stop*4; ++y) {
            this.data[y] = data[y];
        }
        this.pack().pipe(fs.createWriteStream('out.png'));
    });