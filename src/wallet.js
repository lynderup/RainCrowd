var Wallet = function () {
    var treasure = 10000000000000;

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

    this.addCoins = function (amount) {
        treasure += amount;
    };

    this.getWealth = function () {
        return treasure;
    };
};

exports.Wallet = Wallet;