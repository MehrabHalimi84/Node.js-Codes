const os = require('os');

var TotalMemory = os.totalmem();
var FreeMemory = os.freemem();

console.log(`Total Memory: ${TotalMemory}`);
console.log(`Free Memory: ${FreeMemory}`);