function log(req, res, next) {
    console.log('logger');
    next();
}

module.exports = log;