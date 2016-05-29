/**
 * The class used to distribute computations
 */

var WebSocketClient = require('websocket').client;
var http = require('http');
var BlockingQueue = require('block-queue');
var faceSpeak = require('./facespeak').FaceSpeak;

var Speaker = function (contacts, programs, blockChain, wallet, callback) {
    var missingCount = programs.length;
    var missingPrograms = [];
    for(var i = 0; i < programs.length; ++i) missingPrograms.push(i);
    var results = [];
    var programFor = {};
    var pendingServers = [];
    var connections = BlockingQueue(1, (server, done) => {
        if (missingCount <= 0 || missingPrograms.length <= 0) {
            pendingServers.push(server);
        } else if(missingPrograms.length > 0) {
            var programIndex = missingPrograms.pop();
            programFor[server.index] = programIndex;
            var program = programs[programIndex];
            var coins = wallet.getCoins(faceSpeak.computeCost(program.program));
            if (!coins) {
                console.log("Not enough currency to compute " + JSON.stringify(program.program, null, 2));
                done();
                return;
            }
            var transaction = blockChain.startTransaction(server.contact, coins);
            if (typeof transaction == "number") {
                var data = JSON.stringify({id: transaction, program: program.program, env: program.env}, null, 2);
                server.connection.send(data);
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
                        if(reason != 1000) {
                            missingPrograms.push(programFor[i]);
                            while(pendingServers.length > 0) {
                                connections.push(pendingServers.pop());
                            }
                        }
                        console.log("Closed: " + reason);
                        console.log(desc);
                    });
                    connection.on('message', (message) => {
                        missingCount--;
                        console.log("Received result from " + connection.remoteAddress);
                        results[programFor[i]] = JSON.parse(message.utf8Data);
                        connections.push({connection: connection, contact: contacts[i], index: i});
                        if (missingCount == 0) {
                            while (pendingServers.length > 0) {
                                var server = pendingServers.pop();
                                server.connection.close();
                            }
                            callback(null, results);
                        }
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