 const EventEmitter = require('events');

 const Logger = require('./logger')
const logger = new Logger();    
 // Register an event listener
 logger.on('messageLogged', (arg) => {
   console.log('An event occurred!' , arg);
 });

 logger.log('Message logged');

