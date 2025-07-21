const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/shopWeb')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log(`Could not connect to MongoDB...  ,${err}`));



const productSchema = new mongoose.Schema({
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
});

const Product = mongoose.model('Product', productSchema);

app.use(express.json());



app.post('/api/product', async (req, res) => {
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
})

app.put('/:id', async (req, res) => {
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
    res.send(product);
})



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));