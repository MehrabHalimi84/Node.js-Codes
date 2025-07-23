const mongoose = require('mongoose');
const Joi = require('joi')
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/shopWeb')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log(`Could not connect to MongoDB...  ,${err}`));



const Product = mongoose.model('Product', new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        uppercase: true,
        required: true,
        unique: false
    },
    category: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
        min: 10,
        max: 500,
    },
    inStock: Boolean,
    discount: {
        type: Number,
        min: 0,
        max: 100
    },
    tags: {
        type: Array,
        validate: {
            validator: async function (v) {
                await new Promise(resolve => setTimeout(resolve, 3000));
                return v && v.length > 0;
            },
            message: 'A product should have at least one tag'
        }
    },
    seller: {
        name: {
            type: String,
            trim: true,
        },
        rating: {
            type: Number,
            min: 0,
            max: 10
        }
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
}));

app.use(express.json());



function validateInput(product) {
    const schema = Joi.object({
        title: Joi.string().trim().uppercase().required(),
        category: Joi.string().trim(),
        price: Joi.number().min(10).max(500),
        inStock: Joi.boolean(),
        discount: Joi.number().min(0).max(100),
        tags: Joi.array().items(Joi.string()).min(1).required(),
        seller: Joi.object({
            name: Joi.string().trim().required(),
            rating: Joi.number().min(0).max(10)
        }).required()
    });

    return schema.validate(product);
}



app.post('/api/product', async (req, res) => {
    const result = validateInput(req.body)
    // این خط کد میاد الگوی صحیح اسکیما رو با چیزی که پست شده مقایسه میکنه اگه درست بود حروجیش undifind 
    if (result.error) return res.status(400).send(result.error.details[0].message);

    let product = new Product({
        title: req.body.title,
        category: req.body.category,
        price: req.body.price,
        inStock: req.body.inStock,
        discount: req.body.discount,
        tags: req.body.tags,
        seller: req.body.seller
    });
    product = await product.save();

    res.send(product);
});

app.get('/', async (req, res) => {
    const products = await Product
        .find({
            $and: [{ inStock: true }, { price: { $gte: 30 } }, { discount: { $gt: 0 } }, { $or: [{ tags: 'gaming' }, { tags: 'wireless' }] }]

        })
    res.send(products);
});

app.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).send('The course with the given ID was not found!');

    res.send(product);
})

app.put('/:id', async (req, res) => {
    const { error } = validateInput(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);

    const product = await Product.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            category: req.body.category,
            price: req.body.price,
            inStock: req.body.inStock,
            discount: req.body.discount,
            tags: req.body.tags,
            seller: req.body.seller
        }
    }, { new: true });

    if (!course) return res.status(404).send('The course with the given ID was not found!');


    res.send(product);
})

app.delete('/:id', async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) return res.status(404).send('The course with the given ID was not found!');

    res.send(product);
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));