const helmet = require('helmet')
const compression = require('compression');
module.exports = function (app) {
    app.use(helmet());
    app.use(compression());
}

// بعدش برین توی ایندکس اصلی اپلیکیشن و این میدلویر رو بهش اضافه کنین
// اینجوری
require('./prod')(app);





// بعد دانلود هروکو و لاگین کردن توی ترمینال
// توی پکیج چیسون توی قسمت اسکریپت که تست هم داره یه فیلد و ولیو اضافه میکنیم
// "start": "node index.js"

// با این تغییرات

// "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1",
//         "start": "node index.js"
// },
// "engine": {
//     "node": "20.14.0"
// },


// چیزی که باید تو اینگنور گیت بنویسیم
// node_modules
// coverage