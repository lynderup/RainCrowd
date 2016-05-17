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
            if (message.type !== 'utf8') {
                console.log("[Server " + port + "] Bad message type!");
            } else {
                var params = JSON.parse(message.utf8Data);
                var programCost = FaceSpeak.computeCost(params.program, params.env);
                if (!blockChain.checkForVerifiedTransaction(params.id)) {
                    connection.close();
                    return;
                }
                var result = FaceSpeak.interpret(params.program, params.env);
                blockChain.commitTransactionResult(params.id, result);
                // Even though the client can fetch this result from the blockChain, we are nice and send it directly
                //  so the client doesn't have to wait for the transaction to get committed by the blockChain.
                connection.send(JSON.parse(result));
                // Refuse to do any work, untill we are paid for the previous work.
                while (!blockChain.checkForCommittedTransaction(params.id)) {
                    ;;; // NOP
                }
                wallet.addCoins(programCost);
                console.log("[" + port + "]" + " - now has: " + wallet.getWealth());
            }
        })
    });
};

exports.Face = Face;