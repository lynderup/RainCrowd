/**
 * The class used to distribute computations
 */

var WebSocketClient = require('websocket').client;
var http = require('http');
var BlockingQueue = require('block-queue');
var faceSpeak = require('./facespeak').FaceSpeak;

var Speaker = function (contacts, programs, blockChain, wallet) {
    var programIndex = 0;
    var connections = BlockingQueue(1, (server, done) => {
        console.log("Pop");
        if (programIndex >= programs.length) {
            console.log("Closing connection");
            server.connection.close();
        } else {
            console.log("Sending program: " + programIndex);
            var program = programs[programIndex++];
            var coins = wallet.getCoins(faceSpeak.computeCost(program));
            if (!coins) {
                console.log("Not enough currency to compute " + JSON.stringify(program, null, 2));
                done();
                return;
            }
            if (blockChain.startTransaction(server.contact, coins)) {
                server.connection.send(JSON.stringify(program));
            } else {
                console.log("BlockChain rejected your startTransaction request");
            }
        }
        done();
    });

    /**
     * Connects to the given contacts, to let them calculate for this node
     */
    var startClients = function () {
        for (var i = 0; i < contacts.length; ++i) {
            var client = new WebSocketClient();

            (function (i) {
                client.on('connect', (connection) => {
                    console.log("WebSocket Client Connected");
                    connections.push({connection: connection, contact: contacts[i]});
                    connection.on('close', () => console.log("Closed"));
                    connection.on('message', (message) => {
                        console.log("Received: " + message.utf8Data);
                        connections.push({connection: connection, contact: contacts[i]});
                    });
                });
            })(i);

            console.log(contacts[i].address + ':' + contacts[i].facePort);
            client.connect('ws://' + contacts[i].address + ':' + contacts[i].facePort, 'raining-protocol');
        }
    };

    if (contacts) {
        startClients();
    }
};

exports.Speaker = Speaker;