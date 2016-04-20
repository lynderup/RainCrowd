/**
 * Just another face in the crowd
 */

var WebSocketServer = require('websocket').server;
var WebSocketClient = require('websocket').client;
var http = require('http');


var Face = function (port, contacts) {

    /**
     * Connects to the given contacts, to let them calculate for this node
     */
    var startClients = function (callback) {
        for (var i = 0; i < contacts.length; ++i) {
            var client = new WebSocketClient();

            client.on('connect', (connection) => {
                console.log("WebSocket Client Connected");
                callback();
                connection.on('close', () => console.log("Closed"));
            });

            client.connect('ws://' + contacts[i].host + ':' + contacts[i].port, 'raining-protocol');
        }
    };

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
        })
    };

    if(contacts) {
        startClients(() => console.log("startClients callback"));
    } else {
        startServer(() => console.log("startServer callback"));
    }
};

exports.Face = Face;
