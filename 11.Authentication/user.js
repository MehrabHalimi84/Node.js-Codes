const auth = require('./middleware/auth');
const Joi = require('joi');
const admin = require('./middleware/admin')
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/form')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log(`Could not connect to MongoDB...  ,${err}`));



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);



function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
        isAdmin: Joi.boolean()
    };

    return Joi.object(schema).validate(user);
};


app.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})


app.post('/api/user', auth, async (req, res) => {
    const result = validateUser(req.body)
    if (result.error) return res.status(400).send(result.error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registerd');


    user = new User(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    token = user.generateAuthToken()
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email', 'isAdmin']));
})

app.delete('/:id', [auth, admin], async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).send('The user with given ID not find...')

    res.send(user)
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));	
