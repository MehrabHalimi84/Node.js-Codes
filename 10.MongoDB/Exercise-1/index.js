const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/exercise')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...'))


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

productSchema.index({ title: 1, 'seller.name': 1 }, { unique: true });

const Product = mongoose.model('Product', productSchema);

// create ducoument

async function createProduct() {
    const product = new Product({
        title: 'PS6',
        category: 'Electronics',
        price: 500,
        inStock: true,
        discount: 10,
        tags: ['gaming', 'console'],
        seller: { name: 'DigiKala', rating: 9.5 }
    });

    try {
        const result = await product.save();
        console.log('✅ Product saved:', result);
    } catch (err) {
        // بررسی خطای Duplicate Key
        if (err.code === 11000) {
            const duplicateField = Object.keys(err.keyPattern)[0];
            console.log(`❌ A docoument aleady exsist!`);
            console.log(`A duplicate field"${duplicateField}`)
        }

        // بررسی ولیدیشن‌های دیگر
        else if (err.name === 'ValidationError') {
            for (let field in err.errors) {
                console.log(`⚠️ ${err.errors[field].message}`);
            }
        }
        // سایر خطاها
        else {
            console.log('❗ Unexpected error:', err);
        }
    }
}


createProduct()

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


// async function getProduct() {
//     const products = await Product
//         .find({
//             $and: [
//                 { inStock: true },
//                 { price: { $gt: 30 } },
//                 { discount: { $gte: 1 } },
//                 {
//                     $or: [
//                         { tags: 'kitchen' },
//                         { tags: 'gaming' }
//                     ]
//                 }
//             ]
//         })
//         .select({
//             title: 1,
//             price: 1,
//             discount: 1,
//             tags: 1
//         })
//         .sort({ price: 1 })
//         .limit(5);

//     console.log(products);
// }

// getProduct()



Product.syncIndexes().then(() => {
    console.log("✅ Indexes are in sync.");
}).catch(err => {
    console.error("❌ Error syncing indexes:", err);
});

