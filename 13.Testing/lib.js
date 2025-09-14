module.exports.absolute = function (number) {
    if (number > 0) return number;
    if (number < 0) return -number;
    return 0;
}

module.exports.greet = function (name) {
    return 'Welcome ' + name;
}

module.exports.getCurrencies = function () {
    return ['USD', 'AUD', 'EUR'];
}

module.exports.getProduct = function (productId) {
    return { id: 1, price: 10 }
}

module.exports.registerUser = function (username) {
    if (!username) throw new Error('Username is required.');

    return { id: new Date().getTime(), username: username };
}