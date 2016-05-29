var fs = require('fs'),
    PNG = require('node-png').PNG;

fs.createReadStream('./../test.png')
    .pipe(new PNG({
        filterType: 4
    }))
    .on('parsed', function () {

        var start = new Date();

        // invert colours
        /*for (var y = 0; y < this.height; y++) {
         for (var x = 0; x < this.width; x++) {
         var idx = (this.width * y + x) << 2;

         // invert color
         this.data[idx] = 255 - this.data[idx];
         this.data[idx+1] = 255 - this.data[idx+1];
         this.data[idx+2] = 255 - this.data[idx+2];

         // and reduce opacity
         this.data[idx+3] = this.data[idx+3] >> 1;
         }
         }*/

        //Greyscale
        /*for (var y = 0; y < this.height; y++) {
         for (var x = 0; x < this.width; x++) {
         var idx = (this.width * y + x) << 2;

         var greyColor = 0.21*this.data[idx] + 0.72*this.data[idx+1]+ 0.07*this.data[idx+2];
         this.data[idx] = greyColor;
         this.data[idx+1] = greyColor;
         this.data[idx+2] = greyColor;
         }
         }*/

        //Eel-scale 2.0
        /*for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                var idx = (this.width * y + x) << 2;
                var totalRed = 0;
                var totalGreen = 0;
                var totalBlue = 0;

                for (var i = y; i < this.height; i++) {
                    for (var j = x; j < this.width; j++) {
                        var idx2 = (this.width * i + j) << 2;

                        totalRed += this.data[idx2];
                        totalGreen += this.data[idx2 + 1];
                        totalBlue += this.data[idx2 + 2];
                    }
                }

                var height = this.height - y;
                var width = this.width - x;

                this.data[idx] = totalRed / (height * width);
                this.data[idx + 1] = totalGreen / (height * width);
                this.data[idx + 2] = totalBlue / (height * width);
            }
        }*/


        //Eel-scale 2.1
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                var idx = (this.width * y + x) << 2;
                var totalRed = 0;
                var totalGreen = 0;
                var totalBlue = 0;

                for (var i = y; i < this.height; i++) {
                    for (var j = x; j < this.width; j++) {
                        var idx2 = (this.width * i + j) << 2;

                        totalRed += (this.data[idx2]*this.data[idx2]) % 255;
                        totalGreen += (this.data[idx2 + 1]*this.data[idx2+1])%255;
                        totalBlue += (this.data[idx2 + 2]*this.data[idx2+2])%255;
                    }
                }

                var height = this.height-y;
                var width = this.width-x;

                var r = this.data[idx];
                var g = this.data[idx+1];
                var b = this.data[idx+2];

                if(r < g && r < b) {
                    this.data[idx] = totalRed/(height * width);
                }
                if(g < r && g < b) {
                    this.data[idx+1] = totalGreen/(height * width);
                }
                if(b < g && b < r) {
                    this.data[idx+2] = totalBlue/(height * width);
                }
            }
        }

        var end = new Date();
        console.log("Duration time: " + (end.getMinutes() - start.getMinutes()) +
                    " : " + (end.getSeconds() - start.getSeconds()) +
                    " : " + (end.getMilliseconds() - start.getMilliseconds()));

        this.pack().pipe(fs.createWriteStream('out.png'));
    });