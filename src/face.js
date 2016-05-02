/**
 * Just another face in the crowd
 */

var WebSocketServer = require('websocket').server;
var http = require('http');
var FaceSpeak = require('./facespeak').FaceSpeak;
var Wallet = require('./wallet').Wallet;

var Face = function (port, blockChain, wallet) {

    /**
     * Start a server for others to contact, to let this node perform calculations
     */
    var startServer = function (callback) {
        var server = http.createServer((request, response) => {
            console.log((new Date()) + ' Received request for ' + request.url);
            response.writeHead(404);
            response.end();
        });
        server.listen(port, () => {
            console.log((new Date()) + ' Server is listening on port ' + port);
        });

        var webServer = new WebSocketServer({httpServer: server, autoAcceptConnections: false});

        webServer.on('request', (request) => {
            callback(request.accept('raining-protocol', request.origin));
        });
    };

    startServer((connection) => {
        connection.on('message', (message) => {
            if(message.type !== 'utf8') {
                console.log("[Server " + port + "] Bad message type!");
            } else {
                var program = JSON.parse(message.utf8Data);
                var programCost = FaceSpeak.computeCost(program);
                connection.send(FaceSpeak.interpret(program));
                //todo second-fase verification
                wallet.addCoins(programCost);
                console.log("[" + port + "]" + " - now haz: " + wallet.getWealth());
            }
        })
    });
};

exports.Face = Face;