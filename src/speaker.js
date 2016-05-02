/**
 * The class used to distribute computations
 */

var WebSocketClient = require('websocket').client;
var http = require('http');
var BlockingQueue = require('block-queue');

var Speaker = function (contacts, programs, blockChain) {
    var programIndex = 0;
    var connections = BlockingQueue(1, (connection, done) => {
        console.log("Pop");
        if (programIndex >= programs.length) {
            console.log("Closing connection");
            connection.close();
        } else {
            console.log("Sending program: " + programIndex);
            connection.send(JSON.stringify(programs[programIndex++]));
        }
        done();
    });

    /**
     * Connects to the given contacts, to let them calculate for this node
     */
    var startClients = function () {
        for (var i = 0; i < contacts.length; ++i) {
            var client = new WebSocketClient();

            client.on('connect', (connection) => {
                console.log("WebSocket Client Connected");
                connections.push(connection);
                connection.on('close', () => console.log("Closed"));
                connection.on('message', (message) => {
                    console.log("Received: " + message.utf8Data);
                    connections.push(connection);
                });
            });

            console.log(contacts[i].address + ':' + contacts[i].facePort);
            client.connect('ws://' + contacts[i].address + ':' + contacts[i].facePort, 'raining-protocol');
        }
    };

    if (contacts) {
        startClients();
    }
};

exports.Speaker = Speaker;