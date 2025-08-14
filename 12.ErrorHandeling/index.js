const winston = require('winston/lib/winston/config');

require('winston-mongodb')

function asyncMiddleware(handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        }
        catch (ex) {
            next(ex)
        }
    }
}

app.get('/me', auth, asyncMiddleware(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
}));

winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/ProjectName' });


process.on('uncaughtException', (ex) => {
    console.log('WE GOT AN UNCAUGHT EXCEPTION');
    winston.error(ex.message, ex);
});