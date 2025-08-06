const auth = require('./middleware/auth');
const Joi = require('joi');
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
    }
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);



function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    };

    return Joi.object(schema).validate(user);
};



app.post('/api/user', auth, async (req, res) => {
    const result = validateUser(req.body)
    if (result.error) return res.status(400).send(result.error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registerd');


    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    token = user.generateAuthToken()
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
})


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));	
