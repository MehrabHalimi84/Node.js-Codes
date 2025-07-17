const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/exercise')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...'))


const productSchema = new mongoose.Schema({
    title: String,
    category: String,
    price: Number,
    inStock: Boolean,
    discount: Number,
    tags: [String],
    seller: {
        name: String,
        rating: Number
    },
    dateAdded: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

// create ducoument

// async function createProduct() {
//     const product = new Product({
//         title: 'Wireless Mouse',
//         category: 'Electronics',
//         price: 25,
//         inStock: true,
//         discount: 10,
//         tags: ['mouse', 'wireless', 'usb'],
//         seller: { name: 'TechStore', rating: 4.5 }
//     });

//     const result = await product.save();
//     console.log(result);
// }

// createProduct()

// async function createProduct() {
//     const product = new Product({
//         title: 'Gaming Keyboard',
//         category: 'Electronics',
//         price: 80,
//         inStock: false,
//         discount: 0,
//         tags: ['keyboard', 'gaming'],
//         seller: { name: 'GamerShop', rating: 4.8 }
//     });

//     const result = await product.save();
//     console.log(result);
// }

// createProduct()




// async function createProduct() {
//     const product = new Product({
//         title: 'Running Shoes',
//         category: 'Sportswear',
//         price: 60,
//         inStock: true,
//         discount: 15,
//         tags: ['shoes', 'running'],
//         seller: { name: 'Sporty', rating: 4.2 }
//     });

//     const result = await product.save();
//     console.log(result);
// }

// createProduct()


// async function createProduct() {
//     const product = new Product({
//         title: 'LED Monitor',
//         category: 'Electronics',
//         price: 120,
//         inStock: true,
//         discount: 20,
//         tags: ['monitor', 'LED', 'display'],
//         seller: { name: 'TechStore', rating: 4.7 }
//     });

//     const result = await product.save();
//     console.log(result);
// }

// createProduct()



// async function createProduct() {
//     const product = new Product({
//         title: 'Water Bottle',
//         category: 'Home & Kitchen',
//         price: 10,
//         inStock: true,
//         discount: 5,
//         tags: ['kitchen', 'water', 'bottle'],
//         seller: { name: 'HomePlus', rating: 3.9 }
//     });

//     const result = await product.save();
//     console.log(result);
// }

// createProduct()




// async function createProduct() {
//     const product = new Product({
//         title: 'Office Chair',
//         category: 'Furniture',
//         price: 200,
//         inStock: false,
//         discount: 30,
//         tags: ['chair', 'office'],
//         seller: { name: 'FurniCo', rating: 4.1 }
//     });

//     const result = await product.save();
//     console.log(result);
// }

// createProduct()




// async function createProduct() {
//     const product = new Product({
//         title: 'Bluetooth Speaker',
//         category: 'Electronics',
//         price: 45,
//         inStock: true,
//         discount: 0,
//         tags: ['audio', 'bluetooth', 'music'],
//         seller: { name: 'SoundMaster', rating: 4.6 }
//     });

//     const result = await product.save();
//     console.log(result);
// }

// createProduct()




// async function createProduct() {
//     const product = new Product({
//         title: 'Basketball',
//         category: 'Sportswear',
//         price: 25,
//         inStock: true,
//         discount: 10,
//         tags: ['sports', 'basketball'],
//         seller: { name: 'Sporty', rating: 4.0 }
//     });

//     const result = await product.save();
//     console.log(result);
// }

// createProduct()


// async function createProduct() {
//     const product = new Product({
//         title: 'Laptop Stand',
//         category: 'Accessories',
//         price: 30,
//         inStock: false,
//         discount: 5,
//         tags: ['laptop', 'stand'],
//         seller: { name: 'OfficePro', rating: 4.4 }
//     });

//     const result = await product.save();
//     console.log(result);
// }

// createProduct()



// async function createProduct() {
//     const product = new Product({
//         title: 'Cookware Set',
//         category: 'Home & Kitchen',
//         price: 150,
//         inStock: true,
//         discount: 25,
//         tags: ['kitchen', 'cookware'],
//         seller: { name: 'HomePlus', rating: 4.3 }
//     });

//     const result = await product.save();
//     console.log(result);
// }

// createProduct()



// Quering ducoument


async function getProduct() {
    const products = await Product
        .find()
        .and([
            { inStock: true },
            { price: { $gt: 30 } },
            { discount: { $gte: 1 } }
        ])
        .or([
            { tags: 'kitchen' },
            { tags: 'gaming' }
        ])
        .select({
            tags: 1,
            discount: 1,
            price: 1,
            title: 1
        })
        .sort({ price: -1 })
        .limit(5);
    console.log(products);
}

getProduct();