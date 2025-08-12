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