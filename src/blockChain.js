var BlockChain = function () {
    this.startTransaction = function (contact, coins) {
        console.log("The coins of the transaction was " + JSON.stringify(coins));
        //Only used for debug
        var cost = 0;
        for (var i = 0; i < coins.length; i++) {
            cost++;
        }
        console.log("Started transaction for for " + contact.port + " for a cost of " + cost);
        return true;
    };
};

exports.BlockChain = BlockChain;