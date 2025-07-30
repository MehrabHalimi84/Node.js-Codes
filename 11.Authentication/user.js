const Joi = require('joi');
const _ = require('lodash')
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/form')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log(`Could not connect to MongoDB...  ,${err}`));

const User = mongoose.model('User', new mongoose.Schema({
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
}));



function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    };

    return Joi.object(schema).validate(user);
};



app.post('/api/user', async (req, res) => {
    const result = validateUser(req.body)
    if (result.error) return res.status(400).send(result.error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registerd');


    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    await user.save();

    res.send(_.pick(user, ['_id', 'name', 'email']));
})


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));