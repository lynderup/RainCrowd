var BlockChain = function () {
    this.startTransaction = function (contact, coins) {
        //Only used for debug
        var cost = 0;
        for (var i = 0; i < coins.length; i++) {
            cost++;
        }
        console.log("Started transaction for " + contact.address + " for a cost of " + cost);
        return 42;
    };

    this.checkForVerifiedTransaction = function (id) {
        return true;
    };

    this.commitTransactionResult = function (id, result) {
        return true;
    };

    this.checkForCommittedTransaction = function (id) {
        return true;
    };
};

exports.BlockChain = BlockChain;
