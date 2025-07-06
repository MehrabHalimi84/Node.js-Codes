const debug = require('debug')('app:startup');
// const dbDbugger = require('debug')('app:db');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const logger = require('./logger');
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

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('morgan enable....');
}

// 2 line of this txt is third-party middleware

app.use(logger);
// custom middleware


const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
    { id: 4, name: 'course4' },
    { id: 5, name: 'course5' }
]

app.get('/', (req, res) => {
    res.render('index', { title: 'My Express App', message: 'Hello!' });
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// app.get('/api/courses/:id', (req, res) => {
//     res.send(req.params.id)
// });
// این خط ایدی که داخل یو ار ال نوشته میشه رو برمیگردونه

app.get('/api/posts/:years/:month', (req, res) => {
    res.send({
        params: req.params,
        query: req.query
    });
    // res.send(req.query);
});

app.post('/api/courses', (req, res) => {
    const result = validateInput(req.body)
    // این خط کد میاد الگوی صحیح اسکیما رو با چیزی که پست شده مقایسه میکنه اگه درست بود حروجیش undifind 
    if (result.error) return res.status(400).send(result.error.details[0].message);
    // و در نهایت اگر خروجی ارور داشت ارور رو سند کنه

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found!');
    res.send(course);

});


app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found!');


    const result = validateInput(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    course.name = req.body.name;
    res.send(course);
});

function validateInput(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema);
}


app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found!');

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));




// app.get();
// app.post();
// app.put;
// app.delete();