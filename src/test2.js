/** 'Unit' test of Face class **/

var Face = require("./face").Face;

var serverFace = new Face(9035);

var clientsFace = new Face(null, [{host: "localhost", port: "9035"}]);

