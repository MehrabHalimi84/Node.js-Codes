const debug = require('debug')('app:startup');
// const dbDbugger = require('debug')('app:db');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home')
const express = require('express');
const app = express();



// Templating Engine

app.set('view engine', 'pug'); // موتور قالب‌ساز را pug تنظیم می‌کند
app.set('views', './views');   // مسیر فایل‌های .pug را مشخص می‌کند




//Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
// console.log('Mail Password: ' + config.get('mail.password'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// 3 line of this txt is built in middleware 

app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);


if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('morgan enable....');
}

// 2 line of this txt is third-party middleware

app.use(logger);
// custom middleware






const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));




// app.get();
// app.post();
// app.put;
// app.delete();