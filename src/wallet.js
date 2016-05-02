var Wallet = function () {
    var treasure = 10;

    this.getCoins = function (length) {
        var coins = null;
        if(length <= treasure) {
            coins = [];
            for (var i = 0; i < length; i++) {
                coins.push(1);
                treasure--;
            }
        }
        return coins;
    };
};

exports.Wallet = Wallet;