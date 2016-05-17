/**
 * The class used to distribute computations
 */

var WebSocketClient = require('websocket').client;
var http = require('http');
var BlockingQueue = require('block-queue');
var faceSpeak = require('./facespeak').FaceSpeak;

var Speaker = function (contacts, programs, blockChain, wallet, callback) {
    var missingCount = programs.length;
    var programIndex = 0;
    var results = [];
    var programFor = {};
    var connections = BlockingQueue(1, (server, done) => {
        if (programIndex >= programs.length) {
            console.log("Closing: " + server.index + " bc: " + programIndex);
            server.connection.close();
        } else {
            programFor[server.index] = programIndex;
            var program = programs[programIndex++];
            var coins = wallet.getCoins(faceSpeak.computeCost(program.program));
            if (!coins) {
                console.log("Not enough currency to compute " + JSON.stringify(program.program, null, 2));
                done();
                return;
            }
            var transaction = blockChain.startTransaction(server.contact, coins);
            if (typeof transaction == "number") {
                server.connection.send(JSON.stringify({id: transaction, program: program.program, env: program.env}));
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
            var client = new WebSocketClient({maxReceivedMessageSize: 0xFFFFFFFFFFFF});

            (function (i) {
                client.on('connect', (connection) => {
                    connections.push({connection: connection, contact: contacts[i], index: i});
                    connection.on('close', (reason, desc) => {
                        console.log("Closed: " + reason);
                        console.log(desc);
                    });
                    connection.on('message', (message) => {
                        missingCount--;
                        results[programFor[i]] = JSON.parse(message.utf8Data);
                        connections.push({connection: connection, contact: contacts[i], index: i});
                        if (missingCount == 0) callback(null, results);
                    });
                });
            })(i);

            client.connect('ws://' + contacts[i].address + ':' + contacts[i].facePort, 'raining-protocol');
        }
    };

    if (contacts) {
        startClients();
    }
};

exports.Speaker = Speaker;