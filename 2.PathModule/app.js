const path = require('path');


var pathObj = path.parse(__filename);
console.log(pathObj);

// بعد کنسل گرفتن نتیجه میشه این

// {
//   root: 'D:\\',
//   dir: 'D:\\Coding\\Node.js corse\\first-app\\2.PathModule',
//   base: 'app.js',
//   ext: '.js',
//   name: 'app'
// }