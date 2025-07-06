function log(req, res, next) {
    res.send(console.log('logger'));
    next();
}

module.exports = log;